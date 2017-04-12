/**
 * Created by hadar.m on 03/04/2017.
 */
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger";
import { AppState } from "../../store/app.state";
import { Store } from "@ngrx/store";
import { setPeer } from "../../actions/peer.actions";
/**
 * Created by hadar.m on 06/03/2017.
 */
const peer:any = window['peer'];

@Injectable()
export class peerService {
    conn:any;

    constructor(private logger:LoggerService,private store:Store<AppState>){
        peer.on('open',()=>{
            this.store.dispatch(setPeer(peer.id));
        })
    }

    connect(remoteId){
        peer.on('connection', (conn)=> {
            this.conn.on('data', (data) => {
                console.log(data);
            });
        });

        this.conn = peer.connect(remoteId);
        this.conn.on('open', ()=>{
            console.log('open connection');
        });
    }

    send(){
        this.conn.send(`Hi from ${peer.id}!`);
    }
}