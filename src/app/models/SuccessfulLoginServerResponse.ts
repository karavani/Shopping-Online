export class SuccessfulLoginServerResponse{
    public constructor(
        public token?:number,       
        public userType?:string,
        public name?: string,
        public cart?: any
    ){}

}