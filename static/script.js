let prevScroll = window.scrollY;
const navbar = document.querySelector('.navbar');
const navbar_menu=document.querySelector('.navbar-menu');
const menuicon=document.querySelector('#menu-toggle');

window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;

  if (currentScroll > prevScroll && currentScroll > 60) {
    navbar.classList.add('hidden');
    navbar_menu.classList.add('hidden');
    if (menuicon.checked==true){
           setTimeout(() => {
             menuicon.checked=false; 
           }, 400); }

    

  } else {
    navbar.classList.remove('hidden');
    navbar_menu.classList.remove('hidden');
  }

  prevScroll = currentScroll;
});


document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll('.decrypted-cycle');

  elements.forEach((el) => {
    const words = JSON.parse(el.dataset.words);
    const speed = parseInt(el.dataset.speed || 100);
    const characters = el.dataset.characters || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const revealDirection = el.dataset.revealDirection || 'start';

    let wordIndex = 0;
    let revealedIndices = new Set();
    let isScrambling = false;

    const getNextIndex = (revealed, len) => {
      switch (revealDirection) {
        case 'end': return len - 1 - revealed.size;
        case 'center': {
          const mid = Math.floor(len / 2);
          const offset = Math.floor(revealed.size / 2);
          return revealed.size % 2 === 0 ? mid + offset : mid - offset - 1;
        }
        default: return revealed.size;
      }
    };

    const shuffleText = (original, revealed) => {
      return original.split('').map((char, i) => {
        if (char === ' ') return ' ';
        if (revealed.has(i)) return original[i];
        return characters.charAt(Math.floor(Math.random() * characters.length));
      }).join('');
    };

    const renderText = (textStr) => {
      el.innerHTML = '';
      textStr.split('').forEach((char, i) => {
        const span = document.createElement('span');
        span.textContent = char;
        span.className = revealedIndices.has(i) || !isScrambling ? 'revealed' : 'encrypted';
        el.appendChild(span);
      });
    };

    const animateText = (text) => {
      revealedIndices = new Set();
      isScrambling = true;
      let iteration = 0;

      const interval = setInterval(() => {
        if (revealedIndices.size < text.length) {
          const nextIndex = getNextIndex(revealedIndices, text.length);
          revealedIndices.add(nextIndex);
          renderText(shuffleText(text, revealedIndices));
        } else {
          clearInterval(interval);
          renderText(text);
          isScrambling = false;
        }

        if (iteration++ > 30) {
          clearInterval(interval);
          renderText(text);
          isScrambling = false;
        }
      }, speed);
    };

    const cycleWords = () => {
      const currentWord = words[wordIndex];
      animateText(currentWord);
      wordIndex = (wordIndex + 1) % words.length;
    };

    // Start immediately
    cycleWords();

    // Cycle every 5 seconds
    setInterval(cycleWords, 2000);
  });
});






// BLOB CURSOR LOGIC
const config = {
  trailCount: 3,                    // number of trailing blobs
  sizes: [28, 73, 34],              // outer blob size (small like a cursor)
  innerSizes: [8, 15, 11],            // tiny center dots
  fillColor: "#800080",            // purple outer blob
  innerColor: "#800080",           // purple inner dot
  opacities: [0.5, 0.5, 0.5],             // fully opaque
  shadowColor: "rgba(128, 0, 128, 0.3)", // soft purple glow
  shadowBlur: 5,                    // subtle glow
  shadowOffsetX: 10,
  shadowOffsetY: 10,
  fastDuration: 0.1,
  slowDuration: 0.5,
  fastEase: "power3.out",
  slowEase: "power1.out",
};


const container = document.getElementById("blob-cursor-container");
const main = document.createElement("div");
main.className = "blob-main";
container.appendChild(main);

const blobs = [];

