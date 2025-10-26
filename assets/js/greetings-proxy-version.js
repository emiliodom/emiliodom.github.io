// Updated greetings.js functions to work with proxy
// Replace the fetchFromNocoDB and postToNocoDB functions in your greetings.js

// NocoDB client config - supports both proxy and direct API
const NOCODB = (typeof window !== 'undefined' && window.NOCODB_CONFIG) ? window.NOCODB_CONFIG : { proxyUrl: null, postUrl: null, getUrl: null, token: null };

async function fetchFromNocoDB(){
  // Use proxy if configured, otherwise fall back to direct API
  const fetchUrl = NOCODB.proxyUrl || NOCODB.getUrl || NOCODB.url || NOCODB.postUrl;
  if(!fetchUrl) return null;
  
  try{
    const headers = { 'accept': 'application/json' };
    
    // Only add token header if using direct API (not proxy)
    if(!NOCODB.proxyUrl && NOCODB.token) {
      headers['xc-token'] = NOCODB.token;
    }
    
    const r = await fetch(fetchUrl, { headers });
    if(!r.ok) throw new Error('nocodb fetch failed');
    const j = await r.json();
    
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
        const message = fields.Message || fields.message || '';
        const feeling = fields.Notes || fields.notes || '';
        const ip = fields.User || fields.user || '';
        const rawDate = fields.CreatedAt || fields.created_at || fields.createdAt || '';
        
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
  // Use proxy if configured, otherwise fall back to direct API
  const postUrl = NOCODB.proxyUrl || NOCODB.postUrl || NOCODB.url;
  if(!postUrl) throw new Error('NocoDB not configured');
  
  // If using proxy, token is not needed (it's server-side)
  if(!NOCODB.proxyUrl && !NOCODB.token) {
    throw new Error('NocoDB token not configured');
  }
  
  try{
    const body = { Message: message, User: user, Notes: notes };
    const headers = {
      'accept': 'application/json',
      'Content-Type': 'application/json'
    };
    
    // Only add token header if using direct API (not proxy)
    if(!NOCODB.proxyUrl && NOCODB.token) {
      headers['xc-token'] = NOCODB.token;
    }

    const r = await fetch(postUrl, {
      method: 'POST',
      headers,
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
  // Try proxy first if configured, otherwise use ipify
  if(NOCODB.ipProxyUrl){
    try{
      const r = await fetch(NOCODB.ipProxyUrl);
      if(!r.ok) throw new Error('ip proxy fetch failed');
      const j = await r.json();
      return j.ip;
    }catch(e){
      console.warn('IP proxy failed, falling back to ipify', e);
    }
  }
  
  // Fallback to ipify
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

// The rest of your greetings.js remains the same...
