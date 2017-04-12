/**
 * Created by hadar.m on 12/04/2017.
 */
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SignalService {
    private url = 'http://localhost:6666';
    private socket;

    sendMessage(message){
        this.socket.emit('add-message', message);
    }

    getMessages() {
        let observable = new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data) => {
                observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        })
        return observable;
    }
}