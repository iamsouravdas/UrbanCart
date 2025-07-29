import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity()
export class OtpCode{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;

    @Column()
    code: string;

    @Column({type: "timestamptz"})
    expiresAt: Date;

    @CreateDateColumn()
    createdAt!: Date;
    
    @CreateDateColumn()
    updatedAt!: Date;
}