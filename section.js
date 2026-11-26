//  Header //

const header = document.querySelector("header"); // Sesuaikan jika pakai class, misal ".navbar"
let lastScrollY = window.scrollY;

window.addEventListener("scroll", () => {
  const currentScrollY = window.scrollY;

  // Tambah background saat scroll melewati area paling atas
  if (currentScrollY > 50) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

  // Jika scroll ke bawah (currentScrollY > lastScrollY) & sudah lewat 100px -> sembunyikan
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    header.classList.add("hide");
  } else {
    // Jika scroll ke atas -> munculkan kembali
    header.classList.remove("hide");
  }

  lastScrollY = currentScrollY;
});

// Pindah ke halaman TEAM.html saat elemen diklik
document.addEventListener("DOMContentLoaded", () => {
  const btnTeam = document.getElementById("btnTeam");
  const btnHome = document.getElementById("btnHome");
  const btnCars = document.getElementById("btnCars");

  if (btnTeam) {
    btnTeam.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "TEAM.html";
    });
  }

  if (btnHome) {
    btnHome.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "section.html";
    });
  }
if (btnCars) {
    btnCars.addEventListener("click", (e) => {
      e.preventDefault();
      window.location.href = "CARS.html";
    });
  }


  //  Animasi Counter Angka (USD 0,00 -> Target) saat masuk layar
  const counters = document.querySelectorAll(".counter");
  let counterStarted = false;

  const startCounters = () => {
    counters.forEach((counter) => {
      const target = parseFloat(counter.dataset.target);
      const decimals = parseInt(counter.dataset.decimals, 10);
      const totalFrames = 60;
      let frame = 0;

      const timer = setInterval(() => {
        frame++;
        const current = (target * (frame / totalFrames)).toFixed(decimals);
        counter.textContent = current.replace(".", ",");

        if (frame >= totalFrames) {
          counter.textContent = target.toFixed(decimals).replace(".", ",");
          clearInterval(timer);
        }
      }, 25);
    });
  };

  const metricsObserver = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting && !counterStarted) {
        counterStarted = true;
        startCounters();
      }
    },
    { threshold: 0.4 }
  );

  const metricsSection = document.getElementById("metricsSection");
  if (metricsSection) metricsObserver.observe(metricsSection);
});

document.addEventListener("DOMContentLoaded", () => {
  // Data anggota tim sesuai urutan di video
  const teamMembers = [
    {
      name: "NOGOGENI  I",
      image: "png/nogogeni-1.png",
    },
    {
      name: "PANCASONA",
      image: "png/nogogeni-pancasona.jpg",
    },
    {
      name: "NOGOGENI  II",
      image: "png/nogogeni-2.jpg",
    },
    {
      name: "NOGOGENI  III  EVO",
      image: "png/nogogeni-3.png",
    },
    {
      name: "NOGOGENI  IV  EVO",
      image: "png/nogogeni-4.png",
    },
    {
      name: "NOGOGENI  V  EVO",
      image: "png/nogogeni-5.png",
    },
    {
      name: "NOGOGENI  VI  EVO",
      image: "png/nogogeni-6.png",
    },
     {
      name: "NOGOGENI  VII  EVO",
      image: "png/nogogeni-7.png",
    },
     {
      name: "NOGOGENI  VIII  EVO",
      image: "png/nogogeni-8.png",
    },
      {
      name: "NOGOGENI  IX  EVO",
      image: "png/nogogeni-9.jpg",
    },
     {
      name: "NOGOGENI  X  EVO",
      image: "png/nogogeni-10.png",
    },
    
    
  ];

  const stage = document.getElementById("carouselStage");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  let activeIndex = 1; // Mulai di Pierre Waché (index 1)

  // Render seluruh elemen kartu ke dalam stage
  const cardElements = teamMembers.map((member, index) => {
    const card = document.createElement("article");
    card.className = "member-card";
    card.innerHTML = `
      <div class="member-photo-box">
        <img src="${member.image}" alt="${member.name}" />
      </div>
      <div class="member-meta">
        <span class="member-name">${member.name}</span>
        <a href="${member.profileUrl}" class="btn-view-profile">View Profile</a>
      </div>
    `;

    // Klik kartu samping kiri/kanan untuk menggeser ke tengah
    card.addEventListener("click", () => {
      if (index !== activeIndex) {
        activeIndex = index;
        updateCarousel();
      }
    });

    stage.appendChild(card);
    return card;
  });

  // Hitung jarak relatif melingkar (circular offset) untuk setiap kartu
  function getCircularOffset(index, current, total) {
    let diff = index - current;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  }

  function updateCarousel() {
    const total = cardElements.length;

    cardElements.forEach((card, index) => {
      const offset = getCircularOffset(index, activeIndex, total);

      card.classList.remove(
        "is-center",
        "is-left",
        "is-right",
        "is-far-left",
        "is-far-right"
      );

      if (offset === 0) {
        card.classList.add("is-center");
      } else if (offset === -1) {
        card.classList.add("is-left");
      } else if (offset === 1) {
        card.classList.add("is-right");
      } else if (offset < -1) {
        card.classList.add("is-far-left");
      } else {
        card.classList.add("is-far-right");
      }
    });
  }

  // Event tombol panah kanan & kiri
  nextBtn.addEventListener("click", () => {
    activeIndex = (activeIndex + 1) % teamMembers.length;
    updateCarousel();
  });

  prevBtn.addEventListener("click", () => {
    activeIndex = (activeIndex - 1 + teamMembers.length) % teamMembers.length;
    updateCarousel();
  });

  // Dukungan navigasi tombol panah keyboard
  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") nextBtn.click();
    if (e.key === "ArrowLeft") prevBtn.click();
  });

  // Inisialisasi posisi awal
  updateCarousel();
});


