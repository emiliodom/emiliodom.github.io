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
  { id: 'm6', text: "Keep the momentum going!" },
  { id: 'm7', text: "Your dedication is truly admirable." },
  { id: 'm8', text: "Great things are coming your way!" },
  { id: 'm9', text: "You make a real difference." },
  { id: 'm10', text: "Keep shining bright!" },
  { id: 'm11', text: "Never stop learning and growing." },
  { id: 'm12', text: "Your work is truly inspiring!" }
];

// NocoDB client config (optional). Set window.NOCODB_CONFIG in the page to enable.
// Support both v3 (`url`) and v2 (`postUrl`/`getUrl`) styles.
const NOCODB = (typeof window !== 'undefined' && window.NOCODB_CONFIG) ? window.NOCODB_CONFIG : { url: null, postUrl: null, getUrl: null, token: null };

async function fetchFromNocoDB(){
  const fetchUrl = NOCODB.getUrl || NOCODB.url || NOCODB.postUrl;
  if(!fetchUrl) return null;
  try{
    const r = await fetch(fetchUrl, { headers: { accept: 'application/json', 'xc-token': NOCODB.token } });
    if(!r.ok) throw new Error('nocodb fetch failed');
    const j = await r.json();
    // Expecting array of records; map into local format {message, feeling, when, ip}
    // Normalize various response shapes
    const rows = [];
    if(Array.isArray(j)){
      rows.push(...j);
    }else if(j && Array.isArray(j.records)){
      rows.push(...j.records);
    }else if(j && Array.isArray(j.list)){
      rows.push(...j.list);
    }
    if(rows.length){
      return rows.map(rec => {
        const fields = rec.fields || rec;
        // For v2 mapping: Message = text, Notes = emoticon, User = ip
        const message = fields.Message || fields.message || '';
        const feeling = fields.Notes || fields.notes || '';
        const ip = fields.User || fields.user || '';
        const rawDate = fields.CreatedAt || fields.created_at || fields.createdAt || '';
        // Format date nicely
        let when = '';
        if(rawDate){
          try{
            const d = new Date(rawDate);
            when = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
          }catch(e){
            when = rawDate;
          }
        }else{
          when = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
        }
        return { message, feeling, when, ip };
      });
    }
    return null;
  }catch(e){
    console.warn('fetchFromNocoDB failed', e);
    return null;
  }
}

