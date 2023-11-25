import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import HomeComponent from './../pages/home/home.component'; // Import your HomeComponent
import ProductFinderComponent from './../pages/product/page-product.component'; // Import your ProductFinderComponent

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'product-finder', component: ProductFinderComponent },
  // ... other routes ...
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default redirection to 'home'
  { path: '**', redirectTo: '/home' } // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
