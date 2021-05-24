import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'list',
    pathMatch: 'full',
  },
  {
    path: 'list',
    loadChildren: () =>
      import('./pages/clientes/list/list.module').then((m) => m.ListModule),
  },
  {
    path: 'new',
    loadChildren: () =>
      import('./pages/clientes/new/new.module').then((m) => m.NewModule),
  },
  {
    path: 'details/:id',
    loadChildren: () =>
      import('./pages/clientes/details/details.module').then(
        (m) => m.DetailsModule
      ),
  },
  {
    path: 'edit/:id',
    loadChildren: () =>
      import('./pages/clientes/edit/edit.module').then((m) => m.EditModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
