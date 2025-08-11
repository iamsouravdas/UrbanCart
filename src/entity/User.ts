import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Cart } from "./Carts";
import { Role } from "./Role";
import { Wishlist } from "./Wishlist";


@Entity("user")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column({
        type: "boolean",
        default: false, // Indicates if the user is verified
        name: "is_verified_email"
    })
    isVerifiedEmail: boolean;

    @Column()
    password: string;

    @Column()
    phone!: string;
    @Column({
        type: "boolean",
        default: false, // Indicates if the user is active
        name: "is_verified_phone"
    })
    isVerifiedPhone: boolean;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: "role_id" })
    role!: Role;

    //Cart
    @OneToOne(() => Cart, (cart) => cart.user)
    cart!: Cart;

    @OneToMany(() => Wishlist, (wishlist) => wishlist.user)
    wishlist: Wishlist[];

    @CreateDateColumn()
    createdAt!: Date;

    @CreateDateColumn()
    updatedAt!: Date;

}
