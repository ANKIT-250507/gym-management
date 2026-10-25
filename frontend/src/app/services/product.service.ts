import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = "https://gym-management-3v55.onrender.com/api/products";

  constructor(private http: HttpClient) {}

  private getHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    };
  }

  getProducts(): Observable<any> {
    return this.http.get(
      this.apiUrl,
      this.getHeaders()
    );
  }

  addProduct(data: any): Observable<any> {
    return this.http.post(
      `${this.apiUrl}/create`,
      data,
      this.getHeaders()
    );
  }

  updateProduct(id: string, data: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}/${id}`,
      data,
      this.getHeaders()
    );
  }

  deleteProduct(id: string): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      this.getHeaders()
    );
  }

  searchProduct(keyword: string): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/search?keyword=${keyword}`,
      this.getHeaders()
    );
  }

  getLowStockProducts(): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/low-stock`,
      this.getHeaders()
    );
  }

}