/**
 * Created by hadar.m on 26/03/2017.
 */
import { Injectable } from "@angular/core";
import { LoggerService } from "./logger";
/**
 * Created by hadar.m on 06/03/2017.
 */
const RTCPeerConnection = window['RTCPeerConnection'];

@Injectable()
export class webrtcService {
    localConnection;
    remoteConnection;
    sendChannel;
    receiveChannel;

    constructor(private logger:LoggerService){}

    createConnection():Promise<string> {
        var peerConnectionConfig = {'iceServers': [{'url': 'stun:stun.services.mozilla.com'}, {'url': 'stun:stun.l.google.com:19302'}]};

        let pcConstraint = null;
        let dataConstraint = null;
        this.logger.trace('Using SCTP based data channels');
        // SCTP is supported from Chrome 31 and is supported in FF.
        // No need to pass DTLS constraint as it is on by default in Chrome 31.
        // For SCTP, reliable and ordered is true by default.
        // Add localConnection to global scope to make it visible
        // from the browser console.
        this.localConnection =
            new RTCPeerConnection(peerConnectionConfig, pcConstraint);
        this.logger.trace('Created local peer connection object localConnection');

        this.sendChannel = this.localConnection.createDataChannel('sendDataChannel',
            dataConstraint);
        this.logger.trace('Created send data channel');

        this.localConnection.onicecandidate =  (e) => {
            this.onIceCandidate(this.localConnection, e);
        };
        var p = new Promise<string>((resolve, reject) => {
            this.sendChannel.onopen = this.onSendChannelStateChange.bind(this)(resolve,reject,this.sendChannel,this.logger.trace);
            this.sendChannel.onclose = this.onSendChannelStateChange.bind(this)(resolve,reject,this.sendChannel,this.logger.trace);
        });



        this.remoteConnection =
            new RTCPeerConnection(peerConnectionConfig, pcConstraint);
        this.logger.trace('Created remote peer connection object remoteConnection');

        this.remoteConnection.onicecandidate =  (e)=> {
            this.onIceCandidate(this.remoteConnection, e);
        };
        this.remoteConnection.ondatachannel = this.receiveChannelCallback.bind(this);

        this.localConnection.createOffer().then(
            this.gotLocalDescription.bind(this),
            this.onCreateSessionDescriptionError.bind(this)
        );

        return p;
    }

    onSendChannelStateChange(resolve,reject,sendChannel,trace):Function {
        return function () {
            try{
                var readyState = sendChannel.readyState;
                trace('Send channel state is: ' + readyState);
                if (readyState === 'open') {
                    resolve(readyState);
                } else {
                    resolve(readyState);
                }
            }
            catch(e){
                reject(e);
            }

        }
    }

    onCreateSessionDescriptionError(error) {
        this.logger.trace('Failed to create session description: ' + error.toString());
    }

    

    sendData(data) {
        this.sendChannel.send(data);
        this.logger.trace('Sent Data: ' + data);
    }

    

    closeDataChannels() {
        this.logger.trace('Closing data channels');
        this.sendChannel.close();
        this.logger.trace('Closed data channel with label: ' + this.sendChannel.label);
        this.receiveChannel.close();
        this.logger.trace('Closed data channel with label: ' + this.receiveChannel.label);
        this.localConnection.close();
        this.remoteConnection.close();
        this.localConnection = null;
        this.remoteConnection = null;
        this.logger.trace('Closed peer connections');
    }



    gotLocalDescription(desc) {
        this.localConnection.setLocalDescription(desc);
        this.logger.trace('Offer from localConnection \n' + desc.sdp);
        this.remoteConnection.setRemoteDescription(desc);
        this.remoteConnection.createAnswer().then(
            this.gotRemoteDescription.bind(this),
            this.onCreateSessionDescriptionError.bind(this)
        );
    }



    gotRemoteDescription(desc) {
        this.remoteConnection.setLocalDescription(desc);
        this.logger.trace('Answer from remoteConnection \n' + desc.sdp);
        this.localConnection.setRemoteDescription(desc);
    }

    

    getOtherPc(pc) {
        return (pc === this.localConnection) ? this.remoteConnection : this.localConnection;
    }

    

    getName(pc) {
        return (pc === this.localConnection) ? 'localPeerConnection' :
            'remotePeerConnection';
    }

    

    onIceCandidate(pc, event) {
        this.getOtherPc(pc).addIceCandidate(event.candidate)
            .then(
                 () => {
                     this.onAddIceCandidateSuccess();
                },
                 (err) => {
                     this.onAddIceCandidateError( err);
                }
            );
        this.logger.trace(this.getName(pc) + ' ICE candidate: \n' + (event.candidate ?
                event.candidate.candidate : '(null)'));
    }

    

    onAddIceCandidateSuccess() {
        this.logger.trace('AddIceCandidate success.');
    }

    

    onAddIceCandidateError(error) {
        this.logger.trace('Failed to add Ice Candidate: ' + error.toString());
    }

    

    receiveChannelCallback(event) {
        this.logger.trace('Receive Channel Callback');
        this.receiveChannel = event.channel;
        this.receiveChannel.onmessage = this.onReceiveMessageCallback.bind(this);
        this.receiveChannel.onopen = this.onReceiveChannelStateChange.bind(this);
        this.receiveChannel.onclose = this.onReceiveChannelStateChange.bind(this);
    }

    

    onReceiveMessageCallback(event) {
        this.logger.trace('Received Message:' + event.data);
    }

    



    

    onReceiveChannelStateChange() {
        var readyState = this.receiveChannel.readyState;
        this.logger.trace('Receive channel state is: ' + readyState);
    }
}

