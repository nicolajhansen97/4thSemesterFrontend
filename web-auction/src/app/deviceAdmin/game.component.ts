import { Component, OnDestroy, OnInit } from '@angular/core';
import { RemoteService } from '../remote.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit,OnDestroy {

  public picture:string="/assets/images/athens.png";
  public user:string="Bent Hansen";

  constructor(private remoteService:RemoteService) { 
    console.log("GameComponent, constructed");
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
}
