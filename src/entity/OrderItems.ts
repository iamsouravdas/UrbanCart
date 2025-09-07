import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Orders } from "./Orders";
import { Products } from "./Products";

@Entity('order_items')
export class OrderItems {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "int", nullable: false })
    quantity: number;

    @Column({ name: 'price_at_purchase', type: "decimal", precision: 10, scale: 2, nullable: false })
    priceAtPurchase: number;

    @ManyToOne(() => Orders, (orders) => orders.orderItems)
    ordersId: Orders;

    @ManyToOne(() => Products, (products) => products.orderItem)
    productId: Products;
}