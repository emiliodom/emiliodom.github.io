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
    // Default to dark mode if no saved preference
    const isDark = saved ? saved === 'dark' : (saved === null ? true : prefersDark);
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

/* Font size handling */
function applyFontSize(key){
    const sizes = { sm: '14px', md: '16px', lg: '18px' };
    const val = sizes[key] || sizes.md;
    document.documentElement.style.fontSize = val;
    // also apply to body to affect all text including link cards
    document.body.style.fontSize = val;
    localStorage.setItem('site-font-size', key);
    // update aria-pressed on buttons
    ['sm','md','lg'].forEach(k=>{
        const btn = document.getElementById('font-'+k);
        if(btn) btn.setAttribute('aria-pressed', k===key ? 'true' : 'false');
    });
}

function initFontSize(){
    const saved = localStorage.getItem('site-font-size') || 'md';
    applyFontSize(saved);
    const bsm = document.getElementById('font-sm');
    const bmd = document.getElementById('font-md');
    const blg = document.getElementById('font-lg');
    if(bsm) bsm.addEventListener('click', ()=> applyFontSize('sm'));
    if(bmd) bmd.addEventListener('click', ()=> applyFontSize('md'));
    if(blg) blg.addEventListener('click', ()=> applyFontSize('lg'));
}

function setGoogleTranslateCookie(targetLang){
    try{
        // google's widget reads cookie named googtrans with format /<from>/<to>
        const val = targetLang === 'auto' || targetLang === 'en' ? '' : '/en/' + targetLang;
        if (val) {
            document.cookie = `googtrans=${val};path=/`;
            document.cookie = `googtrans=${val};path=/;domain=${location.hostname}`;
        } else {
            // Clear translate cookie to reset to English
            document.cookie = `googtrans=;path=/;max-age=0`;
            document.cookie = `googtrans=;path=/;domain=${location.hostname};max-age=0`;
        }
    }catch(e){
        console.warn('Could not set translate cookie', e);
    }
}

let translateScriptLoaded = false;
let translateInitialized = false;

function initGoogleTranslate(){
    if (translateInitialized) return;
    
    window.googleTranslateElementInit = function(){
        try{
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,es,fr',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
            translateInitialized = true;
        }catch(e){
            console.warn('Google Translate init failed', e);
        }
    };
    
    if (!translateScriptLoaded) {
        const s = document.createElement('script');
        s.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        s.async = true;
        s.onerror = () => console.warn('Failed to load Google Translate script');
        document.head.appendChild(s);
        translateScriptLoaded = true;
    }
}

function bindLangSelector(){
    const sel = document.getElementById('lang-select');
    if(!sel) return;
    
    sel.addEventListener('change', (e) => {
        const val = e.target.value;
        
        if (val === 'en') {
            // Reset to English (no translation)
            setGoogleTranslateCookie('en');
            // Remove translate iframes and restore original content
            const frames = document.querySelectorAll('.goog-te-banner-frame, .skiptranslate');
            frames.forEach(f => f.remove());
            setTimeout(()=> window.location.reload(), 100);
        } else {
            // Load Google Translate if not already loaded
            if (!translateScriptLoaded) {
                initGoogleTranslate();
                // Wait for script to load before setting language
                setTimeout(() => {
                    setGoogleTranslateCookie(val);
                    window.location.reload();
                }, 1000);
            } else {
                setGoogleTranslateCookie(val);
                window.location.reload();
            }
        }
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
        initFontSize();
        bindLangSelector();
        normalizeFitFitLinks();
        // DO NOT auto-initialize Google Translate
        // It will be loaded on-demand when user changes language selector
    });
}

init();

export { applyTheme };
