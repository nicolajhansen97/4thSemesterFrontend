import { Component, OnInit } from '@angular/core';
//import { Product } from '../product';
import { Tree } from '../tree'
import {RemoteService} from '../remote.service';
import { Device } from '../device';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public trees:any = [];
  public dataLoggers: any = [];
  public dLUnpaired: any = [];
  public treeTemp: any;
  public readOnly:Array<Boolean>;
  public defaultTree:Tree;



  constructor(private remoteService:RemoteService) { 
   
    this.readOnly = new Array();
    for (let i:number=0;i < this.trees.length; i++){
      this.readOnly.push(true);      
    }
    this.defaultTree = new Tree('No', 'Type',0,0,0,0, 'UserID','Barcode');
    
    this.loadProducts();
    this.loadDataloggers();
  }


  ngOnInit(): void {

  }

  loadDataloggers(){
    this.remoteService.getDevices().subscribe((data: {}) => {
      this.dataLoggers = data;
      this.makeUnPairedDLList();
    })
  }
 
  makeUnPairedDLList(){
    let isThere: boolean;
    this.dLUnpaired.length = 0;
    this.dataLoggers.forEach((dataLogger: any) => {
      isThere = false;
      this.trees.forEach((aTree: any) => {
        if(aTree.BarCode === dataLogger.BarCode){
          isThere = true;
        }
      }); 
      if(isThere === false){
        this.dLUnpaired.push(dataLogger);
      }
    });
  }
  

  onClick(device: any, i: number){
    this.trees[i].BarCode = device.BarCode;
    this.loadDataloggers(); 
  }

  loadProducts() {
    return this.remoteService.getTrees().subscribe((data: {}) => {
      this.trees = data;
    });
  }

  async loadTree(i:number):Promise<Tree>{
    return await this.remoteService.getTree(this.trees[i].No).toPromise()
    alert(JSON.stringify(this.trees[i]))
  }

  edit(i:number):any{
     this.readOnly[i]=false;
  }

  save(i:number){

    console.log("Tree number: "+this.trees[i].No + " I number: " + i);
    this.remoteService.updateTree(this.trees[i]).
    subscribe(data => {
    data;
    });   
  }

  delete(i:number){
    console.log("Tree to delete: "+this.trees[i].No);
  
    this.remoteService.deleteTree(this.trees[i].No).subscribe((data: any) => {
      data});

    this.trees.splice(i,1); // removing one element at index i
  }

  create(){
    let max = 0;
    for(const o of this.trees){
      if(Number(o.No) > max){
         max = Number(o.No);
      }
    };
    max++;

    this.defaultTree.No = max.toString();
    //console.log("Product to create:"+this.defaultTree.No);
    this.remoteService.createTree(this.defaultTree).
    subscribe(data => {
      this.trees.push(data);
    });
  } 
}

