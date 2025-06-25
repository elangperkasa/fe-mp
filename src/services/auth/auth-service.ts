import { AxiosInstance } from 'axios';
import axiosInstance from '../../utils/axios';
import { User } from './auth.response';

export class AuthService {
  api: AxiosInstance = axiosInstance;

  // async getAccount(): Promise<User> {
    // // const { data } = {} ; // await this.api.get<User>('auth/account');
    // const data = { id: "",
    //   name: "",
    //   email: "",
    //   role: 1,
    //   status: "",
    //   idamanId: "", 
    //   Position: "",
    //   UserTerritory: "",
    //   AuthUser: {webAuthnId:"", photoUrlts:""}
    // }

    // const role = data.Position.role;

    // return {
    //   ...data,
    //   role,
    // };
  // }
}
