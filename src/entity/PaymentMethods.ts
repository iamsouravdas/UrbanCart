import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("paymentMethods")
export class paymentMethods{
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    methodName: string
}