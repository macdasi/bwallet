/**
 * Created by hadar.m on 12/04/2017.
 */
import { Observable } from 'rxjs/Observable';
import * as io from 'socket.io-client';

export class SignalService {
    private url = 'http://localhost:5000';
    private socket;

    sendMessage(message){
        //this.socket.emit('message', message);
    }


    getMessages() {
        return new Observable(observer => {
            this.socket = io(this.url);
            this.socket.on('message', (data) => {
                //observer.next(data);
            });
            return () => {
                this.socket.disconnect();
            };
        });
    }
}