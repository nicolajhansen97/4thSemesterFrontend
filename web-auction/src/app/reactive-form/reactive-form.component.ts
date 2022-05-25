import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Product } from '../product';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public form: FormGroup;
  public model:Product; 
  submitted = false;

  constructor(private formBuilder: FormBuilder) { 
      this.form = this.formBuilder.group({
      name: [null, [Validators.required,Validators.minLength(3)]],
      price: [null, [Validators.required,this.rangeValidator(10,10000) ]],
    });

    this.model = new Product(1, 'default', 2, '0000000000000');

  }
  
 



  rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
        if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
            return { 'priceRange': true };
        }
        return null;
    };
}

  ngOnInit(): void {
    

  }

}
