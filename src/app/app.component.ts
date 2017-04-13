import { Component, OnInit , ChangeDetectionStrategy  } from '@angular/core';
import { blockchainService } from "./shared/services/blockchain";
import { Block } from "./shared/objects/block";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { addBlock } from "./actions/blockchain.actions";
import { Observable } from "rxjs/Rx";
import { peerService } from "./shared/services/peerService";
import { SignalService } from "./shared/services/signalService";
import { peerData } from "./shared/objects/peerData";
import { dataConnection } from "./shared/objects/dataConnection";



@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent implements  OnInit {
    blockData:string;
    myPeerId:string;
    blocks$:Observable<Block[]>;
    peerId$: Observable<peerData>;
    remoteConnections : dataConnection[];

    lastblock:Block;

    constructor(public blockchainSrv:blockchainService,
                private store:Store<AppState>,
                private signal: SignalService,
                private webrtc:peerService) {

    }

    ngOnInit() {
        this.signal.getMessages().subscribe((data : any ) => {
            data.ids && data.ids.forEach((peerId) => {
                if(peerId != this.myPeerId){
                    this.webrtc.connect(peerId);
                }
            });
            console.log(data);
        });



        this.peerId$ = this.store.select("peerData") as Observable<peerData> ;
        this.peerId$.subscribe((data:peerData)=>{
            if(data.peerId != '' && data.peerId != this.myPeerId){
                this.myPeerId = data.peerId;
                this.signal.sendMessage(data.peerId);
            }
            this.remoteConnections = data.remoteConnections;
        });

        // this.peerId$.subscribe();

        this.blocks$ = this.store.select("blockchain") as Observable<Block[]>;

        this.blocks$.subscribe((blockchain:Block[]) => {
            this.lastblock = blockchain[blockchain.length - 1];
        });

        let genesisBlock = this.blockchainSrv.getGenesisBlock();
        this.store.dispatch(addBlock(genesisBlock));
    }

    generateNextBlock() {
        let time = new Date().valueOf();
        let newBlock = this.blockchainSrv.generateNextBlock(this.lastblock.hash, this.blockData, time);
        this.blockData = '';
        this.store.dispatch(addBlock(newBlock));
    }


    send() {
        this.webrtc.send(this.remoteConnections);
    }
}
