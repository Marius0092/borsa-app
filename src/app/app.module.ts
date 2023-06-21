import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StocklistComponent } from './stocklist/stocklist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StockInputComponent } from './stock-input/stock-input.component';
import { MaterialModule } from './material/material.module';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    StocklistComponent,
    StockInputComponent,
    StockDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
