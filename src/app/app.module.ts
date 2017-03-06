import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { blockchain } from "./shared/services/blockchain";
import { BlockComponent } from "./shared/components/block/block.component";

@NgModule({
  declarations: [
    BlockComponent,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [blockchain],
  bootstrap: [AppComponent]
})
export class AppModule { }
