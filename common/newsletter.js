// メルマガ登録ファネル
(function() {
  const FORM_ACTION = 'GOOGLE_FORM_URL_HERE'; // Google FormのURL（後で差し替え）
  const STORAGE_KEY = 'newsletter_dismissed';
  const SUBSCRIBED_KEY = 'newsletter_subscribed';

  // 既に登録済みなら何も表示しない
  if (localStorage.getItem(SUBSCRIBED_KEY)) return;

  // フォーム送信ハンドラ
  function handleSubmit(form, e) {
    e.preventDefault();
    const email = form.querySelector('.newsletter-input').value.trim();
    if (!email || !email.includes('@')) {
      alert('有効なメールアドレスを入力してください');
      return;
    }

    if (FORM_ACTION === 'GOOGLE_FORM_URL_HERE') {
      // プレースホルダーの場合はローカルに保存
      localStorage.setItem(SUBSCRIBED_KEY, email);
      showThankYou(form);
      return;
    }

    // Google Formに送信
    const formData = new FormData();
    formData.append('entry.EMAIL_FIELD_ID', email); // Google FormのフィールドIDに差し替え
    fetch(FORM_ACTION, { method: 'POST', body: formData, mode: 'no-cors' })
      .then(() => {
        localStorage.setItem(SUBSCRIBED_KEY, email);
        showThankYou(form);
      })
      .catch(() => {
        localStorage.setItem(SUBSCRIBED_KEY, email);
        showThankYou(form);
      });
  }

  function showThankYou(form) {
    const parent = form.closest('.newsletter-section, .newsletter-slidein');
    if (parent) {
      const isSlideIn = parent.classList.contains('newsletter-slidein');
      parent.innerHTML = isSlideIn
        ? '<p style="text-align:center;padding:12px;font-weight:600;">登録ありがとうございます！</p>'
        : '<h3>登録ありがとうございます！</h3><p>新しいツールの追加をメールでお知らせします。</p>';
      if (isSlideIn) {
        setTimeout(() => { parent.classList.remove('show'); }, 2000);
      }
    }
    // スライドインも閉じる
    const slidein = document.querySelector('.newsletter-slidein');
    if (slidein) slidein.classList.remove('show');
  }

  // 1. インラインセクション（main内に挿入）
  function insertInlineNewsletter() {
    const main = document.querySelector('main');
    if (!main) return;

    const section = document.createElement('section');
    section.className = 'newsletter-section';
    section.innerHTML = `
      <h3>新しい便利ツールをメールでお届け</h3>
      <p>毎週追加される新ツールの情報をいち早くキャッチ！</p>
      <form class="newsletter-form" onsubmit="return false;">
        <input type="email" class="newsletter-input" placeholder="メールアドレス" required>
        <button type="submit" class="newsletter-btn">無料で登録</button>
      </form>
      <p class="newsletter-privacy">メールアドレスは新ツール通知のみに使用します。いつでも解除可能です。</p>
    `;

    // 関連ツールセクションの前、またはmainの末尾に挿入
    const affiliateSection = main.querySelector('.affiliate-section');
    const contentSections = main.querySelectorAll('.content-section');
    const lastContentSection = contentSections[contentSections.length - 1];

    if (affiliateSection) {
      main.insertBefore(section, affiliateSection);
    } else if (lastContentSection) {
      main.insertBefore(section, lastContentSection);
    } else {
      main.appendChild(section);
    }

    section.querySelector('form').addEventListener('submit', function(e) {
      handleSubmit(this, e);
    });
  }

  // 2. スクロールトリガースライドイン（PC のみ）
  function initSlideIn() {
    // モバイルでは表示しない
    if (window.innerWidth < 768) return;
    // 同セッションで閉じていたら表示しない
    if (sessionStorage.getItem(STORAGE_KEY)) return;

    const slidein = document.createElement('div');
    slidein.className = 'newsletter-slidein';
    slidein.innerHTML = `
      <button class="newsletter-slidein-close" aria-label="閉じる">&times;</button>
      <h4>便利ツールの最新情報をお届け</h4>
      <p>月2-3回、新ツールやお役立ち情報をメールでお送りします。</p>
      <form class="newsletter-form" onsubmit="return false;">
        <input type="email" class="newsletter-input" placeholder="メールアドレス" required>
        <button type="submit" class="newsletter-btn">登録</button>
      </form>
    `;

    document.body.appendChild(slidein);

    // 閉じるボタン
    slidein.querySelector('.newsletter-slidein-close').addEventListener('click', function() {
      slidein.classList.remove('show');
      sessionStorage.setItem(STORAGE_KEY, '1');
    });

    // フォーム送信
    slidein.querySelector('form').addEventListener('submit', function(e) {
      handleSubmit(this, e);
    });

    // 70%スクロールでスライドイン
    let shown = false;
    window.addEventListener('scroll', function() {
      if (shown) return;
      const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight;
      if (scrollPercent > 0.7) {
        shown = true;
        slidein.classList.add('show');
      }
    }, { passive: true });
  }

  // 初期化
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      insertInlineNewsletter();
      initSlideIn();
    });
  } else {
    insertInlineNewsletter();
    initSlideIn();
  }
})();
