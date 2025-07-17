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
  labelMid.style.top = (topOffset + lineHeight/17.5) + "px";
  labelMid.style.transform = "translateY(-50%)";
  labelMid2.style.top = (topOffset + lineHeight/2.22) + "px";
  labelMid2.style.transform = "translateY(-50%)";
  labelMid3.style.top = (topOffset + lineHeight/1.4) + "px";
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