// 共通フッター挿入
(function() {
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="ad-placeholder"></div>
    <p>&copy; ${new Date().getFullYear()} Web便利ツール集</p>
  `;
  document.body.appendChild(footer);
})();
