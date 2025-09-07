import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Products } from "./Products";

@Entity("categories")
export class Categories {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 100, nullable: false })
    categoryName: string;

    @Column({ type: "text", nullable: true })
    description?: string;

    @Column({ type: "timestamptz", nullable: false })
    createdAt: Date;

    @Column({ type: "timestamptz", nullable: false })
    updatedAt: Date;

    @OneToMany(() => Products, (product) => product.category)
    products!: Products[];

}