async function postToNocoDB(message, user, notes){
  const postUrl = NOCODB.postUrl || NOCODB.url;
  if(!postUrl || !NOCODB.token) throw new Error('NocoDB not configured');
  try{
    // For v2 API (tables endpoint) the user-supplied curl posts a flat JSON with fields at root.
    // We'll detect v2 by presence of postUrl including '/api/v2' or when postUrl is explicitly provided.
    let body;
    if(postUrl.includes('/api/v2')){
      // Send flat JSON as the user requested: Message (text), User (ip), Notes (emoticon)
      body = { Message: message, User: user, Notes: notes };
    }else{
      // Fallback for v3 style: send records wrapper
      body = { records: [ { fields: { Message: message, User: user, Notes: notes } } ] };
    }

    const r = await fetch(postUrl, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'xc-token': NOCODB.token
      },
      body: JSON.stringify(body)
    });
    if(!r.ok) {
      const text = await r.text();
      throw new Error(`NocoDB POST failed: ${r.status} ${text}`);
    }
    return await r.json();
  }catch(e){
    console.warn('postToNocoDB failed', e);
    throw e;
  }
}
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
  
  // Lazy loading for mobile
  const isMobile = window.innerWidth <= 640;
  pageItems.forEach((item,idx) => {
    const card = document.createElement('article');
    card.className = 'greet-card';
    if(item._pending) card.classList.add('pending');
    if(item._failed) card.classList.add('failed');
    card.tabIndex = 0;
    if(isMobile && idx > 2){
      card.setAttribute('loading','lazy');
      card.style.contentVisibility = 'auto';
    }
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
  const when = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  list.push({message, feeling, when});
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
  
  // mobile feeling select
  const feelingSelect = document.getElementById('feeling-select');
  if(feelingSelect){
    feelingSelect.addEventListener('change', (e)=>{
      selectedFeeling = e.target.value;
    });
  }

  // render captcha options as 3 buttons (one correct)
  function renderCaptchaOptions(cap){
    const wrap = document.getElementById('captcha-options');
    wrap.innerHTML = '';
    const correct = cap.answer;
    // generate two decoys
    const decoys = [];
    while(decoys.length < 2){
      const n = Math.max(1, Math.floor(Math.random()*18));
      if(n !== correct && !decoys.includes(n)) decoys.push(n);
    }
    const choices = [correct, ...decoys].sort(()=>Math.random() - 0.5);
    choices.forEach((c,i)=>{
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'captcha-btn'; b.setAttribute('data-val', c);
      b.textContent = c;
      b.addEventListener('click', ()=>{
        document.querySelectorAll('.captcha-btn').forEach(x=>x.setAttribute('aria-pressed','false'));
        b.setAttribute('aria-pressed','true');
        b.classList.add('selected');
      });
      wrap.appendChild(b);
    });
  }
  renderCaptchaOptions(captcha);

  // try to load from NocoDB first (if configured), otherwise from localStorage
  (async ()=>{
    const loader = document.getElementById('greet-loader');
    if(loader) loader.style.display = 'flex';
    try{
      const nocodbList = await fetchFromNocoDB();
      if(nocodbList && nocodbList.length){
        renderPagination(nocodbList, 1, 5);
      }else{
        const stored = JSON.parse(localStorage.getItem('greetings-list')||'[]');
        renderPagination(stored, 1, 5);
      }
    }catch(e){
      const stored = JSON.parse(localStorage.getItem('greetings-list')||'[]');
      renderPagination(stored, 1, 5);
    }finally{
      if(loader) loader.style.display = 'none';
    }
  })();

  document.getElementById('greet-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const sel = document.querySelector('.preset-card.selected');
    const preset = sel ? sel.dataset.text.trim() : '';
  // read selected captcha button value
  const selCap = document.querySelector('.captcha-btn[aria-pressed="true"]');
  const answer = selCap ? parseInt(selCap.getAttribute('data-val'),10) : null;
    const feedback = document.getElementById('greet-feedback');
    feedback.textContent = '';

  if(!preset){ feedback.textContent = 'Please choose a message.'; return; }
  if(answer !== captcha.answer){ feedback.textContent = 'Captcha answer is incorrect. Please pick the correct number.'; return; }

    // check badwords
    const lower = preset.toLowerCase();
    const found = badwords.find(b=> lower.includes(b.toLowerCase()));
    if(found){ feedback.textContent = 'The selected message contains disallowed words.'; return; }

    // fetch IP
    const ip = await getIp();
    
    // Check if this IP already submitted in the last 24 hours (database and local)
    const now = Date.now();
    const oneDayMs = 24 * 60 * 60 * 1000;
    
    if(ip && NOCODB.postUrl && NOCODB.token){
      try{
        const nocodbList = await fetchFromNocoDB();
        if(nocodbList && nocodbList.length){
          const recentEntry = nocodbList.find(entry => {
            if(entry.ip !== ip) return false;
            // Check if within 24 hours
            const entryTime = entry.when ? new Date(entry.when).getTime() : 0;
            return (now - entryTime) < oneDayMs;
          });
          if(recentEntry){
            feedback.textContent = 'You have already submitted a greeting from this IP in the last 24 hours.';
            return;
          }
        }
      }catch(e){
        console.warn('IP verification failed, falling back to local check', e);
      }
    }
    
    // Local 24-hour check
    if(ip){
      const key = `greet-submitted-${ip}`;
      const stored = localStorage.getItem(key);
      if(stored){
        try{
          const data = JSON.parse(stored);
          if(data.when && (now - data.when) < oneDayMs){
            feedback.textContent = 'You have already submitted a greeting from this IP in the last 24 hours.';
            return;
          }
        }catch(e){/* ignore */}
      }
    }
    
    // compute dedup hash (IP + message) to avoid duplicate identical submissions
    const dedupInput = (ip || 'web') + '|' + preset;
    async function hashString(s){
      if(window.crypto && crypto.subtle){
        const enc = new TextEncoder().encode(s);
        const hashBuf = await crypto.subtle.digest('SHA-1', enc);
        const hashArr = Array.from(new Uint8Array(hashBuf));
        return hashArr.map(b=>b.toString(16).padStart(2,'0')).join('');
      }
      // fallback simple hash
      let h=0; for(let i=0;i<s.length;i++){ h=((h<<5)-h)+s.charCodeAt(i); h |= 0; } return String(h);
    }
    const dedupHash = await hashString(dedupInput);
    const dedupKey = `greet-submitted-hash-${dedupHash}`;
    const dedupStored = localStorage.getItem(dedupKey);
    if(dedupStored){
      try{
        const dedupData = JSON.parse(dedupStored);
        if(dedupData.when && (now - dedupData.when) < oneDayMs){
          feedback.textContent = 'Duplicate submission detected (same IP/message in last 24 hours).';
          return;
        }
      }catch(e){/* ignore */}
    }
    
    if(ip){
      const key = `greet-submitted-${ip}`;
      // mark as submitted per IP with timestamp
      localStorage.setItem(key, JSON.stringify({when: now, message: preset}));
    }else{
      // fallback: per-browser submission prevention
      const key = 'greet-submitted-browserside';
      const browserStored = localStorage.getItem(key);
      if(browserStored){
        try{
          const browserData = JSON.parse(browserStored);
          if(browserData.when && (now - browserData.when) < oneDayMs){
            feedback.textContent = 'You have already submitted a greeting from this browser in the last 24 hours.';
            return;
          }
        }catch(e){/* ignore */}
      }
      localStorage.setItem(key, JSON.stringify({when: now, message: preset}));
    }
    // Prepare message and notes (notes stores emoticon separately)
    const messageText = preset;
    const notesEmoji = selectedFeeling || '';

    // Optimistic UI: insert pending card immediately
    const optimisticEntry = { message: messageText, feeling: notesEmoji, when: 'Sending…', _pending: true };
    const currentList = JSON.parse(localStorage.getItem('greetings-list')||'[]');
    // render optimistic at top by temporarily adding to DOM grid
    renderPagination([...(currentList || []), optimisticEntry], 1, 5);

    // Attempt to send to NocoDB if configured; fall back to local storage
    try{
      const userField = ip || 'web';
      const postUrl = NOCODB.postUrl || NOCODB.url;
      if(postUrl && NOCODB.token){
        const resp = await postToNocoDB(messageText, userField, notesEmoji).catch(err=>{ throw err; });
        // success: mark dedup key and reload authoritative list
        localStorage.setItem(dedupKey, JSON.stringify({when: Date.now()}));
        // reload list from NocoDB
        const nocodbList = await fetchFromNocoDB();
        if(nocodbList) renderPagination(nocodbList, 1, 5);
        feedback.textContent = 'Thanks — your greeting was added (saved to NocoDB)!';
      }else{
        // save locally: store message and emoticon separately
        saveWallEntry(messageText, notesEmoji);
        localStorage.setItem(dedupKey, JSON.stringify({when: Date.now()}));
        feedback.textContent = 'Thanks — your greeting was added (saved locally)!';
      }
    }catch(e){
      // on failure save locally as fallback and show specific error
      saveWallEntry(messageText, notesEmoji);
      // detect error type
      let msg = 'Saved locally (NocoDB failed).';
      if(e && e.message){
        const em = e.message.toLowerCase();
        if(em.includes('401')||em.includes('unauthor')) msg = 'Unauthorized: invalid API token (401). Entry saved locally.';
        else if(em.includes('429')||em.includes('rate')) msg = 'Rate limit exceeded. Entry saved locally.';
        else msg = 'Network or server error. Entry saved locally.';
      }else{
        msg = 'Network or CORS error. Entry saved locally.';
      }
      feedback.textContent = msg;
    }
    document.getElementById('greet-form').reset();
    // refresh captcha
    const newCap = randomCaptcha();
    captcha.answer = newCap.answer;
    document.getElementById('captcha-question').textContent = newCap.question;
  });
});
