import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CategoryComponent } from './category.component';

const routes: Routes = [
  {
    path: ':id',
    component: CategoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}

/*
Le indico al routing que muestre una catagoria y que me especifique cual es el id de esa categoria
  -->ruta de categorias: category/:id
 */
