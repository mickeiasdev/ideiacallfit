document.addEventListener("DOMContentLoaded", () => {
  // Lógica para o Menu Hambúrguer (Sanduíche)
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-menu ul li a");

  menuToggle.addEventListener("click", () => {
    // Alterna a classe 'active' no menu para mostrar/esconder
    navMenu.classList.toggle("active");
    // Alterna a classe 'menu-open' no botão para animar o ícone
    menuToggle.classList.toggle("menu-open");
  });

  // Fecha o menu quando um link é clicado (útil para navegação na mesma página)
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("menu-open");
      }
    });
  });

  // Lógica para o Acordeão do FAQ
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const answer = item.querySelector(".faq-answer");
      const isActive = item.classList.contains("active");

      // Fecha todos os outros antes de abrir
      faqItems.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("active");
          otherItem.querySelector(".faq-answer").style.maxHeight = 0;
          otherItem.querySelector(".faq-answer").style.padding = "0 20px";
        }
      });

      if (!isActive) {
        item.classList.add("active");
        answer.style.maxHeight = answer.scrollHeight + "px";
        answer.style.padding = "0 20px 20px";
      } else {
        item.classList.remove("active");
        answer.style.maxHeight = 0;
        answer.style.padding = "0 20px";
      }
    });
  });

  // Lógica para Animação de Surgimento (Reveal on Scroll)
  const revealElements = document.querySelectorAll(".reveal");
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add("visible");
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  revealElements.forEach((element) => {
    observer.observe(element);
  });
  const swiper = new Swiper(".results-carousel", {
    loop: true,
    grabCursor: true,
    slidesPerView: 1,
    spaceBetween: 30,

    // Navigation arrows
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 768px
      768: {
        slidesPerView: 2,
        spaceBetween: 30,
      },
      // when window width is >= 1024px
      1024: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
    },
  });

  // Lógica para os Sliders de Comparação de Imagem
  document.querySelectorAll(".comparison-slider").forEach((slider) => {
    const range = slider.querySelector(".slider-range");
    const afterImage = slider.querySelector(".after-image");
    const handle = slider.querySelector(".slider-handle");

    range.addEventListener("input", (e) => {
      const value = e.target.value;
      afterImage.style.clipPath = `inset(0 0 0 ${value}%)`;
      handle.style.left = `${value}%`;
    });
  });
});
