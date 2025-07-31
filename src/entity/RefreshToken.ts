import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("refresh_tokens")

export class RefreshToken {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: false })
    token: string;

    @Column({ type: 'timestamptz', nullable: false, name: 'expires_at' })
    expiresAt: Date;

    @Column({ type: "boolean", default: false })
    isRevoked: boolean

    @ManyToOne(() => User, (user) => user.refreshTokens, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'user_id' })
    user!: User;
}

