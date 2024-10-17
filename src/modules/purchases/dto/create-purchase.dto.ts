export class CreatePurchaseDto {
    purchaseDate: Date;
    totalAmount: number;
    purchaseDetail: [
        {
            purchaseId: number,
            productId: number;
            quantity: number;
            unitaryPrice: number;
            totalPrice: number
        }
    ]
}
