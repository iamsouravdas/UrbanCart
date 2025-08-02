import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders";
import { paymentMethods } from "./PaymentMethods";

@Entity("payments")
export class payments{
    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(() => Orders, (Orders) => Orders.id)
        @JoinColumn({ name: "orders_id" })
        orderId!: Orders;

    @ManyToOne(() => paymentMethods, (paymentMethods) => paymentMethods.id)
        @JoinColumn({ name: "payment_methods_id" })
        paymentMethodId!: paymentMethods;

    @Column()
    amount: Double

    @Column()
    status: string

    @Column({type: "timestamptz"})
    createdAt: Date
}