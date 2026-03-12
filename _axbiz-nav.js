// ═══════════════════════════════════════
// AX BIZ CEO Platform — Shared Navigation v2.0
// ═══════════════════════════════════════

const AX_NAV = [
  {group:'대시보드', items:[
    {key:'home',         icon:'🏠',  label:'그룹 현황',          href:'AXBIZ_CEO_Platform.html'},
    {key:'strategy',     icon:'🗺️', label:'전략 맵',             href:'axbiz-strategy.html'},
  ]},
  {group:'운영', items:[
    {key:'projects-group',icon:'📋', label:'프로젝트',            href:null, submenu:[
      {key:'proj-internal',icon:'🏗️', label:'내부 추진 프로젝트', href:'axbiz-proj-internal.html'},
      {key:'proj-client',  icon:'🤝', label:'고객 프로젝트 CRM',  href:'axbiz-proj-client.html'},
      {key:'projects',     icon:'📊', label:'종합 현황',           href:'axbiz-projects.html'},
    ]},
    {key:'pipeline',     icon:'💼',  label:'비즈니스 파이프라인', href:'axbiz-pipeline.html'},
  ]},
  {group:'플랫폼', items:[
    {key:'aiplatform',   icon:'🤖',  label:'AI 플랫폼',           href:'axbiz-aiplatform.html'},
    {key:'community',    icon:'👥',  label:'AI 창업가 연합',       href:'axbiz-community.html'},
  ]},
  {group:'경영', items:[
    {key:'finance',      icon:'💰',  label:'재무/성과',            href:'axbiz-finance.html'},
    {key:'actions',      icon:'⚡',  label:'실행 우선순위',        href:'axbiz-actions.html'},
    {key:'team',         icon:'🧑‍💼', label:'팀/파운더',           href:'axbiz-team.html'},
    {key:'portfolio',    icon:'🌐',  label:'플랫폼 포트폴리오',    href:'axbiz-portfolio.html'},
    {key:'docs',         icon:'📚',  label:'전략 문서',            href:'axbiz-docs.html'},
  ]},
  {group:'인사이트', items:[
    {key:'insights',     icon:'💡',  label:'인사이트 제안',        href:'axbiz-insights.html'},
    {key:'news',         icon:'📰',  label:'뉴스 & 인사이트',      href:'news.html'},
    {key:'manual',       icon:'📖',  label:'플랫폼 매뉴얼',        href:'manual.html'},
  ]},
  {group:'고객사', items:[
    {key:'clients',      icon:'🏢',  label:'고객사 대시보드',      href:'axbiz-clients.html'},
  ]},
];

const PROJ_SUBKEYS = ['proj-internal','proj-client','projects'];

