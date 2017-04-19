/**
 * Created by hadar.m on 19/04/2017.
 */
import { Observable } from 'rxjs/Observable';
import { Store } from "@ngrx/store";
import { SignalService } from "./signal.service";
import { AppState } from "../../store/app.state";
import { peerData } from "../objects/peerData";
import { dataConnection } from "../objects/dataConnection";
import { PeerService } from "./peer.service";
import { Message } from "../objects/message";
import { MessageType } from "../objects/message.type";

export class MessageService {
    peerId$  : Observable<peerData>;
    myPeerId:string;
    remoteConnections : dataConnection[];

    constructor(private signal: SignalService ,
                private store:Store<AppState>,
                private webrtc: PeerService ){

        this.init();
    }

    send(message:Message){
        this.remoteConnections.filter( conn => conn.open ).forEach((conn:dataConnection) => {
            this.webrtc.send(conn ,{ peer: this.myPeerId , type : message.type , data :  message.data});
        });
    }

    init(){
        this.peerId$ = this.store.select("peerData") as Observable<peerData> ;
        this.peerId$.subscribe((data:peerData)=>{
            if(data.peerId != '' && data.peerId != this.myPeerId){
                this.myPeerId = data.peerId;
                this.signal.sendMessage(data.peerId);
            }
            this.remoteConnections = data.remoteConnections;
        });

        this.webrtc.data$.subscribe((data : any ) => {
            switch((data.type as MessageType)) {
                case MessageType.TEXT: {
                    console.log(data)
                }
                default: {
                    //statements;
                    break;
                }
            }
        });

        this.signal.getMessages().subscribe((data : any ) => {
            switch(data.type) {
                case 'nodes': {
                    data.ids && data.ids.forEach((peerId) => {
                        if(peerId != this.myPeerId){
                            this.webrtc.connect(peerId);
                        }
                    });
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