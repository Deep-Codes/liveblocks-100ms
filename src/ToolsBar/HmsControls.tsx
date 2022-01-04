import {
  selectIsConnectedToRoom,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
} from '@100mslive/hms-video-store';
import {
  VideoOffIcon,
  VideoOnIcon,
  MicOffIcon,
  MicOnIcon,
  HangUpIcon,
  InviteIcon,
} from '@100mslive/react-icons';
import { useHMSActions, useHMSStore } from '@100mslive/react-sdk';
import React from 'react';
import getToken from '../getToken';
import IconButton from '../IconButton';

const HmsControls = () => {
  const [token, setToken] = React.useState('');
  React.useEffect(() => {
    getToken('guest')
      .then((t) => setToken(t))
      .catch((e) => console.log('Error: ', e));
  }, []);
  const [name, setName] = React.useState('');
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const className = `p-1.5 mx-1`;
  const actions = useHMSActions();
  const audioEnabled = useHMSStore(selectIsLocalAudioEnabled);
  const videoEnabled = useHMSStore(selectIsLocalVideoEnabled);
  const toggleAudio = async () => {
    try {
      await actions.setLocalAudioEnabled(!audioEnabled);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const toggleVideo = async () => {
    try {
      await actions.setLocalVideoEnabled(!videoEnabled);
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const leave = async () => {
    try {
      await actions.leave();
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  const join = () => {
    try {
      actions.join({
        authToken: token,
        userName: name || 'John Doe',
        settings: {
          isAudioMuted: true,
          isVideoMuted: true,
        },
      });
    } catch (error) {
      console.log('Error: ', error);
    }
  };
  return (
    <>
      {isConnected ? (
        <>
          <IconButton
            className={className}
            isActive={videoEnabled}
            onClick={toggleVideo}
          >
            {videoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
          </IconButton>
          <IconButton
            className={className}
            isActive={audioEnabled}
            onClick={toggleAudio}
          >
            {audioEnabled ? <MicOnIcon /> : <MicOffIcon />}
          </IconButton>
          <IconButton className={className} onClick={leave}>
            <HangUpIcon />
          </IconButton>
        </>
      ) : (
        <form
          className='flex items-center'
          onSubmit={(e) => {
            e.preventDefault();
            join();
          }}
        >
          <input
            required
            type='text'
            maxLength={15}
            placeholder='Enter name'
            className='w-32'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <IconButton
            type='submit'
            disabled={token ? false : true}
            className={className}
            onClick={join}
          >
            <InviteIcon />
          </IconButton>
        </form>
      )}
    </>
  );
};

export default HmsControls;
