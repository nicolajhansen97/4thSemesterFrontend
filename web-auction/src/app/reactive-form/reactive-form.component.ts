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
  submitted = false;
  public defualtDevice: Device;

  constructor(private formBuilder: FormBuilder, private remoteService: RemoteService) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, this.rangeValidator(10, 10000)]],
    });

    this.defualtDevice = new Device("1001", "1", true, false);

  }

  public dd: any = [];

  async CreateDevice(): Promise<void> {
    const BarCode = document.getElementById('name') as HTMLInputElement
    this.defualtDevice.BarCode = BarCode.value

    const raspVer = document.getElementById('price') as HTMLInputElement
    this.defualtDevice.RaspberryVer = raspVer.value

    const device = await this.remoteService.getDevices().toPromise()

    var Boolean = false

    device?.forEach(Product => {
      if (Product.BarCode == this.defualtDevice.BarCode) {
        Boolean = true
      }

      console.log(Product.BarCode)
    });
    if (Boolean) {
      alert("already exists")
    }
    else {

      this.remoteService.createDevice(this.defualtDevice).
        subscribe((data: Device) => { this.defualtDevice = data });


      alert("You did it")
    }

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