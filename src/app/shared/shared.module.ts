import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SwiperModule } from 'swiper/angular';

import { ImgComponent } from './components/img/img.component';
import { ProductsComponent } from './components/products/products.component';
import { ProductComponent } from './components/product/product.component';
import { BannerComponent } from './components/banner/banner.component';
import { LoaderComponent } from './components/loader/loader.component';

@NgModule({
  declarations: [
    ProductComponent,
    ImgComponent,
    ProductsComponent,
    BannerComponent,
    LoaderComponent,
  ],
  imports: [CommonModule, RouterModule, SwiperModule],
  exports: [
    ProductComponent,
    ImgComponent,
    ProductsComponent,
    BannerComponent,
    LoaderComponent,
  ],
})
export class SharedModule {}
