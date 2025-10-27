# Performance Optimization Guide

This document outlines the performance optimizations implemented in this project and how to test them.

## 🚀 Implemented Optimizations

### 1. Asset Minification
- **JavaScript**: Terser minifies all `.js` files to `.min.js` during GitHub Actions deployment
- **CSS**: cssnano minifies all `.css` files to `.min.css` during deployment
- **Conditional Loading**: Production automatically uses minified assets, development uses regular files

### 2. Script Loading Optimization
- **Async/Defer**: External scripts load with `async` or `defer` attributes
- **Dynamic Import**: Module scripts use dynamic import for better code splitting
- **Fallback Logic**: Automatic fallback to non-minified assets if minified versions fail

### 3. Image Optimization
- **Width/Height Attributes**: All images have explicit dimensions to prevent layout shift
- **Lazy Loading**: Greetings cards use `content-visibility: auto` for lazy rendering
- **Fallback Images**: Error handling with fallback avatars

### 4. Caching Strategy
- **API Response Caching**: NocoDB responses cached to avoid duplicate fetches
- **localStorage**: Theme preferences and greetings cached locally
- **Service Worker**: (Future enhancement - not yet implemented)

### 5. Network Optimization
- **CDN Usage**: External libraries loaded from CDN with proper CORS
- **Cloudflare Workers**: Edge computing for API proxy reduces latency
- **HTTP/2**: Automatic via GitHub Pages

### 6. Rendering Optimization
- **Particles.js**: Background animations use GPU acceleration
- **CSS Variables**: Theme switching without repaint
- **Content Visibility**: Lazy rendering for off-screen greetings

## 📊 Performance Testing

### Run Lighthouse Audit

1. **Chrome DevTools Method**:
   ```
   1. Open Chrome DevTools (F12)
   2. Go to "Lighthouse" tab
   3. Select categories: Performance, Accessibility, Best Practices, SEO
   4. Click "Analyze page load"
   ```

2. **Command Line Method**:
   ```bash
   npm install -g lighthouse
   lighthouse https://emiliodom.github.io/ --view
   lighthouse https://emiliodom.github.io/greetings.html --view
   ```

3. **Online Tools**:
   - [PageSpeed Insights](https://pagespeed.web.dev/)
   - [WebPageTest](https://www.webpagetest.org/)
   - [GTmetrix](https://gtmetrix.com/)

### Expected Lighthouse Scores (Target)
- **Performance**: 90+ (mobile), 95+ (desktop)
- **Accessibility**: 95+
- **Best Practices**: 95+
- **SEO**: 100

### Key Metrics to Monitor

#### Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s (Good)
- **FID (First Input Delay)**: < 100ms (Good)
- **CLS (Cumulative Layout Shift)**: < 0.1 (Good)

#### Other Metrics
- **FCP (First Contentful Paint)**: < 1.8s
- **TTI (Time to Interactive)**: < 3.8s
- **Speed Index**: < 3.4s
- **TBT (Total Blocking Time)**: < 200ms

## 🔍 Testing Checklist

### Manual Testing
- [ ] Test minified assets load correctly in production
- [ ] Verify fallback to non-minified works in case of 404
- [ ] Check all images have proper alt text
- [ ] Test theme switching performance
- [ ] Verify particles.js doesn't block main thread
- [ ] Test greetings form submission performance
- [ ] Check mobile responsiveness
- [ ] Test offline functionality (localStorage fallback)

### Automated Testing
- [ ] Run Lighthouse audit on index.html
- [ ] Run Lighthouse audit on greetings.html
- [ ] Check PageSpeed Insights scores
- [ ] Verify sitemap.xml is accessible
- [ ] Test robots.txt is working
- [ ] Check all meta tags in view-source

### Network Testing
- [ ] Test with slow 3G throttling
- [ ] Test with cache disabled
- [ ] Check asset compression (gzip/brotli)
- [ ] Verify CDN resources load correctly
- [ ] Test CORS for external resources

## 🛠️ Performance Optimization Workflow

### During Development
1. Use non-minified assets for easier debugging
2. Test locally with `localhost` hostname detection
3. Check console for errors and warnings
4. Use React DevTools for component profiling (if applicable)

### Before Deployment
1. Run ESLint and Prettier to ensure code quality
2. Test minification locally:
   ```bash
   npx terser assets/js/site-theme.js -c -m -o assets/js/site-theme.min.js
   npx cssnano assets/css/theme.css assets/css/theme.min.css
   ```
3. Verify minified files work correctly
4. Run Lighthouse audit on local build

### After Deployment
1. Verify GitHub Actions workflow completed successfully
2. Check deployed site uses minified assets
3. Run production Lighthouse audit
4. Monitor Core Web Vitals in Google Search Console
5. Check for any console errors in production

## 📈 Monitoring and Maintenance

### Regular Checks (Weekly)
- Review Google Analytics performance metrics
- Check Google Search Console for Core Web Vitals
- Monitor GitHub Actions workflow success rate
- Review error logs if available

### Performance Budget
Set and monitor these budgets:
- **JavaScript**: < 500KB (total, minified + gzipped)
- **CSS**: < 100KB (total, minified + gzipped)
- **Images**: < 2MB (total for initial load)
- **Fonts**: < 100KB (if custom fonts added)

### Future Enhancements
1. **Service Worker**: Add for offline support and advanced caching
2. **Image WebP**: Convert images to WebP format for better compression
3. **Font Subsetting**: If custom fonts added, subset to used characters only
4. **Code Splitting**: Further split JavaScript bundles for better loading
5. **Preload Critical Resources**: Add `<link rel="preload">` for critical assets
6. **Resource Hints**: Add `dns-prefetch` and `preconnect` for external domains

## 🐛 Common Performance Issues

### Issue: Low Performance Score
**Causes**:
- Large JavaScript bundles
- Render-blocking resources
- Unoptimized images

**Solutions**:
- Ensure minification is working
- Add `async`/`defer` to scripts
- Optimize images with tools like ImageOptim

### Issue: High CLS (Layout Shift)
**Causes**:
- Images without dimensions
- Dynamic content insertion
- Web fonts loading

**Solutions**:
- Add width/height to all images
- Reserve space for dynamic content
- Use `font-display: swap`

### Issue: Slow API Responses
**Causes**:
- Cloudflare Worker cold starts
- NocoDB server response time
- Network latency

**Solutions**:
- Implement caching (already done)
- Use localStorage fallback (already done)
- Consider adding loading skeletons

## 📚 Resources

- [Web.dev - Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)
- [Lighthouse Documentation](https://developer.chrome.com/docs/lighthouse/)
- [MDN - Performance](https://developer.mozilla.org/en-US/docs/Web/Performance)
- [Chrome DevTools - Performance](https://developer.chrome.com/docs/devtools/performance/)
