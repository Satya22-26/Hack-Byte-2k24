from flask import Flask, request, send_file,  Response, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app, resources={r"*":{"origins":"*"}})

def dark_channel(img, size=15):
    r, g, b = cv2.split(img)
    min_img = cv2.min(r, cv2.min(g, b))
    kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (size, size))
    dc_img = cv2.erode(min_img, kernel)
    return dc_img

def get_atmo(img, percent=0.001):
    mean_perpix = np.mean(img, axis=2).reshape(-1)
    mean_topper = mean_perpix[:int(img.shape[0] * img.shape[1] * percent)]
    return np.mean(mean_topper)

def get_trans(img, atom, w=0.95):
    x = img / atom
    t = 1 - w * dark_channel(x, 15)
    return t

def guided_filter(p, i, r, e):
    mean_I = cv2.boxFilter(i, cv2.CV_64F, (r, r))
    mean_p = cv2.boxFilter(p, cv2.CV_64F, (r, r))
    corr_I = cv2.boxFilter(i * i, cv2.CV_64F, (r, r))
    corr_Ip = cv2.boxFilter(i * p, cv2.CV_64F, (r, r))
    var_I = corr_I - mean_I * mean_I
    cov_Ip = corr_Ip - mean_I * mean_p
    a = cov_Ip / (var_I + e)
    b = mean_p - a * mean_I
    mean_a = cv2.boxFilter(a, cv2.CV_64F, (r, r))
    mean_b = cv2.boxFilter(b, cv2.CV_64F, (r, r))
    q = mean_a * i + mean_b
    return q

def dehaze_image(file_path):
    try:
        im = cv2.imread(file_path)
        img = im.astype('float64') / 255
        img_gray = cv2.cvtColor(im, cv2.COLOR_BGR2GRAY).astype('float64') / 255
        atom = get_atmo(img)
        trans = get_trans(img, atom)
        trans_guided = guided_filter(trans, img_gray, 20, 0.0001)
        trans_guided = cv2.max(trans_guided, 0.25)
        result = np.empty_like(img)
        for i in range(3):
            result[:, :, i] = (img[:, :, i] - atom) / trans_guided + atom
        return result
    except Exception as e:
        print(f"Error processing image: {e}")
        return None
    
def dehaze(frame, omega=0.95, tmin=0.1, gamma=1.0, color_balance=None):
    # Step 1: Calculate the dark channel
    min_channel = np.min(frame, axis=2)
    dark_channel = cv2.erode(min_channel, np.ones((15, 15), np.uint8))
    
    # Step 2: Estimate the atmospheric light
    num_pixels = dark_channel.size
    num_top_pixels = int(num_pixels * omega)
    flat_dark_channel = dark_channel.flatten()
    indices = np.argpartition(flat_dark_channel, -num_top_pixels)[-num_top_pixels:]
    atmospheric_light = np.mean(frame.reshape(-1, 3)[indices], axis=0) * 0.8  # Use a fraction of the mean
    
    # Step 3: Calculate the transmission map
    transmission = 1 - omega * min_channel / atmospheric_light.max()
    transmission[transmission < tmin] = tmin
    
    # Step 4: Recover the haze-free image
    recovered_image = np.zeros_like(frame, dtype=np.float32)
    for i in range(3):
        recovered_image[:, :, i] = ((frame[:, :, i].astype(np.float32) - atmospheric_light[i]) /
                                    transmission + atmospheric_light[i])
    
    # Gamma correction
    recovered_image = np.clip(recovered_image, 0, 255).astype(np.uint8)
    recovered_image = np.power(recovered_image / 255.0, 1 / gamma) * 255.0
    
    # Color balance
    if color_balance is not None:
        recovered_image = cv2.xphoto.createSimpleWB().balanceWhite(recovered_image.astype(np.uint8))  # Convert to compatible data type
    
    return recovered_image

def generate_frames():
    cap = cv2.VideoCapture(0)

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        
        dehazed_frame = dehaze(frame, omega=0.5, tmin=0.1, gamma=1.5, color_balance=True)

        ret, buffer = cv2.imencode('.jpg', dehazed_frame)
        frame = buffer.tobytes()

        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n')

    cap.release()

@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/process_frame', methods=['POST'])
def process_frame():
    data = request.get_json()
    image_data = data['image_data'].split(',')[1]  # Remove the "data:image/jpeg;base64," prefix
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    # Perform dehazing on the frame
    dehazed_frame = dehaze(frame, omega=0.5, tmin=0.1, gamma=1.5, color_balance=True)

    # Encode the dehazed frame to base64 for sending to the client
    _, buffer = cv2.imencode('.jpg', dehazed_frame)
    dehazed_image_data = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'dehazed_image': dehazed_image_data})


@app.route("/dehaze/", methods=["POST"])
@app.route("/dehaze/", methods=["POST"])
def dehaze_endpoint():
    try:
        file = request.files['upload_file']
        if file:
            filename = secure_filename(file.filename)
            file.save(f"uploads/{filename}")
            dehazed_image = dehaze_image(f"uploads/{filename}")
            if dehazed_image is not None:
                output_file_path = f"uploads/dehazed_{filename}"
                cv2.imwrite(output_file_path, dehazed_image * 255)
                return send_file(output_file_path, as_attachment=True)
            else:
                return {"error": "Failed to process image"}
        else:
            return {"error": "No file provided"}
    except Exception as e:
        return {"error": str(e)}

@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    try:
        return send_file(f"uploads/{filename}", as_attachment=True)
    except Exception as e:
        return {"error": str(e)}

if __name__ == "__main__":
    app.run(debug=True)