from flask import Flask, request, send_file,  Response, jsonify
from flask_cors import CORS
from werkzeug.utils import secure_filename
import cv2
import os
import numpy as np
import base64
from model.dehaze import dehaze
from model.image import dehaze_image
from model.video import process_video

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


@app.route('/video_feed')
def video_feed():
    return Response(generate_frames(), mimetype='multipart/x-mixed-replace; boundary=frame')

@app.route('/api/process_frame', methods=['POST'])
def process_frame():
    data = request.get_json()
    image_data = data['image_data'].split(',')[1] 
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    dehazed_frame = dehaze(frame, omega=0.5, tmin=0.1, gamma=1.5, color_balance=True)

    _, buffer = cv2.imencode('.jpg', dehazed_frame)
    dehazed_image_data = base64.b64encode(buffer).decode('utf-8')

    return jsonify({'dehazed_image': dehazed_image_data})

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
                os.remove(f"uploads/{filename}")  # Delete uploaded image
                return send_file(output_file_path, as_attachment=True)
            else:
                os.remove(f"uploads/{filename}")  # Delete uploaded image if processing failed
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
    print("Upload done")

    output_video_path = os.path.join(app.config['UPLOAD_FOLDER'], 'output.mp4')
    process_video(file_path, output_video_path)
    print("Processing done")
    return jsonify({'message': 'File uploaded and processed successfully', 'filename': 'output.mp4', 'processed_video_path': output_video_path})

@app.route('/processedvideo')
def processed_video():
    print("video send")
    processed_video_path = request.args.get('path')
    return send_file(processed_video_path, mimetype='video/mp4')

location_data = {
    'chat_id': None,
    'latitude': None,
    'longitude': None
}

@app.route('/api/location_data', methods=['GET', 'POST'])
def location_data_handler():
    global location_data 

    if request.method == 'GET':
        return jsonify(location_data)
    elif request.method == 'POST':
        try:
            data = request.get_json()
            chat_id = data['chat_id']
            latitude = data['latitude']
            longitude = data['longitude']

            location_data['chat_id'] = chat_id
            location_data['latitude'] = latitude
            location_data['longitude'] = longitude

            print(f'{latitude} , {longitude}')

            response_message = f"Received location alert for chat ID {chat_id}: Latitude {latitude}, Longitude {longitude}"
            return jsonify({'message': response_message}), 200
        except Exception as e:
            error_message = f"Error processing location alert: {str(e)}"
            return jsonify({'error': error_message}), 400

if __name__ == "__main__":
    app.run(debug=True)