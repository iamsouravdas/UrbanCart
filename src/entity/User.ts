import { dot } from "node:test/reporters";
import { Entity, PrimaryGeneratedColumn, Column, Repository, CreateDateColumn } from "typeorm"

export type UserRole = "user" | "admin";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column()
    phone!: string;

    @Column({ type: "varchar", default: "user" })
    role!: UserRole;

    @Column({ nullable: true })
    refreshToken?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @CreateDateColumn()
    updatedAt!: Date;

}
