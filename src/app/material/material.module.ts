import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import {NgIf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    NgIf,

  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    NgIf,
    MatFormFieldModule
  ],
})
export class MaterialModule {}
