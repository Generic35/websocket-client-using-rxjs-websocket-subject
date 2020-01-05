import { Component } from '@angular/core';
import { WebSocketSubject } from 'rxjs/webSocket';

export class TrainMessage {
  constructor(
    public sender: string,
    public content: string,
    public isBroadcast = false,
  ) { }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  serverMessages: TrainMessage[] = [
    new TrainMessage('me', 'first message', false),
    new TrainMessage('me', 'second message', false)
  ];
  title = 'web-socket-subject';
  socket$: WebSocketSubject<TrainMessage>;

  constructor() {
    this.socket$ = new WebSocketSubject('ws://localhost:8999');

    this.socket$.subscribe(
      (message) => {
        this.serverMessages.push(message);
      },
      (error) => { console.error(error) },
      () => { console.warn('socket completed!') }
    );
  }

  sendMessage() {
    console.log('sending message')
    const message = new TrainMessage('Me', 'Sir... your train is here', false);
    this.socket$.next(message);
  }
}
