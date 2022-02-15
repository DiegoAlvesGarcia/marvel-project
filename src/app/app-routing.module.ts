import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeroesListComponent } from './pages/heroes-list/heroes-list.component';
import { HeroDetailsComponent } from './pages/hero-details/hero-details.component';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/heroes-list',
    pathMatch: 'full'
  },
  {
    path: 'heroes-list',
    component: HeroesListComponent
  },
  {
    path: 'hero-details',
    component: HeroDetailsComponent
  },
  {
    path: 'error',
    component: ErrorComponent
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