document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const navLinks = document.getElementById('navLinks');

  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
  }

  // 2. Interactive YouTube Embed Loader ("The Fuel of Our Success")
  const videoPoster = document.getElementById('videoPoster');
  const videoIframeContainer = document.getElementById('videoIframeContainer');
  // Ganti ID video YouTube di bawah dengan ID video profil resmi Nogogeni ITS
  const YOUTUBE_VIDEO_ID = 'dQw4w9WgXcQ';

  if (videoPoster && videoIframeContainer) {
    videoPoster.addEventListener('click', () => {
      videoPoster.style.display = 'none';
      videoIframeContainer.style.display = 'block';
      videoIframeContainer.innerHTML = `
        <iframe 
          src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0" 
          title="Nogogeni ITS Team Profile 2026"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
      `;
    });
  }

  // 3. Touch / Click Support untuk Kartu Notable Figures (Mobile & Desktop)
  const figureCards = document.querySelectorAll('.figure-card');
  figureCards.forEach((card) => {
    card.addEventListener('click', () => {
      const isAlreadyActive = card.classList.contains('active');
      figureCards.forEach((c) => c.classList.remove('active'));
      if (!isAlreadyActive) {
        card.classList.add('active');
      }
    });
  });

  // 4. Sponsor Carousel Prev / Next Controls
  const sponsorTrack = document.getElementById('sponsorTrack');
  const sponsorPrev = document.getElementById('sponsorPrev');
  const sponsorNext = document.getElementById('sponsorNext');

  if (sponsorTrack && sponsorPrev && sponsorNext) {
    sponsorNext.addEventListener('click', () => {
      const firstItem = sponsorTrack.firstElementChild;
      if (firstItem) {
        sponsorTrack.appendChild(firstItem);
      }
    });

    sponsorPrev.addEventListener('click', () => {
      const lastItem = sponsorTrack.lastElementChild;
      if (lastItem) {
        sponsorTrack.insertBefore(lastItem, sponsorTrack.firstElementChild);
      }
    });
  }
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll-to-top button in footer
  const scrollToTopBtn = document.getElementById('scrollToTop');
  if (scrollToTopBtn) {
    scrollToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 2. Image Zoom Lightbox Functionality
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.querySelector('.lightbox-close');
  const zoomButtons = document.querySelectorAll('.zoom-btn');

  zoomButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const wrapper = btn.closest('.image-wrapper');
      const img = wrapper.querySelector('img');
      if (img && lightboxModal && lightboxImg) {
        lightboxImg.src = img.src;
        lightboxModal.classList.add('active');
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightboxModal.classList.remove('active');
    });
  }

  if (lightboxModal) {
    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
      }
    });
  }

  const YOUTUBE_VIDEO_ID = 'pD9bQoGzoX0';

