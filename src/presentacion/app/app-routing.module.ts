import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    redirectTo:'product-finder',
    pathMatch:'full'
  },
  {
    path:'product-finder',
    title:'Products',
    loadComponent:()=> import('../pages/product/page-product.component')
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
