import { Repository } from "typeorm";
import { Products } from "../../../entity/Products";
import { IProductRepository } from "./IProductRepository";
import AppDataSource from "../../../data-source";

export class ProductRepository implements IProductRepository {

    private repo: Repository<Products>

    constructor() {
        this.repo = AppDataSource.getRepository(Products);;
    }


    /**
     * Retrives the list of products.
     * 
     * @returns {Product[]} JSON object containing all the products
     */

    async getAll(): Promise<Products[] | null> {

        return await this.repo.find({
            relations: ["category", "productImages", "inventory", "productVariants"]
        });

    }
    async getOne(): Promise<Products> {
        throw new Error("Method not implemented.");
    }
    async create(prodDto: Partial<Products>): Promise<Products> {
        throw new Error("Method not implemented.");
    }

}