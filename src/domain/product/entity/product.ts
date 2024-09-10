export type ProductProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export class Product {

    private constructor(private readonly props: ProductProps) {
        // this.validate();
    }

    public static create(name: string, price: number): Product {
        return new Product({
            id: crypto.randomUUID().toString(),
            name,
            price,
            quantity: 0,
        });
    }

    public static with(props: ProductProps): Product {
        return new Product(props);
    }

    public get id(): string {
        return this.props.id;
    }

    public get name(): string {
        return this.props.name;
    }

    public get price(): number {
        return this.props.price;
    }

    public get quantity(): number {
        return this.props.quantity;
    }

    //TODO: Add validation (qtd< 0)
    public increaseQuantity(quantity: number): void {
        this.props.quantity += quantity;
    }
    //TODO: Add validation (qtd< 0, qtd > current qtd)
    public decreaseQuantity(quantity: number): void {
        this.props.quantity -= quantity;
    }

    // private validate(){
    //     if(this.props.quantity < 0){
    //         throw new Error('Product quantity cannot be negative');
    //     }
    // }
}