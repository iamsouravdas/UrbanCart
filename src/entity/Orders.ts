import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('orders')
export class Orders{
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    @JoinColumn({ name: "user_id" })
    user!: User;
    
    @Column({type: "numeric"})
    totalAmount: number;

    @Column({type: "varchar"})
    status: string;

    @CreateDateColumn({ type: "timestamptz", nullable: false })
    createdAt!: Date;
    
    @CreateDateColumn({ type: "timestamptz", nullable: false })
    updatedAt!: Date;
}