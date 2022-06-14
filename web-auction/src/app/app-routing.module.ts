import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './treeAdmin/admin.component';
import { GameComponent } from './deviceAdmin/game.component';

const routes: Routes = [
  {path: '',redirectTo:'/admin',pathMatch:'full'},
  {path:'game',component:GameComponent},
  {path:'admin',component:AdminComponent},
  {path: '**', redirectTo:'/items'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
