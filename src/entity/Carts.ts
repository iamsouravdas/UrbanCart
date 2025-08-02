import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { CartItems } from "./CartItems";

@Entity('carts')
export class Cart {
    @PrimaryGeneratedColumn()
    id: number;

    @CreateDateColumn()
    createdAt!: Date;

    @CreateDateColumn()
    updatedAt!: Date;
    // Each user should have one cart
    

    @OneToOne(()=> User, (user)=> user.cart, {onDelete: "CASCADE"})
    @JoinColumn({name: "user_id"})
    user!: User;

    // Each Cart will be haing multiple cart items.Each cart items will be having multiple products
    @OneToMany(()=> CartItems, (cartItem)=> cartItem.cart)
    cartItems!: CartItems;
    
}