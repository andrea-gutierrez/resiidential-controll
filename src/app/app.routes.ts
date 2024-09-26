import {Routes} from '@angular/router';
import {AdminLayoutComponent} from "./features/admin/layouts/admin-layout/admin-layout.component";

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'admin/residential-owner',
  }
];
