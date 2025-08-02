import { Column, Double, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Entity('orderItems')
export class orderItems{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Orders, (orders) => orders.id)
    @JoinColumn({ name: "order_id" })
    user!: Orders;

    @ManyToOne(() => Products, (Products) =>Products.id)
    @JoinColumn({name: "product_id"})
    productId!: Products

    @Column()
    quantity: number

    @Column()
    priceAtPurchase: Double

}