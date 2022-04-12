import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
  useAVToggle,
} from '@100mslive/react-sdk';
import {
  VideoOffIcon,
  VideoOnIcon,
  MicOffIcon,
  MicOnIcon,
  HangUpIcon,
  InviteIcon,
} from '@100mslive/react-icons';
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
  const { isLocalAudioEnabled, isLocalVideoEnabled, toggleAudio, toggleVideo } =
    useAVToggle();
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
            isActive={isLocalVideoEnabled}
            onClick={toggleVideo}
          >
            {isLocalVideoEnabled ? <VideoOnIcon /> : <VideoOffIcon />}
          </IconButton>
          <IconButton
            className={className}
            isActive={isLocalAudioEnabled}
            onClick={toggleAudio}
          >
            {isLocalAudioEnabled ? <MicOnIcon /> : <MicOffIcon />}
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
