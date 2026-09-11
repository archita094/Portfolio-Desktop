import { useEffect, useState } from "react";
import { useDesktopStore } from "@/store/desktop";
import { Play, Pause, SkipForward, SkipBack } from "lucide-react";

interface WallpaperProps {
  theme: "day" | "sunset" | "night";
  children?: React.ReactNode;
}

const VIDEO_WALLPAPER = "/wallpaper.mp4";

const songs = [
  {
    title: "Midnight Fiction",
    artist: "ILLIT",
    cover: "/album0.jpg",
    duration: 100, // 3:30
    startTime: 0, // 2:23
  },
  {
    title: "THE GREATEST",
    artist: "Billie Eilish",
    cover: "/album1.jpg",
    duration: 100, // 3:30
    startTime: 0, // 2:23
  },
  {
    title: "Jellyous",
    artist: "ILLIT",
    cover: "/album2.jpg",
    duration: 195, // 3:15
    startTime: 0,
  },
  {
    title: "Snooze",
    artist: "SZA",
    cover: "/album3.jpg",
    duration: 100, // 3:30
    startTime: 0, // 2:23
  },
  {
    title: "Here Comes The Sun",
    artist: "The Beatles",
    cover: "/album4.jpg",
    duration: 195, // 3:15
    startTime: 0,
  },
  {
    title: "Wish You Were Here",
    artist: "Pink Floyd",
    cover: "/album5.jpg",
    duration: 100, // 3:30
    startTime: 0, // 2:23
  },
  {
    title: "Like a Stone",
    artist: "Audioslave",
    cover: "/album6.jpg",
    duration: 195, // 3:15
    startTime: 0,
  },
  {
    title: "Highway to Hell",
    artist: "AC/DC",
    cover: "/album7.jpg",
    duration: 195, // 3:15
    startTime: 0,
  }
];

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
}

function NowPlayingCard() {
  const hasMaximized = useDesktopStore((state) =>
    state.windows.some((w) => w.maximized && !w.minimized)
  );

  const [currentSong, setCurrentSong] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  // Start Song 1 at 2:23
  const [currentTime, setCurrentTime] = useState(
    songs[0].startTime
  );

  const song = songs[currentSong];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setCurrentTime((time) => {
        const currentSongData = songs[currentSong];

        if (time >= currentSongData.duration) {
          const nextSong = (currentSong + 1) % songs.length;

          setCurrentSong(nextSong);

          return songs[nextSong].startTime;
        }

        return time + 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, currentSong]);

  const togglePlay = () => {
    setIsPlaying((playing) => !playing);
  };

  const nextSong = () => {
    const next = (currentSong + 1) % songs.length;

    setCurrentSong(next);
    setCurrentTime(songs[next].startTime);
  };

  const previousSong = () => {
    const previous =
      (currentSong - 1 + songs.length) % songs.length;

    setCurrentSong(previous);
    setCurrentTime(songs[previous].startTime);
  };

  const handleProgressClick = (
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = event.currentTarget.getBoundingClientRect();

    const clickPosition =
      (event.clientX - rect.left) / rect.width;

    const newTime = clickPosition * song.duration;

    setCurrentTime(newTime);
  };

  const progress =
    (currentTime / song.duration) * 100;

  if (hasMaximized) return null;

  return (
    <div className="now-playing-card">

      {/* Album Art */}
      <img
        src={song.cover}
        alt={song.title}
        className="album-art"
      />

      {/* Song Information */}
      <div className="song-section">

        <div className="song-title">
          {song.title}
        </div>

        <div className="song-artist">
          {song.artist}
        </div>

        {/* Progress Bar */}
        <div
          className="progress-wrapper"
          onClick={handleProgressClick}
        >
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            />

            <div
              className="progress-dot"
              style={{ left: `${progress}%` }}
            />
          </div>
        </div>

        {/* Time */}
        <div className="time-container">
          <span>{formatTime(currentTime)}</span>

          <span>{formatTime(song.duration)}</span>
        </div>

        {/* Controls */}
        <div className="music-controls">
          <button
            className="music-button"
            onClick={previousSong}
            title="Previous Track"
            aria-label="Previous Track"
          >
            <SkipBack size={15} fill="currentColor" />
          </button>

          <button
            className="music-button play-button"
            onClick={togglePlay}
            title={isPlaying ? "Pause" : "Play"}
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? (
              <Pause size={16} fill="currentColor" />
            ) : (
              <Play size={16} fill="currentColor" style={{ marginLeft: 2 }} />
            )}
          </button>

          <button
            className="music-button"
            onClick={nextSong}
            title="Next Track"
            aria-label="Next Track"
          >
            <SkipForward size={15} fill="currentColor" />
          </button>
        </div>

      </div>
    </div>
  );
}

export function Wallpaper({
  theme,
  children,
}: WallpaperProps) {
  return (
    <div className="wallpaper">

      {/* Silent Video Wallpaper */}
      <video
        className="wallpaper-video"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src={VIDEO_WALLPAPER}
          type="video/mp4"
        />
      </video>

      <div className="wallpaper-overlay" />

      <div className="wallpaper-content">
        {children}
      </div>

      {/* Visual-only music player */}
      <NowPlayingCard />

    </div>
  );
}