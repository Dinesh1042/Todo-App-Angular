import { style, transition, trigger, animate } from '@angular/animations';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todolist',
  templateUrl: './todolist.component.html',
  styleUrls: ['./todolist.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateY(20px)',
        }),
        animate(1000, style({ opacity: 1, transform: 'translate(0)' })),
      ]),
      transition(':leave', [
        style({
          opacity: 1,
          transform: 'translateY(0px)',
        }),
        animate(400, style({ opacity: 0, transform: 'translateX(60px)' })),
      ]),
    ]),
  ],
})
export class TodolistComponent implements OnInit {
  public todoList: Todo[] = [];

  constructor(
    private __todoList: TodoService,
    private __todoId: TodoService,
    private ___todoEditId: TodoService,
    private ___todoCompleted: TodoService
  ) {}

  ngOnInit(): void {
    this.__todoList.todoList.subscribe((data) => {
      this.todoList = data;
    });
  }
  completedFlag(id: string) {
    this.___todoCompleted.isCompleted(id);
  }
  deleteTodo(id: string) {
    this.__todoId.deleteTodo(id);
  }

  editTodo(id: string) {
    this.___todoEditId.editId(id);
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  }
}
