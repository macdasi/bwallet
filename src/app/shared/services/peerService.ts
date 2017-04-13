/**
 * Created by hadar.m on 03/04/2017.
 */
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger";
import { AppState } from "../../store/app.state";
import { Store } from "@ngrx/store";
import { setPeer, addRemoteConnection } from "../../actions/peer.actions";
import { dataConnection } from "../objects/dataConnection";
/**
 * Created by hadar.m on 06/03/2017.
 */
const peer:any = window['peer'];

@Injectable()
export class peerService {

    constructor(private logger:LoggerService,private store:Store<AppState>){
        peer.on('open',()=>{
            this.store.dispatch(setPeer(peer.id));
        });
    }

    connect(remoteId){
        peer.on('connection', (conn)=> {
        });

        let conn = peer.connect(remoteId);
        conn.on('open', ()=>{
            console.log('open connection');
        });
        conn.on('data', (data) => {
            console.log(data);
        });
        this.store.dispatch(addRemoteConnection(conn));


    }

    send(conn:dataConnection[]){
        conn.forEach((item)=>{
            item.send(`Hi from ${peer.id}!`)
        });
    }
}