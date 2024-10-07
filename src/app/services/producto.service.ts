import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private apiUrl = 'http://localhost:8080/facturacion/producto'; 
  constructor(private http: HttpClient) { }

  getData(id: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/proveedorId/${id}`);
  }

  // Método para enviar datos al endpoint (POST request)
  postData(data: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, data);
  }

  // Método para actualizar datos (PUT request)
  updateData(id: any, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, data);
  }

  // Método para eliminar datos (DELETE request)
  deleteData(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
