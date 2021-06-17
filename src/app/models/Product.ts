export class Product {
    public constructor(
        public productID?: number,
        public productName?: string,
        public categoryID?: number,
        public price?: number,
        public imageURL?: string,
        public quantity?: number,
        public totalPrice?: number,
        public cartID?: number,
        public itemID?: number
    ) {
        quantity = 1;
    }

}