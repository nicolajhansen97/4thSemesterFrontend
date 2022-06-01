import { Component, OnInit } from '@angular/core';
import { Product } from '../product';
import {RemoteService} from '../remote.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public products:any = [];
  public readOnly:Array<Boolean>;
  public defaultProduct:Product;

  constructor(private remoteService:RemoteService) { 
   
    this.readOnly = new Array();
    for (let i:number=0;i < this.products.length; i++){
      this.readOnly.push(true);      
    }
    this.defaultProduct = new Product(1,'product',100, '0000000000000');
    this.loadProducts();
  }


  ngOnInit(): void {

  }

  loadProducts() {
    return this.remoteService.getProducts().subscribe((data: {}) => {
      this.products = data;
    });
  }

  edit(i:number):any{
     this.readOnly[i]=false;
     // NOW THIS PRODUCT IS EDITABLE
  }

  save(i:number):any{
    console.log("Product to update:"+this.products[i].name);
    // DO STUFF VIA THE REMOTE SERVICE -> UPDATE PRODUCT
  }

  delete(i:number){
    console.log("Product to delete: "+this.products[i].name);
  
    this.remoteService.deleteProduct(this.products[i].no).subscribe((data: any) => {
      data});

    this.products.splice(i,1); // removing one element at index i
  }
  create(){
    console.log("Product to create:"+this.defaultProduct.name);
    this.createProduct();
    
    // updating the list
    this.products.push(this.defaultProduct);
  
  }

  createProduct(){
    this.remoteService.createProduct(this.defaultProduct).
    subscribe(data => {
     this.defaultProduct = data});
 }
}

