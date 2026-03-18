(function() {
  const BASE_URL = 'https://simpletoolkit.net';
  const path = location.pathname;

  // トップページでは表示しない
  if (path === '/' || path === '/index.html') return;

  const parts = path.replace(/^\/|\/$/g, '').split('/');
  if (parts.length < 2) return;

  const section = parts[0]; // "tools" or "blog"
  const slug = parts[1];

  // h1タグからページタイトルを取得
  function getPageTitle() {
    const h1 = document.querySelector('h1');
    return h1 ? h1.textContent.trim() : slug;
  }

  function render() {
    const pageTitle = getPageTitle();
    const main = document.querySelector('main');
    if (!main) return;

    let items = [];
    items.push({ name: 'ホーム', url: BASE_URL + '/' });

    if (section === 'tools') {
      items.push({ name: 'ツール一覧', url: BASE_URL + '/' });
      items.push({ name: pageTitle, url: null });
    } else if (section === 'blog') {
      items.push({ name: '技術解説', url: BASE_URL + '/blog/' });
      items.push({ name: pageTitle, url: null });
    } else if (section === 'exercises') {
      items.push({ name: '練習問題', url: null });
      items.push({ name: pageTitle, url: null });
    } else {
      return;
    }

    // パンくずリストHTML生成
    const nav = document.createElement('nav');
    nav.className = 'breadcrumb';
    nav.setAttribute('aria-label', 'パンくずリスト');

    const fragments = items.map(function(item, i) {
      if (item.url && i < items.length - 1) {
        return '<a href="' + item.url + '">' + item.name + '</a>';
      } else {
        return item.name;
      }
    });
    nav.innerHTML = fragments.join('<span>&gt;</span>');

    // mainの先頭に挿入
    main.insertBefore(nav, main.firstChild);

    // JSON-LD 構造化データ生成
    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      'itemListElement': items.map(function(item, i) {
        var entry = {
          '@type': 'ListItem',
          'position': i + 1,
          'name': item.name
        };
        if (item.url) {
          entry['item'] = item.url;
        }
        return entry;
      })
    };

    var script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
  }

  // DOMContentLoadedまたは既にready状態なら即実行
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }
})();
