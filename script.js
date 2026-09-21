const memories = [
  {
    title: 'Benang yang menghubungkan semuanya.',
    kicker: 'The Beginning',
    text: 'Dan ini awal mula semuanya—benang yang ngebuat semua ini terjadi karena Kak Cici iseng pengen fotbar sebelum lulus wkwk. Siapa sangka satu ajakan sederhana bisa jadi awal dari banyak cerita setelahnya.',
    image: 'assets/foto-1.jpg'
  },
  {
    title: 'First bike date.',
    kicker: 'Bike Date',
    text: 'Ini pertama kali bike date. Dewa suka bangettt. Mungkin kelihatannya sederhana, tapi dari sinilah ada satu lagi hari yang akhirnya masuk ke daftar kenangan favorit.',
    image: 'assets/foto-2.jpg'
  },
  {
    title: 'A quick stop that mattered.',
    kicker: 'After Work',
    text: 'Ini Dewa pas main, terus jam pulang kerja Kak Cici juga jadi mampir. Cuma sebentar, mungkin. Tapi kadang yang bikin berkesan memang bukan lamanya ketemu—melainkan orang yang datangnya.',
    image: 'assets/foto-3.jpg'
  },
  {
    title: 'Seru, lalu diuji.',
    kicker: 'Movie Night',
    text: 'Ini pertama kali kita nonton. Jujur seruuu. Tapi setelahnya malah ada masalah. Untungnya, masalah itu tidak jadi akhir—karena kita berhasil lewatinya bareng.',
    image: 'assets/foto-4.jpg'
  },
  {
    title: 'A graduation to remember.',
    kicker: 'Graduation',
    text: 'Ini kelulusan Kak Cici, senior dan juga pacar Dewa. Semoga setelah lulus, langkah Kak Cici selalu dipenuhi hal-hal baik. Doa terbaik selalu ikut di setiap langkah berikutnya.',
    image: 'assets/foto-5.jpg'
  },
  {
    title: 'One night, countless stories.',
    kicker: 'Late Night',
    text: 'Ini waktu keragunan malam. Jujur seruuu bangettt. Banyak cerita, curhat, ketawa, dan obrolan yang mungkin tidak akan terasa sama kalau diceritakan ke orang lain.',
    image: 'assets/foto-6.jpg'
  },
  {
    title: 'From a little fight to a good ending.',
    kicker: 'Curug Ciampea',
    text: 'Ini kita tracking ke Curug Ciampea. Ya, ada sedikit marahan di jalan. Tapi akhirnya tetap berakhir baik. Mungkin memang begitu—bukan soal tidak pernah beda, tapi soal tetap memilih untuk menyelesaikan.',
    image: 'assets/foto-7.jpg'
  },
  {
    title: 'Bad mood → surprise.',
    kicker: '18th Birthday',
    text: 'Ini ulang tahun Dewa ke-18 di-surprise-in wkwk. Awalnya bad mood gara-gara pura-pura nggak ingat. Ternyata justru dari situ kejutan terbaik muncul.',
    image: 'assets/foto-8.jpg'
  },
  {
    title: 'What a beautiful day.',
    kicker: 'Special Day',
    text: 'Ini kemarin ulang tahun Kak Cici ke-20. Merayakannya dengan banyak hal, banyak tawa, dan banyak momen. What a beautiful day—and definitely one worth keeping.',
    image: 'assets/foto-9.jpg'
  }
];

const modal = document.getElementById('memoryModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalKicker = document.getElementById('modalKicker');
const modalText = document.getElementById('modalText');
const modalNumber = document.getElementById('modalNumber');
const modalClose = document.getElementById('modalClose');
const prevButton = document.getElementById('prevMemory');
const nextButton = document.getElementById('nextMemory');
let currentIndex = 0;

function showMemory(index) {
  currentIndex = (index + memories.length) % memories.length;
  const item = memories[currentIndex];
  modalImage.src = item.image;
  modalImage.alt = item.title;
  modalTitle.textContent = item.title;
  modalKicker.textContent = item.kicker;
  modalText.textContent = item.text;
  modalNumber.textContent = String(currentIndex + 1).padStart(2, '0');
}

function openMemory(index) {
  showMemory(index);
  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeMemory() {
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.querySelectorAll('.memory-card').forEach((card) => {
  card.addEventListener('click', () => openMemory(Number(card.dataset.index)));
});

modalClose.addEventListener('click', closeMemory);
document.querySelector('.modal-backdrop').addEventListener('click', closeMemory);
prevButton.addEventListener('click', () => showMemory(currentIndex - 1));
nextButton.addEventListener('click', () => showMemory(currentIndex + 1));

document.addEventListener('keydown', (event) => {
  if (!modal.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeMemory();
  if (event.key === 'ArrowLeft') showMemory(currentIndex - 1);
  if (event.key === 'ArrowRight') showMemory(currentIndex + 1);
});

const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');
const musicLabel = document.getElementById('musicLabel');
const musicIcon = document.getElementById('musicIcon');

musicToggle.addEventListener('click', async () => {
  if (bgMusic.paused) {
    try {
      await bgMusic.play();
      musicToggle.classList.add('is-playing');
      musicLabel.textContent = 'Musik On';
      musicIcon.textContent = '♫';
    } catch (error) {
      alert('Tambahkan file lagu "sempurna.mp3" ke folder assets terlebih dahulu.');
    }
  } else {
    bgMusic.pause();
    musicToggle.classList.remove('is-playing');
    musicLabel.textContent = 'Musik Off';
    musicIcon.textContent = '♪';
  }
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

// Fallback placeholder ketika foto belum dimasukkan.
document.querySelectorAll('img').forEach((img) => {
  img.addEventListener('error', () => {
    img.src = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#123523"/><stop offset="1" stop-color="#040705"/></linearGradient></defs>
        <rect width="1200" height="900" fill="url(#g)"/>
        <text x="50%" y="46%" text-anchor="middle" fill="#d9be70" font-family="Georgia" font-size="50">your golden memory</text>
        <text x="50%" y="54%" text-anchor="middle" fill="#9eaaa0" font-family="Arial" font-size="22">masukkan foto ke folder assets</text>
      </svg>`);
    img.alt = 'Placeholder foto';
  }, { once: true });
});
