import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Products } from './Products';
@Entity('product_images')

export class ProductImages {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    image_url!: string;

    @ManyToOne(() => Products, (product) => product.productImages, { onDelete: "CASCADE" })
    @JoinColumn({ name: "product_id" })
    product!: Products;

}