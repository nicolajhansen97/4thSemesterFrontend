import { Component, OnInit } from '@angular/core';
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
  public defaultTree:Tree;

  constructor(private remoteService:RemoteService) { 
    this.defaultTree = new Tree('No', 'Type',0,0,0,0, 'UserID','Barcode');
    this.loadProducts();
    this.loadDataloggers();
  }


  ngOnInit(): void {

  }

  /**
   * Load the dataloggers through remote service, then make unpaired datalogger list
   */
  loadDataloggers(){
    this.remoteService.getDevices().subscribe((data: {}) => {
      this.dataLoggers = data;
      this.makeUnPairedDLList();
    })
  }
 
  /**
   * This method checks the datalogger list against the tree list to check with bar
   * codes does not belong to a tree, then it makes a list of them
   */
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
  
  /**
   * This method sets the selected trees barcode to the newly selected devices 
   * barcode, then it loads the dataloggers again to update the selectable list
   * @param device The device selected from the dropdown
   * @param i The index of the tree list from html ng loop
   */
  onClick(device: any, i: number){
    this.trees[i].BarCode = device.BarCode;
    this.loadDataloggers(); 
  }

  /**
   * Loads all trees from the tree table in mongodb
   * @returns A list of tree objects
   */
  loadProducts() {
    return this.remoteService.getTrees().subscribe((data: {}) => {
      this.trees = data;
    });
  }

  /**
   * Here we save the update the selected tree through remote service, api
   * to mongoDB
   * @param i The index of the tree list from html ng loop
   */
  save(i:number){
    console.log("Tree number: "+this.trees[i].No + " I number: " + i);
    this.remoteService.updateTree(this.trees[i]).
    subscribe(data => {
    data;
    });   
  }

  /**
   * Deletes are selected tree and then updates the list of dataloggers
   * @param i The index of the tree list from html ng loop
   */
  delete(i:number){
    console.log("Tree to delete: "+this.trees[i].No);
    this.remoteService.deleteTree(this.trees[i].No).subscribe((data: any) => {
      data});
    this.trees.splice(i,1); // removing one element at index i
    this.loadDataloggers(); 
  }

  /**
   * Creates a new tree in the mongoDB, based on the current value of the 
   * tree instance. 
   * Before that the highest tree number is found and the new tree get a number 
   * one higher
   */
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

