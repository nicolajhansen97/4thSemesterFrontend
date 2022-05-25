import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { GameComponent } from './game/game.component';

import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {path: '',redirectTo:'/items',pathMatch:'full'},
  {path:'items',component:ProductListComponent},
  {path:'game',component:GameComponent},
  {path:'admin',component:AdminComponent},
  {path: '**', redirectTo:'/items'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
