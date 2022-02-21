import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharacterListComponent } from './pages/character-list/character-list.component';
import { CharacterDetailsComponent } from './pages/character-details/character-details.component';
import { ErrorComponent } from './pages/error/error.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/character-list',
    pathMatch: 'full'
  },
  {
    path: 'character-list',
    component: CharacterListComponent,
    data: {
      showHeader: true,
    }
  },
  {
    path: 'character-details',
    component: CharacterDetailsComponent,
    data: {
      showHeader: true,
    }
  },
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      showHeader: false,
    }
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
