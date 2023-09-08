import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', component: HomeComponent},
  {
    path: 'dashboard',
    loadChildren: () => import('./components/components.module').then(m => m.ComponentsModule),
  },
  {
    path: 'blog',
    loadChildren: () => import('./features/blog/blog.module').then(m => m.BlogModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
