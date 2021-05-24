import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewRoutingModule } from './new-routing.module';
import { NewComponent } from './new.component';
import { ClienteFormModule } from 'src/app/shared/components/cliente-form/cliente-form.module';
  
@NgModule({
  declarations: [NewComponent],
  imports: [CommonModule, NewRoutingModule, ClienteFormModule],
})
export class NewModule {}
