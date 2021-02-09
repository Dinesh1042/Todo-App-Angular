import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Todo } from './todo';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  public todoList = new BehaviorSubject([]);
  currVal = this.todoList.asObservable();

  public Delid = new BehaviorSubject(null);
  currId = this.Delid.asObservable();

  public todoEditId = new BehaviorSubject(null);
  currI = this.todoEditId.asObservable();

  public isCompletedTodo = new BehaviorSubject(null);

  currCompletedTodo = this.isCompletedTodo.asObservable();

  constructor() {}

  getTodo(todos: any) {
    this.todoList.next(todos);
  }

  deleteTodo(id: any) {
    this.Delid.next(id);
  }

  editId(id: any) {
    this.todoEditId.next(id);
  }

  isCompleted(id: any) {
    this.isCompletedTodo.next(id);
  }
}
