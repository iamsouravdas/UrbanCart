import { Request, Response, NextFunction } from "express";
import { OtpService } from "../services/OtpService";

export class OtpController {
    private otpService = new OtpService();

    

    otpGenerate = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { phoneNumber } = req.body;
            if (!phoneNumber) {
                return res.status(400).json({ message: "Phone number is required" });
            }

            const otp = await this.otpService.generateOtp();
            await this.otpService.storeOtp(phoneNumber, otp);




            return res.status(200).json({ message: "OTP sent successfully", otp: otp });
        }
        catch (error: any) {
            next(error);
        }
    }

    otpGet = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { phone } = req.body;
            const otp = await this.otpService.getOtp(phone);
            return res.status(200).json({ otp });
        } catch (error: any) {
            next(error);
        }
    }
    otpDelete = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
        try {
            const { phone } = req.body;
            await this.otpService.deleteOtp(phone);
            return res.status(200).json({ message: "OTP deleted successfully" });
        } catch (error: any) {
            next(error);
        }
    }



} 