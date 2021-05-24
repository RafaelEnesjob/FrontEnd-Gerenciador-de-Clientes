import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ClienteFormComponent } from './cliente-form.component';
import { RouterModule } from '@angular/router';
import { NgxMaskModule } from 'ngx-mask';

@NgModule({
  declarations: [ClienteFormComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule,
    NgxMaskModule.forRoot({
      
    }),
  ],
  exports: [ClienteFormComponent],
  
})
export class ClienteFormModule {}
