// Media-lista (kuvat ja videot)
const media = [
  { type: 'image', src: 'images/cyberlance/cyberlance0.png', alt:'Thumbnail' },
  { type: 'video', src: 'images/cyberlance/videos/cyberlancevideo1.mp4', alt: 'Gameplay video'},
  { type: 'video', src: 'images/cyberlance/videos/cyberlancevideo2.mp4', alt: 'Settings UI'},
  { type: 'image', src: 'images/cyberlance/cyberlance1.png', alt:'Scoreview' },
  { type: 'image', src: 'images/cyberlance/cyberlance2.png', alt:'Connect wires minigame' },
  { type: 'image', src: 'images/cyberlance/cyberlance3.png', alt:'Patient data' },
  { type: 'image', src: 'images/cyberlance/cyberlance4.png', alt:'Message window' },
  { type: 'image', src: 'images/cyberlance/cyberlance5.png', alt:'Game length settings' }
];

const mainContainer = document.getElementById('mainMediaContainer'); // iso media-alue
const thumbsCont = document.getElementById('thumbs');
let index = 0;

// Luo pikkukuvat (vain kuville)
media.forEach((it, i) => {
  if(it.type === 'image') { // thumbnail vain kuville
    const t = document.createElement('div');
    t.className = 'thumb';
    t.title = 'Näytä media ' + (i+1);
    t.setAttribute('tabindex', 0);
    t.innerHTML = `<img src="${it.src}" alt="${it.alt} thumb">`;
    t.addEventListener('click', ()=> setMedia(i));
    t.addEventListener('keydown', (e) => { if(e.key==='Enter' || e.key===' ') setMedia(i); });
    thumbsCont.appendChild(t);
  }
});

// Päivitä iso media (kuva tai video)
function setMedia(i){
  index = (i + media.length) % media.length;
  mainContainer.innerHTML = ''; // tyhjennä edellinen media

  const item = media[index];

  if(item.type === 'image'){
    const img = document.createElement('img');
    img.src = item.src;
    img.alt = item.alt;
    img.addEventListener('dragstart', e => e.preventDefault()); // estä drag
    mainContainer.appendChild(img);
  } else if(item.type === 'video'){
    const vid = document.createElement('video');
    vid.src = item.src.endsWith('.mp4') || item.src.endsWith('.webm') ? item.src : item.src + '.mp4'; // lisää .mp4 jos puuttuu
    vid.autoplay = true;
    vid.loop = true;
    vid.muted = true;
    vid.controls = true;
    mainContainer.appendChild(vid);
  }

  // Korostus thumbnailille
  Array.from(thumbsCont.children).forEach((c, j) => {
    c.style.boxShadow = j === index ? '0 4px 14px rgba(31,111,235,0.25)' : '';
  });
}

// Aloita ensimmäisestä mediasta
setMedia(0);

// Klikkaukset
document.getElementById('prevEdge').addEventListener('click', ()=> setMedia(index-1));
document.getElementById('nextEdge').addEventListener('click', ()=> setMedia(index+1));
document.getElementById('prevBtn')?.addEventListener('click', (e)=> { e.stopPropagation(); setMedia(index-1); });
document.getElementById('nextBtn')?.addEventListener('click', (e)=> { e.stopPropagation(); setMedia(index+1); });

// Näppäimistö
const carousel = document.getElementById('carousel');
carousel.addEventListener('keydown', (e)=> {
  if(e.key === 'ArrowLeft') setMedia(index-1);
  if(e.key === 'ArrowRight') setMedia(index+1);
});

// Swipe-tuki mobiilille
let startX = null;
carousel.addEventListener('touchstart', (e) => { startX = e.changedTouches[0].clientX; }, {passive:true});
carousel.addEventListener('touchend', (e) => {
  if(startX === null) return;
  const dx = e.changedTouches[0].clientX - startX;
  if(Math.abs(dx) > 40){
    if(dx > 0) setMedia(index-1); else setMedia(index+1);
  }
  startX = null;
});

document.getElementById('downloadBtn').addEventListener('click', () => {
    // Vaihda URL haluamaasi sivuun
    window.open('https://leka45km.itch.io/cyberlance', '_blank');
});


