(function() {
  'use strict';

  var anniversaryData = {
    "1-1": [
      { name: "元日", genre: "祝日", description: "年のはじめを祝う国民の祝日" },
      { name: "太陽暦施行の日", genre: "歴史", description: "1873年に太陰暦から太陽暦（グレゴリオ暦）に切り替わった日" },
      { name: "鉄腕アトムの日", genre: "文化", description: "1963年にTV版『鉄腕アトム』の放送が開始された日" },
      { name: "少年法施行の日", genre: "歴史", description: "1949年に少年法が施行された日" }
    ],
    "1-2": [
      { name: "初夢の日", genre: "文化", description: "1月2日の夜に見る夢を初夢とする説が広く知られている" },
      { name: "箱根駅伝（往路）", genre: "行事", description: "東京箱根間往復大学駅伝競走の往路が行われる日" },
      { name: "月ロケットの日", genre: "歴史", description: "1959年にソ連が月ロケット「ルナ1号」を打ち上げた日" }
    ],
    "1-3": [
      { name: "箱根駅伝（復路）", genre: "行事", description: "東京箱根間往復大学駅伝競走の復路が行われる日" },
      { name: "ひとみの日", genre: "健康", description: "「ひと（1）み（3）」の語呂合わせによる記念日" },
      { name: "駆け落ちの日", genre: "文化", description: "1938年に女優・岡田嘉子がソ連に越境した日に由来" }
    ],
    "1-4": [
      { name: "御用始め", genre: "行事", description: "官公庁の仕事始めの日" },
      { name: "石の日", genre: "文化", description: "「い（1）し（4）」の語呂合わせ。墓石や記念碑などに思いを馳せる日" },
      { name: "世界点字デー", genre: "国際デー", description: "点字の考案者ルイ・ブライユの誕生日にちなんだ国際デー" }
    ],
    "1-5": [
      { name: "いちごの日", genre: "食べ物", description: "「いち（1）ご（5）」の語呂合わせによる記念日" },
      { name: "小寒（頃）", genre: "行事", description: "二十四節気のひとつ。寒さが厳しくなり始める頃（年により日付が変動）" },
      { name: "囲碁の日", genre: "文化", description: "「い（1）ご（5）」の語呂合わせ。日本棋院が制定" }
    ],
    "1-6": [
      { name: "小寒", genre: "行事", description: "二十四節気のひとつ。2026年の小寒はこの日" },
      { name: "ケーキの日", genre: "食べ物", description: "1879年に日本初のケーキの宣伝が行われたことに由来" },
      { name: "色の日", genre: "文化", description: "「い（1）ろ（6）」の語呂合わせによる記念日" },
      { name: "東京消防出初式", genre: "行事", description: "東京消防庁による新年恒例の消防演習" }
    ],
    "1-7": [
      { name: "七草", genre: "行事", description: "春の七草を入れた七草粥を食べて無病息災を願う日" },
      { name: "爪切りの日", genre: "文化", description: "七草を浸した水に爪をつけてから切ると、その年は風邪をひかないという言い伝え" },
      { name: "千円札の日", genre: "歴史", description: "1950年に初の千円札（聖徳太子）が発行された日" }
    ],
    "1-8": [
      { name: "勝負事の日", genre: "文化", description: "「一（1）か八（8）か」の語呂合わせによる記念日" },
      { name: "外についてる日", genre: "食べ物", description: "「そと（1）ば（8）」で外についてる→ロールケーキの日（語呂合わせ）" },
      { name: "平成スタートの日", genre: "歴史", description: "1989年に元号が昭和から平成に改元された日" },
      { name: "イヤホンの日", genre: "文化", description: "「い（1）や（8）ほん」の語呂合わせによる記念日" }
    ],
    "1-9": [
      { name: "とんちの日", genre: "文化", description: "一休さん（一(1)休(9)）にちなんだ語呂合わせの記念日" },
      { name: "風邪の日", genre: "健康", description: "1795年に横綱・谷風が流感で亡くなったことに由来" },
      { name: "クイズの日", genre: "文化", description: "「ク（1/9=いちきゅう→クイズ）」の語呂合わせ" }
    ],
    "1-10": [
      { name: "110番の日", genre: "行事", description: "警察庁が1985年に制定。110番の適切な利用を啓発する日" },
      { name: "明太子の日", genre: "食べ物", description: "1949年にふくやが日本で初めて明太子を販売した日" },
      { name: "かんぴょうの日", genre: "食べ物", description: "「干（1）瓢（10）」の語呂合わせによる記念日" }
    ],
    "1-11": [
      { name: "鏡開き", genre: "行事", description: "正月に供えた鏡餅を割って食べる行事" },
      { name: "塩の日", genre: "歴史", description: "1569年に上杉謙信が武田信玄に塩を送ったとされる日" },
      { name: "樽酒の日", genre: "食べ物", description: "鏡開きにちなみ、奈良県の長龍酒造が制定" }
    ],
    "1-12": [
      { name: "成人の日", genre: "祝日", description: "大人になったことを自覚し祝う国民の祝日（2026年は1月12日）" },
      { name: "スキーの日", genre: "文化", description: "1911年にオーストリアのレルヒ少佐が日本で初めてスキーを指導した日" },
      { name: "桜島の日", genre: "歴史", description: "1914年の桜島大正大噴火が発生した日" }
    ],
    "1-13": [
      { name: "たばこの日", genre: "文化", description: "1946年にピースが初めて発売された日" },
      { name: "咸臨丸出航記念日", genre: "歴史", description: "1860年に咸臨丸が日本初の太平洋横断に出航した日" },
      { name: "韓国の方言の日", genre: "国際デー", description: "韓国で方言の多様性を認識し保全を促す記念日" }
    ],
    "1-14": [
      { name: "愛と希望と勇気の日（タロ・ジロの日）", genre: "文化", description: "1959年に南極で樺太犬タロとジロの生存が確認された日" },
      { name: "飾納・松納", genre: "行事", description: "正月飾りを取り外す日（地域により異なる）" },
      { name: "尖閣諸島開拓の日", genre: "歴史", description: "1895年に尖閣諸島の日本領編入が閣議決定された日" }
    ],
    "1-15": [
      { name: "小正月", genre: "行事", description: "正月行事の区切りの日。どんど焼き・小豆粥などの行事がある" },
      { name: "いちごの日", genre: "食べ物", description: "「いい（1）いち（1）ご（5）」の語呂合わせ。全国いちご消費拡大協議会が制定" },
      { name: "ウィキペディアの日", genre: "文化", description: "2001年にウィキペディア英語版が公開された日" },
      { name: "手洗いの日", genre: "健康", description: "P&Gが制定。手が5本指（い（1）い（1）5本指）の語呂合わせ" }
    ],
    "1-16": [
      { name: "禁酒の日", genre: "歴史", description: "1920年にアメリカで禁酒法が施行された日" },
      { name: "藪入り", genre: "行事", description: "住み込み奉公人が休暇をもらって実家に帰れる日" },
      { name: "ヒーローの日", genre: "文化", description: "「ヒ（1）ー（1）ロー（6）」の語呂合わせによる記念日" }
    ],
    "1-17": [
      { name: "防災とボランティアの日", genre: "行事", description: "1995年の阪神・淡路大震災を契機に制定された日" },
      { name: "おむすびの日", genre: "食べ物", description: "阪神・淡路大震災でボランティアによるおむすびの炊き出しに由来" },
      { name: "湾岸戦争開戦の日", genre: "歴史", description: "1991年に多国籍軍がイラクへの空爆を開始した日" }
    ],
    "1-18": [
      { name: "都バスの日", genre: "歴史", description: "1924年に東京市営バスが運行を開始した日" },
      { name: "118番の日", genre: "行事", description: "海上保安庁への緊急通報番号118番の周知のため制定された日" },
      { name: "振袖火事の日", genre: "歴史", description: "1657年の明暦の大火（振袖火事）が発生した日" }
    ],
    "1-19": [
      { name: "空気清浄機の日", genre: "文化", description: "「い（1）い（1）く（9）うき」の語呂合わせ。日本電機工業会が制定" },
      { name: "のど自慢の日", genre: "文化", description: "1946年にNHK「のど自慢素人音楽会」が始まった日" },
      { name: "家庭消火器点検の日", genre: "行事", description: "1と19で119番にちなんだ消火器点検啓発日" }
    ],
    "1-20": [
      { name: "大寒", genre: "行事", description: "二十四節気のひとつ。一年で最も寒い時期とされる（2026年はこの日）" },
      { name: "二十日正月", genre: "行事", description: "正月の最後の日とされ、正月料理の残りを食べ尽くす日" },
      { name: "玉の輿の日", genre: "歴史", description: "1905年にモルガン財閥の当主と日本女性・お雪が結婚した日" }
    ],
    "1-21": [
      { name: "ライバルが手を結ぶ日", genre: "文化", description: "1866年に薩長同盟が結ばれた日にちなんだ記念日" },
      { name: "料理番組の日", genre: "文化", description: "1937年にイギリスBBCで世界初の料理番組が放送された日" },
      { name: "国際抱擁デー", genre: "国際デー", description: "ハグの大切さを広めるために制定された国際デー" }
    ],
    "1-22": [
      { name: "カレーの日", genre: "食べ物", description: "1982年に全国の学校給食でカレーが提供されたことに由来" },
      { name: "ジャズの日", genre: "文化", description: "JAZZの「JA」が1月（January）、「ZZ」が22に見えることから" },
      { name: "飛行船の日", genre: "歴史", description: "1916年に日本初の飛行船「雄飛号」が実験飛行に成功した日" }
    ],
    "1-23": [
      { name: "電子メールの日", genre: "文化", description: "「1（いい）23（ふみ＝文）」の語呂合わせ。電子メッセージング協議会が制定" },
      { name: "アーモンドの日", genre: "食べ物", description: "アーモンド約23粒が1日の摂取目安量であることから" },
      { name: "八甲田山の日", genre: "歴史", description: "1902年に八甲田雪中行軍遭難事件が発生した日" }
    ],
    "1-24": [
      { name: "教育の国際デー", genre: "国際デー", description: "国連が2018年に制定した教育の重要性を認識する国際デー" },
      { name: "ゴールドラッシュの日", genre: "歴史", description: "1848年にカリフォルニアで金が発見されゴールドラッシュが始まった日" },
      { name: "法律扶助の日", genre: "文化", description: "1952年に法律扶助協会（現・法テラス）が設立された日" }
    ],
    "1-25": [
      { name: "日本最低気温の日", genre: "歴史", description: "1902年に北海道旭川で-41℃の日本最低気温を記録した日" },
      { name: "左遷の日", genre: "歴史", description: "901年に菅原道真が太宰府に左遷された日" },
      { name: "お詫びの日", genre: "文化", description: "1077年のカノッサの屈辱にちなんだ記念日" }
    ],
    "1-26": [
      { name: "文化財防火デー", genre: "行事", description: "1949年の法隆寺金堂火災を受けて制定された文化財保護の日" },
      { name: "国際関税デー", genre: "国際デー", description: "1953年に関税協力理事会（現WCO）が発足した日にちなむ" },
      { name: "コラーゲンの日", genre: "健康", description: "1960年にコラーゲンの構造が発表された日" }
    ],
    "1-27": [
      { name: "ホロコースト犠牲者を想起する国際デー", genre: "国際デー", description: "1945年のアウシュヴィッツ解放の日。国連が2005年に制定" },
      { name: "国旗制定記念日", genre: "歴史", description: "1870年に日の丸が国旗として制定された日" },
      { name: "求婚の日", genre: "文化", description: "1883年に日本初の求婚広告が新聞に掲載された日" }
    ],
    "1-28": [
      { name: "データ・プライバシーの日", genre: "国際デー", description: "個人情報保護の重要性を啓発する国際的な記念日" },
      { name: "衣類乾燥機の日", genre: "文化", description: "「い（1）るい（2）ふん（8）わり」の語呂合わせ" },
      { name: "コピーライターの日", genre: "文化", description: "1956年に「万国著作権条約」が日本で公布された日" }
    ],
    "1-29": [
      { name: "昭和基地開設記念日", genre: "歴史", description: "1957年に日本の南極観測隊が昭和基地を開設した日" },
      { name: "タウン情報の日", genre: "文化", description: "1973年に日本初の地域情報誌が創刊された日" },
      { name: "人口調査記念日", genre: "歴史", description: "1872年に日本初の全国戸籍調査が実施された日" }
    ],
    "1-30": [
      { name: "3分間電話の日", genre: "歴史", description: "1970年に公衆電話の市内通話料金が3分10円になった日" },
      { name: "孝明天皇祭", genre: "行事", description: "孝明天皇の命日にちなんだ宮中祭祀" },
      { name: "タビナカの日", genre: "文化", description: "「た（1）び（3）なか（0）」の語呂合わせによる旅行記念日" }
    ],
    "1-31": [
      { name: "愛妻の日", genre: "文化", description: "「あい（I=1）さい（31）」の語呂合わせ。日本愛妻家協会が制定" },
      { name: "生命保険の日", genre: "歴史", description: "1882年に日本初の生命保険金が支払われた日" },
      { name: "晦日正月", genre: "行事", description: "正月の終わりの日。松の内に届かなかった年始回りをする日" }
    ]
  };

  var holidays = ["1-1", "1-12"];

  var genreMap = {
    "祝日": "holiday",
    "食べ物": "food",
    "文化": "culture",
    "国際デー": "international",
    "歴史": "history",
    "行事": "event",
    "健康": "health"
  };

  function buildCalendar() {
    var grid = document.getElementById('calendarGrid');
    var dayNames = ['月', '火', '水', '木', '金', '土', '日'];

    dayNames.forEach(function(name, i) {
      var el = document.createElement('div');
      el.className = 'day-header';
      if (i === 5) el.className += ' sat';
      if (i === 6) el.className += ' sun';
      el.textContent = name;
      grid.appendChild(el);
    });

    // 2026年1月1日は木曜日 → 月曜始まりで3つの空セル
    var firstDayOffset = 3;
    for (var i = 0; i < firstDayOffset; i++) {
      var empty = document.createElement('div');
      empty.className = 'day-cell empty';
      grid.appendChild(empty);
    }

    var today = new Date();
    var isJanuary2026 = (today.getFullYear() === 2026 && today.getMonth() === 0);

    for (var day = 1; day <= 31; day++) {
      var cell = document.createElement('div');
      cell.className = 'day-cell';

      var key = '1-' + day;
      var dayOfWeek = (firstDayOffset + day - 1) % 7;

      if (dayOfWeek === 5) cell.className += ' saturday';
      if (dayOfWeek === 6) cell.className += ' sunday';
      if (holidays.indexOf(key) !== -1) cell.className += ' holiday';

      if (isJanuary2026 && today.getDate() === day) {
        cell.className += ' today';
      }

      var numEl = document.createElement('span');
      numEl.className = 'day-number';
      numEl.textContent = day;
      cell.appendChild(numEl);

      if (anniversaryData[key]) {
        var dot = document.createElement('span');
        dot.className = 'day-dot';
        cell.appendChild(dot);
      }

      cell.setAttribute('data-day', day);
      cell.addEventListener('click', function() {
        var d = parseInt(this.getAttribute('data-day'));
        selectDay(d);
      });

      grid.appendChild(cell);
    }

    // 自動的に今日を選択（1月の場合）、そうでなければ1日を選択
    if (isJanuary2026) {
      selectDay(today.getDate());
    } else {
      selectDay(1);
    }
  }

  function selectDay(day) {
    var cells = document.querySelectorAll('.day-cell');
    cells.forEach(function(c) { c.classList.remove('selected'); });

    var target = document.querySelector('.day-cell[data-day="' + day + '"]');
    if (target) target.classList.add('selected');

    showAnniversaries(day);
  }

  function showAnniversaries(day) {
    var display = document.getElementById('anniversaryDisplay');
    var key = '1-' + day;
    var data = anniversaryData[key];

    if (!data || data.length === 0) {
      display.innerHTML = '<p class="no-data">この日の記念日データはありません</p>';
      return;
    }

    var html = '<h3>1月' + day + '日の記念日</h3>';
    html += '<ul class="anniversary-list">';

    data.forEach(function(item) {
      var genreClass = genreMap[item.genre] || 'culture';
      html += '<li class="anniversary-item" style="border-left-color:' + getBorderColor(genreClass) + '">';
      html += '<span class="genre-tag ' + genreClass + '">' + escapeHtml(item.genre) + '</span>';
      html += '<div class="anniversary-text">';
      html += '<span class="anniversary-name">' + escapeHtml(item.name) + '</span>';
      html += '<span class="anniversary-desc">' + escapeHtml(item.description) + '</span>';
      html += '</div>';
      html += '</li>';
    });

    html += '</ul>';
    display.innerHTML = html;
  }

  function getBorderColor(genreClass) {
    var colors = {
      holiday: '#dc2626',
      food: '#c2410c',
      culture: '#7c3aed',
      international: '#2563eb',
      history: '#92400e',
      event: '#065f46',
      health: '#be185d'
    };
    return colors[genreClass] || '#64748b';
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }

  buildCalendar();
})();
