import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProveedorService {


  private apiUrl = 'http://localhost:8080/facturacion/proveedores'; 


  constructor(private http: HttpClient) { }

 

  getData(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

 
  updateData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  
}
