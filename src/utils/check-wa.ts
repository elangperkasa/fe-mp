import { API_KEY } from 'src/config-global';
import axiosInstance from './axios';
import { endpoints } from './endpoints';

export async function checkWA(number: string) {
  try {
    const checkWhatsappResp = await axiosInstance.patch(
      `${endpoints.customer.checkWhatsappNo(number)}`,
      {},
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      }
    );
    if (checkWhatsappResp.data.count >= 1) {
      throw new Error('No. Whatsapp sudah pernah digunakan!');
    }

    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
