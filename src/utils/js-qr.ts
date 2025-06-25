import jsQR from 'jsqr';

export const readQRCode = (
  file: File,
  onSuccess: (data: string) => void,
  onError: (message: string) => void
) => {
  const reader = new FileReader();

  reader.onload = () => {
    const image = new Image();
    image.src = reader.result as string;

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      if (!context) {
        onError("Couldn't get 2D context");
        return;
      }

      canvas.width = image.width;
      canvas.height = image.height;
      context.drawImage(image, 0, 0, image.width, image.height);

      const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
      const qrCode = jsQR(imageData.data, imageData.width, imageData.height);

      if (qrCode) {
        onSuccess(qrCode.data); // The decoded QR code data
      } else {
        onError('QR code not found.');
      }
    };

    image.onerror = () => {
      onError('Error loading image.');
    };
  };

  reader.onerror = () => {
    onError('Error reading file.');
  };

  reader.readAsDataURL(file);
};
