/* Countdown to a target date (7 days from load by default) */
(function(){
  const countdownEl = document.getElementById('countdown');
  const yearEl = document.getElementById('year');
  if(yearEl){ yearEl.textContent = new Date().getFullYear(); }

  const target = new Date();
  target.setDate(target.getDate() + 7);

  function pad(n){ return String(n).padStart(2,'0'); }
  function render(){
    const now = new Date();
    const ms = Math.max(0, target - now);
    const d = Math.floor(ms / (24*60*60*1000));
    const h = Math.floor((ms % (24*60*60*1000)) / (60*60*1000));
    const m = Math.floor((ms % (60*60*1000)) / (60*1000));
    const s = Math.floor((ms % (60*1000)) / 1000);
    if(countdownEl){ countdownEl.textContent = `${d}d ${pad(h)}h ${pad(m)}m ${pad(s)}s`; }
  }
  setInterval(render, 1000); render();
})();

/* Form -> WhatsApp funnel */
(function(){
  const form = document.getElementById('leadForm');
  if(!form) return;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    e.stopPropagation();
    form.classList.add('was-validated');
    if(!form.checkValidity()) return;

    const data = Object.fromEntries(new FormData(form).entries());
    const message = `Hola, quiero inscribirme a la Maestría en Ciencias Bíblicas.\n\nNombre: ${data.name}\nCorreo: ${data.email}\nTeléfono: ${data.phone}\nPaís: ${data.country}\nInterés: ${data.interest}`;
    const phoneIntl = '51940886264';
    const url = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
})();

/* Floating WhatsApp button scroll to form */
(function(){
  const btn = document.getElementById('whBtn');
  if(!btn) return;
  btn.addEventListener('click', function(e){
    e.preventDefault();
    const el = document.getElementById('inscripcion');
    if(el){ el.scrollIntoView({behavior:'smooth'}); }
  });
})();

/* Bind all CTA buttons with data-wa="true" to WhatsApp */
(function(){
  const elements = document.querySelectorAll('[data-wa="true"]');
  const phoneIntl = '51940886264';
  const baseMsg = 'Hola, quiero más información sobre la Maestría en Ciencias Bíblicas.';
  elements.forEach(function(el){
    el.addEventListener('click', function(ev){
      if(el.tagName.toLowerCase() === 'a' && el.getAttribute('href')?.startsWith('http')){ return; }
      ev.preventDefault();
      const extra = el.getAttribute('data-msg') || '';
      const url = `https://wa.me/${phoneIntl}?text=${encodeURIComponent(baseMsg + (extra? '\n' + extra : ''))}`;
      window.open(url, '_blank');
    });
  });
})();

