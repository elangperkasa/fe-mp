import { API_KEY } from 'src/config-global';
import { ILubesQrCode } from 'src/types/qrCode';
import axiosInstance from './axios';
import { endpoints } from './endpoints';

export const checkQR = async (qrUrl: string): Promise<ILubesQrCode | null> => {
  const secureQrUrl = qrUrl.startsWith('http:') ? qrUrl.replace('http:', 'https:') : qrUrl;
  try {
    const qrCheckerResponse = await axiosInstance.post(
      `${endpoints.usageQr.check}`,
      { qrUrl: secureQrUrl },
      {
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY,
        },
      }
    );
    return qrCheckerResponse.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
