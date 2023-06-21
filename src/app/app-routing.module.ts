import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocklistComponent } from './stocklist/stocklist.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/stocks',
    pathMatch: 'full',
  },
  {
    path: 'stocks',
    component: StocklistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
