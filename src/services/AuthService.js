
import axios from 'axios';


class AuthService {
    static BASE_URL = import.meta.env.VITE_PRODUCTION_URL;
    //static BASE_URL = import.meta.env.VITE_BACKEND_URL;

    static async register(userData) {
        try {
            const response = await axios.post(`${this.BASE_URL}/register`, userData);
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    static async resendVerificationToken(email) {
        try {
            const response = await axios.get(`${this.BASE_URL}/register/resend-verification-token`, {
                params: { email }
            });
            return response;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    static async login(email, password) {
        try {
            console.log('loging in... ')
            const response = await axios.post(`${AuthService.BASE_URL}/api/auth/login`, { email, password }, {
                withCredentials: true,
            });
            console.log('loging in works ')
            if (response.data.payload.accessToken) {
                sessionStorage.setItem('token', response.data.payload.accessToken);
                sessionStorage.setItem('role', response.data.payload.role);
                sessionStorage.setItem('userId', response.data.payload.userId);
                sessionStorage.setItem('name', response.data.payload.name);
                sessionStorage.setItem('imageUrl', response.data.payload.imageUrl);
            }

            return response;

        } catch (error) {
            if (error.response && error.response.data.exception) {
                console.log('error ', error);
                throw new Error(error.response.data.exception || "Login failed");
            } else {
                throw new Error("Network error or server unreachable");
            }
        }
    }


}

export default AuthService
