import { MessageType } from "./message.type";
/**
 * Created by hadar.m on 06/03/2017.
 */

export  interface Message{
    type:MessageType;
    data:any;
}