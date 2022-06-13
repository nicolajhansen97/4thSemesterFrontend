export class Tree {

    constructor(
        public No:string,
        public TreeType:string,
        public HumidityMin:number, 
        public HumidityMax:number, 
        public TempMin:number,
        public TempMax:number,
        public UserId:string,
        public BarCode: string,
        public ImageSrc?: Buffer
        ){

    }
}