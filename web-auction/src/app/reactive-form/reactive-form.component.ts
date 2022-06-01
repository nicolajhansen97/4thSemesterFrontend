import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Device } from '../device';
import { Product } from '../product';
import { RemoteService } from '../remote.service';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {

  public form: FormGroup;
  public model:Product; 
  submitted = false;
  public defualtDevice:Device;

  constructor(private formBuilder: FormBuilder,private remoteService:RemoteService) { 
      this.form = this.formBuilder.group({
      name: [null, [Validators.required,Validators.minLength(3)]],
      price: [null, [Validators.required,this.rangeValidator(10,10000) ]],
    });

    this.model = new Product(1, 'default', 2, '0000000000000');
    this.defualtDevice = new Device("1001");

  }
  

 test():void{
   const tt = document.getElementById('name') as HTMLInputElement
   this.defualtDevice.BarCode = tt.value
   this.remoteService.createDevice(this.defualtDevice).
   subscribe((data: Device) => {this.defualtDevice = data});
   
   //alert(tt?.value) 
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
