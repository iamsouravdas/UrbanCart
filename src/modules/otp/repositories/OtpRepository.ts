import { Repository } from "typeorm";
import { OtpCode } from "../../../entity/OtpCode";
import { User } from "../../../entity/User";
import { IOtpRepository } from "./IOtpRepository";
import AppDataSource from "../../../data-source";

class OtpRepository implements IOtpRepository {

    private repo: Repository<OtpCode>

    constructor(_repo?: Repository<OtpCode>) {
        this.repo = _repo ?? AppDataSource.getRepository(OtpCode)
    }

    async createOtp(user: User, code: string, purpose: string): Promise<OtpCode> {
        throw new Error("Method not implemented.");
    }
    async findLatestOtp(userId: number, purpose: string): Promise<OtpCode | null> {
        throw new Error("Method not implemented.");
    }
    async markAsUsed(otp: OtpCode): Promise<void> {
        throw new Error("Method not implemented.");
    }

}

export default OtpRepository;