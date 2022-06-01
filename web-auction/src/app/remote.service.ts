import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs'; // new
import { catchError, retry } from 'rxjs/operators';  //new
import { Product } from './product';


@Injectable({
  providedIn: 'root'
})
export class RemoteService {
 
  private url:string = "http://10.176.132.159:3000/api/products";
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  
  
  // Injection
  constructor(private http: HttpClient) {
    
  }

  // get all products
  getProducts():Observable<Product>{
    return this.http.get<Product>(this.url);
  }

  // add a new product
  createProduct(product: Product): Observable<Product> {
    console.log("posting this product:" +product.no + " " +product.name + " " + product.price);
    return this.http.post<Product>(this.url, JSON.stringify(product),this.httpOptions);
  }

  /*
  updateProduct(product: Product): Observable<Product> {
    console.log("updating this product:" +product.no + " " +product.name + " " + product.price);
    return this.http.put<Product>(this.url, JSON.stringify(product),this.httpOptions);
  }
  */
  deleteProduct(no:number):any {
    console.log("deleting this product: " +no );
    return this.http.delete(this.url+"/"+no);
  }
  
}
