let currentPage = 1;
let opened = false;

const envelope = document.getElementById("envelope");
const musicMain = document.getElementById("musicMain");
const musicPage3 = document.getElementById("musicPage3");

/* ===== ENVELOPE CLICK ===== */
envelope.addEventListener("click", () => {
  if (opened) return;

  envelope.classList.add("open");

  musicMain.play().catch(err => {
    console.log("Music blocked:", err);
  });

  opened = true;
});

/* ===== PAGE SWITCH ===== */
function goPage(page) {
  document.querySelectorAll(".page").forEach(p => p.classList.remove("active"));
  document.getElementById("page" + page).classList.add("active");

  if (page === 3) {
    musicMain.pause();
    musicMain.currentTime = 0;
    musicPage3.play().catch(() => {});
  } else {
    musicPage3.pause();
    musicPage3.currentTime = 0;
    if (opened) musicMain.play().catch(() => {});
  }

  currentPage = page;
}

/* ===== POPUP FOTO ===== */
function openPopup(img, text) {
  document.getElementById("popup").style.display = "flex";
  document.getElementById("popup-img").src = img.src;
  document.getElementById("popup-text").innerText = text;
}

function closePopup() {
  document.getElementById("popup").style.display = "none";
}

/* ===== SWIPE MOBILE ===== */
let startX = 0;

document.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.addEventListener("touchend", e => {
  let diff = startX - e.changedTouches[0].clientX;

  if (Math.abs(diff) > 60) {
    if (diff > 0 && currentPage < 3) goPage(currentPage + 1);
    if (diff < 0 && currentPage > 1) goPage(currentPage - 1);
  }
});


function goPage(page) {
  if (page === currentPage) return;

  document.querySelectorAll('.page').forEach(p => {
    p.classList.remove('active');
  });

  document.getElementById('page' + page).classList.add('active');
  currentPage = page;

  // MUSIC CONTROL
  musicMain.pause();
  musicPage3.pause();

  if (page === 3) {
    musicPage3.play().catch(()=>{});
  } else {
    musicMain.play().catch(()=>{});
  }

  window.scrollTo(0, 0);
}
