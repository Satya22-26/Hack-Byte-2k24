import cv2
import numpy as np

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
            try:
                # Use xphoto module for color balance
                recovered_image = cv2.xphoto.createSimpleWB().balanceWhite(recovered_image.astype(np.uint8))  # Convert to compatible data type
            except AttributeError:
                # Fallback if xphoto module or function is not available
                print("Warning: xphoto module or balanceWhite function not available. Using default color balance.")
                # Implement custom or alternative color balance here if needed
                pass
        
        return recovered_image