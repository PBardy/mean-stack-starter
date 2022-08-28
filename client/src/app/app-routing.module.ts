import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/unauthenticated/unauthenticated.module').then(
        (m) => m.UnauthenticatedModule
      ),
  },
  {
    path: 'app',
    loadChildren: () =>
      import('./modules/authenticated/authenticated.module').then(
        (m) => m.AuthenticatedModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
