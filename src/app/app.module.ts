import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreatetodoComponent } from './createtodo/createtodo.component';
import { TodolistComponent } from './todolist/todolist.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { TodoService } from './todo.service';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { NavbarComponent } from './navbar/navbar.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoViewComponent } from './todo-view/todo-view.component';
import { TodoappComponent } from './todoapp/todoapp.component';

@NgModule({
  declarations: [
    AppComponent,
    CreatetodoComponent,
    TodolistComponent,
    NavbarComponent,
    TodoViewComponent,
    TodoappComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    DragDropModule,
    AppRoutingModule,
  ],
  providers: [TodoService],
  bootstrap: [AppComponent],
})
export class AppModule {}
