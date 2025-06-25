import { API_KEY } from 'src/config-global';
import axiosInstance from './axios';
import { endpoints } from './endpoints';

export async function uploadBottle(bottlePhoto: File, whatsapp: string): Promise<string> {
  if (!bottlePhoto) return '';

  return new Promise((resolve, reject) => {
    const image = new Image();
    const reader = new FileReader();

    reader.onload = () => {
      image.src = reader.result as string;

      image.onload = async () => {
        try {
          const formData = new FormData();

          formData.append('file', image.src);
          formData.append('folder', `undian_bottle/${whatsapp}`);

          // Send the form data via axios
          const uploadRes = await axiosInstance.post(`${endpoints.customer.upload}`, formData, {
            headers: {
              // 'Content-Type': 'multipart/form-data', // Correct content type for FormData
              'Content-Type': 'application/json',
              'x-api-key': API_KEY,
            },
          });

          // Resolve the promise with the uploaded file's URL
          resolve(uploadRes.data.url);
        } catch (error) {
          console.error('Error during upload:', error);
          reject(error); // Reject the promise in case of error
        }
      };

      image.onerror = () => {
        console.error('Error loading image.');
        reject(new Error('Error loading image.'));
      };
    };

    reader.onerror = () => {
      console.error('Error reading file.');
      reject(new Error('Error reading file.'));
    };

    reader.readAsDataURL(bottlePhoto); // Start reading the file as a data URL
  });
}
