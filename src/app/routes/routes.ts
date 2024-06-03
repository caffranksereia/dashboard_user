import { Routes } from '@angular/router';

const routes: Routes = [
  {path: '', pathMatch:'full', redirectTo: 'main/dashboard'},
  {path:'main', loadChildren: () => import('../main/main.module').then(x => x.MainModule)}
];
