import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity("address")
export class address{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    userId!: User;

    @Column({type: "varchar"})
    addrLine1: string

    @Column({type: "varchar"})
    addrLine2: string

    @Column()
    city: string

    @Column()
    state: string

    @Column()
    postalCode: number

    @Column()
    isDefault: boolean
}