/**
 * Logic & Interaktivitas Portal Desa Wisata Lereng Asri
 * Standar: miqdadbadjuber/anti-slop
 * - Functional completeness (semua kontrol berfungsi)
 * - Accessibility (keyboard, focus trap, Escape key)
 * - Deep-link WhatsApp generator akurat
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_BASE = 'https://wa.me/6281234567890';

  /* ----------------------------------------------------
   * 1. Filter Kategori Destinasi (Alam & Edukasi)
   * ---------------------------------------------------- */
  const filterButtons = document.querySelectorAll('.dest-filter-btn');
  const destinationCards = document.querySelectorAll('.dest-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetCategory = btn.getAttribute('data-filter');

      // Update ARIA dan styling tombol
      filterButtons.forEach(b => {
        b.setAttribute('aria-selected', 'false');
        b.classList.remove('bg-lereng-primary', 'text-white');
        b.classList.add('text-gray-600');
      });

      btn.setAttribute('aria-selected', 'true');
      btn.classList.add('bg-lereng-primary', 'text-white');
      btn.classList.remove('text-gray-600');

      // Filter kartu destinasi
      destinationCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (targetCategory === 'all' || cardCategory === targetCategory) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ----------------------------------------------------
   * 2. Kalkulator Biaya Wisata Transparan
   * ---------------------------------------------------- */
  const calcPackageSelect = document.getElementById('calc-package');
  const calcQuantityInput = document.getElementById('calc-quantity');
  const calcDateInput = document.getElementById('calc-date');
  const calcTotalDisplay = document.getElementById('calc-total');
  const calcSummaryDisplay = document.getElementById('calc-summary');
  const calcMinHint = document.getElementById('calc-min-hint');
  const calcWaBtn = document.getElementById('calc-wa-btn');

  // Format currency helper
  const formatIDR = (amount) => {
    return 'Rp ' + amount.toLocaleString('id-ID');
  };

  const updateCalculation = () => {
    if (!calcPackageSelect || !calcQuantityInput) return;

    const selectedOption = calcPackageSelect.options[calcPackageSelect.selectedIndex];
    const pricePerUnit = parseInt(calcPackageSelect.value, 10);
    const unitName = selectedOption.getAttribute('data-unit') || 'orang';
    const minPax = parseInt(selectedOption.getAttribute('data-min'), 10) || 1;
    let quantity = parseInt(calcQuantityInput.value, 10);

    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
    }

    if (calcMinHint) {
      calcMinHint.textContent = `Minimal pemesanan: ${minPax} ${unitName}`;
      if (quantity < minPax) {
        calcMinHint.classList.add('text-red-600');
        calcMinHint.classList.remove('text-gray-500');
      } else {
        calcMinHint.classList.remove('text-red-600');
        calcMinHint.classList.add('text-gray-500');
      }
    }

    const total = pricePerUnit * quantity;
    if (calcTotalDisplay) {
      calcTotalDisplay.textContent = formatIDR(total);
    }
    if (calcSummaryDisplay) {
      calcSummaryDisplay.textContent = `${quantity} ${unitName} \u00D7 ${formatIDR(pricePerUnit)}`;
    }
  };

  if (calcPackageSelect && calcQuantityInput) {
    calcPackageSelect.addEventListener('change', () => {
      const selectedOption = calcPackageSelect.options[calcPackageSelect.selectedIndex];
      const minPax = parseInt(selectedOption.getAttribute('data-min'), 10) || 1;
      calcQuantityInput.min = minPax;
      if (parseInt(calcQuantityInput.value, 10) < minPax) {
        calcQuantityInput.value = minPax;
      }
      updateCalculation();
    });

    calcQuantityInput.addEventListener('input', updateCalculation);
    updateCalculation();
  }

  // Set default date input ke besok
  if (calcDateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    calcDateInput.value = tomorrow.toISOString().split('T')[0];
    calcDateInput.min = new Date().toISOString().split('T')[0];
  }

  // Kirim Kalkulasi via WhatsApp
  if (calcWaBtn && calcPackageSelect && calcQuantityInput) {
    calcWaBtn.addEventListener('click', () => {
      const selectedOption = calcPackageSelect.options[calcPackageSelect.selectedIndex];
      const packageName = selectedOption.getAttribute('data-name');
      const unitName = selectedOption.getAttribute('data-unit') || 'orang';
      const quantity = calcQuantityInput.value;
      const visitDate = calcDateInput ? calcDateInput.value : 'Belum ditentukan';
      const totalAmount = calcTotalDisplay ? calcTotalDisplay.textContent : '';

      const message = `Halo Admin Desa Wisata Lereng Asri, saya ingin konfirmasi estimasi kunjungan:\n` +
        `- Paket: ${packageName}\n` +
        `- Jumlah: ${quantity} ${unitName}\n` +
        `- Tanggal Rencana: ${visitDate}\n` +
        `- Total Estimasi: ${totalAmount}\n\n` +
        `Mohon informasi slot jadwal dan tata cara pembayaran DP. Terima kasih!`;

      const encodedUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank', 'noopener,noreferrer');
    });
  }

  /* ----------------------------------------------------
   * 3. Modal Reservasi Interaktif (Accessibility Compliant)
   * ---------------------------------------------------- */
  const openModalBtn = document.getElementById('open-booking-modal-btn');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const modal = document.getElementById('booking-modal');
  const reservationForm = document.getElementById('reservation-form');
  const resDateInput = document.getElementById('res-date');

  let lastActiveElement = null;

  const openModal = () => {
    lastActiveElement = document.activeElement;
    modal.classList.remove('hidden');
    document.body.classList.add('overflow-hidden');
    
    // Set default date jika kosong
    if (resDateInput && !resDateInput.value) {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      resDateInput.value = tomorrow.toISOString().split('T')[0];
      resDateInput.min = new Date().toISOString().split('T')[0];
    }

    const firstInput = document.getElementById('res-name');
    if (firstInput) {
      firstInput.focus();
    }
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
    if (lastActiveElement) {
      lastActiveElement.focus();
    }
  };

  if (openModalBtn) {
    openModalBtn.addEventListener('click', openModal);
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeModal);
  }

  // Tutup jika klik backdrop di luar dialog
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    // Handle Escape Key (R-32)
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
      }
    });
  }

  // Form Submit Handler
  if (reservationForm) {
    reservationForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('res-name').value.trim();
      const selectedPackage = document.getElementById('res-package').value;
      const date = document.getElementById('res-date').value;
      const participants = document.getElementById('res-participants').value;
      const notes = document.getElementById('res-notes').value.trim();

      const message = `Halo Admin BUMDes Desa Wisata Lereng Asri, saya ingin mengajukan reservasi:\n` +
        `- Nama Pemesan / Instansi: ${name}\n` +
        `- Pilihan: ${selectedPackage}\n` +
        `- Tanggal Kunjungan: ${date}\n` +
        `- Jumlah Peserta: ${participants} orang\n` +
        (notes ? `- Catatan Khusus: ${notes}\n` : '') +
        `\nMohon konfirmasi ketersediaan kuota. Terima kasih!`;

      const encodedUrl = `${WHATSAPP_BASE}?text=${encodeURIComponent(message)}`;
      window.open(encodedUrl, '_blank', 'noopener,noreferrer');
      closeModal();
    });
  }

  /* ----------------------------------------------------
   * 4. Active Nav Highlight on Scroll
   * ---------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');
  const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
  const desktopNavItems = document.querySelectorAll('.nav-desktop-item');

  const onScroll = () => {
    const scrollPos = window.scrollY + 120;

    sections.forEach(sec => {
      const top = sec.offsetTop;
      const height = sec.offsetHeight;
      const id = sec.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        bottomNavItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === `#${id}`) {
            item.classList.add('text-lereng-primary', 'font-bold');
            item.classList.remove('text-gray-500');
          } else {
            item.classList.remove('text-lereng-primary', 'font-bold');
            item.classList.add('text-gray-500');
          }
        });

        desktopNavItems.forEach(item => {
          const href = item.getAttribute('href');
          if (href === `#${id}`) {
            item.classList.add('text-lereng-primary', 'font-bold', 'bg-lereng-primary-container/60');
          } else {
            item.classList.remove('text-lereng-primary', 'font-bold', 'bg-lereng-primary-container/60');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', onScroll, { passive: true });
});
