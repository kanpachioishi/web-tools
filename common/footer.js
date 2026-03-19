// 共通フッター挿入
(function() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="ad-placeholder"></div>
    <nav class="footer-links">
      <a href="/about/">サイトについて</a>
      <a href="/contact/">お問い合わせ</a>
      <a href="/privacy-policy/">プライバシーポリシー</a>
      <a href="/terms/">利用規約</a>
    </nav>
    <p>&copy; ${new Date().getFullYear()} Web便利ツール集</p>
  `;
  document.body.appendChild(footer);
})();
