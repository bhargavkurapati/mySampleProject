import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import{ BhargavPaginationComponent} from '../app/bhargav-pagination/bhargav-pagination.component'

const routes: Routes = [
  { path: 'bhargavPagination', component: BhargavPaginationComponent }
  
  // { path: '',   redirectTo: '/bhargavPagination', pathMatch: 'full' }, // redirect to `first-component`
  // { path: '**', component:BhargavPaginationComponent  },  // Wildcard route for a 404 page
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
