import { TOUCH_BUFFER_MS } from '@angular/cdk/a11y/input-modality/input-modality-detector';
import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Device } from '../device';
import { Measuerment } from '../measuerment';
import { Product } from '../product';
import { RemoteService } from '../remote.service';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { PopupComponent } from '../popup/popup.component';

export interface DialogData {
  test: Measuerment[];
}

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  public form: FormGroup;
  submitted = false;
  public devices: any = [{
    "BarCode": "1001",
    "RaspberryVer": "4.0",
    "Working": true
  }];

  constructor(private formBuilder: FormBuilder, private remoteService: RemoteService, public dialog: MatDialog) {
    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(3)]],
      price: [null, [Validators.required, this.rangeValidator(10, 10000)]],
    });
    this.LoadDevices();
  }

  openDialog() {
     this.dialog.open(PopupComponent, {
      data: {
        test: this.data2
      },
    });
  }
  LoadDevices() {
    this.remoteService.getDevices().subscribe(
      data => { this.devices = JSON.parse(JSON.stringify(data)); }
    )
  }


  async CreateDevice(): Promise<void> {
    let tempDevice: Device = {
      "BarCode": "",
      "RaspberryVer": "",
      "Working": true,
      "IsPaired":false
    };
    const BarCode = document.getElementById('barcode') as HTMLInputElement
    tempDevice.BarCode = BarCode.value

    const raspVer = document.getElementById('raspberry_version') as HTMLInputElement
    tempDevice.RaspberryVer = raspVer.value

    const device = await this.remoteService.getDevices().toPromise()

    var Boolean = false

    device?.forEach(Product => {
      if (Product.BarCode == tempDevice.BarCode) {
        Boolean = true
      }

      console.log(Product.BarCode)
    });
    if (Boolean) {
      alert("already exists")
    }
    else {

      this.remoteService.createDevice(tempDevice).
        subscribe((data: Device) => { tempDevice = data });


      alert("You did it")
    }
    this.LoadDevices();
  }

  rangeValidator(min: number, max: number): ValidatorFn {
    return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
        return { 'priceRange': true };
      }
      return null;
    };
  }

  deleteDataLogger(device: Device, i: number) {
    this.remoteService.DeleteDevice(device.BarCode).subscribe()
    this.devices.splice(i, 1)
  }

  GetData(device: Device, i: number) {
    //alert("DATA: "+device.BarCode+"|"+i)
    // open somekind of page or popup with that dataloggers mesuarments

    this.remoteService.GetMeasuerments().subscribe(
      data => {
        this.mes = JSON.parse(JSON.stringify(data));
        this.ShowData(device)
      }
    )
  }

  public mes: any = [];
  public data2: Measuerment[] = []

  ShowData(device: Device) {
    let gottenData: any = this.mes;
    //alert(JSON.stringify(gottenData))
    gottenData.forEach((element: Measuerment) => {
      if (element.Barcode == device.BarCode) {
        this.data2.push(element) //+= JSON.stringify(element)
      }
    });

    this.openDialog()
    this.data2 = []
  }
  ngOnInit(): void { }
}
