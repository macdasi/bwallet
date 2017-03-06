import { Component } from '@angular/core';
import { blockchain } from "./shared/services/blockchain";
import { Block } from "./shared/objects/block";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  blockData:string;
  blocks:Block[] = [];

  constructor(public blockchain:blockchain){
      let genesisBlock =  blockchain.getGenesisBlock();
      this.blocks.push(genesisBlock);
  }

  generateNextBlock(){
    let prevBlock:Block = this.blocks[this.blocks.length -1];
    let nextBlock:Block = new Block(0,"",0,this.blockData,"");
    this.blockData = '';
    let newBlock = this.blockchain.generateNextBlock(prevBlock,nextBlock);
    this.blocks.push(newBlock);
  }
}
