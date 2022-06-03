export class Measuerment {
    constructor(
        public Treeno:string,
        public Barcode:string,
        public MeasuermentID:string,
        public Humidity:number,
        public Temperature:number,
        public IsSoilWet:boolean,
        public DateOfMes:Date, 
        ){}
}