import { BrowserQRCodeReader } from '@zxing/browser';

export function readQRCode(
  file: File,
  onSuccess: (data: string | null) => void,
  onError: (message?: string) => void
) {
  const qrCodeReader = new BrowserQRCodeReader();
  if (!file) return;

  const image = new Image();
  const reader = new FileReader();

  reader.onload = async () => {
    image.src = reader.result as string; // Set the image source to the file

    image.onload = async () => {
      try {
        // Decode QR code from the image
        const result = await qrCodeReader.decodeFromImageElement(image);

        onSuccess(result.getText()); // Pass the decoded text via the callback
        onError(''); // Clear any previous errors
      } catch (error) {
        onSuccess(null); // Pass null if decoding fails
        onError('Failed to decode QR code. Make sure the image contains a valid QR code.');
      }
    };

    image.onerror = () => {
      onError('Error loading image file.');
    };
  };

  reader.onerror = () => {
    onError('Error reading the file.');
  };

  reader.readAsDataURL(file); // Read the file as a Data URL
}
