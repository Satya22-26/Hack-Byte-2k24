import cv2
import numpy as np
import time
from model.dehaze import dehaze

# Function to process video and save the processed video
def process_video(input_video_path, output_video_path, target_resolution=(640, 480)):
    start_time = time.time()
    cap = cv2.VideoCapture(input_video_path)
    frame_width = int(cap.get(cv2.CAP_PROP_FRAME_WIDTH))
    frame_height = int(cap.get(cv2.CAP_PROP_FRAME_HEIGHT))
    fps = int(cap.get(cv2.CAP_PROP_FPS))

    out = cv2.VideoWriter(output_video_path, cv2.VideoWriter_fourcc(*'mp4v'), fps, target_resolution)

    while True:
        print("Processing")
        ret, frame = cap.read()
        if not ret:
            break

        # Resize the frame to the target resolution
        resized_frame = cv2.resize(frame, target_resolution)

        # Apply dehaze to the resized frame
        dehazed_frame = dehaze(resized_frame, omega=0.5, tmin=0.05, gamma=1.5, color_balance=True)
        out.write(dehazed_frame)

    cap.release()
    out.release()

    end_time = time.time()
    elapsed_time = end_time - start_time
    print(f"Video processing complete. Time taken: {elapsed_time:.2f} seconds")

    return "Video processing complete"
