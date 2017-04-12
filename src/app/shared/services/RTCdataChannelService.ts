/**
 * Created by hadar.m on 26/03/2017.
 */
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger";
/**
 * Created by hadar.m on 06/03/2017.
 */
const SignalingChannel = window['SignalingChannel'];
const RTCPeerConnection = window['RTCPeerConnection'];

@Injectable()
export class RTCDataChannelService {
    signalingChannel;
    peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};
    pc;
    channel;

// call start(true) to initiate
    constructor(){
        this.signalingChannel = new SignalingChannel();
        this.signalingChannel.onmessage =  (evt)=> {
            if (!this.pc){
                this.start(false);
            }

            var message = JSON.parse(evt.data);
            if (message.desc) {
                var desc = message.desc;

                // if we get an offer, we need to reply with an answer
                if (desc.type == "offer") {
                    this.pc.setRemoteDescription(desc).then( () => {
                        return this.pc.createAnswer();
                    })
                .then( (answer) => {
                        return this.pc.setLocalDescription(answer);
                    })
                .then( () => {
                        var str = JSON.stringify({"desc": this.pc.localDescription});
                    this.signalingChannel.send(str);
                    })
                .catch(this.logError);
                } else
                    this.pc.setRemoteDescription(desc).catch(this.logError);
            } else
                this.pc.addIceCandidate(message.candidate).catch(this.logError);
        };
    }

    start(isInitiator):Promise<boolean> {
        this.pc = new RTCPeerConnection(this.peerConnectionConfig);

        // send any ice candidates to the other peer
        this.pc.onicecandidate =  (evt) => {
            this.signalingChannel.send(JSON.stringify({"candidate": evt.candidate}));
        };

        // let the "negotiationneeded" event trigger offer generation
        this.pc.onnegotiationneeded =  () => {
            this.pc.createOffer().then( (offer)=> {
                return this.pc.setLocalDescription(offer);
            })
                .then( ()=> {
                    // send the offer to the other peer
                    this.signalingChannel.send(JSON.stringify({"desc": this.pc.localDescription}));
                })
                .catch(this.logError);
        };

        if (isInitiator) {
            // create data channel and setup chat
            this.channel = this.pc.createDataChannel("chat");
            return this.setupChat();
        } else {
            // setup chat on incoming data channel
            this.pc.ondatachannel =  (evt)=> {
                this.channel = evt.channel;
                return this.setupChat();
            };
        }
    }



    

    setupChat():Promise<boolean> {
        var p = new Promise<boolean>((resolve, reject) => {

            this.channel.onopen =  ()  => {
                // e.g. enable send button
                resolve(true);
            };

            this.channel.onmessage =  (evt) => {
                resolve(false);
            };
        });
        return p;
    }

    

    sendChatMessage(msg) {
        this.channel.send(msg);
    }

    

    logError(error) {
        console.log(error.name + ": " + error.message);
    }
}

