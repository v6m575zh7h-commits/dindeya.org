/* Optional audience measurement. No advertising features or form contents. */
(() => {
  const id = 'G-1D6DHBF647';
  if (!['dindeya.org', 'www.dindeya.org', 'masjidfutanj.org', 'www.masjidfutanj.org'].includes(location.hostname)) return;
  const key = 'site-analytics-consent';
  let enabled = false;
  const read = () => { try { return localStorage.getItem(key); } catch { return null; } };
  function start() {
    if (enabled) return;
    enabled = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', {analytics_storage:'granted', ad_storage:'denied', ad_user_data:'denied', ad_personalization:'denied'});
    window.gtag('js', new Date());
    window.gtag('config', id, {allow_google_signals:false, allow_ad_personalization_signals:false, page_location:location.origin + location.pathname});
    const tag = document.createElement('script');
    tag.async = true;
    tag.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.append(tag);
  }
  function event(name, params) { if (enabled) window.gtag('event', name, params); }
  function init() {
    const style = document.createElement('style');
    style.textContent = '.analytics-choice{position:fixed;bottom:16px;left:16px;right:16px;max-width:580px;background:#fff;color:#172b36;padding:20px;border:1px solid #ccd2d5;border-radius:12px;box-shadow:0 4px 24px #0003;z-index:10000;font:15px/1.5 system-ui}.analytics-choice p{margin:0 0 12px}.analytics-choice button,.analytics-settings{font:inherit;padding:8px 14px;border:1px solid #172b36;border-radius:6px;background:#fff;color:#172b36;cursor:pointer;margin-right:8px}.analytics-settings{display:block;margin:16px auto;font:13px system-ui}';
    document.head.append(style);
    const box = document.createElement('section');
    box.className = 'analytics-choice';
    box.setAttribute('aria-label','Website analytics preferences');
    box.innerHTML = '<p>May we use Google Analytics cookies to understand visits, popular pages and donation-link clicks? Analytics is optional. We do not use it for advertising. You can change your choice below.</p><button type="button" data-choice="yes">Allow analytics</button><button type="button" data-choice="no">No thanks</button>';
    const settings = document.createElement('button');
    settings.type = 'button'; settings.className = 'analytics-settings'; settings.textContent = 'Analytics preferences';
    settings.onclick = () => { document.body.append(box); box.querySelector('button').focus(); };
    document.body.append(settings);
    box.addEventListener('click', e => {
      const choice = e.target.closest('[data-choice]');
      if (!choice) return;
      const value = choice.dataset.choice;
      try { localStorage.setItem(key,value); } catch {}
      box.remove();
      if (value === 'yes') start();
      else if (enabled) {
        window['ga-disable-' + id] = true;
        window.gtag('consent','update',{analytics_storage:'denied'});
        enabled = false;
        location.reload();
      }
    });
    if (read() === 'yes') start();
    else if (read() !== 'no') document.body.append(box);
    document.addEventListener('click', e => {
      const link = e.target.closest('a[href]');
      if (!link) return;
      const url = new URL(link.href,location.href);
      if (/gofundme|donorbox|givebutter|paypal|zeffy/.test(url.hostname) || /donat|zelle/i.test(link.textContent + url.pathname)) {
        event('donation_click',{link_domain:url.hostname, link_path:url.pathname});
      }
    });
    document.querySelectorAll('video').forEach((video, index) => {
      let started = false;
      const milestones = new Set();
      const details = () => ({video_title:video.getAttribute('aria-label') || 'Hospital construction update ' + (index+1), video_provider:'html5'});
      video.addEventListener('play',() => {if (!started && enabled) {event('video_start',details());started = true;}});
      video.addEventListener('timeupdate',() => {
        if (!enabled || !video.duration) return;
        const percent = video.currentTime/video.duration*100;
        [25,50,75].forEach(n => {if(percent >= n && !milestones.has(n)){milestones.add(n);event('video_progress',{...details(),video_percent:n});}});
      });
      video.addEventListener('ended',() => event('video_complete',details()));
    });
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
