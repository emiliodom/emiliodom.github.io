// greetings.js
// Handles preset greeting selection, numeric captcha, simple IP-based single submission

async function fetchBadWords(){
  try{
    const r = await fetch('/assets/data/badwords.json');
    if(!r.ok) return [];
    return await r.json();
  }catch(e){
    console.warn('Could not load badwords list', e);
    return [];
  }
}

function randomCaptcha(){
  const a = Math.floor(Math.random()*9)+1;
  const b = Math.floor(Math.random()*9)+1;
  return { question: `${a} + ${b} = ?`, answer: a + b };
}

const PRESET_MESSAGES = [
  { id: 'm1', text: "Keep pushing, you're doing great!" },
  { id: 'm2', text: "Proud of your work — keep it up." },
  { id: 'm3', text: "Inspiration for us all!" },
  { id: 'm4', text: "Stay curious and keep building." },
  { id: 'm5', text: "Small steps lead to big changes." },
  { id: 'm6', text: "Keep the momentum going!" }
];

async function getIp(){
  try{
    const r = await fetch('https://api.ipify.org?format=json');
    if(!r.ok) throw new Error('ip fetch failed');
    const j = await r.json();
    return j.ip;
  }catch(e){
    console.warn('IP fetch failed, falling back to local id', e);
    return null;
  }
}

function renderPagination(list, page=1, perPage=5){
  const total = list.length;
  const pages = Math.max(1, Math.ceil(total / perPage));
  const start = (page-1)*perPage;
  const pageItems = list.slice().reverse().slice(start, start+perPage);
  const container = document.getElementById('greet-list');
  container.innerHTML = '';
  const grid = document.createElement('div');
  grid.className = 'greet-grid';
  pageItems.forEach(item => {
    const card = document.createElement('article');
    card.className = 'greet-card';
    card.tabIndex = 0;
    card.innerHTML = `<div class="greet-feel">${item.feeling||''}</div><div class="greet-text">${item.message}</div><div class="greet-meta">${item.when}</div>`;
    grid.appendChild(card);
  });
  container.appendChild(grid);

  // pager
  const pager = document.createElement('div');
  pager.className = 'pager';
  const prev = document.createElement('button'); prev.textContent = 'Previous';
  const next = document.createElement('button'); next.textContent = 'Next';
  prev.disabled = page<=1; next.disabled = page>=pages;
  prev.addEventListener('click', ()=> renderPagination(list, page-1, perPage));
  next.addEventListener('click', ()=> renderPagination(list, page+1, perPage));
  pager.appendChild(prev);
  pager.appendChild(document.createTextNode(` Page ${page} / ${pages} `));
  pager.appendChild(next);
  container.appendChild(pager);
}

function saveWallEntry(message, feeling){
  const list = JSON.parse(localStorage.getItem('greetings-list')||'[]');
  list.push({message, feeling, when: new Date().toLocaleString()});
  localStorage.setItem('greetings-list', JSON.stringify(list));
  renderPagination(list, 1, 5);
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const captcha = randomCaptcha();
  document.getElementById('captcha-question').textContent = captcha.question;

  const badwords = await fetchBadWords();

  // render preset cards
  const cards = document.getElementById('preset-cards');
  PRESET_MESSAGES.forEach(m=>{
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'preset-card';
    b.dataset.id = m.id;
    b.dataset.text = m.text;
    b.innerHTML = `<div class="card-text">${m.text}</div>`;
    b.addEventListener('click', ()=>{
      document.querySelectorAll('.preset-card').forEach(x=>x.classList.remove('selected'));
      b.classList.add('selected');
      b.setAttribute('aria-pressed','true');
    });
    cards.appendChild(b);
  });

  // feelings buttons
  let selectedFeeling = null;
  document.querySelectorAll('.feeling').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      document.querySelectorAll('.feeling').forEach(b=>{b.setAttribute('aria-pressed','false'); b.classList.remove('selected');});
      btn.setAttribute('aria-pressed','true'); btn.classList.add('selected');
      selectedFeeling = btn.dataset.feel;
    });
  });

  const stored = JSON.parse(localStorage.getItem('greetings-list')||'[]');
  renderPagination(stored, 1, 5);

  document.getElementById('greet-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const sel = document.querySelector('.preset-card.selected');
    const preset = sel ? sel.dataset.text.trim() : '';
    const answer = parseInt(document.getElementById('captcha-answer').value,10);
    const feedback = document.getElementById('greet-feedback');
    feedback.textContent = '';

  if(!preset){ feedback.textContent = 'Please choose a message.'; return; }
    if(answer !== captcha.answer){ feedback.textContent = 'Captcha answer is incorrect.'; return; }

    // check badwords
    const lower = preset.toLowerCase();
    const found = badwords.find(b=> lower.includes(b.toLowerCase()));
    if(found){ feedback.textContent = 'The selected message contains disallowed words.'; return; }

    // fetch IP
    const ip = await getIp();
    if(ip){
      const key = `greet-submitted-${ip}`;
      if(localStorage.getItem(key)){ feedback.textContent = 'You have already submitted a greeting from this IP.'; return; }
      // mark as submitted
      localStorage.setItem(key, JSON.stringify({when: Date.now(), message: preset}));
    }else{
      // fallback: per-browser submission prevention
      const key = 'greet-submitted-browserside';
      if(localStorage.getItem(key)){ feedback.textContent = 'You have already submitted a greeting from this browser.'; return; }
      localStorage.setItem(key, JSON.stringify({when: Date.now(), message: preset}));
    }

    // save to local wall (client-side)
    saveWallEntry(preset, selectedFeeling);
    feedback.textContent = 'Thanks — your greeting was added!';
    document.getElementById('greet-form').reset();
    // refresh captcha
    const newCap = randomCaptcha();
    captcha.answer = newCap.answer;
    document.getElementById('captcha-question').textContent = newCap.question;
  });
});
