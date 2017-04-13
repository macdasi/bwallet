/**
 * Created by hadar.m on 13/04/2017.
 */


export  interface dataConnection{

    send(data:any);
    close();
    on(event:string,callbak:Function);
    dataChannel:any;

    label:string;
    metadata:any;
    open:boolean;
    peerConnection:any;
    peer:string;
    reliable:boolean;
    serialization:string;
    type:string;
    bufferSize:number;
}