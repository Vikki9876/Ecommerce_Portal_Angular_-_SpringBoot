import { Component } from '@angular/core';
import { MainCarousel } from './main-carousel/main-carousel'; 
import { ProductSlider } from './product-slider/product-slider'; 
import { menJeans } from '../../../../../Data/Men/men_jeans';
import { gounsPage1 } from '../../../../../Data/Gouns/gouns_page1';
import { lehngacholiPage2 } from '../../../../../Data/Saree/lehngacholi_Page2';
import { mensShoesPage1 } from '../../../../../Data/mensShoes_Page1';
import { mens_kurta } from '../../../../../Data/Men/mens_Kurta';
@Component({
  selector: 'app-home', 
  standalone: true,
  imports: [MainCarousel, ProductSlider], 
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

   menJeans:any
   womenGouns:any
   lenghaCholi:any
   mensKurta:any
   mensShoes:any

   ngOnInit(){
    this.menJeans=menJeans.slice(0,5)
    this.womenGouns=gounsPage1.slice(0,5)
    this.lenghaCholi=lehngacholiPage2.slice(0,5)
    this.mensShoes=mensShoesPage1.slice(0,5)
    this.mensKurta=mens_kurta.slice(0,5)
     }
}