if (videoPoster && videoIframeContainer) {
  videoPoster.addEventListener('click', () => {
    videoPoster.style.display = 'none';
    videoIframeContainer.style.display = 'block';
    videoIframeContainer.innerHTML = `
      <iframe
        src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0"
        title="Nogogeni ITS Team Profile"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen>
      </iframe>
    `;
  });
}
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Switcher untuk Pill Tabs (Subholding vs AP & Services, News vs Magazine)
  const tabGroups = document.querySelectorAll('.tab-pills');

  tabGroups.forEach(group => {
    const buttons = group.querySelectorAll('.pill-btn');

    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset active state di grup yang sama
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);

        // Jika panel tab tersedia (seperti pada Grup Bisnis Kami)
        if (targetPanel) {
          const parentSection = group.closest('section');
          parentSection.querySelectorAll('.tab-panel').forEach(panel => {
            panel.classList.remove('active');
          });
          targetPanel.classList.add('active');
        }
      });
    });
  });

  // 2. Switcher untuk Sub-Tabs Berita (Siaran Pers, Berita CSR, Berita Energi)
  const subTabButtons = document.querySelectorAll('.sub-tab-btn');
  const newsTags = document.querySelectorAll('.news-tag');

  subTabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      subTabButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const categoryLabel = btn.textContent.trim().toUpperCase();

      // Update label kategori pada kartu berita sebagai simulasi filter dinamis
      newsTags.forEach(tag => {
        tag.textContent = categoryLabel;
      });
    });
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 1. Sticky Navbar muncul saat scroll ke atas (seperti di detik 0:24 - 0:30 video)
  const navbar = document.getElementById('navbar');
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 300 && currentScrollY < lastScrollY) {
      navbar.classList.add('visible');
    } else if (currentScrollY > lastScrollY || currentScrollY <= 150) {
      navbar.classList.remove('visible');
    }

    lastScrollY = currentScrollY;
  });

  // 2. Toggle Menu Mobile
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const navMenu = document.getElementById('navMenu');

  if (mobileMenuBtn && navMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      navMenu.classList.toggle('open');
    });
  }

  // 3. Animasi Counter Angka (USD 75,33 Miliar, USD 3,13 Miliar, 23,1)
  const counters = document.querySelectorAll('.counter');
  let counterStarted = false;

  const runCounters = () => {
    counters.forEach((counter) => {
      const target = parseFloat(counter.getAttribute('data-target'));
      const decimals = parseInt(counter.getAttribute('data-decimals'), 10) || 0;
      const duration = 1600; // 1.6 detik
      const startTime = performance.now();

      const updateNumber = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Easing out cubic agar melambat halus saat mendekati angka akhir
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = (target * eased).toFixed(decimals);

        // Format titik menjadi koma sesuai standar Indonesia di video (75,33)
        counter.textContent = current.replace('.', ',');

        if (progress < 1) {
          requestAnimationFrame(updateNumber);
        } else {
          counter.textContent = target.toFixed(decimals).replace('.', ',');
        }
      };

      requestAnimationFrame(updateNumber);
    });
  };

  const statsSection = document.getElementById('statsSection');
  if (statsSection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !counterStarted) {
            counterStarted = true;
            runCounters();
          }
        });
      },
      { threshold: 0.35 }
    );
    observer.observe(statsSection);
  }

  // 4. Interaksi Kartu & Tombol Panah Hubungan Investor
  const investorCards = document.querySelectorAll('.investor-card');
  const invPrev = document.getElementById('invPrev');
  const invNext = document.getElementById('invNext');
  let activeIndex = 0;

  const setActiveInvestorCard = (index) => {
    investorCards.forEach((card, idx) => {
      card.classList.toggle('active', idx === index);
    });
  };

  investorCards.forEach((card, idx) => {
    card.addEventListener('mouseenter', () => {
      activeIndex = idx;
      setActiveInvestorCard(activeIndex);
    });
  });

  if (invNext && invPrev && investorCards.length > 0) {
    invNext.addEventListener('click', () => {
      activeIndex = (activeIndex + 1) % investorCards.length;
      setActiveInvestorCard(activeIndex);
    });

    invPrev.addEventListener('click', () => {
      activeIndex = (activeIndex - 1 + investorCards.length) % investorCards.length;
      setActiveInvestorCard(activeIndex);
    });
  }
});