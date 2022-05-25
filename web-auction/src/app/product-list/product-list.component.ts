import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { RemoteService } from '../remote.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit,OnDestroy {

  public products:any = [];
 

  constructor(private remoteService:RemoteService) { 
      
  }

  placeBid(i:number): void {
    console.log("bid on item " +  this.products[i].name);
    this.products[i].price = this.products[i].price + 1;

  }
  ngOnInit(): void {
    
    this.loadProducts();
  }

  ngOnDestroy():void{
    
  }

  loadProducts() {
    return this.remoteService.getProducts().subscribe((data: {}) => {
      this.products = data;
    });
  }

}
