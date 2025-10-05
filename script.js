// ===== MEDIA-AINEISTOT =====
const media = {
  cyberlance: [
    { type: 'image', src: 'images/cyberlance/cyberlance0.png', alt:'Thumbnail' },
    { type: 'video', src: 'images/cyberlance/videos/cyberlancevideo1.mp4', alt: 'Gameplay video'},
    { type: 'video', src: 'images/cyberlance/videos/cyberlancevideo2.mp4', alt: 'Settings UI'},
    { type: 'image', src: 'images/cyberlance/cyberlance1.png', alt:'Scoreview' },
    { type: 'image', src: 'images/cyberlance/cyberlance2.png', alt:'Connect wires minigame' },
    { type: 'image', src: 'images/cyberlance/cyberlance3.png', alt:'Patient data' },
    { type: 'image', src: 'images/cyberlance/cyberlance4.png', alt:'Message window' },
    { type: 'image', src: 'images/cyberlance/cyberlance5.png', alt:'Game length settings' }
  ],

  redmilk: [
    // Lisää myöhemmin Redmilk-kuvat ja videot tänne
    { type: 'image', src: 'images/redmilk/Red_Milk.png', alt:'RedMilk logo'},
    { type: 'video', src: 'images/redmilk/redmilk_vid1.mp4', alt: 'Number lock'},
    { type: 'video', src: 'images/redmilk/redmilk_vid2.mp4', alt: 'AI NPC'},
    { type: 'video', src: 'images/redmilk/redmilk_vid3.mp4', alt: 'Settings'}
  ],

  brews: [
    // Lisää myöhemmin Brews-projektin kuvat ja videot tänne
    { type: 'image', src: 'images/brewsbrawls/brewsposter.png', alt: 'Brews & Brawls Poster'},
    { type: 'video', src: 'images/brewsbrawls/brews_vid1.mp4', alt: 'Gameplayvideo'}
  ],

  ranger: [
    // Lisää myöhemmin Rangerin kuvat ja videot tänne
    { type: 'image', src: 'images/rangersreserve/Logo.png', alt: 'Rangers Reserve logo'},
    { type: 'image', src: 'images/rangersreserve/ranger1.jpeg', alt: 'Environment'},
    { type: 'image', src: 'images/rangersreserve/ranger2.jpeg', alt: 'Animal'}
  ]
};


// ===== KARUSELLILOGIIKKA =====
document.querySelectorAll('.game-card').forEach(card => {
  const key = card.dataset.game; // esim. "cyberlance"
  const mediaSet = media[key];

  if (!mediaSet || mediaSet.length === 0) {
    console.warn(`Ei mediaa pelille: ${key}`);
    return;
  }

  const main = card.querySelector('.mainMediaContainer');
  const thumbs = card.querySelector('.thumb-strip');
  const prev = card.querySelector('.prev');
  const next = card.querySelector('.next');
  let index = 0;

  // Luo thumbnailit vain kuville
  mediaSet.forEach((item, i) => {
    if (item.type === 'image') {
      const thumb = document.createElement('img');
      thumb.src = item.src;
      thumb.alt = item.alt;
      thumb.classList.add('thumb');
      thumb.addEventListener('click', () => setMedia(i));
      thumbs.appendChild(thumb);
    }
  });

  // Median näyttäminen (kuva tai video)
  function setMedia(i) {
    index = (i + mediaSet.length) % mediaSet.length;
    main.innerHTML = ''; // tyhjennetään edellinen sisältö

    const item = mediaSet[index];

    if (item.type === 'image') {
      const img = document.createElement('img');
      img.src = item.src;
      img.alt = item.alt;
      img.draggable = false;
      main.appendChild(img);
    } 
    else if (item.type === 'video') {
      const vid = document.createElement('video');
      vid.src = item.src;
      vid.autoplay = true;
      vid.loop = true;
      vid.muted = true;
      vid.controls = true;
      main.appendChild(vid);
    }

    // Korostetaan aktiivinen thumb
    thumbs.querySelectorAll('img').forEach((t, j) => {
      t.classList.toggle('active', j === index);
    });
  }

  // Nappien toiminta
  prev.addEventListener('click', () => setMedia(index - 1));
  next.addEventListener('click', () => setMedia(index + 1));

  // Nuolinäppäimet
  card.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') setMedia(index - 1);
    if (e.key === 'ArrowRight') setMedia(index + 1);
  });

  // Kosketus (mobiili) – pyyhkäisy
  let startX = null;
  card.addEventListener('touchstart', (e) => {
    startX = e.changedTouches[0].clientX;
  }, { passive: true });

  card.addEventListener('touchend', (e) => {
    if (startX === null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 40) {
      if (dx > 0) setMedia(index - 1);
      else setMedia(index + 1);
    }
    startX = null;
  });

  // Aloitetaan ensimmäisestä mediasta
  setMedia(0);
});


// ===== DOWNLOAD-NAPPI =====
document.querySelectorAll('.download-btn').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const card = e.target.closest('.game-card');
    const key = card?.dataset.game;
    if (key === 'cyberlance') {
      window.open('https://leka45km.itch.io/cyberlance', '_blank');
    }
    // Lisää muut linkit jos tarpeen:
    // else if (key === 'redmilk') { window.open('https://...', '_blank'); }
  });
});
