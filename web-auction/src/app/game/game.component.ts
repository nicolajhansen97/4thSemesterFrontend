import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '../product';
import { RemoteService } from '../remote.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit,OnDestroy {

  public picture:string="/assets/images/athens.png";
  public user:string="Bent Hansen";

  public product:Product;

  constructor(private remoteService:RemoteService) { 
    console.log("GameComponent, constructed");
    this.product = new Product(99,"name",100,'0000000000000');
  
  }

  onKey(event:any):void {
     console.log("event:"+event.target.value);
  }
  ngOnInit(): void {
    console.log("GameComponent, initialized"); 
  }

  updateSetting($event:any): void{
    console.log($event.value);
  }

  ngOnDestroy():void{
    console.log("GameComponent, destroyed");
  }

  createProduct(){
     this.remoteService.createProduct(this.product).
     subscribe(data => {
      this.product = data});
  }

}
