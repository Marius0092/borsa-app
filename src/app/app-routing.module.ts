import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StocklistComponent } from './stocklist/stocklist.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';

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

{
  path: 'stocks/:displaySymbol',
  component: StockDetailsComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
