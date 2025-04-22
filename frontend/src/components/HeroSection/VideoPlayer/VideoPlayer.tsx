import React, { useState, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Typography,
  CircularProgress
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import FullscreenIcon from '@mui/icons-material/Fullscreen';
import theme from '../../../theme';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  title?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  aspectRatio?: string;
  height?: number | string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  title,
  autoPlay = false,
  muted = true,
  loop = false,
  aspectRatio = '16/9',
  height = 'auto'
}) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [isLoading, setIsLoading] = useState(true);
  const [showControls, setShowControls] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const enterFullscreen = () => {
    if (videoRef.current) {
      if (videoRef.current.requestFullscreen) {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handleLoadedData = () => {
    setIsLoading(false);
  };

  const handleEnded = () => {
    if (!loop) {
      setIsPlaying(false);
    }
  };

  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: height,
        aspectRatio: aspectRatio,
        borderRadius: 2,
        overflow: 'hidden',
        bgcolor: '#000',
        '&:hover .video-controls': {
          opacity: 1
        }
      }}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline
        onLoadedData={handleLoadedData}
        onEnded={handleEnded}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '8px'
        }}
      />

      {isLoading && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          <CircularProgress color="primary" />
        </Box>
      )}

      {!isPlaying && !isLoading && (
        <Box
          onClick={togglePlay}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            bgcolor: 'rgba(0, 0, 0, 0.3)'
          }}
        >
          <IconButton
            sx={{
              width: 80,
              height: 80,
              color: 'white',
              bgcolor: 'rgba(0, 0, 0, 0.5)',
              '&:hover': {
                bgcolor: 'primary.main'
              }
            }}
          >
            <PlayArrowIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>
      )}

      <Box
        className="video-controls"
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          bgcolor: 'rgba(0, 0, 0, 0.11)',
          opacity: showControls || !isPlaying ? 1 : 0,
          transition: 'opacity 0.3s ease',
          borderBottomLeftRadius: 2,
          borderBottomRightRadius: 2
        }}
      >
        {title && (
          <Typography variant="body2" color='white'>
            {title}
          </Typography>
        )}
        <Box>
          <IconButton color='primary'  onClick={togglePlay} size="small">
            {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
          </IconButton>
          
          <IconButton color="primary" onClick={toggleMute} size="small">
            {isMuted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          
          <IconButton color="primary" onClick={enterFullscreen} size="small">
            <FullscreenIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default VideoPlayer;
