import { Request, Response } from "express";
import { CreateProductInputDto, CreateProductUseCase } from "../../../../../usecases/product/create-product/create-product.usecase";
import { HttpMethod, Route } from "../routes";

export type CreateProductResponseDto = {
    id: string;
}

export class CreateProductRoute implements Route{
    private constructor(
        private readonly path: string,
        private readonly method: HttpMethod,
        private readonly createProductService: CreateProductUseCase,
    ) {}

    public static create(createProductService: CreateProductUseCase): CreateProductRoute {
        return new CreateProductRoute("/products", HttpMethod.POST,createProductService);
    }

    public getHandler() {
        return async (request: Request, response: Response) => {
            const { name, price } = request.body;

           const input : CreateProductInputDto = {
            name, 
            price
           }

            const output : CreateProductResponseDto = await this.createProductService.execute(input);

            const responseBody = this.present(output);

            response.status(201).json(responseBody).send();
        }
    }

    public getPath(): string {
        return this.path;
    }

    public getMethod(): HttpMethod {
        return this.method;
    }

    private present(input: CreateProductResponseDto): CreateProductResponseDto {
        return {
            id: input.id
        }
    }
}