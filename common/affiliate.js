// ツール別アフィリエイト・おすすめセクション自動挿入
(function() {
  const categories = {
    finance: {
      tools: ['salary-calculator','loan-calculator','mortgage-calc','furusato-tax','invoice-tax-calc','pension-simulator','child-support-calc','percent-calc','tip-calc','invoice-generator','electricity-cost'],
      title: '家計・お金の管理をもっと便利に',
      items: [
        { name: '確定申告ソフト freee', desc: 'クラウド会計ソフトで確定申告をカンタンに。個人事業主・フリーランスに最適。', url: '#affiliate-freee', tag: 'PR' },
        { name: 'マネーフォワード ME', desc: '銀行・クレカ・証券を自動連携。家計簿を自動で作成。', url: '#affiliate-moneyforward', tag: 'PR' },
        { name: 'FP無料相談サービス', desc: 'お金のプロに無料相談。保険・投資・住宅ローンの見直しに。', url: '#affiliate-fp', tag: 'PR' }
      ]
    },
    health: {
      tools: ['bmi-calculator','calorie-calculator','tdee-calculator','ovulation-calculator'],
      title: '健康管理におすすめのサービス',
      items: [
        { name: 'あすけん（食事管理アプリ）', desc: 'AI栄養士が毎日の食事を分析。ダイエット・健康管理に。', url: '#affiliate-asken', tag: 'PR' },
        { name: 'オンライン診療 CLINICS', desc: 'スマホで医師に相談。忙しくても通院不要。', url: '#affiliate-clinics', tag: 'PR' },
        { name: 'Nosh（ナッシュ）', desc: '糖質30g以下の健康弁当を自宅にお届け。', url: '#affiliate-nosh', tag: 'PR' }
      ]
    },
    dev: {
      tools: ['json-formatter','regex-tester','hash-generator','jwt-decoder','base64','url-encode','unix-timestamp','csv-to-table','markdown-preview','uuid-generator','cron-builder','chmod-calc','bitwise-calc','radix-converter','lorem-generator','css-gradient','svg-wave','glassmorphism','pixel-art'],
      title: '開発をもっと効率的に',
      items: [
        { name: 'Udemy プログラミング講座', desc: '世界最大級のオンライン学習。セール時は1,200円〜。', url: '#affiliate-udemy', tag: 'PR' },
        { name: 'AWS / GCP 無料枠', desc: 'クラウドサービスの無料枠で個人開発を始めよう。', url: '#affiliate-cloud', tag: 'PR' },
        { name: 'O\'Reilly 技術書読み放題', desc: '最新技術書が月額制で読み放題。エンジニア必携。', url: '#affiliate-oreilly', tag: 'PR' }
      ]
    },
    text: {
      tools: ['char-counter','text-diff','text-replace','zenkaku-hankaku','word-counter-en','case-converter','kyujitai-converter','number-to-kanji','tone-converter','fancy-text','readability','wareki-converter'],
      title: '文章作成・編集をもっと便利に',
      items: [
        { name: '文賢（文章校正ツール）', desc: 'AIが文章の誤字脱字・表現を自動チェック。ライター必携。', url: '#affiliate-bunken', tag: 'PR' },
        { name: 'Notion（万能メモアプリ）', desc: 'メモ・タスク・Wiki・データベースを一元管理。', url: '#affiliate-notion', tag: 'PR' }
      ]
    },
    security: {
      tools: ['password-generator','ip-checker'],
      title: 'セキュリティ対策におすすめ',
      items: [
        { name: '1Password', desc: 'パスワードを安全に一元管理。家族プランもあり。', url: '#affiliate-1password', tag: 'PR' },
        { name: 'NordVPN', desc: '世界最速クラスのVPN。プライバシーを守る。', url: '#affiliate-nordvpn', tag: 'PR' }
      ]
    },
    sports: {
      tools: ['worldcup-2026','npb-schedule','european-football'],
      title: 'スポーツをもっと楽しむ',
      items: [
        { name: 'DAZN（スポーツ配信）', desc: 'Jリーグ・プロ野球・海外サッカーをライブ配信。', url: '#affiliate-dazn', tag: 'PR' },
        { name: 'スポーツベットガイド', desc: 'スポーツ観戦がもっと楽しくなる予想・分析。', url: '#affiliate-sportsbet', tag: 'PR' }
      ]
    }
  };

  // ページURLからツール名を取得
  const path = window.location.pathname;
  const match = path.match(/\/tools\/([^/]+)/);
  if (!match) return;
  const toolName = match[1];

  // カテゴリを特定
  let category = null;
  for (const [key, cat] of Object.entries(categories)) {
    if (cat.tools.includes(toolName)) {
      category = cat;
      break;
    }
  }

  // カテゴリ不明の場合は汎用
  if (!category) {
    category = {
      title: 'おすすめのサービス',
      items: [
        { name: 'Notion（万能メモアプリ）', desc: 'メモ・タスク・データベースを一元管理。無料で使える。', url: '#affiliate-notion', tag: 'PR' },
        { name: 'Canva（デザインツール）', desc: 'プロ品質のデザインを誰でもカンタンに作成。', url: '#affiliate-canva', tag: 'PR' }
      ]
    };
  }

  // セクションHTML生成
  const section = document.createElement('section');
  section.className = 'affiliate-section content-section';
  section.innerHTML = `
    <h2>${category.title}</h2>
    <div class="affiliate-cards">
      ${category.items.map(item => `
        <a href="${item.url}" class="affiliate-card" target="_blank" rel="noopener noreferrer nofollow">
          <span class="affiliate-tag">${item.tag}</span>
          <strong>${item.name}</strong>
          <p>${item.desc}</p>
          <span class="affiliate-cta">詳しく見る →</span>
        </a>
      `).join('')}
    </div>
  `;

  // ツール結果エリアの後、または関連ツールセクションの前に挿入
  const main = document.querySelector('main');
  if (!main) return;

  const relatedSection = main.querySelector('.content-section:last-of-type');
  if (relatedSection) {
    main.insertBefore(section, relatedSection);
  } else {
    main.appendChild(section);
  }
})();
