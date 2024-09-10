import { Product } from "../../../domain/product/entity/product";
import { ProductGateway } from "../../../domain/product/gateway/product.gateway";
import { UseCase } from "../../usecase"

export type CreateProductInputDto = {
    name: string;
    price: number;
}

export type CreateProductOutputDto = {
    id: string;
}

export class CreateProductUseCase implements UseCase<CreateProductInputDto, CreateProductOutputDto> {
    private constructor(private readonly productGateway: ProductGateway){}

    public static create(productGateway: ProductGateway) {
        return new CreateProductUseCase(productGateway);
    }

    public async execute({ name, price }: CreateProductInputDto): Promise<CreateProductOutputDto> {
        const product = Product.create(name, price);

        await this.productGateway.save(product);

        const output = this.presentOutput(product);

        return output;
    }

    // Isso estaria na camada de presenter
    private presentOutput(product: Product): CreateProductOutputDto {
        return {
            id: product.id,
        }
    }
}