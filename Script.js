document.addEventListener('DOMContentLoaded', () => {
  initRecordButton();
  initSmoothScroll();
  initNavbarScroll();
  initAnimations();
});

function initRecordButton() {
  const recordButton = document.getElementById('recordButton');
  const durationDisplay = document.getElementById('duration');

  if (!recordButton || !durationDisplay) return;

  let isRecording = false;
  let seconds = 0;
  let interval = null;

  recordButton.addEventListener('click', () => {
    isRecording = !isRecording;

    if (isRecording) {
      recordButton.querySelector('span').textContent = 'Stop Recording';
      recordButton.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';

      interval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        durationDisplay.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      }, 1000);

      const statusDot = document.querySelector('.status-dot');
      if (statusDot) {
        statusDot.style.background = '#ef4444';
      }

      const statusValue = document.querySelector('.info-value');
      if (statusValue) {
        statusValue.childNodes[2].textContent = ' Recording';
      }
    } else {
      recordButton.querySelector('span').textContent = 'Start Recording';
      recordButton.style.background = 'linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))';

      clearInterval(interval);

      const statusDot = document.querySelector('.status-dot');
      if (statusDot) {
        statusDot.style.background = 'var(--color-success)';
      }

      const statusValue = document.querySelector('.info-value');
      if (statusValue) {
        statusValue.childNodes[2].textContent = ' Ready';
      }

      seconds = 0;
      durationDisplay.textContent = '00:00';
    }
  });
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');

      if (targetId === '#') return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navHeight = document.querySelector('.navbar').offsetHeight;
        const targetPosition = targetElement.offsetTop - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      navbar.style.background = 'rgba(10, 10, 15, 0.95)';
      navbar.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.3)';
    } else {
      navbar.style.background = 'rgba(10, 10, 15, 0.8)';
      navbar.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
  });
}

function initAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.feature-card, .token-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });

  animateWaveform();
}

function animateWaveform() {
  const waveBars = document.querySelectorAll('.wave-bar');
  if (waveBars.length === 0) return;

  waveBars.forEach((bar, index) => {
    setInterval(() => {
      const randomHeight = Math.random() * 70 + 30;
      bar.style.height = `${randomHeight}%`;
    }, 1000 + (index * 50));
  });
}

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
  button.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-2px)';
  });

  button.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});
