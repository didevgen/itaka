import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatIconModule, MatInputModule } from '@angular/material';

@NgModule({
  imports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  exports: [
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class MaterialModule {}
