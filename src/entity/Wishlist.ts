import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Products } from "./Products";

@Entity("wishlist")
export class Wishlist{
    @PrimaryGeneratedColumn()
    id: number;


    @ManyToOne(()=> User, (user)=> user.wishlist)
    @JoinColumn({name: 'user_id'})
    user: User;

    @ManyToOne(()=> Products, (prod)=> prod.wishlist)
    @JoinColumn({name: 'product_id'})
    product: Products;
}