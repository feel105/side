import { Component, OnInit } from '@angular/core';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-test',
  templateUrl: './test.page.html',
  styleUrls: ['./test.page.scss'],
})
export class TestPage implements OnInit {
  constructor(private socket: Socket) {}
  message = '';
  messages = [];
  ngOnInit() {
    console.log('this', this.socket);
    this.socket.connect();
    this.socket.emit('setUserName', 'room');

    this.socket.emit('sendTheMessage', { text: 'tet' });
    this.message = '';

    this.socket.fromEvent('message').subscribe((message) => {});
  }
}
