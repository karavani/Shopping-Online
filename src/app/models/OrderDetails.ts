export class OrderDetails {
    public constructor(
        public cartID?: number,
        public totalPrice?: number,
        public cityToDeliver?: string,
        public addressToDeliver?: string,
        public dateToDeliver?: Date,
        public payment4LastDigits?: number
    ) { }

}