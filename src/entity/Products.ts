import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { CartItems } from "./CartItems";
import { Categories } from "./Categories";
import { Inventory } from "./Inventory";
import { ProductImages } from "./ProductImages";
import { ProductVariants } from "./ProductVariants";
import { Wishlist } from "./Wishlist";

@Entity("products")

export class Products {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    name: string;

    @Column({ type: "text", nullable: true })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2, nullable: false })
    price: number;

    @Column({ type: "text", nullable: false })
    main_image_url!: string

    @Column({ type: "timestamptz", nullable: false })
    createdAt: Date;

    @Column({ type: "timestamptz", nullable: false })
    updatedAt: Date;

    @ManyToOne(() => Categories, (category) => category.id)
    @JoinColumn({ name: "category_id" })
    category!: Categories;

    @OneToMany(() => ProductImages, (productImage) => productImage.product)
    productImages!: ProductImages[]

    @OneToMany(() => ProductVariants, (ProductVariants) => ProductVariants.product)
    productVariants!: ProductVariants[];

    @OneToMany(() => Inventory, (inv) => inv.productInventory)
    inventory!: Inventory[];

    @OneToMany(()=> CartItems, (cartItem)=> cartItem.product)
    cartItem!: CartItems[];

    @OneToMany(()=> Wishlist, (wishlist)=> wishlist.product)
    wishlist!: Wishlist[]
}