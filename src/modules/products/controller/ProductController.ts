import { NextFunction, Response, Request } from "express";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/ProductService";
import { helpers } from "../../../helper/utils";

export class ProductController{
    private productService: ProductService


    constructor(){
        const productRepo = new ProductRepository;
        this.productService = new ProductService(productRepo)
    }

    getProductList= async(request: Request, response: Response, next: NextFunction) => {
        try{    
            const products = await this.productService.getAllProducts();
            return helpers.globalResponse.successResponse(response, 200, 'Fetched all products successfully', products )
        }   
        catch(err){
            next(err)
        }
    }


}