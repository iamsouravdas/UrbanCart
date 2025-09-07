import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Products";

@Entity('product_variants')
export class ProductVariants {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 50, nullable: false })
    variant_name: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    additional_price: number;

    @ManyToOne(() => Products, (product) => product.productVariants)
    @JoinColumn({ name: 'product_id' })
    product!: Products;

}