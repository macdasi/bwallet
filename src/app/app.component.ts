import { Component, OnInit , ChangeDetectionStrategy  } from '@angular/core';
import { blockchainService } from "./shared/services/blockchain.service";
import { Block } from "./shared/objects/block";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { addBlock } from "./actions/blockchain.actions";
import { Observable } from "rxjs/Rx";
import { dataConnection } from "./shared/objects/dataConnection";
import { MessageService } from "./shared/services/message.service";
import { MessageType } from "./shared/objects/message.type";
import { Message } from "./shared/objects/message";



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit {
    blockData:string;
    blocks$:Observable<Block[]>;
    peerId$  : Observable<string>;
    remoteConnections$ : Observable<dataConnection[]> ;

    lastblock:Block;

    constructor(public  message:MessageService ,
                public  blockchainSrv:blockchainService ,
                private store:Store<AppState> ) {

    }

    ngOnInit() {
        this.blocks$ = this.store.select("blockchain") as Observable<Block[]>;

        this.blocks$.subscribe((blockchain:Block[]) => {
            this.lastblock = blockchain[blockchain.length - 1];
        });

        this.peerId$ = this.store.select( s => s.peerData.peerId ) as Observable<string> ;
        /*this.peerId$.subscribe((data) => {
            console.log(data);
        });*/

        this.remoteConnections$ = this.store.select( s =>  s.peerData.remoteConnections ) as Observable<dataConnection[]> ;

        let genesisBlock = this.blockchainSrv.getGenesisBlock();
        this.store.dispatch(addBlock(genesisBlock));
    }

    generateNextBlock() {
        let time = new Date().valueOf();
        let newBlock = this.blockchainSrv.generateNextBlock(this.lastblock.hash, this.blockData, time);
        this.blockData = '';

        this.message.send({ data : newBlock , type : MessageType.BLOCK } as Message);

        this.store.dispatch(addBlock(newBlock));
    }


    send() {
        this.message.send({ data : 'hello' , type : MessageType.TEXT } as Message);
    }
}
