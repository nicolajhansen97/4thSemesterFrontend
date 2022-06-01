import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  // Define the Array 
  public products: Array<Product>;
  constructor() {  
        this.products = new Array();
   }

   // Define the methods getAll() etc.
   public getAll():Array<Product> {
     return this.products;
   }

   public update(index:number):void {
      // update
  }
  
}