for (let i = 0; i < config.trailCount; i++) {
  const blob = document.createElement("div");
  blob.className = "blob";
  blob.style.width = `${config.sizes[i]}px`;
  blob.style.height = `${config.sizes[i]}px`;
  blob.style.borderRadius = "50%";
  blob.style.backgroundColor = config.fillColor;
  blob.style.opacity = config.opacities[i];
  blob.style.boxShadow = `${config.shadowOffsetX}px ${config.shadowOffsetY}px ${config.shadowBlur}px ${config.shadowColor}`;

  const inner = document.createElement("div");
  inner.className = "inner-dot";
  inner.style.width = `${config.innerSizes[i]}px`;
  inner.style.height = `${config.innerSizes[i]}px`;
  inner.style.backgroundColor = config.innerColor;
  inner.style.borderRadius = "50%";
  inner.style.left = `${(config.sizes[i] - config.innerSizes[i]) / 2}px`;
  inner.style.top = `${(config.sizes[i] - config.innerSizes[i]) / 2}px`;

  blob.appendChild(inner);
  main.appendChild(blob);
  blobs.push(blob);
}

function handleMove(e) {
  const x = e.clientX || (e.touches && e.touches[0].clientX);
  const y = e.clientY || (e.touches && e.touches[0].clientY);

  blobs.forEach((blob, i) => {
    const isLead = i === 0;
    const offset = config.sizes[i] / 2;
    gsap.to(blob, {
      x: x - offset,
      y: y - offset,
      duration: isLead ? config.fastDuration : config.slowDuration,
      ease: isLead ? config.fastEase : config.slowEase,
    });
  });
}

window.addEventListener("mousemove", handleMove);
window.addEventListener("touchmove", handleMove);






function updateNickTimeline() {
  const container = document.querySelector('.nick-timeline-container');
  const line = container.querySelector('.nick-timeline-line');
  const circleTop = container.querySelector('.nick-timeline-circle-top');
  const circleBottom = container.querySelector('.nick-timeline-circle-bottom');
  const labelTop = container.querySelector('.nick-timeline-label-top');
  const labelMid = container.querySelector('.nick-timeline-label-mid');
  const labelMid2 = container.querySelector('.nick-timeline-label-mid2');
  const labelMid3 = container.querySelector('.nick-timeline-label-mid3');
  const labelBottom = container.querySelector('.nick-timeline-label-bottom');
  
  const docHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );
  
  // The vertical line should start 100px from the top and end 100px above the bottom
  const topOffset = 400;
  const bottomOffset = 500;
  const lineHeight = docHeight - topOffset - bottomOffset;

  // Set line
  line.style.top = topOffset + "px";
  line.style.height = lineHeight + "px";

  // Set circles
  const circleRadius = 7.5; // half of 18px
  circleTop.style.top = (topOffset - circleRadius + 1) + "px";
  circleBottom.style.top = (topOffset + lineHeight - circleRadius + 1) + "px";

  // Set labels
  labelTop.style.top = (topOffset - 2) + "px";
  labelMid.style.top = (topOffset + lineHeight/10) + "px";
  labelMid.style.transform = "translateY(-50%)";
  labelMid2.style.top = (topOffset + lineHeight/4.1) + "px";
  labelMid2.style.transform = "translateY(-50%)";
  labelMid3.style.top = (topOffset + lineHeight/1.9) + "px";
  labelMid3.style.transform = "translateY(-50%)";
  labelBottom.style.top = (topOffset + lineHeight - 2) + "px";
}

window.addEventListener('DOMContentLoaded', updateNickTimeline);
window.addEventListener('resize', updateNickTimeline);
window.addEventListener('scroll', updateNickTimeline);





document.querySelectorAll('.tilt-card').forEach(card => {
  let lastY = 0;
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    const rotateAmplitude = 12;
    const scaleOnHover = 1.04;

    const rotationX = (-offsetY / (rect.height / 2)) * rotateAmplitude;
    const rotationY = (offsetX / (rect.width / 2)) * rotateAmplitude;
    card.style.transform = `perspective(800px) rotateX(${rotationX}deg) rotateY(${rotationY}deg) scale(${scaleOnHover})`;

    lastY = offsetY;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
  card.addEventListener('mouseenter', () => {
    card.style.transition = 'transform 0.12s cubic-bezier(.25,.8,.25,1)';
  });
});




