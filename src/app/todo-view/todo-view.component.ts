import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from '../todo';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { style, transition, trigger, animate } from '@angular/animations';

@Component({
  selector: 'app-todo-view',
  templateUrl: './todo-view.component.html',
  styleUrls: ['./todo-view.component.css'],
  animations: [
    trigger('fade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'scale(0.8)',
        }),
        animate(1000, style({ opacity: 1, transform: 'scale(1)' })),
      ]),
    ]),
  ],
})
export class TodoViewComponent implements OnInit {
  public todoList: Todo[] = [];
  constructor(
    private __todoList: TodoService,
    private ___todoCompleted: TodoService,
    private __todoId: TodoService
  ) {}

  ngOnInit(): void {
    this.__todoList.todoList.subscribe((data) => {
      this.todoList = data;
    });
  }

  drop(event: CdkDragDrop<Todo[]>) {
    moveItemInArray(this.todoList, event.previousIndex, event.currentIndex);
  }
  completedFlag(id: string) {
    this.___todoCompleted.isCompleted(id);
  }
  deleteTodo(id: string) {
    this.__todoId.deleteTodo(id);
  }
}
