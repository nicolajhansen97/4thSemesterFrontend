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
  public dLpaired: any = [];
  public treeTemp: any;
  public readOnly:Array<Boolean>;
  public defaultTree:Tree;
  public unpairedTreeDevice = new Map<Tree, Device>();


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
      this.makePairedDLList()
    })
  }
 
  makeUnPairedDLList(){
    this.dataLoggers.forEach((element: any) => {
      if(element.IsPaired == false)
        this.dLUnpaired.push(element);
    });
    //alert(JSON.stringify(this.dLUnpaired[0]));
  }
  

  makePairedDLList(){
    this.dataLoggers.forEach((element: any) => {
      if(element.IsPaired == true)
        this.dLpaired.push(element);
    });
    //alert(JSON.stringify(this.dLUnpaired[0]));
  }

  onClick(device: any, i: number){
    
   
    for(const o of this.dLpaired){
      if(o.BarCode == this.trees[i].BarCodey){
        o.IsPaired = false;  
        this.unpairedTreeDevice.set(this.trees[i], o);
        //alert(o.IsPaired.toString() + " | " + o.BarCode)
      }
    };

    device.IsPaired = true;
    this.dLpaired.push(device)
    this.trees[i].BarCode = device.BarCode;
    //alert(device.IsPaired.toString() + " | " + device.BarCode)  
    //this.loadDataloggers(); 
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
    const item = this.unpairedTreeDevice.get(this.trees[i]);
      if (item !== undefined) {
        this.updateDatalogger(item);;
      } else {
        throw new Error('Item is undefined');
      }

    console.log("Tree number: "+this.trees[i].No + " I number: " + i);
    this.remoteService.updateTree(this.trees[i]).
    subscribe(data => {
    data;
    this.updateDLTreePair(this.trees[i]);
    });   
  }

  updateDLTreePair(tree: Tree){
    for(const o of this.dLpaired){
      if(o.BarCode == tree.BarCode){
       this.updateDatalogger(o);
      }
    };
  }

  updateDatalogger(device: Device){
    this.remoteService.updateDevice(device).subscribe(data => {data; });
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

