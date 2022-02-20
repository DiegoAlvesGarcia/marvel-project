import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/heroes-list',
    pathMatch: 'full'
  },
  {
    path: 'heroes-list',
    component: CharacterListComponent
  },
  {
    path: 'hero-details',
    component: CharacterDetailsComponent
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
