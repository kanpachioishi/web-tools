// 共通ヘッダー挿入 + テーマ切替
(function() {
  // テーマの復元（ページ描画前に適用してフラッシュ防止）
  const saved = localStorage.getItem('theme');
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `
    <div class="site-header-inner">
      <a href="/" class="site-title">Web便利ツール集</a>
      <nav class="site-nav">
        <a href="/">ツール一覧</a>
        <button id="theme-toggle" class="theme-toggle" title="テーマ切替" aria-label="テーマ切替">
          <span class="theme-icon-light">☀️</span>
          <span class="theme-icon-dark">🌙</span>
        </button>
      </nav>
    </div>
  `;
  document.body.prepend(header);

  // テーマ切替ロジック
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', function() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (isDark) {
      document.documentElement.removeAttribute('data-theme');
      localStorage.setItem('theme', 'light');
    } else {
      document.documentElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
    }
  });
})();
