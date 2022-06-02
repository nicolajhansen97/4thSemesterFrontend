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

  private url: string = "http://localhost:3000/api/trees";
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
    return this.http.get<Tree>(this.url);
  }

  // add a new product
  createTree(tree: Tree): Observable<Tree> {
    console.log("posting this Tree:" + tree.TreeType + " " + tree.HumidityMin +
      " " + tree.HumidityMax + " " + tree.TempMin + " " + tree.TempMax +
      " " + tree.UserId + " " + tree.BarCode);
    return this.http.post<Tree>(this.url, JSON.stringify(tree), this.httpOptions);
  }


  updateTree(tree: Tree): Observable<Tree> {

    console.log("updating this product:" + tree.TreeType + " " + tree.HumidityMin +
      " " + tree.HumidityMax + " " + tree.TempMin + " " + tree.TempMax +
      " " + tree.UserId + " " + tree.BarCode);

    return this.http.put<Tree>(this.url + "/" + tree.No, JSON.stringify(tree), this.httpOptions);
  }


  deleteTree(No: number): any {
    console.log("deleting this product: " + No);
    return this.http.delete(this.url + "/" + No);
  }

  getDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this.url + "Device")
  }

  createDevice(device: Device): any {
    return this.http.post<Device>(this.url + "Device", JSON.stringify(device), this.httpOptions)
  }
}


