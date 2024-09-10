import { ApiExpress } from "./infra/api/express/routes/api.express";
import { CreateProductRoute } from "./infra/api/express/routes/product/create-product.express.router";
import { ListProductRoute } from "./infra/api/express/routes/product/list-product.express.router";
import { ProductRepositoryPrisma } from "./infra/repositories/products/product.repository.prisma";
import { prisma } from "./package/prisma/prisma";
import { CreateProductUseCase } from "./usecases/product/create-product/create-product.usecase";
import { ListProductUseCase } from "./usecases/product/list-product/list-product.usecase";

function main() {
    const repository = ProductRepositoryPrisma.create(prisma);

    const createProductUseCase = CreateProductUseCase.create(repository);
    const listProductUseCase = ListProductUseCase.create(repository);

    const createRoute = CreateProductRoute.create(createProductUseCase);
    const listRoute = ListProductRoute.create(listProductUseCase);

    const api = ApiExpress.create([createRoute, listRoute]);
    const port = 8000;
    api.start(port);
}

main();