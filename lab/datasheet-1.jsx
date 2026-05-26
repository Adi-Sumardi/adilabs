/* global React */
const { useEffect, useMemo, useRef, useState } = React;

/* ============ Reveal ============ */
function Reveal({ children, delay = 0, as: Tag = 'div', className = '', style = {} }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { el.classList.add('in'); io.unobserve(el); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return <Tag ref={ref} className={`reveal ${className}`} style={{ ...style, '--rd': `${delay}s` }}>{children}</Tag>;
}

/* ============ TOP BAR ============ */
function TopBar({ brand, facility }) {
  return (
    <div className="topbar">
      <div className="topbar-inner">
        <a className="brand" href="#top">
          <div className="logo">a</div>
          <div className="id">
            <b>{brand.code}</b>
            <span>{facility.designation} · {facility.classification.split('/')[0]}</span>
          </div>
        </a>
        <div className="meta">
          <span>STATUS<b>{facility.operational}</b></span>
          <span className="live"><span className="dot" /> ONLINE</span>
          <span>CYCLE<b>{facility.cycle}</b></span>
          <span>CAP<b>{facility.capacity}</b></span>
          <span>INTAKE<b>{facility.intake}</b></span>
        </div>
        <div className="actions">
          <a className="btn" href="#catalog">CATALOG</a>
          <a className="btn" href="#packages">PRICING</a>
          <a className="btn primary" href="#booking">BOOK →</a>
        </div>
      </div>
    </div>
  );
}

/* ============ HERO ============ */
function Hero({ brand, facility }) {
  return (
    <section className="hero shell" id="top">
      <div className="hero-tag">
        <span className="dot" />
        <span>R&D · OPERATIONAL · INTAKE {facility.intake}</span>
        <span>·</span>
        <span>{brand.coords}</span>
      </div>

      <div className="hero-grid">
        <div>
          <h1 className="hero-title">
            <span className="row"><span className="marker">[ 01 ]</span>{facility.headline[0]}</span>
            <span className="row"><em>{facility.headline[1]}</em></span>
            <span className="row"><span className="underline">{facility.headline[2]}.</span></span>
          </h1>
          <p className="hero-intent">
            Sistem produksi yang <strong>scalable</strong>, API yang <strong>bersih</strong>,
            dan migrasi legacy yang <strong>tidak membangunkan tim</strong> di jam 3 pagi.
          </p>
          <div className="hero-cta">
            <a className="cta signal" href="#packages">View packages →</a>
            <a className="cta ghost" href="#booking">Book free consult</a>
          </div>
        </div>

        <div className="hero-readout">
          <div className="ds-bar">
            <span>DOC · {facility.designation}-DS · REV.05.2026</span>
            <span className="live">● LIVE</span>
          </div>
          <div className="ds-body">
            <div className="spec-row highlight">
              <span className="k">designation</span>
              <span className="v amber">{facility.designation}</span>
            </div>
            <div className="spec-row">
              <span className="k">classification</span>
              <span className="v">{facility.classification}</span>
            </div>
            <div className="spec-row">
              <span className="k">operator</span>
              <span className="v">{brand.name.toUpperCase()}</span>
            </div>
            <div className="spec-row">
              <span className="k">established</span>
              <span className="v">{brand.established.replace('EST. ', '')}</span>
            </div>
            <div className="spec-row">
              <span className="k">license · serial</span>
              <span className="v">{brand.license}</span>
            </div>
            <div className="spec-row">
              <span className="k">specialization</span>
              <span className="v signal">{brand.role.toUpperCase()}</span>
            </div>
            <div className="spec-row">
              <span className="k">throughput</span>
              <span className="v">12 deploys / wk</span>
            </div>
            <div className="spec-row">
              <span className="k">uptime · 90d</span>
              <span className="v green">99.94 %</span>
            </div>
          </div>
          <div className="spec-foot">
            <span>UPDATED 2026-05-26 / 09:14 WIB</span>
            <span className="green">● ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="cell">
          <span className="l">// FIG 01 · YRS</span>
          <span className="v">5<span className="sub">+</span></span>
          <span className="s">operational</span>
        </div>
        <div className="cell">
          <span className="l">// FIG 02 · FILES</span>
          <span className="v">8K<span className="sub">+</span></span>
          <span className="s">assets shipped</span>
        </div>
        <div className="cell">
          <span className="l">// FIG 03 · %</span>
          <span className="v">99.9</span>
          <span className="s">uptime 90d</span>
        </div>
        <div className="cell">
          <span className="l">// FIG 04 · MS</span>
          <span className="v">42</span>
          <span className="s">avg p50</span>
        </div>
        <div className="cell">
          <span className="l">// FIG 05 · USR</span>
          <span className="v">200<span className="sub">+</span></span>
          <span className="s">active users</span>
        </div>
        <div className="cell">
          <span className="l">// FIG 06 · CMT</span>
          <span className="v">47</span>
          <span className="s">commits / wk</span>
        </div>
      </div>
    </section>
  );
}

/* ============ STATUS RIBBON ============ */
function StatusRibbon({ status }) {
  return (
    <div className="shell" style={{ marginBottom: -40 }}>
      <div className="status-ribbon">
        <div className="lbl"><span className="dot" /> CURRENTLY IN TRIAL</div>
        <div className="progs">
          {status.currentlyBuilding.map((item, i) => (
            <div className="prog" key={i}>
              <span className="code">{item.code}</span>
              <span>
                <span className="name">{item.name}</span>
                <span className="tech"> [{item.tech}]</span>
              </span>
              <span className="meter"><span className="fill" style={{ '--pct': `${item.pct}%` }} /></span>
              <span className="pct">{item.pct}%</span>
            </div>
          ))}
        </div>
        <div className="stats">
          <div><b>{status.shippedThisQuarter}</b>shipped Q2</div>
          <div><b>{status.archived}</b>archived</div>
        </div>
      </div>
    </div>
  );
}

/* ============ SECTION HEAD ============ */
function SectionHead({ num, title, em, after = '.', kicker, useAmber }) {
  return (
    <div className="section-head">
      <div className="num-block">
        <span className="pre">§</span>
        <span>{num}</span>
      </div>
      <h2>
        {title}
        {em && (useAmber ? <span className="amber">{em}</span> : <em>{em}</em>)}
        {after}
      </h2>
      <div className="kicker">{kicker}</div>
    </div>
  );
}

/* ============ EXPERIMENTS ============ */
function Experiments({ experiments, filters }) {
  const [active, setActive] = useState('all');
  const list = useMemo(
    () => active === 'all' ? experiments : experiments.filter(e => e.filters.includes(active)),
    [active, experiments]
  );

  return (
    <section className="section shell" id="catalog">
      <SectionHead
        num="01 · EXPERIMENT CATALOG"
        title="Selected " em="experiments"
        kicker="// Sistem produksi yang telah dijalankan, diuji, dan didokumentasikan. Setiap eksperimen mencatat hasil pengukuran yang sebenarnya — bukan ekspektasi marketing."
      />

      <div className="filter-bar">
        <span className="lbl">FILTER ↓</span>
        {filters.map(f => (
          <button
            key={f}
            className={`pill ${active === f ? 'active' : ''}`}
            onClick={() => setActive(f)}
          >{f.toUpperCase()}</button>
        ))}
      </div>

      <div className="experiments">
        {list.map((e) => {
          const [first, ...rest] = e.name.split(' ');
          return (
            <article className={`exp ${e.featured ? 'featured' : ''}`} key={e.code}>
              <div className="exp-bar">
                <span><span className="code">{e.code}</span><span className="yr">/ {e.year}</span></span>
                <span className={`status ${e.status === 'archived' ? 'archived' : ''}`}>● {e.status.toUpperCase()}</span>
              </div>
              <div className="exp-body">
                <h3 className="exp-name">{first} <span className="em">{rest.join(' ')}</span></h3>
                <div className="exp-sub">↳ {e.subtitle}</div>
                <p className="exp-desc">{e.desc}</p>
                <div className="exp-foot">
                  <div className="exp-tech">
                    {e.tech.map(t => <span className="tag" key={t}>{t}</span>)}
                  </div>
                  <div className="exp-metric">
                    <div className="v">{e.metric}</div>
                    <div className="l">{e.metricLabel}</div>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ============ REAGENTS ============ */
function Reagents({ reagents, groups }) {
  return (
    <section className="section shell" id="reagents">
      <SectionHead
        num="02 · REAGENT INVENTORY"
        title="Tech stack as " em="compounds"
        useAmber
        kicker="// Bahan yang saya kuasai. Disusun seperti tabel periodik — tiap reagen punya nomor, simbol, dan tingkat kemurnian (pct = comfort level)."
      />
      <div className="reagents">
        <div className="reagents-grid">
          {reagents.map(r => (
            <div className="reagent" key={r.sym} data-group={r.group}>
              <div className="no">{r.no}</div>
              <div className="sym">{r.sym}</div>
              <div>
                <div className="nm">{r.name}</div>
                <div className="pct">{r.pct}%</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reagents-legend">
          {Object.entries(groups).map(([k, g]) => (
            <span className="item" key={k}>
              <span className={`swatch ${k}`} />
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ READINGS ============ */
function Readings({ readings }) {
  return (
    <section className="section shell" id="readings">
      <SectionHead
        num="03 · LAB READINGS"
        title="Operational " em="metrics"
        kicker="// Pengukuran langsung dari instrumen. Angka di sini diambil dari sistem produksi yang berjalan — bukan estimasi marketing."
      />
      <div className="readings">
        {readings.map((r, i) => {
          const pct = r.inverse ? 100 - (r.value / r.max) * 100 : (r.value / r.max) * 100;
          const display = r.fmt === 'pct' ? r.value.toFixed(1) : r.value.toLocaleString();
          return (
            <div className="gauge" key={i}>
              <div className="bar-head">
                <span>READING · {String(i + 1).padStart(2, '0')}</span>
                <span className="unit">{r.unit}</span>
              </div>
              <div className="body">
                <div className="reading">
                  {display}
                  {r.fmt === 'pct' && <span className="sup">%</span>}
                  {r.fmt === 'plus' && <span className="sup">+</span>}
                </div>
                <div style={{ marginTop: 10, fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--ink-3)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {r.label}
                </div>
                <div className="meter">
                  <span className="fill" style={{ '--pct': `${pct}%` }} />
                  <span className="needle" style={{ '--pct': `${pct}%` }} />
                </div>
                <div className="ticks">
                  <span>0</span>
                  <span>{Math.round(r.max * 0.5).toLocaleString()}</span>
                  <span>{r.max.toLocaleString()}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

/* ============ PACKAGES ============ */
function Packages({ packages }) {
  return (
    <section className="section shell" id="packages">
      <SectionHead
        num="04 · SERVICE CATALOG"
        title="Three " em="testing phases"
        kicker="// Tiga paket bertingkat — TRIAL untuk validasi awal, PROD untuk siap produksi, ENTERPRISE untuk skala penuh. Semua harga transparan, scope jelas."
      />
      <div className="packages">
        {packages.map((p, i) => {
          const [first, ...rest] = p.product.split(' ');
          return (
            <div className={`pkg ${p.recommended ? 'recommended' : ''}`} key={p.tier}>
              <div className="pkg-bar">
                <span><span className="tier">{p.tier}</span> · {p.designation}</span>
                {p.recommended && <span className="badge">★ MOST PICKED</span>}
              </div>
              <div className="pkg-body">
                <h3 className="pkg-product">{first} <span className="em">{rest.join(' ')}</span></h3>
                <p className="pkg-tag">{p.tagline}</p>

                <div className="pkg-price-row">
                  <div>
                    <div className="from">STARTS FROM</div>
                    <div className="v">{window.LAB_FMT.idrShort(p.price)}</div>
                  </div>
                  <div className="unit">/ project</div>
                </div>

                <div className="pkg-specs">
                  <div className="row"><span className="k">cycle</span><span className="v">{p.cycle}</span></div>
                  <div className="row"><span className="k">revisions</span><span className="v">{p.revisions}</span></div>
                  <div className="row"><span className="k">scope</span><span className="v">{p.pages}</span></div>
                  <div className="row"><span className="k">handoff</span><span className="v">full src</span></div>
                </div>

                <div className="pkg-includes">
                  <div className="lab">INCL. {p.includes.length} ITEMS</div>
                  <ul>
                    {p.includes.map(it => <li key={it}>{it}</li>)}
                    {p.excludes && p.excludes.map(it => <li key={it} className="excl">{it}</li>)}
                  </ul>
                </div>

                <div className="pkg-cta">
                  <a className="cta" href="#booking">Select {p.tier} →</a>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

window.LabA = { Reveal, TopBar, Hero, StatusRibbon, SectionHead, Experiments, Reagents, Readings, Packages };
