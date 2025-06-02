document.addEventListener('DOMContentLoaded', function() {
  // 引入 PhotoSwipe 资源
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.3.8/photoswipe.min.css';
  document.head.appendChild(link);

  // 为文章中的图片添加点击事件
  const images = document.querySelectorAll('.article-entry img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      const items = Array.from(images).map(img => ({
        src: img.src,
        w: img.naturalWidth || 800,
        h: img.naturalHeight || 600,
        title: img.alt || ''
      }));
      
      const index = Array.from(images).indexOf(this);
      openPhotoSwipe(index, items);
    });
  });

  // 打开 PhotoSwipe 画廊
  function openPhotoSwipe(index, items) {
    // 动态加载 PhotoSwipe JS
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.3.8/photoswipe.min.js';
    script.onload = function() {
      const scriptUI = document.createElement('script');
      scriptUI.src = 'https://cdnjs.cloudflare.com/ajax/libs/photoswipe/5.3.8/photoswipe-ui-default.min.js';
      scriptUI.onload = function() {
        // 创建 PhotoSwipe DOM
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'pswp';
        galleryContainer.tabIndex = '-1';
        galleryContainer.setAttribute('role', 'dialog');
        galleryContainer.innerHTML = `
          <div class="pswp__bg"></div>
          <div class="pswp__scroll-wrap">
            <div class="pswp__container"></div>
            <div class="pswp__ui pswp__ui--hidden"></div>
          </div>
        `;
        document.body.appendChild(galleryContainer);
        
        // 初始化画廊
        const gallery = new PhotoSwipe(galleryContainer, PhotoSwipeUI_Default, items, {
          index: index,
          showHideOpacity: true
        });
        gallery.init();
      };
      document.body.appendChild(scriptUI);
    };
    document.body.appendChild(script);
  }
});