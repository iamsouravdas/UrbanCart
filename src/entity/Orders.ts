import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { OrderItems } from "./OrderItems";

type statusType = "PENDING" | "PAID" | "SHIPPED" | "DELIVERED" | "CANCELLED";

@Entity('orders')
export class Orders {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'total_amount', type: "decimal", precision: 10, scale: 2, })
    totalAmount: number;

    @Column({ type: "varchar", name: "status", length: 20, enum: ["PENDING", "PAID", "SHIPPED", "DELIVERED", "CANCELLED"] })
    status: statusType;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @OneToMany(() => OrderItems, (orderItems) => orderItems.ordersId)
    orderItems: Orders[]
}