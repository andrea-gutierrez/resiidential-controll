import {Routes} from '@angular/router';

import {AdminLayoutComponent} from "@features/admin/layouts/admin-layout/admin-layout.component";
import {
  ResidentialOwnerLayoutComponent
} from "@features/residential-owner/layouts/residential-owner-layout/residential-owner-layout.component";

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayoutComponent,
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  },
  {
    path: 'residential-owner',
    component: ResidentialOwnerLayoutComponent,
    loadChildren: () => import('./features/residential-owner/residentialOwner.routes').then(m => m.RESIDENTIAL_OWNER_ROUTES)
  },
  {
    path: '**',
    redirectTo: 'admin/residential-owner',
  }
];