// last





 function updateLineNumbers() {
    const codeBlock = document.querySelector('.code-content code');
    const lineNumbers = document.getElementById('lineNumbers');
    if (!codeBlock || !lineNumbers) return;
      const computedStyle = window.getComputedStyle(codeBlock);
      const lineHeight = parseFloat(computedStyle.lineHeight);
      const height = codeBlock.offsetHeight;
      const lineCount = Math.round(height / lineHeight);
      const totalLines =lineCount

    lineNumbers.innerHTML = '';
    for (let i = 1; i <= totalLines; i++) {
      const line = document.createElement('span');
      line.textContent = i;
      lineNumbers.appendChild(line);
    }
  }

  window.addEventListener('DOMContentLoaded', updateLineNumbers);
  window.addEventListener('resize', updateLineNumbers);






document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  // Show overlay with loading message
  setTimeout(() => {
    showOverlay("Sending your message...");
  }, 500);
   form.reset();

  try {
    const response = await fetch('/contact', {
      method: 'POST',
      body: formData,
    });

    const text = await response.text();

    // Show response message


  
  } catch (err) {
    showOverlay("Something went wrong while sending your message.");
  }
});

function showOverlay(message) {
  const overlay = document.getElementById('overlay');
  const loader = document.getElementById('wifi-loader');
  overlay.style.display = 'flex';
  loader.style.display='flex';
  setTimeout(() => {
    loader.style.display='none';
    overlayMessage.style.display='flex';
  }, 2000);
}

function closeOverlay() {
  document.getElementById('overlay').style.display = 'none';
 document.getElementById('overlayMessage').style.display='none';

}

overlay.addEventListener('click', (e) => {
   if (e.target === overlay) {
      document.getElementById('overlay').style.display = 'none';
      document.getElementById('overlayMessage').style.display='none';

      }
    });








    

document.querySelectorAll('.work-card').forEach(card => {
  card.addEventListener('click', function (e) {
    e.preventDefault();

    const targetUrl = '/newpage'; // Modify per card if needed
    const rect = card.getBoundingClientRect();
    const scrollY = window.scrollY;
    const scrollX = window.scrollX;

    const originalTop = rect.top + scrollY;
    const originalLeft = rect.left + scrollX;

    const clone = card.cloneNode(true);
    clone.classList.add('card-active');

    // Style the cloned card
    clone.style.position = 'absolute';
    clone.style.top = `${originalTop}px`;
    clone.style.left = `${originalLeft}px`;
    clone.style.width = `${rect.width}px`;
    clone.style.height = `${rect.height}px`;
    clone.style.margin = '0';
    clone.style.zIndex = '99999';
    clone.style.transition = 'all 0.8s ease-in-out';
    clone.style.pointerEvents = 'none';

    document.body.appendChild(clone);
    card.style.visibility = 'hidden';

    // Add ❌ close button (top-right of screen)
    const closeBtn = document.createElement('div');
    closeBtn.className = 'page-close-btn';
    closeBtn.innerHTML = '&times;';
    document.body.appendChild(closeBtn);

    // Prevent scroll during animation
    document.body.style.overflow = 'hidden';

    // ✅ Calculate center relative to viewport + scroll
    const centerX = scrollX + window.innerWidth / 2 - rect.width / 2;
    const centerY = scrollY + window.innerHeight / 2 - rect.height / 2;

    requestAnimationFrame(() => {
      clone.style.transform = `translate(${centerX - originalLeft}px, ${centerY - originalTop}px) scale(1.05)`;
      clone.style.boxShadow = '0 0 40px rgba(255, 0, 255, 0.4)';
    });

    // Fade out everything else
    setTimeout(() => {
      document.body.classList.add('fade-out');
    }, 400);

    // Set redirect timer (you can uncomment if needed)
    const navTimeout = setTimeout(() => {
      // window.location.href = targetUrl;
    }, 1800);

    // ❌ Close logic — animate back to original position
    closeBtn.addEventListener('click', () => {
      clearTimeout(navTimeout);

      clone.style.transform = 'translate(0, 0) scale(1)';
      clone.style.boxShadow = 'none';

      setTimeout(() => {
        clone.remove();
        closeBtn.remove();
        card.style.visibility = 'visible';
        document.body.classList.remove('fade-out');
        document.body.style.overflow = '';
      }, 800);
    });
  });
});







