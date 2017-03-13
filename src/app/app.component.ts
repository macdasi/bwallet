import { Component } from '@angular/core';
import { blockchainService } from "./shared/services/blockchain";
import { Block } from "./shared/objects/block";
import { Store } from "@ngrx/store";
import { AppState } from "./store/app.state";
import { addBlock } from "./actions/blockchain.actions";
import { Observable } from "rxjs/Rx";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blockData:string;
  blocks: Observable<Block[]>;
  lastblock:Block;

  constructor(public blockchainSrv:blockchainService,private store: Store<AppState>){
      this.blocks = store.select("blockchain") as Observable<Block[]>;
      this.blocks.subscribe((blockchain:Block[]) => {
          this.lastblock = blockchain[blockchain.length - 1];
      });
      let genesisBlock =  blockchainSrv.getGenesisBlock();
      this.store.dispatch(addBlock(genesisBlock));
  }

  generateNextBlock(){
    let newBlock = this.blockchainSrv.generateNextBlock(this.lastblock.hash,this.blockData);
    this.blockData = '';
    this.store.dispatch(addBlock(newBlock));
  }
}
