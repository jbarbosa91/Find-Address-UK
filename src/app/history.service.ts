import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HistoryService {
  messages: string[] = [];

  add(message: string) {
    if (this.messages.length > 2) {
      this.messages.shift();
    }
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }

  constructor() { }
}