function revealCards(cards, maxVisible, showMoreBtn, extraCallback = null) {
  const total = cards.length;

  // Hide button if cards are ≤ maxVisible
  if (total <= maxVisible) {
    showMoreBtn.style.display = "none";
    return;
  }

  // Hide extra cards with animation class
  cards.forEach((card, index) => {
    if (index >= maxVisible) {
      card.classList.add("hidden-card");
      card.style.display = "none";
    }
  });

  showMoreBtn.addEventListener("click", () => {
    cards.forEach((card, index) => {
      if (index >= maxVisible) {
        card.style.display = "flex"; // or "block" if needed
        setTimeout(() => {
          card.classList.add("visible-card");
        }, 50);
      }
    });

    // Show any extra elements like Continue text
    if (extraCallback) extraCallback();

    showMoreBtn.style.display = "none";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  // 🔹 Work Section
  const workCards = document.querySelectorAll("section#work a");
  const showMoreWorkBtn = document.getElementById("showMoreWorkBtn");
  if (workCards.length && showMoreWorkBtn) {
    revealCards(workCards, 6, showMoreWorkBtn);
  }

  // 🔹 Journey Section
  const journeyCards = document.querySelectorAll(".timeline-event");
  const showMoreJourneyBtn = document.getElementById("showMoreJourneyBtn");
  const continueText = document.querySelector(".timeline-point.bottom");

  if (journeyCards.length && showMoreJourneyBtn) {
    revealCards(journeyCards, 6, showMoreJourneyBtn, () => {
      if (continueText) continueText.style.display = "block";
    });

    // Hide continue text initially
    if (continueText) continueText.style.display = "none";
  }
});
















// script.js (append this at the bottom or integrate into your current script.js file)

document.addEventListener("DOMContentLoaded", () => {
  // === Show More Logic for WORK Section ===
  const workContainer = document.querySelector("#work .grid");
  const workItems = workContainer.querySelectorAll("a");
  const showMoreWorkBtn = document.getElementById("showMoreWorkBtn");
  const workShowMoreContainer = showMoreWorkBtn?.parentElement;

  if (workItems.length <= 6) {
    workShowMoreContainer.style.display = "none";
  } else {
    workItems.forEach((item, index) => {
      if (index >= 6) item.style.display = "none";
    });
    showMoreWorkBtn.style.display = "inline-block";
    workShowMoreContainer.style.display = "block";

    showMoreWorkBtn.addEventListener("click", () => {
      workItems.forEach((item, index) => {
        if (index >= 6) {
          item.style.display = "block";
          item.style.opacity = 0;
          item.style.transition = "opacity 0.6s ease";
          setTimeout(() => (item.style.opacity = 1), 50);
        }
      });
      showMoreWorkBtn.style.display = "none";
    });
  }

  // === Show More Logic for JOURNEY Section ===
  const journeyContainer = document.querySelector(".timeline-container");
  const journeyItems = journeyContainer.querySelectorAll(".timeline-event");
  const showMoreJourneyBtn = document.getElementById("showMoreJourneyBtn");
  const journeyShowMoreContainer = showMoreJourneyBtn?.parentElement;
  const bottomText = document.querySelector(".timeline-point.bottom");

  if (journeyItems.length <= 6) {
    journeyShowMoreContainer.style.display = "none";
  } else {
    journeyItems.forEach((item, index) => {
      if (index >= 6) item.style.display = "none";
    });
    showMoreJourneyBtn.style.display = "inline-block";
    journeyShowMoreContainer.style.display = "block";
    bottomText.style.display = "none";

    showMoreJourneyBtn.addEventListener("click", () => {
      journeyItems.forEach((item, index) => {
        if (index >= 6) {
          item.style.display = "flex";
          item.style.opacity = 0;
          item.style.transition = "opacity 0.6s ease";
          setTimeout(() => (item.style.opacity = 1), 50);
        }
      });
      bottomText.style.display = "block";
      showMoreJourneyBtn.style.display = "none";
    });
  }

  // === Scroll Reveal Animation ===
const revealElements = document.querySelectorAll("section:not(#hero), .timeline-event, .project-card, .content, .footer, .timeline-point, .card, .work-header-container, .about-container");

revealElements.forEach(el => {
  if (!el.closest("header")) {
    el.classList.add("scroll-hidden");
  }
});


  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("scroll-visible");
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  revealElements.forEach(el => observer.observe(el));
});
