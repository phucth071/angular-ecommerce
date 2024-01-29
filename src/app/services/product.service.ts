import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Product } from '../common/product';
import { Observable } from 'rxjs';
import { map } from 'rxjs';
import { Category } from '../common/category';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api/products';

  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient: HttpClient) { }

  private getProducts(url: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(url).pipe(
      map(response => response._embedded.products)
    );
  }
  
  getProductList(categoryId: number): Observable<Product[]> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}`;
    return this.getProducts(url);
  }

  getProductListPaginate(thePage: number, thePageSize: number, categoryId: number): Observable<GetResponseProducts> {
    const url = `${this.baseUrl}/search/findByCategoryId?id=${categoryId}&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(url);
  }

  searchProducts(keyword: string): Observable<Product[]> {
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${keyword}`;
    return this.getProducts(searchUrl);
  }

  getProductCategories(): Observable<Category[]> {
    return this.httpClient.get<GetResponseCategory>(this.categoryUrl).pipe(
      map(response => response._embedded.productCategory)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const url = `${this.baseUrl}/${productId}`;
    return this.httpClient.get<Product>(url);
  }

}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  },
  page: {
    size: number,
    totalElements: number,
    totalPages: number,
    number: number
  }
}

interface GetResponseCategory {
  _embedded: {
    productCategory: Category[];
  }
}
