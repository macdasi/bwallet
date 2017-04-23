/**
 * Created by hadar.m on 03/04/2017.
 */
import { Injectable } from "@angular/core";
import { AppState } from "../../store/app.state";
import { Store } from "@ngrx/store";
import { setPeer, addRemoteConnection } from "../../actions/peer.actions";
import { dataConnection } from "../objects/dataConnection";
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Rx';

/**
 * Created by hadar.m on 06/03/2017.
 */


@Injectable()
export class PeerService {
    peer:any = window['peer'];

    public data$:Observable<any>;
    private dataSource:Subject<any>;

    constructor(private store:Store<AppState>){
        this.dataSource = new Subject<any>();
        this.data$ = this.dataSource.asObservable();

        this.peer.on('open',()=>{
            this.store.dispatch(setPeer(this.peer.id));
        });

        this.peer.on('discovery',(peer)=>{
            if(this.peer.id != peer ){
                this.connect(peer);
            }
            console.log(peer);
        });

        this.peer.on('connection', (conn)=> {
            conn.on('open', ()=>{
                console.log(`Open connection to peer ${conn.peer}`);
            });

            conn.on('error', function (error) {
                console.log('Peer:\t Data channel connection error', error);
            });


            this.store.dispatch(addRemoteConnection(conn));
        });

    }

    connect(remoteId){
        this.peer.on('connection', (conn)=> {
            conn.on('open', ()=>{
                console.log(`Open connection to peer ${conn.peer}`);
            });

            conn.on('error', function (error) {
                console.log('Peer:\t Data channel connection error', error);
            });


            this.store.dispatch(addRemoteConnection(conn));
        });

        let conn = this.peer.connect(remoteId, {reliable: true});
        conn.on('data', (data) => {
            if(this.dataSource && this.dataSource.next){
                this.dataSource.next(data);
           }
        });
    }

    send(conn:dataConnection , data ){
        conn.send(JSON.stringify( data ));
    }
}