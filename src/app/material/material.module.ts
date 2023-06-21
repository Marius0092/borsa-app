import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class MaterialModule {}
