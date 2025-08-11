import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class OtpCode {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column({ type: "text", name: "hash_code" })
    codeHash: string;

    @Column({ type: "timestamptz" })
    expiresAt: Date;

    @Column({ type: "varchar", length: 50, nullable: false })
    purpose: string;

    @Column({ type: "boolean", default: false })
    isUsed: boolean;

    @CreateDateColumn()
    createdAt!: Date;

    @CreateDateColumn()
    updatedAt!: Date;
}