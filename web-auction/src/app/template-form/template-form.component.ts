import { Component, OnInit } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.css']
})
export class TemplateFormComponent implements OnInit {

  public model:Product; 
  submitted = false;

  constructor() { 
    this.model = new Product(1, 'default', 2, '0000000000000');
  }


  onSubmit() { 
    this.submitted = true; 

    // use the post service!!!
  }
  
  ngOnInit(): void {
  }

}
