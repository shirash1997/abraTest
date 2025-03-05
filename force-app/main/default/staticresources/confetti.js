(function() {
  'use strict';

  function confetti(options) {
      var count = options.particleCount || 100;
      var spread = options.spread || 70;
      var origin = options.origin || { y: 0.6 };

      var canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0px';
      canvas.style.left = '0px';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '1000';
      document.body.appendChild(canvas);

      var ctx = canvas.getContext('2d');
      var particles = [];

      for (var i = 0; i < count; i++) {
          particles.push({
              x: window.innerWidth * origin.x,
              y: window.innerHeight * origin.y,
              angle: Math.random() * 2 * Math.PI,
              velocity: Math.random() * 10 + 2,
              size: Math.random() * 6 + 2,
              color: `hsl(${Math.random() * 360}, 100%, 50%)`,
              alpha: 1
          });
      }

      function animate() {
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.forEach((p, index) => {
              p.x += Math.cos(p.angle) * p.velocity;
              p.y += Math.sin(p.angle) * p.velocity;
              p.velocity *= 0.98;
              p.alpha -= 0.02;

              ctx.fillStyle = p.color;
              ctx.globalAlpha = p.alpha;
              ctx.beginPath();
              ctx.arc(p.x, p.y, p.size, 0, 2 * Math.PI);
              ctx.fill();

              if (p.alpha <= 0) particles.splice(index, 1);
          });

          if (particles.length) {
              requestAnimationFrame(animate);
          } else {
              document.body.removeChild(canvas);
          }
      }

      animate();
  }

  if (!window.confetti) {
      console.log('✅ Confetti script initialized');
      window.confetti = confetti; // הופך את הפונקציה לגלובלית
  }
})();
