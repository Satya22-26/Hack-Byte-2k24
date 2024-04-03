from flask import Flask, request, send_file,  Response, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import cv2
import numpy as np
import base64
from model.dehaze import dehaze
from model.image import dehaze_image

app = Flask(__name__)
CORS(app, resources={r"*":{"origins":"*"}})


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