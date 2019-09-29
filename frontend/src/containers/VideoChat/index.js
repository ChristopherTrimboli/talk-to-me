import React, {useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%'
  }
}));

const VideoChat = props => {
  const classes = useStyles();

  let pc1;
  let pc2;

  const offerOptions = {
    offerToReceiveAudio: 1,
    offerToReceiveVideo: 1
  };

  const start = async () => {
    console.log('Requesting local stream');
    try {
      const localVideo = document.getElementById('localVideo');
      const stream = await navigator.mediaDevices.getUserMedia({audio: true, video: true});
      console.log('Received local stream', stream);
      localVideo.srcObject = stream;
    } catch (e) {
      console.log(e);
    }
  }

  const call = async (localStream) => {
    const localVideo = document.getElementById('localVideo');
    console.log('Starting call');
    pc1 = new RTCPeerConnection();
    console.log('Created local peer connection object pc1');
    pc1.addEventListener('icecandidate', e => onIceCandidate(pc1, e));
    pc2 = new RTCPeerConnection();
    console.log('Created remote peer connection object pc2');
    pc2.addEventListener('icecandidate', e => onIceCandidate(pc2, e));
    pc1.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc1, e));
    pc2.addEventListener('iceconnectionstatechange', e => onIceStateChange(pc2, e));
    pc2.addEventListener('track', gotRemoteStream);
    localVideo.srcObject.getTracks().forEach(track => pc1.addTrack(track, localVideo.srcObject));
    console.log('Added local stream to pc1');
  
    try {
      console.log('pc1 createOffer start');
      const offer = await pc1.createOffer(offerOptions);
      await onCreateOfferSuccess(offer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }

  const onCreateAnswerSuccess = async (desc) => {
    console.log(`Answer from pc2:\n${desc.sdp}`);
    console.log('pc2 setLocalDescription start');
    try {
      await pc2.setLocalDescription(desc);
      onSetLocalSuccess(pc2);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
    console.log('pc1 setRemoteDescription start');
    try {
      await pc1.setRemoteDescription(desc);
      onSetRemoteSuccess(pc1);
    } catch (e) {
      onSetSessionDescriptionError(e);
    }
  }

  const getName = (pc) => {
    return (pc === pc1) ? 'pc1' : 'pc2';
  }
  
  const getOtherPc = (pc) => {
    return (pc === pc1) ? pc2 : pc1;
  }

  const onSetLocalSuccess = (pc) => {
    console.log(`${getName(pc)} setLocalDescription complete`);
  }
  
  const onSetRemoteSuccess = (pc) => {
    console.log(`${getName(pc)} setRemoteDescription complete`);
  }
  
  const onSetSessionDescriptionError = (error) => {
    console.log(`Failed to set session description: ${error.toString()}`);
  }

  const onCreateSessionDescriptionError = (error) => {
    console.log(`Failed to create session description: ${error.toString()}`);
  }
  
  const onCreateOfferSuccess = async (desc) => {
    console.log(`Offer from pc1\n${desc.sdp}`);
    console.log('pc1 setLocalDescription start');
    try {
      await pc1.setLocalDescription(desc);
      onSetLocalSuccess(pc1);
    } catch (e) {
      onSetSessionDescriptionError();
    }
  
    console.log('pc2 setRemoteDescription start');
    try {
      await pc2.setRemoteDescription(desc);
      onSetRemoteSuccess(pc2);
    } catch (e) {
      onSetSessionDescriptionError();
    }
  
    console.log('pc2 createAnswer start');
    // Since the 'remote' side has no media stream we need
    // to pass in the right constraints in order for it to
    // accept the incoming offer of audio and video.
    try {
      const answer = await pc2.createAnswer();
      await onCreateAnswerSuccess(answer);
    } catch (e) {
      onCreateSessionDescriptionError(e);
    }
  }

  const gotRemoteStream = (e) => {
    const remoteVideo = document.getElementById('remoteVideo');
    if (remoteVideo.srcObject !== e.streams[0]) {
      remoteVideo.srcObject = e.streams[0];
      console.log('pc2 received remote stream');
    }
  }

  const onIceCandidate = async (pc, event) => {
    try {
      await (getOtherPc(pc).addIceCandidate(event.candidate));
      onAddIceCandidateSuccess(pc);
    } catch (e) {
      onAddIceCandidateError(pc, e);
    }
    console.log(`${getName(pc)} ICE candidate:\n${event.candidate ? event.candidate.candidate : '(null)'}`);
  }

  const onAddIceCandidateSuccess = (pc) => {
    console.log(`${getName(pc)} addIceCandidate success`);
  }
  
  const onAddIceCandidateError = (pc, error) => {
    console.log(`${getName(pc)} failed to add ICE Candidate: ${error.toString()}`);
  }
  
  const onIceStateChange = (pc, event) => {
    if (pc) {
      console.log(`${getName(pc)} ICE state: ${pc.iceConnectionState}`);
      console.log('ICE state change event: ', event);
    }
  }


  useEffect(() => {
    start()
    setTimeout(() => {
      call()
    }, 5000)
    // eslint-disable-next-line
  }, [])


  return (
    <div className={classes.root}>
        <video id="localVideo" playsInline autoPlay muted></video>
        <video id="remoteVideo" playsInline autoPlay></video>
    </div>
  );
}

export default VideoChat;