import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity('addresses')
export class Addresses {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 150, nullable: false })
    line1: string;

    @Column({ type: 'varchar', length: 150 })
    line2!: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    city: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    state: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    country: string;

    @Column({ type: 'varchar', length: 6, nullable: false })
    postal_code: string;

    @Column({ type: 'boolean', default: false, name: "is_default_address" })
    isDefaultAddress: boolean;

    @OneToOne(() => User)
    @JoinColumn()
    user: User;

}