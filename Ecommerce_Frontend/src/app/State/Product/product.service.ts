import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { isPlatformBrowser } from "@angular/common";
import { Store } from "@ngrx/store";
import { BASE_API_URL } from "../../config/api";
import { 
  findProductByCategoryFailure, 
  findProductByCategorySuccess, 
  findProductByIdFailure, 
  findProductByIdSuccess 
} from "./product.action";
import { catchError, map, of } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  API_BASE_URL = BASE_API_URL;

  constructor(
    private store: Store,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object // Inject Platform ID to fix SSR crash
  ) { }

  private getHeader(): HttpHeaders {
    let token: string | null = null;

    if (isPlatformBrowser(this.platformId)) {
      token = localStorage.getItem("jwt");
    }

    return new HttpHeaders().set("Authorization", `Bearer ${token || ''}`);
  }

  findProductByCategory(reqData: any) {
    const {  colors, sizes, minPrice, maxPrice, minDiscount,  category,  stock, sort, pageNumber, pageSize
    } = reqData;

    const formatValue = (val: any) => Array.isArray(val) ? val.join(",") : (val || "");
    
    let params = new HttpParams()
      .set("color", formatValue(colors)) 
      .set("size", sizes ? sizes.join(",") : "")
      .set("minPrice", minPrice || 0)
      .set("maxPrice", maxPrice || 100000)
      .set("minDiscount", minDiscount || 0)
      .set("category", category || "")
      .set("stock", stock || "")
      .set("sort", sort || "")
      .set("pageNumber", pageNumber || 0)
      .set("pageSize", pageSize || 10);

    const headers = this.getHeader();

    return this.http.get(`${this.API_BASE_URL}/api/products`, { headers, params }).pipe(
      map((data: any) => findProductByCategorySuccess({ payload: data })),
      catchError((error: any) => {
        const errorMessage = error.error?.message || error.message;
        return of(findProductByCategoryFailure(errorMessage));
      })
    ).subscribe((action) => this.store.dispatch(action));
  }

  findProductById(productId: any) {
    const headers = this.getHeader();

    return this.http.get(`${this.API_BASE_URL}/api/products/id/${productId}`, { headers }).pipe(
      map((data: any) => findProductByIdSuccess({ payload: data })),
      catchError((error: any) => {
        const errorMessage = error.error?.message || error.message;
        return of(findProductByIdFailure(errorMessage));
      })
    ).subscribe((action) => this.store.dispatch(action));
  }
}