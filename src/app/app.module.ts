import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { blockchainService } from "./shared/services/blockchain.service";
import { BlockComponent } from "./shared/components/block/block.component";
import { blockchainReducer } from "./reducers/blockchain.reducer";
import { LoggerService } from "./shared/services/logger.service";
import { PeerService } from "./shared/services/peer.service";
import { peerReducer } from "./reducers/peer.reducer";
import { SignalService } from "./shared/services/signal.service";
import { MessageService } from "./shared/services/message.service";
import { AppState } from "./store/app.state";

let defaultState:AppState = { blockchain : [] , peerData : { peerId : '' , remoteConnections : [] }  } as AppState;

@NgModule({
  declarations: [
    BlockComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule ,
    StoreModule.provideStore(
        {
          blockchain : blockchainReducer, peerData : peerReducer
        } ,
        defaultState)
  ],
  providers: [
      blockchainService ,
      SignalService ,
      PeerService ,
      LoggerService ,
      MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
