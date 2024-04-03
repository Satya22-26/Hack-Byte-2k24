from flask import Flask, request, send_file,  Response, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import cv2
import os
import numpy as np
import base64
from model.dehaze import dehaze
from model.image import dehaze_image

app = Flask(__name__)
CORS(app, resources={r"*":{"origins":"*"}})

UPLOAD_FOLDER = 'uploadvideo'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

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

# Function to process video and save the processed video
def process_video(input_video_path, output_video_path):
    cap = cv2.VideoCapture(input_video_path)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, (frame_width, frame_height))

    while True:
        ret, frame = cap.read()
        if not ret:
            break

        # Apply dehaze to each frame
        dehazed_frame = dehaze(frame, omega=0.5, tmin=0.05, gamma=1.5, color_balance=True)
        out.write(dehazed_frame)

    cap.release()
    out.release()

    return "Video processing complete"


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
    
# Route to upload and process video
@app.route('/uploadvideo', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'})

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'})

    filename = file.filename
    file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(file_path)

    # Process the uploaded video
    output_video_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.mp4')
    process_video(file_path, output_video_path)

    return jsonify({'message': 'File uploaded and processed successfully', 'filename': 'output.mp4', 'processed_video_path': output_video_path})

# Route to serve processed video
@app.route('/processedvideo')
def processed_video():
    processed_video_path = request.args.get('path')
    return send_file(processed_video_path, mimetype='video/mp4')

if __name__ == "__main__":
    app.run(debug=True)