// site-theme.js
// Handles theme persistence, Google Translate init, link normalization

function applyTheme(isDark){
    if(isDark){
        document.documentElement.classList.add('theme-dark');
        const toggle = document.getElementById('theme-toggle'); if(toggle) toggle.checked = true;
    }else{
        document.documentElement.classList.remove('theme-dark');
        const toggle = document.getElementById('theme-toggle'); if(toggle) toggle.checked = false;
    }
}

function initTheme(){
    const saved = localStorage.getItem('site-theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = saved ? saved === 'dark' : prefersDark;
    applyTheme(isDark);
    const toggle = document.getElementById('theme-toggle');
    if(toggle){
        toggle.addEventListener('change', (e) => {
            const nowDark = e.target.checked;
            applyTheme(nowDark);
            localStorage.setItem('site-theme', nowDark ? 'dark' : 'light');
        });
    }
}

function setGoogleTranslateCookie(targetLang){
    try{
        // google's widget reads cookie named googtrans with format /<from>/<to>
        const val = targetLang === 'auto' ? '/en' : '/' + targetLang;
        document.cookie = `googtrans=${val};path=/`;
        // also try domain-less cookie for some setups
        document.cookie = `googtrans=${val};path=/;domain=${location.hostname}`;
    }catch(e){
        console.warn('Could not set translate cookie', e);
    }
}

function initGoogleTranslate(){
    window.googleTranslateElementInit = function(){
        try{
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE
            }, 'google_translate_element');
        }catch(e){
            // ignore
        }
    };
    const s = document.createElement('script');
    s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    s.async = true;
    document.head.appendChild(s);
}

function bindLangSelector(){
    const sel = document.getElementById('lang-select');
    if(!sel) return;
    sel.addEventListener('change', (e) => {
        const val = e.target.value;
        const lang = val === 'auto' ? 'en' : val;
        setGoogleTranslateCookie(lang);
        // best-effort: reload so translate widget reads cookie
        setTimeout(()=> window.location.reload(), 300);
    });
}

function normalizeFitFitLinks(){
    const links = document.querySelectorAll('a[href*="fitfit.pro"]');
    links.forEach(a=>{
        a.href = 'https://fitfit.pro/guia';
        a.setAttribute('title','FitFit Pro — guia');
    });
}

function init(){
    document.addEventListener('DOMContentLoaded', ()=>{
        initTheme();
        bindLangSelector();
        normalizeFitFitLinks();
        initGoogleTranslate();
    });
}

init();

export { applyTheme };
