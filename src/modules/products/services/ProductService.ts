import { Products } from "../../../entity/Products";
import { IProductRepository } from "../repositories/IProductRepository";

export class ProductService {
    private productRepository: IProductRepository;

    /**
     *
     */
    constructor(_productRepo: IProductRepository) {
        this.productRepository = _productRepo;
    }

    async getAllProducts(): Promise<Products[]>{
        return await this.productRepository.getAll();
    }

}