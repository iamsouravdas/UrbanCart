import { dot } from "node:test/reporters";
import { Entity, PrimaryGeneratedColumn, Column, Repository, CreateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Role } from "./Role";


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

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;


    @Column({ nullable: true })
    refreshToken?: string;

    @CreateDateColumn()
    createdAt!: Date;

    @CreateDateColumn()
    updatedAt!: Date;

}
