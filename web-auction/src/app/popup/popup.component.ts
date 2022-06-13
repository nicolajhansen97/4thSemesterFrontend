import { Byte } from '@angular/compiler/src/util';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Device } from '../device';
import { Measuerment } from '../measuerment';
import { DialogData } from '../reactive-form/reactive-form.component';
import { RemoteService } from '../remote.service';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.css']
})
export class PopupComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData, private remoteService: RemoteService) { }

  public messes: Measuerment[] = []

  ngOnInit(): void {
    this.messes = this.data.test
  }

  UpdateToDataLogger(): void {
    if (typeof this.messes !== 'undefined' && this.messes.length !== 0) {
      // the array is defined and has elements
      const Mes = this.messes[0]

      let data: Device = {
        BarCode: "",
        RaspberryVer: "",
        Working: true,
        IsPaired: false
      }

      this.remoteService.GetDevice(Mes.Barcode).subscribe((response: Device) => {
        this.SendUpdateToDataLogger(response)
      })
    }else {
      alert("No data, so no warning can be send")
    }
  }

  SendUpdateToDataLogger(data: Device): void {
    //send warning (update device databases boolean in working)
    const UpdatedDevice: Device = {
      BarCode: data.BarCode,
      RaspberryVer: data.RaspberryVer,
      Working: false,
      IsPaired: data.IsPaired
    }

    this.remoteService.updateDevice(UpdatedDevice).subscribe((data) => { data; });
    alert("Warning Send")
  }
}