import { Component, OnInit } from '@angular/core';
//import { Product } from '../product';
import { Tree } from '../tree'
import {RemoteService} from '../remote.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public trees:any = [];
  public readOnly:Array<Boolean>;
  public defaultTree:Tree;

  constructor(private remoteService:RemoteService) { 
   
    this.readOnly = new Array();
    for (let i:number=0;i < this.trees.length; i++){
      this.readOnly.push(true);      
    }
    this.defaultTree = new Tree('No', 'Type',0,0,0,0, 'UserID','Barcode');
    this.loadProducts();
  }


  ngOnInit(): void {

  }

  loadProducts() {
    return this.remoteService.getTrees().subscribe((data: {}) => {
      this.trees = data;
    });
  }

  edit(i:number):any{
     this.readOnly[i]=false;
     // NOW THIS PRODUCT IS EDITABLE
  }

  save(i:number){
    console.log("Tree to update:"+this.trees[i].No);
    this.remoteService.updateTree(this.trees[i].No).subscribe((data: any) =>{
      this.defaultTree = data.No;
    });
  }

  delete(i:number){
    console.log("Tree to delete: "+this.trees[i].No);
  
    this.remoteService.deleteTree(this.trees[i].No).subscribe((data: any) => {
      data});

    this.trees.splice(i,1); // removing one element at index i
  }
  create(){
    console.log("Product to create:"+this.defaultTree.No);
    this.createProduct();
    
    //updating the list
    this.trees.push(this.defaultTree);
    //this.trees = this.loadProducts();

  }

  createProduct(){
    this.remoteService.createTree(this.defaultTree).
    subscribe(data => {
    this.defaultTree = data});
 }
}

