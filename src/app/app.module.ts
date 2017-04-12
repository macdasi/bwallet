import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { blockchainService } from "./shared/services/blockchain";
import { BlockComponent } from "./shared/components/block/block.component";
import { blockchainReducer } from "./reducers/blockchain.reducer";
import { webrtcService } from "./shared/services/webrtc";
import { LoggerService } from "./shared/services/logger";
import { RTCDataChannelService } from "./shared/services/RTCdataChannelService";
import { peerService } from "./shared/services/peerService";
import { peerReducer } from "./reducers/peer.reducer";
import { SignalService } from "./shared/services/signalService";

@NgModule({
  declarations: [
    BlockComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule ,
    StoreModule.provideStore( { blockchain : blockchainReducer, peerId : peerReducer} , { blockchain : [] , peerId : ''  })
  ],
  providers: [blockchainService , SignalService , peerService , webrtcService , LoggerService , RTCDataChannelService],
  bootstrap: [AppComponent]
})
export class AppModule { }
