import { ChangeDetectorRef, Component } from '@angular/core'; 
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox'; 
import { FormsModule } from '@angular/forms'; 
import { filters ,singleFilter } from './FilterData';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { mensPantsPage1 } from '../../../../../Data/pants/men_pants';
import { ProductCard } from '../../../shared/components/product-card/product-card';
import { ActivatedRoute ,Router } from '@angular/router';
import { ProductService } from '../../../../State/Product/product.service';
import { AppState } from '../../../AppState';
import { select, Store } from '@ngrx/store';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [ CommonModule ,FormsModule, MatButtonModule, MatMenuModule,  MatDividerModule, MatIconModule ,MatCheckboxModule,  FormsModule , MatRadioModule ,ProductCard ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products {
  filterData:any
  singleFilterData:any
  products:any;
  menPants:any;
  lavelThree:any;

constructor(
  private router:Router, 
  private  activatedRoute:ActivatedRoute ,
  private productService:ProductService,
  private store:Store<AppState>,
  private cd: ChangeDetectorRef ,
){}

ngOnInit() {
  this.filterData = filters;
  this.singleFilterData = singleFilter;
  this.menPants = mensPantsPage1;

  combineLatest([
    this.activatedRoute.paramMap,
    this.activatedRoute.queryParams
  ]).subscribe(([params, queryParams]) => {
    
    this.lavelThree = params.get('lavelThree');
    
    const price = queryParams['price'];
    const minPrice = price?.split("-")[0];
    const maxPrice = price?.split("-")[1];

    const reqData = {
      category: this.lavelThree,
      colors: queryParams['color'] || "",
      sizes: queryParams['size'] || "",
      minPrice: minPrice ? minPrice : 0,
      maxPrice: maxPrice ? maxPrice : 1000000,
      minDiscount: queryParams['discount'] || 0,
      pageNumber: queryParams['pageNumber'] || 0,
      pageSize: 10,
      stock: queryParams['stock'] || null,
      sort: queryParams['sort'] || "price_low"
    };
    this.productService.findProductByCategory(reqData);
  });

  this.store.pipe(select((store) => store.product)).subscribe((product) => {
    if (product?.products?.content) {
      this.products = product.products.content;
      this.cd.detectChanges();
      console.log("Store Data Loaded:", this.products);
    }
  });
}




 handleMultipleSelectFilter( value:string , sectionId:string){
  const queryParams={...this.activatedRoute.snapshot.queryParams};

  const filterValues=queryParams[sectionId]? queryParams[sectionId].split(','): [];

  const valueIndex = filterValues.indexOf(value);

  if(valueIndex!=-1){
    filterValues.splice(valueIndex , 1)
  }
  else
  {
    filterValues.push(value);
  }
  if(filterValues.length>0)
  {
    queryParams[sectionId]=filterValues.join(",")
  }
  else
  {
    delete queryParams[sectionId]
  }
  this.router.navigate([] ,{queryParams})
 }

 handleSingleSelectFilter(value:string , sectionId:string){

  const queryParams={...this.activatedRoute.snapshot.queryParams};
  queryParams[sectionId]=value;

  this.router.navigate([] , {queryParams})
  console.log(queryParams)
 }


}
