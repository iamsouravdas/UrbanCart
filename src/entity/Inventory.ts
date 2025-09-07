import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Products";

@Entity('inventory')
export class Inventory {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, name: 'stock_quantity' })
    stockQuantity: number

    @ManyToOne(() => Products, (product) => product.inventory)
    @JoinColumn({ name: 'product_id' })
    productInventory!: Products;




}