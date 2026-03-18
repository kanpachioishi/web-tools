// 共通ヘッダー挿入
(function() {
  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="site-header-inner">
      <a href="/" class="site-title">Web便利ツール集</a>
      <nav class="site-nav">
        <a href="/">ツール一覧</a>
      </nav>
    </div>
  `;
  document.body.prepend(header);
})();
