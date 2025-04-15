import cv2
from pyzbar.pyzbar import decode

def read_barcode():
    """
    Lee códigos de barras utilizando la cámara.
    """
    barcode_data = None
    try:
        cap = cv2.VideoCapture(0)
        if not cap.isOpened():
            return None
        while True:
            _, frame = cap.read()
            try:
                for barcode in decode(frame):
                    barcode_data = barcode.data.decode('utf-8')
                    break
            except Exception:
                continue
            if cv2.waitKey(1) & 0xFF == ord('q'):
                break
        cap.release()
        cv2.destroyAllWindows()
    finally:
        return barcode_data