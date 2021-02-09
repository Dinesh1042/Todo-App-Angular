import { AfterContentInit, Component, OnChanges, OnInit } from '@angular/core';
import { tick } from '@angular/core/testing';
import { NgForm } from '@angular/forms';

import { Todo } from '../todo';
import { TodoService } from '../todo.service';
import { style, transition, trigger, animate } from '@angular/animations';
@Component({
  selector: 'app-createtodo',
  templateUrl: './createtodo.component.html',
  styleUrls: ['./createtodo.component.css'],
  animations: [
    trigger('inputFade', [
      transition(':enter', [
        style({
          opacity: 0,
          transform: 'translateX(30px)',
        }),
        animate(1000, style({ opacity: 1, transform: 'translate(0)' })),
      ]),
    ]),
  ],
})
export class CreatetodoComponent implements OnInit, AfterContentInit {
  public currentTodoValue: any;
  public editMode = false;
  public editId: any;
  public currEditValue: any;
  public currEditId: any;

  public todo: Todo[] = [];

  constructor(
    private __todoList: TodoService,
    private __todoId: TodoService,
    private __editTodoId: TodoService,
    private ___Iscompleted: TodoService
  ) {}

  ngOnInit(): void {
    this.__todoList.getTodo(this.todo);

    this.__todoId.Delid.subscribe((item) => {
      if (item) {
        this.todo = this.todo.filter((itemEl: any) => {
          if (itemEl.id !== item) {
            return itemEl;
          }
        });
        this.deleteLocal(item);
        item = null;
        return this.__todoList.getTodo(this.todo);
      }
    });

    this.__editTodoId.todoEditId.subscribe((item) => {
      if (item) {
        this.editMode = true;
        this.currEditId = item;
        this.currEditValue = this.todo.filter((itemEl: any) => {
          if (itemEl.id === item) {
            return (this.currentTodoValue = itemEl.value);
          }
        });
      }
    });

    this.___Iscompleted.currCompletedTodo.subscribe((item) => {
      console.log('jhel');

      console.log(item);

      if (item) {
        console.log('helo');

        this.todo.map((itemEl: any) => {
          if (itemEl.id === item) {
            itemEl.isCompleted = !itemEl.isCompleted;
          }
        });
        this.isCompletedLocal(item);
        item = null;
      }
    });

    let localStr = this.getLocal();

    if (localStr.length > 1) {
      console.log(localStr);

      this.todo.unshift(...localStr);
    }
  }

  addTodo(todo: NgForm) {
    let todoValue = todo.value.TodoText;
    if (!todoValue.match(/^\s*$/g) && !this.editMode) {
      let id = this.getRandomId();
      let isCompleted = false;
      let TodoComp = {
        value: todoValue,
        id: id,
        isCompleted: isCompleted,
      };
      this.todo.unshift(TodoComp);

      let local = this.getLocal();
      local.unshift(TodoComp);
      localStorage.setItem('Todo', JSON.stringify(local));
    }
    this.currentTodoValue = undefined;

    if (!todoValue.match(/^\s*$/g) && this.editMode) {
      this.todo.map((item: any) => {
        if (item.id == this.currEditId) {
          item.value = todo.value.TodoText;
        }
        this.editLocal(this.currEditId, todo.value.TodoText);
      });
      this.editMode = false;
    }
  }
  getRandomId() {
    return new Date().getTime().toString(16).slice(6, 12).toUpperCase();
  }
  ngAfterContentInit() {}

  getLocal() {
    return localStorage.getItem('Todo')
      ? JSON.parse(localStorage.getItem('Todo') || '{}')
      : [];
  }

  deleteLocal(id: any) {
    let local = this.getLocal();
    local = local.filter((item: any) => {
      if (item.id !== id) {
        return item;
      }
    });
    localStorage.setItem('Todo', JSON.stringify(local));
  }

  editLocal(id: any, value: any) {
    let local = this.getLocal();

    local.map((item: any) => {
      if (item.id === id) {
        item.value = value;
      }
      return item;
    });
    localStorage.setItem('Todo', JSON.stringify(local));
  }

  isCompletedLocal(id: any) {
    let local = this.getLocal();
    console.log('hello');

    local.map((item: any) => {
      if (item.id === id) {
        item.isCompleted = !item.isCompleted;
      }
      return item;
    });
    localStorage.setItem('Todo', JSON.stringify(local));
  }
}
