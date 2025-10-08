import { Products } from "../../../entity/Products";

export interface IProductRepository {
    getAll(): Promise<Products[]>
    getOne(id: number): Promise<Products>
    create(prodDto: Partial<Products>): Promise<Products>;

}