import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from '../reactive-form/reactive-form.component';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  public messes: any = [
    {}, 
    {}
  ];


  ngOnInit(): void {

    alert(this.data.test)
    
    
    
    //this.messes = 
  }

}
