(function () {
  const path = window.location.pathname;

  // Detect URL shape:
  //   /catalog/domains/<domain>/<version>.html   → versioned
  //   /catalog/domains/<domain>.html             → flat
  //   /catalog/...                               → root / index
  const versionedMatch = path.match(/\/domains\/([^\/]+)\/([^\/]+)\.html$/);
  const flatMatch      = !versionedMatch && path.match(/\/domains\/([^\/]+)\.html$/);

  let currentDomain  = null;
  let currentVersion = null;
  if (versionedMatch) {
    currentDomain  = versionedMatch[1];
    currentVersion = versionedMatch[2];
  } else if (flatMatch) {
    currentDomain = flatMatch[1];
  }

  // base = path back to /catalog/ root
  const base = versionedMatch ? '../../' : flatMatch ? '../' : '';
  const isIndex = !currentDomain;

  const domains = [
    { id: 'bakat',       label: 'bakat.id',       color: '#cf222e' },
    { id: 'ases',        label: 'ases.id',        color: '#1a7f37' },
    { id: 'peningkatan', label: 'peningkatan.id', color: '#8250df' },
    { id: 'recru',       label: 'recru.id',       color: '#bc4c00' },
  ];

  const subDomains = [
    { id: 'posisi', label: 'posisi.recru.id', color: '#0969da', parent: 'recru' },
  ];

  // Versioned domains: ordered oldest → newest; last entry is "latest".
  const domainVersions = {
    ases: [
      { id: 'v1', label: 'v1' },
    ],
  };
  const isVersioned = (id) => id in domainVersions;
  const latestOf    = (id) => domainVersions[id][domainVersions[id].length - 1];

  // Per-domain on-page anchor sections
  const domainSections = {
    posisi: [
      { anchor: 'overview',       label: 'Overview' },
      { anchor: 'core-behaviour', label: 'Core Behaviour Ontology' },
      { anchor: 'services',       label: 'Services' },
      { anchor: 'publishes',      label: 'Published Events' },
      { anchor: 'consumes',       label: 'Consumed Events' },
      { anchor: 'commands',       label: 'Commands' },
      { anchor: 'queries',        label: 'Queries' },
      { anchor: 'data-model',     label: 'Data Model' },
    ],
    bakat: [
      { anchor: 'overview',   label: 'Overview' },
      { anchor: 'services',   label: 'Services' },
      { anchor: 'publishes',  label: 'Published Events' },
      { anchor: 'consumes',   label: 'Consumed Events' },
      { anchor: 'commands',   label: 'Commands' },
      { anchor: 'queries',    label: 'Queries' },
      { anchor: 'data-model', label: 'Data Model' },
    ],
    ases: [
      { anchor: 'overview',    label: 'Overview' },
      { anchor: 'services',    label: 'Services' },
      { anchor: 'publishes',   label: 'Published Events' },
      { anchor: 'consumes',    label: 'Consumed Events' },
      { anchor: 'commands',    label: 'Commands' },
      { anchor: 'queries',     label: 'Queries' },
      { anchor: 'intake-flow', label: 'Intake Flow' },
      { anchor: 'data-model',  label: 'Data Model' },
    ],
    peningkatan: [
      { anchor: 'overview',      label: 'Overview' },
      { anchor: 'multitenancy',  label: 'Multi-tenancy' },
      { anchor: 'services',      label: 'Services' },
      { anchor: 'publishes',     label: 'Published Events' },
      { anchor: 'consumes',      label: 'Consumed Events' },
      { anchor: 'commands',      label: 'Commands' },
      { anchor: 'queries',       label: 'Queries' },
      { anchor: 'intervention',  label: 'Intervention Cycle' },
      { anchor: 'data-model',    label: 'Data Model' },
    ],
    recru: [
      { anchor: 'overview',      label: 'Overview' },
      { anchor: 'multitenancy',  label: 'Multi-tenancy' },
      { anchor: 'services',      label: 'Services' },
      { anchor: 'publishes',     label: 'Published Events' },
      { anchor: 'consumes',      label: 'Consumed Events' },
      { anchor: 'commands',      label: 'Commands' },
      { anchor: 'queries',       label: 'Queries' },
      { anchor: 'external-ats',  label: 'External ATS Bridge' },
      { anchor: 'data-model',    label: 'Data Model' },
    ],
  };

  function dLink(id) {
    return isVersioned(id)
      ? `${base}domains/${id}/`
      : `${base}domains/${id}.html`;
  }

  const onPageSection = currentDomain ? `
    <div class="nav-section">
      <span class="nav-label">On this page</span>
      ${(domainSections[currentDomain] || []).map(s => `
        <a href="#${s.anchor}" class="nav-item nav-anchor">${s.label}</a>
      `).join('')}
    </div>
  ` : `
    <div class="nav-section">
      <span class="nav-label">Flows</span>
      <a href="${base}index.html#flow-recruitment" class="nav-item">Recruitment → Hire</a>
      <a href="${base}index.html#flow-portability" class="nav-item">Data Portability</a>
      <a href="${base}index.html#flow-intervention" class="nav-item">Intervention Cycle</a>
    </div>
  `;

  const html = `
    <div class="nav-logo">
      <a href="${base}index.html">
        <span class="nav-logo-text">Talentlytica</span>
        <span class="nav-logo-sub">Architecture Catalog</span>
      </a>
    </div>

    <div class="nav-tree">

      <div class="nav-section">
        <a href="${base}index.html" class="nav-item ${isIndex ? 'active' : ''}">
          <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor" style="flex-shrink:0;opacity:.6">
            <path d="M6.906.664a1.749 1.749 0 0 1 2.188 0l5.25 4.2c.415.332.657.835.657 1.367v7.019A1.75 1.75 0 0 1 13.25 15h-3.5a.75.75 0 0 1-.75-.75V9H7v5.25a.75.75 0 0 1-.75.75h-3.5A1.75 1.75 0 0 1 1 13.25V6.23c0-.531.242-1.034.657-1.366l5.25-4.2Z"/>
          </svg>
          Overview
        </a>
      </div>

      <div class="nav-section">
        <span class="nav-label">Domains</span>
        ${domains.map(d => `
          <a href="${dLink(d.id)}" class="nav-item ${currentDomain === d.id ? 'active' : ''}" style="${currentDomain === d.id ? '--accent:' + d.color : ''}">
            <span class="nav-dot" style="background:${d.color}"></span>
            ${d.label}
          </a>
          ${subDomains.filter(s => s.parent === d.id).map(s => `
            <a href="${dLink(s.id)}" class="nav-item nav-sub-domain ${currentDomain === s.id ? 'active' : ''}" style="${currentDomain === s.id ? '--accent:' + s.color : ''}">
              <span class="nav-sub-arrow">↳</span>
              <span class="nav-dot" style="background:${s.color};width:5px;height:5px"></span>
              ${s.label}
            </a>
          `).join('')}
        `).join('')}
      </div>

      ${onPageSection}

    </div>`;

  const el = document.getElementById('left-nav');
  if (el) el.innerHTML = html;

  // Render version switcher in topbar if this page declares one
  const switcher = document.querySelector('.version-switcher');
  if (switcher) {
    const domainId = switcher.getAttribute('data-domain');
    const current  = switcher.getAttribute('data-current') || currentVersion;
    if (domainId && isVersioned(domainId)) {
      const versions = domainVersions[domainId];
      const latestId = latestOf(domainId).id;
      switcher.innerHTML = `
        <span class="version-pill-label">version</span>
        <select class="version-pill-select" aria-label="Select version">
          ${versions.map(v => `
            <option value="${v.id}" ${v.id === current ? 'selected' : ''}>${v.label}${v.id === latestId ? ' · latest' : ''}</option>
          `).join('')}
        </select>
      `;
      switcher.querySelector('.version-pill-select').addEventListener('change', (e) => {
        window.location.href = e.target.value + '.html';
      });
    }
  }

  // Highlight active anchor on scroll
  if (currentDomain) {
    const anchors = (domainSections[currentDomain] || []).map(s => s.anchor);

    function updateActive() {
      const scrollY = (document.querySelector('.app-right') || document.documentElement).scrollTop;
      let active = anchors[0];
      for (const anchor of anchors) {
        const el = document.getElementById(anchor);
        if (el && el.offsetTop - 80 <= scrollY) active = anchor;
      }
      document.querySelectorAll('.nav-anchor').forEach(a => {
        a.classList.toggle('active', a.getAttribute('href') === '#' + active);
      });
    }

    const scroller = document.querySelector('.app-right') || window;
    scroller.addEventListener('scroll', updateActive, { passive: true });
    setTimeout(updateActive, 100);
  }
})();
