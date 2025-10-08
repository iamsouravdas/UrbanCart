import { NextFunction, Request, Response } from "express";
import { helpers } from "../../../helper/utils";
import { ProductRepository } from "../repositories/ProductRepository";
import { ProductService } from "../services/ProductService";

export class ProductController {
    private productService: ProductService


    constructor() {
        const productRepo = new ProductRepository;
        this.productService = new ProductService(productRepo)
    }

    getProductList = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const products = await this.productService.getAllProducts();
            return helpers.globalResponse.successResponse(response, 200, 'Fetched all products successfully', products)
        }
        catch (err) {
            next(err)
        }
    }

    getProductById = async (request: Request, response: Response, next: NextFunction) => {
        try {
            const id = parseInt(request.params.id)
            if (!id) {
                throw Error("Id not present")
            }
            const product = await this.productService.getProductById(id)
            return helpers.globalResponse.successResponse(response, 201, `Fetched products with the id: ${id} successfully.`, product)
        }
        catch (err) {
            next(err);
        }
    }

    createProduct = async (request: Request, response: Response, next: NextFunction) => {
        try {
            if (!request.body) {
                return helpers.globalResponse.errorResponse(request.body, 500, 'Request body is needed');
            }
            await this.productService.createProduct(request.body);
        }
        catch (err) {

        }
    }


}