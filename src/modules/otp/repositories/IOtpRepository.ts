import { OtpCode } from "../../../entity/OtpCode";
import { User } from "../../../entity/User";

export interface IOtpRepository {
    createOtp(user: User, code: string, purpose: string): Promise<OtpCode>
    findLatestOtp(userId: number, purpose: string): Promise<OtpCode | null>;
    markAsUsed(otp: OtpCode): Promise<void>
}