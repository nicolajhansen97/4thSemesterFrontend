import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs'; // new
import { catchError, retry } from 'rxjs/operators';  //new
import { Device } from './device';
import { Tree } from './tree';


@Injectable({
  providedIn: 'root'
})
export class RemoteService {

  private urlTree: string = "http://localhost:3000/api/trees";
  private urlDevice: string = "http://localhost:3000/api/Device";
  private urlUnusedDevice: string = "http://localhost:3000/api/UnusedDevice";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };


  // Injection
  constructor(private http: HttpClient) {

  }

  // get all products
  getTrees(): Observable<Tree> {
    return this.http.get<Tree>(this.urlTree);
  }

  // add a new product
  createTree(tree: Tree): Observable<Tree> {
    console.log("posting this Tree:" + tree.TreeType + " " + tree.HumidityMin +
      " " + tree.HumidityMax + " " + tree.TempMin + " " + tree.TempMax +
      " " + tree.UserId + " " + tree.BarCode);
    return this.http.post<Tree>(this.urlTree, JSON.stringify(tree), this.httpOptions);
  }


  updateTree(tree: Tree): Observable<Tree> {

    console.log("updating this product:" + tree.TreeType + " " + tree.HumidityMin +
      " " + tree.HumidityMax + " " + tree.TempMin + " " + tree.TempMax +
      " " + tree.UserId + " " + tree.BarCode);

    return this.http.put<Tree>(this.urlTree + "/" + tree.No, JSON.stringify(tree), this.httpOptions);
  }


  deleteTree(No: number): any {
    console.log("deleting this product: " + No);
    return this.http.delete(this.urlTree + "/" + No);
  }

  getTree(No: number): any {
    return this.http.get(this.urlTree+"/"+ No)
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.urlDevice)
  }

  updateDevice(device: Device): Observable<Device> {

    console.log("updating this product:" + device.BarCode + " " + device.RaspberryVer +
      " " + device.Working + " " + device.IsPaired);

    return this.http.put<Device>(this.urlDevice + "/" + device.BarCode, JSON.stringify(device), this.httpOptions);
  }

  getUnusedDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.urlUnusedDevice)
  }

  createDevice(device: Device): any {
    return this.http.post<Device>(this.urlDevice, JSON.stringify(device), this.httpOptions)
  }
}


