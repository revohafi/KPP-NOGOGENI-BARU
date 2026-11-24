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

