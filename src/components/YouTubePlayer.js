import React, { useState, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import RNYouTube from 'react-native-youtube-iframe';

const YouTubePlayer = ({ visible, videoId, playing, setVisible }) => {
  const [loading, setLoading] = useState(true);

  const onStateChange = useCallback((state) => {
    if (state === 'ended') {
      setVisible(false);
    }
  }, []);

  if (!visible) return null;
  if (loading && !videoId) return <ActivityIndicator />;

  return (
    <RNYouTube
      height={300}
      play={playing}
      videoId={videoId}
      onChangeState={onStateChange}
      onReady={() => setLoading(false)}
    />
  );
};

export default YouTubePlayer;
