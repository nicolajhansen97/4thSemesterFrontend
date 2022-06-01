import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'new-app';

  constructor(){
    console.log("RootComponent, constructed");
  }
  ngOnInit(): void {
    console.log("RootComponent, initialized");
  }

  ngOnDestroy():void{
    console.log("RootComponent, destroyed");
  }

}
