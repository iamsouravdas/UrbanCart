import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Carts";
import { Products } from "./Products";

@Entity('cart_items')
export class CartItems {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'quantity', nullable: false, type: 'numeric'})
    quantity: number;

    //Cart will be having 
    @ManyToOne(() => Cart, (cart) => cart.cartItems, { onDelete: "CASCADE" })
    @JoinColumn({ name: 'cart_id' })
    cart!: Cart;


    @ManyToOne(() => Products, (product) => product.cartItem)
    @JoinColumn({ name: 'product_id' })
    product!: Products;

}