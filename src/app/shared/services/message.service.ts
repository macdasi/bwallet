/**
 * Created by hadar.m on 19/04/2017.
 */
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { AppState } from "../../store/app.state";
import { dataConnection } from "../objects/dataConnection";
import { PeerService } from "./peer.service";
import { Message } from "../objects/message";
import { MessageType } from "../objects/message.type";
import { Injectable } from "@angular/core";
import { addBlock } from "../../actions/blockchain.actions";
import { Block } from "../objects/block";
import {  NgZone } from '@angular/core';

@Injectable()
export class MessageService {
    peerId$  : Observable<string>;
    remoteConnections$  : Observable<dataConnection[]>;
    myPeerId:string;
    remoteConnections : dataConnection[];

    constructor(private store:Store<AppState>,
                private webrtc: PeerService
    ){
        this.init();
    }

    send(message:Message){
        this.remoteConnections.filter( conn => conn.open ).forEach((conn:dataConnection) => {
            this.webrtc.send(conn ,{ peer: this.myPeerId , type : message.type , data :  message.data});
        });
    }

    init(){
        this.peerId$ = this.store.select( s => s.peerData.peerId ) as Observable<string> ;

        this.peerId$.subscribe((data:string)=>{
            if(data != '' && data != this.myPeerId){
                this.myPeerId = data;
            }
        });

        this.remoteConnections$ = this.store.select( s =>  s.peerData.remoteConnections ) as Observable<dataConnection[]> ;

        this.remoteConnections$.subscribe((data:dataConnection[])=>{
            this.remoteConnections = data;
        });


        this.webrtc.data$.subscribe((message : Message ) => {
            if( typeof(message) === 'string'){
                message = JSON.parse(message as string) as Message;
            }
            switch(message.type) {
                case MessageType.TEXT: {
                    console.log(message);
                    break;
                }
                case MessageType.BLOCK: {
                    this.store.dispatch(addBlock(message.data as Block ));
                    break;
                }
                default: {
                    //statements;
                    break;
                }
            }
        });
    }


}