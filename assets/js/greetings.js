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

function loadWall(){
  const list = JSON.parse(localStorage.getItem('greetings-list')||'[]');
  const ul = document.getElementById('greet-list');
  ul.innerHTML = '';
  list.slice().reverse().forEach(item=>{
    const li = document.createElement('li');
    li.textContent = `${item.message} — ${item.when}`;
    ul.appendChild(li);
  });
}

function saveWallEntry(message){
  const list = JSON.parse(localStorage.getItem('greetings-list')||'[]');
  list.push({message, when: new Date().toLocaleString()});
  localStorage.setItem('greetings-list', JSON.stringify(list));
  loadWall();
}

document.addEventListener('DOMContentLoaded', async ()=>{
  const captcha = randomCaptcha();
  document.getElementById('captcha-question').textContent = captcha.question;

  const badwords = await fetchBadWords();

  loadWall();

  document.getElementById('greet-form').addEventListener('submit', async (e)=>{
    e.preventDefault();
    const preset = document.getElementById('preset').value.trim();
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

    // save to local wall
    saveWallEntry(preset);
    feedback.textContent = 'Thanks — your greeting was added!';
    document.getElementById('greet-form').reset();
    // refresh captcha
    const newCap = randomCaptcha();
    captcha.answer = newCap.answer;
    document.getElementById('captcha-question').textContent = newCap.question;
  });
});
