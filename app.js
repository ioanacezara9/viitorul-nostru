
// Numărătoare inversă până la următoarea aniversare: 25 iulie 2027.
function updateAnniversaryCountdown() {
  const now = new Date();
  let target = new Date(now.getFullYear(), 6, 25, 0, 0, 0);
  if (now >= target) target = new Date(now.getFullYear() + 1, 6, 25, 0, 0, 0);

  const diff = Math.max(0, target.getTime() - now.getTime());
  const day = 24 * 60 * 60 * 1000;
  const hour = 60 * 60 * 1000;
  const minute = 60 * 1000;

  const days = Math.floor(diff / day);
  const hours = Math.floor((diff % day) / hour);
  const minutes = Math.floor((diff % hour) / minute);
  const seconds = Math.floor((diff % minute) / 1000);

  document.getElementById("countDays").textContent = String(days);
  document.getElementById("countHours").textContent = String(hours).padStart(2, "0");
  document.getElementById("countMinutes").textContent = String(minutes).padStart(2, "0");
  document.getElementById("countSeconds").textContent = String(seconds).padStart(2, "0");
  document.getElementById("countdownNote").textContent =
    days === 0 && hours === 0 && minutes === 0 && seconds === 0
      ? "La mulți ani nouă! Te iubesc! ♡"
      : "Fiecare secundă ne aduce mai aproape de încă o amintire. 💗";
}
updateAnniversaryCountdown();
setInterval(updateAnniversaryCountdown, 1000);

const reasons = [
  "Pentru zâmbetul tău",
  "Pentru că mă faci să râd... si eu rad rar ca prostu))",
  "Pentru că iubesc toate expresiile tale.",
  "Pentru că, atunci când sunt cu tine, lumea pare mai blândă.",
  "Pentru că fiecare experienta e mai frumoasă când ești lângă mine.",
  "Pentru că descopăr mereu ceva nou și minunat la tine.",
  "Pentru că vreau să adun alături de tine amintiri frumoase",
  "Pentru că, dintre toți oamenii din lume, eu te aleg pe tine. ♡"
];
let reasonIndex = 0;
const reasonText = document.getElementById("reasonText");
const reasonCount = document.getElementById("reasonCount");
document.getElementById("anotherReason").addEventListener("click", () => {
  reasonIndex = (reasonIndex + 1) % reasons.length;
  reasonText.animate([{opacity:0,transform:"translateY(7px)"},{opacity:1,transform:"translateY(0)"}],{duration:280});
  reasonText.textContent = reasons[reasonIndex];
  reasonCount.textContent = `${reasonIndex + 1} / ${reasons.length}`;
});

document.querySelectorAll("[data-target]").forEach(button => {
  button.addEventListener("click", () => {
    const target = document.getElementById(button.dataset.target);
    target?.scrollIntoView({behavior:"smooth",block:"start"});
  });
});

const captions = [
  "una dintre zilele mele preferate ♡","partea ta năzdrăvană ✿","razele mele de soare ești tu ☀",
  "clipa asta, pentru totdeauna","fețele mele preferate ♡","urmează și mai multe amintiri"
];
const lightbox = document.getElementById("lightbox");
document.querySelectorAll("[data-photo]").forEach(button => {
  button.addEventListener("click", () => {
    const i = Number(button.dataset.photo);
    document.getElementById("lightboxImage").src = `assets/memory-0${i+1}.jpg`;
    document.getElementById("lightboxCaption").textContent = captions[i];
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
  });
});
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");}
document.getElementById("closeLightbox").addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox();});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeLightbox();});

let secretOpened = false;
document.getElementById("openSecret").addEventListener("click", () => {
  if(secretOpened)return;
  secretOpened = true;
  document.getElementById("gift").textContent = "💞";
  document.getElementById("secretTitle").textContent = "O promisiune pentru viitorul nostru";
  document.getElementById("secretText").textContent = "Sper să continuăm să ne alegem unul pe celălalt, să adunăm povești haioase, să descoperim locuri noi și să găsim magie în zilele obișnuite. Acesta este doar începutul poveștii noastre, Oana. Te iubesc. ♡";
  document.getElementById("openSecret").textContent = "Și eu te iubesc ♡";
  document.getElementById("openSecret").disabled = true;
  document.getElementById("openSecret").style.opacity = ".75";
});

if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
  window.addEventListener("load", () => navigator.serviceWorker.register("./sw.js").catch(()=>{}));
}
