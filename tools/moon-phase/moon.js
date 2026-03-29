"use strict";
// 月齢計算モジュール
// 朔望月（synodic month）= 29.53059日
const SYNODIC_MONTH = 29.53059;
// 既知の新月日時（2000年1月6日 18:14 UTC）を基準点とする
const KNOWN_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0));
function getMoonAge(date) {
    const diff = date.getTime() - KNOWN_NEW_MOON.getTime();
    const days = diff / (1000 * 60 * 60 * 24);
    let age = days % SYNODIC_MONTH;
    if (age < 0)
        age += SYNODIC_MONTH;
    return age;
}
function getMoonInfo(date) {
    const age = getMoonAge(date);
    const phase = age / SYNODIC_MONTH; // 0〜1
    // 輝面比（illumination）
    const illumination = (1 - Math.cos(2 * Math.PI * phase)) / 2;
    // 月相インデックス（8分割）
    const phaseIndex = Math.round(phase * 8) % 8;
    const phaseNames = [
        '新月', '三日月', '上弦の月', '十日夜の月',
        '満月', '十八夜の月', '下弦の月', '二十六夜の月'
    ];
    const phaseEmojis = ['🌑', '🌒', '🌓', '🌔', '🌕', '🌖', '🌗', '🌘'];
    return {
        age,
        phaseName: phaseNames[phaseIndex],
        phaseEmoji: phaseEmojis[phaseIndex],
        illumination,
        phaseIndex
    };
}
// --- DOM操作 ---
function formatAge(age) {
    return age.toFixed(1);
}
function drawMoon(svg, info) {
    const size = 200;
    const cx = size / 2;
    const cy = size / 2;
    const r = 80;
    // 月の満ち欠けを描画
    const phase = info.age / SYNODIC_MONTH; // 0〜1
    // 背景（暗い月面）
    const bgCircle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    bgCircle.setAttribute('cx', String(cx));
    bgCircle.setAttribute('cy', String(cy));
    bgCircle.setAttribute('r', String(r));
    bgCircle.setAttribute('fill', '#2a2a3a');
    // 明るい部分をパスで描画
    let d;
    const sweep = phase <= 0.5 ? 1 : 0;
    const px = Math.cos(2 * Math.PI * phase) * r;
    if (phase < 0.01 || phase > 0.99) {
        // 新月に近い: ほぼ暗い
        d = '';
    }
    else if (Math.abs(phase - 0.5) < 0.01) {
        // 満月に近い: ほぼ明るい
        d = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx} ${cy + r} A ${r} ${r} 0 1 1 ${cx} ${cy - r} Z`;
    }
    else {
        // 右半球 arc + 左半球 elliptic arc
        if (phase < 0.5) {
            // 新月→満月（右側が明るくなっていく）
            const ex = r * Math.cos(Math.PI * (1 - 2 * phase));
            d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 1 ${cx} ${cy + r} A ${ex} ${r} 0 0 ${phase < 0.25 ? 1 : 0} ${cx} ${cy - r} Z`;
        }
        else {
            // 満月→新月（左側が明るく残る）
            const ex = r * Math.cos(Math.PI * (2 * phase - 1));
            d = `M ${cx} ${cy - r} A ${r} ${r} 0 0 0 ${cx} ${cy + r} A ${ex} ${r} 0 0 ${phase > 0.75 ? 0 : 1} ${cx} ${cy - r} Z`;
        }
    }
    svg.innerHTML = '';
    svg.setAttribute('viewBox', `0 0 ${size} ${size}`);
    // 月面テクスチャ風グラデーション
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'radialGradient');
    gradient.setAttribute('id', 'moonGlow');
    gradient.innerHTML = `
    <stop offset="0%" stop-color="#fffde8"/>
    <stop offset="70%" stop-color="#f5e6a3"/>
    <stop offset="100%" stop-color="#d4c476"/>
  `;
    defs.appendChild(gradient);
    svg.appendChild(defs);
    svg.appendChild(bgCircle);
    if (d) {
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', d);
        path.setAttribute('fill', 'url(#moonGlow)');
        svg.appendChild(path);
    }
}
function renderCalendar(year, month, container) {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDow = firstDay.getDay(); // 0=日
    const daysInMonth = lastDay.getDate();
    const today = new Date();
    let html = '<table class="moon-calendar"><thead><tr>';
    const dayNames = ['日', '月', '火', '水', '木', '金', '土'];
    for (const d of dayNames) {
        html += `<th>${d}</th>`;
    }
    html += '</tr></thead><tbody><tr>';
    // 空セル
    for (let i = 0; i < startDow; i++) {
        html += '<td class="empty"></td>';
    }
    let dow = startDow;
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day, 12, 0, 0);
        const info = getMoonInfo(date);
        const isToday = date.getFullYear() === today.getFullYear() &&
            date.getMonth() === today.getMonth() &&
            date.getDate() === today.getDate();
        const todayClass = isToday ? ' today' : '';
        html += `<td class="moon-day${todayClass}" data-date="${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}">
      <div class="day-num">${day}</div>
      <div class="day-emoji">${info.phaseEmoji}</div>
      <div class="day-age">${formatAge(info.age)}</div>
    </td>`;
        dow++;
        if (dow === 7 && day < daysInMonth) {
            html += '</tr><tr>';
            dow = 0;
        }
    }
    // 残りの空セル
    while (dow > 0 && dow < 7) {
        html += '<td class="empty"></td>';
        dow++;
    }
    html += '</tr></tbody></table>';
    container.innerHTML = html;
    // カレンダーのセルをクリックで日付選択
    container.querySelectorAll('.moon-day').forEach(td => {
        td.addEventListener('click', () => {
            const dateStr = td.dataset.date;
            const input = document.getElementById('date-input');
            input.value = dateStr;
            input.dispatchEvent(new Event('change'));
        });
    });
}
function updateDisplay() {
    const input = document.getElementById('date-input');
    const date = new Date(input.value + 'T12:00:00');
    if (isNaN(date.getTime()))
        return;
    const info = getMoonInfo(date);
    // メイン表示更新
    const ageEl = document.getElementById('moon-age');
    const nameEl = document.getElementById('moon-name');
    const emojiEl = document.getElementById('moon-emoji');
    const illumEl = document.getElementById('moon-illumination');
    const svgEl = document.getElementById('moon-svg');
    const dateLabel = document.getElementById('date-label');
    ageEl.textContent = formatAge(info.age);
    nameEl.textContent = info.phaseName;
    emojiEl.textContent = info.phaseEmoji;
    illumEl.textContent = (info.illumination * 100).toFixed(1) + '%';
    dateLabel.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
    drawMoon(svgEl, info);
    // カレンダー更新
    const calContainer = document.getElementById('calendar-container');
    renderCalendar(date.getFullYear(), date.getMonth(), calContainer);
    // カレンダーヘッダー更新
    const calHeader = document.getElementById('calendar-header');
    calHeader.textContent = `${date.getFullYear()}年${date.getMonth() + 1}月`;
}
function init() {
    const input = document.getElementById('date-input');
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    input.value = `${yyyy}-${mm}-${dd}`;
    input.addEventListener('change', updateDisplay);
    // 前月・次月ボタン
    document.getElementById('prev-month').addEventListener('click', () => {
        const d = new Date(input.value + 'T12:00:00');
        d.setMonth(d.getMonth() - 1);
        input.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        updateDisplay();
    });
    document.getElementById('next-month').addEventListener('click', () => {
        const d = new Date(input.value + 'T12:00:00');
        d.setMonth(d.getMonth() + 1);
        input.value = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        updateDisplay();
    });
    // 今日ボタン
    document.getElementById('today-btn').addEventListener('click', () => {
        input.value = `${yyyy}-${mm}-${dd}`;
        updateDisplay();
    });
    updateDisplay();
}
document.addEventListener('DOMContentLoaded', init);
