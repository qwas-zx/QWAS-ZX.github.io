document.addEventListener('DOMContentLoaded', function() {
  // 为文章中的图片添加点击事件
  const images = document.querySelectorAll('.article-content img');
  images.forEach(img => {
    img.style.cursor = 'zoom-in';
    img.addEventListener('click', function() {
      // 创建图片项数组
      const items = Array.from(images).map(img => ({
        src: img.src,
        w: img.naturalWidth || 800,
        h: img.naturalHeight || 600,
        title: img.alt || ''
      }));
      
      // 获取当前点击图片的索引
      const index = Array.from(images).indexOf(this);
      
      // 打开 PhotoSwipe 画廊
      openPhotoSwipe(index, items);
    });
  });

  // 打开 PhotoSwipe 函数
  function openPhotoSwipe(index, items) {
    // 创建 PhotoSwipe DOM
    let pswpElement = document.querySelector('.pswp');
    if (!pswpElement) {
      pswpElement = document.createElement('div');
      pswpElement.className = 'pswp';
      pswpElement.tabIndex = '-1';
      pswpElement.setAttribute('role', 'dialog');
      pswpElement.innerHTML = `
        <div class="pswp__bg"></div>
        <div class="pswp__scroll-wrap">
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>
          <div class="pswp__ui pswp__ui--hidden"></div>
        </div>
      `;
      document.body.appendChild(pswpElement);
    }

    // 初始化 PhotoSwipe
    const gallery = new PhotoSwipe(
      pswpElement,
      PhotoSwipeUI_Default,
      items,
      {
        index: index,
        showHideOpacity: true,
        history: false
      }
    );
    gallery.init();
  }
});