const playVideo = () => {
  const videoWrappers = document.querySelectorAll('.video');

  if (!videoWrappers || !videoWrappers.length) return;

  videoWrappers.forEach((wrapper) => {
    const video = wrapper.querySelector('video');
    const playButton = wrapper.querySelector('.video__button-play');

    if (!video || !playButton) return;

    playButton.addEventListener('click', () => {
      const isVideoPlaying = playButton.classList.contains('playing');

      if (!isVideoPlaying) {
        video.play()
          .then(() => {
            playButton.classList.add('playing');
            playButton.classList.add('hidden');
            video.setAttribute('controls', '');
          })
          .catch(err => {
            console.warn('Не удалось воспроизвести видео:', err);
          });
      } else {
        video.pause();
        playButton.classList.remove('playing');
      }
    });

    video.addEventListener('ended', () => {
      playButton.classList.remove('playing');
    });

    video.addEventListener('pause', () => {
      playButton.classList.remove('playing');
    });

    video.addEventListener('play', () => {
      playButton.classList.add('playing');
    });

    video.addEventListener('error', () => {
      playButton.classList.remove('playing');
    });
  });
};

export { playVideo };
