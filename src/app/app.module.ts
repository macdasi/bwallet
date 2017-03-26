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

@NgModule({
  declarations: [
    BlockComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule ,
    StoreModule.provideStore( { blockchain : blockchainReducer} , [])
  ],
  providers: [blockchainService , webrtcService , LoggerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
