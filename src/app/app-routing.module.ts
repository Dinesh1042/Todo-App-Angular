import { Route } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TodoViewComponent } from './todo-view/todo-view.component';
import { TodoappComponent } from './todoapp/todoapp.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/todoapp',
    pathMatch: 'full',
  },
  {
    path: 'todolist',
    component: TodoViewComponent,
  },
  {
    path: 'todoapp',
    component: TodoappComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
