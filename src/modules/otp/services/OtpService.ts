import { helpers } from "../../../helper/utils";

export class OtpService {

    generateOtp = async (): Promise<string> => {
        return await helpers.otp.create(6);
    }
    storeOtp = async (phone: string, otp: string, expiresIn: number = 300): Promise<void> => {
        await helpers.otp.store(phone, otp, expiresIn); // phone number as key
    }

    getOtp = async (phone: string): Promise<string | null> => {
        return await helpers.otp.get(phone);
    }

    deleteOtp = async (phone: string): Promise<void> => {
        await helpers.otp.remove(phone);
    }
}