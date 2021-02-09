import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-todoapp',
  template: `<app-createtodo></app-createtodo><app-todolist></app-todolist>`,
  styleUrls: ['./todoapp.component.css'],
})
export class TodoappComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
