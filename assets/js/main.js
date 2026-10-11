/* ============================================
   TickGold 产品官网交互脚本
   ============================================ */

(function () {
  'use strict';

  // ---------- 导航栏滚动效果 ----------
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- 滚动显现动画 ----------
  const revealElements = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    revealElements.forEach((el) => observer.observe(el));
  } else {
    // 降级：直接显示
    revealElements.forEach((el) => el.classList.add('visible'));
  }

  // ---------- 截图切换 ----------
  const mainImage = document.querySelector('.screenshot-showcase img');
  const mainCaption = document.querySelector('.screenshot-caption h4');
  const mainSub = document.querySelector('.screenshot-caption span');
  const thumbs = document.querySelectorAll('.screenshot-thumb');

  if (mainImage && thumbs.length > 0) {
    thumbs.forEach((thumb) => {
      thumb.addEventListener('click', () => {
        const src = thumb.dataset.src;
        const title = thumb.dataset.title;
        const sub = thumb.dataset.sub || '';

        if (src) {
          mainImage.style.opacity = '0';
          setTimeout(() => {
            mainImage.src = src;
            mainImage.alt = title;
            if (mainCaption) mainCaption.textContent = title;
            if (mainSub) mainSub.textContent = sub;
            mainImage.style.opacity = '1';
          }, 200);
        }

        thumbs.forEach((t) => t.classList.remove('active'));
        thumb.classList.add('active');
      });
    });
  }

  // ---------- 平滑滚动（锚点链接） ----------
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const offset = 80; // 导航栏高度
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ---------- 页脚年份自动更新 ----------
  const yearEl = document.querySelector('.current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // ---------- 下载按钮统计（可选扩展点） ----------
  document.querySelectorAll('.btn-download').forEach((btn) => {
    btn.addEventListener('click', function () {
      const platform = this.dataset.platform || 'unknown';
      // 这里可以接入下载统计，目前仅做控制台输出
      console.log(`[TickGold] 下载点击: ${platform}`);
    });
  });

  console.log('%c TickGold ', 'background: #d4a853; color: #1a1a24; padding: 4px 8px; border-radius: 4px; font-weight: bold;',
    '官网已加载 · v2.27.0');
})();