// ───────────────────────────────────────
// initNav: call from each page with that page's key
// ───────────────────────────────────────
function initNav(activeKey) {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const isSubProject = PROJ_SUBKEYS.includes(activeKey);
  const isProjectParent = activeKey === 'projects-group';

  let html = `
    <div class="sidebar-logo">
      <img src="로고-AX비즈그룹.jpg" alt="AX BIZ GROUP" class="sidebar-logo-img">
      <div class="sub">CEO 마스터 플랫폼 v2.0</div>
    </div>
    <div class="nav-platform-btn-wrap">
      <a class="nav-platform-btn${activeKey === 'home' ? ' active' : ''}" href="AXBIZ_CEO_Platform.html" target="_blank">
        <span class="nav-platform-icon">🏢</span>
        <span class="nav-platform-text">
          <span class="nav-platform-name">AX비즈그룹</span>
          <span class="nav-platform-sub">그룹 현황 대시보드</span>
        </span>
        <span class="nav-platform-arrow">→</span>
      </a>
    </div>
    <nav class="nav">`;

  AX_NAV.forEach(group => {
    html += `<div class="nav-group-label">${group.group}</div>`;
    group.items.forEach(item => {
      if (item.submenu) {
        const open = isSubProject || isProjectParent;
        html += `<div class="nav-item${open ? ' active' : ''}" id="navProjParent" onclick="toggleProjMenu()">
          <span class="icon">${item.icon}</span> ${item.label}
          <span id="projArrow" style="margin-left:auto;font-size:9px;color:var(--text-3)">${open ? '▼' : '▶'}</span>
        </div>
        <div id="projSubMenu" style="display:${open ? 'block' : 'none'};background:rgba(0,0,0,.25);border-left:2px solid rgba(46,164,255,.2);margin:0 8px 4px;border-radius:0 0 6px 6px">`;
        item.submenu.forEach(sub => {
          html += `<a class="nav-item nav-sub${activeKey === sub.key ? ' active' : ''}" href="${sub.href}" target="_blank">
            <span class="icon">${sub.icon}</span> ${sub.label}
          </a>`;
        });
        html += `</div>`;
      } else {
        html += `<a class="nav-item${activeKey === item.key ? ' active' : ''}" href="${item.href}" target="_blank">
          <span class="icon">${item.icon}</span> ${item.label}
        </a>`;
      }
    });
  });

  html += `</nav>
    <div class="sidebar-footer">
      <span class="live-dot"></span>실시간 동기화 중<br>
      <span style="margin-top:4px;display:block">갱신: <span id="lastUpdate">-</span></span>
    </div>`;

  sidebar.innerHTML = html;

  // Set page date
  const pd = document.getElementById('pageDate');
  if (pd) pd.textContent = new Date().toISOString().slice(0, 10);

  // Inject page footer
  const main = document.querySelector('.main');
  if (main && !document.querySelector('.page-footer')) {
    const footer = document.createElement('div');
    footer.className = 'page-footer';
    footer.innerHTML = `
      <div class="page-footer-inner">
        <div class="pf-brand">
          <img src="로고-AX비즈그룹.jpg" alt="AX BIZ GROUP" class="pf-logo-img">
          <span class="pf-sep"></span>
          <span class="pf-ver">CEO 마스터 플랫폼 v2.0 &nbsp;·&nbsp; 심재우 대표</span>
        </div>
        <nav class="pf-nav">
          <a href="AXBIZ_CEO_Platform.html" target="_blank">그룹 현황</a>
          <a href="axbiz-strategy.html" target="_blank">전략 맵</a>
          <a href="axbiz-pipeline.html" target="_blank">파이프라인</a>
          <a href="axbiz-finance.html" target="_blank">재무</a>
          <a href="axbiz-actions.html" target="_blank">실행 우선순위</a>
          <a href="axbiz-insights.html" target="_blank">인사이트</a>
          <a href="index.html">🏠 랜딩</a>
        </nav>
        <div class="pf-right">
          <span class="live-dot"></span>
          실시간 동기화 &nbsp;·&nbsp; <span id="footerDate">-</span>
        </div>
      </div>`;
    main.appendChild(footer);
  }

  // Set footer date
  const fd = document.getElementById('footerDate');
  if (fd) fd.textContent = new Date().toISOString().slice(0, 10);

  // Start live updates
  updateLiveData();
  setInterval(updateLiveData, 8000);
}

// ───────────────────────────────────────
// Toggle project sub-menu
// ───────────────────────────────────────
function toggleProjMenu() {
  const menu   = document.getElementById('projSubMenu');
  const arrow  = document.getElementById('projArrow');
  const parent = document.getElementById('navProjParent');
  if (!menu) return;
  const open = menu.style.display === 'block';
  menu.style.display = open ? 'none' : 'block';
  if (arrow)  arrow.textContent = open ? '▶' : '▼';
  if (parent) parent.classList.toggle('active', !open);
}

// ───────────────────────────────────────
// Live clock update
// ───────────────────────────────────────
function updateLiveData() {
  const now = new Date();
  const el  = document.getElementById('lastUpdate');
  if (el) el.textContent =
    now.getHours().toString().padStart(2,'0') + ':' +
    now.getMinutes().toString().padStart(2,'0') + ':' +
    now.getSeconds().toString().padStart(2,'0');
}

// ───────────────────────────────────────
// Chart defaults (shared across pages)
// ───────────────────────────────────────
const chartDefaults = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: { legend: { labels: { color: 'rgba(139,148,158,1)', font: { size: 11 } } } },
  scales: {
    x: { ticks: { color: 'rgba(139,148,158,1)', font: { size: 10 } }, grid: { color: 'rgba(48,54,61,.4)' } },
    y: { ticks: { color: 'rgba(139,148,158,1)', font: { size: 10 } }, grid: { color: 'rgba(48,54,61,.4)' } },
  },
};

// ───────────────────────────────────────
// Shared tab switcher
// ───────────────────────────────────────
function switchTab(btn, tabId, groupClass) {
  document.querySelectorAll('.' + groupClass).forEach(t => t.style.display = 'none');
  btn.closest('.tabs').querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById(tabId).style.display = 'block';
}

// ───────────────────────────────────────
// Decision handler (actions page)
// ───────────────────────────────────────
function decide(btn, choice) {
  const card = btn.closest('.decision-card');
  const labels = { y: '✅ 결정됨: 진행', n: '❌ 결정됨: 보류', d: '🔄 결정됨: 연기' };
  card.querySelectorAll('.btn').forEach(b => b.classList.add('decided'));
  const msg = document.createElement('div');
  msg.style.cssText = 'margin-top:10px;font-size:12px;font-weight:600;color:var(--green)';
  msg.textContent = labels[choice];
  card.appendChild(msg);
}
