// Проявление при скролле
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal_visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
);

document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

// Мобильное меню
const burger = document.getElementById('burger');
const nav = document.querySelector('.nav');

burger.addEventListener('click', () => {
  const open = nav.classList.toggle('nav_open');
  burger.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.nav__links a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('nav_open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// Аккордеоны: плавное раскрытие по высоте, один открытый на группу
function setupAccordion(rootId) {
  const root = document.getElementById(rootId);
  if (!root) return;

  root.querySelectorAll('.acc__item').forEach((item) => {
    const head = item.querySelector('.acc__head');
    const body = item.querySelector('.acc__body');

    head.addEventListener('click', () => {
      const isOpen = item.classList.contains('acc__item_open');

      root.querySelectorAll('.acc__item_open').forEach((open) => {
        open.classList.remove('acc__item_open');
        open.querySelector('.acc__body').style.maxHeight = '0';
        open.querySelector('.acc__head').setAttribute('aria-expanded', 'false');
      });

      if (!isOpen) {
        item.classList.add('acc__item_open');
        body.style.maxHeight = body.scrollHeight + 'px';
        head.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

setupAccordion('stylesAcc');
setupAccordion('faqAcc');

// Слайдер работ: кросс-фэйд 1.5s, авто-смена, пауза при наведении
const sliderStage = document.querySelector('.slider__stage');
const slides = [...document.querySelectorAll('.slider__img')];
const labels = [...document.querySelectorAll('.slider__label')];
let current = 0;
let timer = null;

function goTo(n) {
  slides[current].classList.remove('is-active');
  labels[current].classList.remove('is-active');
  current = n;
  slides[current].classList.add('is-active');
  labels[current].classList.add('is-active');
}

function next() { goTo((current + 1) % slides.length); }

function startAuto() {
  stopAuto();
  timer = setInterval(next, 4000);
}

function stopAuto() {
  if (timer) clearInterval(timer);
  timer = null;
}

labels.forEach((label) => {
  label.addEventListener('click', () => {
    goTo(Number(label.dataset.slide));
    startAuto();
  });
});

sliderStage.addEventListener('mouseenter', stopAuto);
sliderStage.addEventListener('mouseleave', startAuto);
startAuto();

// Форма записи: заглушка без бэкенда, честное поведение
const form = document.getElementById('bookingForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!form.checkValidity()) {
    status.textContent = 'Заполните имя, телефон и поставьте галочку согласия.';
    return;
  }

  status.textContent = 'Заявка сформирована (заглушка: отправка на сервер пока не подключена).';
  form.reset();
});
