import {
  selectIsConnectedToRoom,
  selectPeers,
  HMSPeer,
} from '@100mslive/hms-video-store';
import { useHMSStore, useVideo } from '@100mslive/react-sdk';
import React from 'react';

const VideoList = () => {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const peers = useHMSStore(selectPeers);
  return (
    <>
      {isConnected ? (
        <div className='absolute right-0 top-20 w-72 flex flex-col space-y-4'>
          {peers.map((p) => (
            <VideoTile peer={p} key={p.id} />
          ))}
        </div>
      ) : null}
    </>
  );
};

const VideoTile: React.FC<{ peer: HMSPeer }> = ({ peer }) => {
  const ref = useVideo(peer.videoTrack || '');
  return (
    <div className='w-60 h-60 rounded-lg relative'>
      <video
        className={`w-full h-full bg-gray-200 object-cover rounded-lg ${
          peer.isLocal ? 'mirror' : ''
        }`}
        autoPlay
        muted
        playsInline
        ref={ref}
      />
      <span
        className={`absolute bottom-2 transform -translate-x-1/2 left-1/2 text-gray-500`}
      >
        {peer.name}
      </span>
    </div>
  );
};

export default VideoList;
