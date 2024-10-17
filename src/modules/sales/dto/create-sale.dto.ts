export class CreateSaleDto {
    saleDate: string;
    total: number;
    saleDetail: [{ 
        quantity: number,
        productId: number,
        unitaryPrice: number,
        totalPrice: number
    }]
}
