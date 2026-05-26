/* global React */
const { useEffect, useMemo, useRef, useState } = React;

/* ============ CALCULATOR ============ */
function Calculator({ calculator, packages }) {
  const [tier, setTier] = useState('PROD');
  const [vals, setVals] = useState(() => {
    const init = {};
    calculator.addons.forEach(a => { init[a.id] = a.toggle ? false : 0; });
    return init;
  });
  const SH = window.LabA.SectionHead;

  const setVal = (id, v) => setVals(s => ({ ...s, [id]: v }));

  const lines = [];
  const base = calculator.base[tier];
  lines.push({ label: `Base · ${tier}`, price: base });
  calculator.addons.forEach(a => {
    const v = vals[a.id];
    if (a.toggle && v) lines.push({ label: a.label, price: a.price });
    else if (!a.toggle && v > 0) lines.push({ label: `${a.label} × ${v}`, price: a.price * v });
  });
  const total = lines.reduce((s, l) => s + l.price, 0);

  return (
    <section className="section shell" id="calculator">
      <SH
        num="05 · QUOTE CALCULATOR"
        title="Estimate the " em="cost"
        useAmber
        kicker="// Hitung perkiraan biaya proyek Anda secara langsung. Pilih tier dasar, tambahkan modul, dapatkan estimasi. Final quote setelah konsultasi 30 menit."
      />
      <div className="calc">
        <div className="calc-form">
          <div className="form-bar">
            <span>QUOTE CONFIGURATOR · v2026.05</span>
            <span className="step">2 STEPS</span>
          </div>
          <div className="calc-section">
            <span className="lbl">[ STEP 01 ] CHOOSE BASE TIER</span>
            <div className="calc-tiers">
              {packages.map(p => (
                <button
                  key={p.tier}
                  className={`calc-tier ${tier === p.tier ? 'active' : ''}`}
                  onClick={() => setTier(p.tier)}
                >
                  <span className="t">{p.tier}</span>
                  <span className="p">{window.LAB_FMT.idrShort(p.price)}</span>
                </button>
              ))}
            </div>
          </div>
          <div className="calc-section">
            <span className="lbl">[ STEP 02 ] CONFIGURE ADD-ONS</span>
            {calculator.addons.map(a => (
              <div className="addon" key={a.id}>
                <div className="nm">{a.label}<span className="u">{a.unit}</span></div>
                <div className="pp">+{window.LAB_FMT.idrShort(a.price)}</div>
                <div className="ctrl">
                  {a.toggle ? (
                    <button
                      type="button"
                      className={`toggle ${vals[a.id] ? 'on' : ''}`}
                      onClick={() => setVal(a.id, !vals[a.id])}
                      aria-label={`Toggle ${a.label}`}
                    />
                  ) : (
                    <>
                      <button onClick={() => setVal(a.id, Math.max(0, vals[a.id] - (a.step || 1)))}>−</button>
                      <span className="val">{vals[a.id]}</span>
                      <button onClick={() => setVal(a.id, Math.min(a.max, vals[a.id] + (a.step || 1)))}>+</button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="calc-out">
          <div className="out-bar">
            <span>LIVE ESTIMATE</span>
            <span className="live"><span className="dot" /> CALC</span>
          </div>
          <div className="body">
            <div className="lbl">// ESTIMATED COST · IDR</div>
            <div className="total">
              <span className="pre">Rp</span>
              {total.toLocaleString('id-ID')}
            </div>
            <div className="lines">
              <div className="row head"><span>ITEM</span><span>SUBTOTAL</span></div>
              {lines.map((l, i) => (
                <div className="row" key={i}>
                  <span>{l.label}</span>
                  <span className="r">{window.LAB_FMT.idrShort(l.price)}</span>
                </div>
              ))}
            </div>
            <div className="send">
              <a className="cta" href="#booking">Send this estimate →</a>
              <div className="small">// non-binding · final quote after consult</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ PROCEDURE ============ */
function Procedure({ procedure }) {
  const SH = window.LabA.SectionHead;
  return (
    <section className="section shell" id="procedure">
      <SH
        num="06 · STANDARD PROCEDURE"
        title="Four " em="phases"
        kicker="// Setiap proyek mengikuti prosedur operasional yang sama. Fase yang dapat diprediksi, demo mingguan, tidak ada kejutan di akhir."
      />
      <div className="procedure">
        {procedure.map((p, i) => (
          <div className="proc" key={p.code}>
            <div className="proc-bar">
              <span className="roman">{p.step}</span>
              <span><span className="code">{p.code} · PH {i + 1}</span></span>
            </div>
            <div className="proc-body">
              <div className="proc-name">{p.name}</div>
              <div className="proc-sub">↳ {p.sub}</div>
              <p className="proc-desc">{p.desc}</p>
              <div className="proc-dur">DUR · {p.dur}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ GITHUB ============ */
function buildGraph() {
  const seed = 7;
  const cells = [];
  let x = seed;
  for (let w = 0; w < 53; w++) {
    for (let d = 0; d < 7; d++) {
      x = (x * 1103515245 + 12345) % 2147483648;
      const r = x / 2147483648;
      const weekend = (d === 0 || d === 6) ? 0.6 : 1;
      const recency = Math.pow(w / 52, 0.6) * 0.7 + 0.3;
      const v = r * weekend * recency;
      let lvl = 0;
      if (v > 0.85) lvl = 4;
      else if (v > 0.65) lvl = 3;
      else if (v > 0.45) lvl = 2;
      else if (v > 0.22) lvl = 1;
      cells.push(lvl);
    }
  }
  return cells;
}

function GitHubBlock({ github }) {
  const SH = window.LabA.SectionHead;
  const cells = useMemo(() => buildGraph(), []);
  return (
    <section className="section shell" id="github">
      <SH
        num="07 · OPEN LOGBOOK"
        title="Code in the " em="open"
        useAmber
        kicker="// Public commits dan pinned repos. Saya commit kecil dan sering — deploy yang membosankan, pipeline yang tenang."
      />
      <div className="gh-wrap">
        <div className="gh-panel">
          <div className="gh-bar">
            <span>GITHUB.COM/<span className="amber">{github.user.toUpperCase()}</span></span>
            <span className="amber">● ACTIVE</span>
          </div>
          <div className="body">
            <h3>{github.contributionsYear}+ <em>contributions</em></h3>
            <p>Dalam 12 bulan terakhir. Pola kerja yang konsisten — commit kecil yang sering, code review yang berbentuk percakapan.</p>
            <a className="link" href={`https://github.com/${github.user}`} target="_blank" rel="noreferrer">
              VIEW PROFILE →
            </a>
            <div className="gh-graph">
              {cells.map((lvl, i) => (<div key={i} className={`cell ${lvl ? `l${lvl}` : ''}`} />))}
            </div>
          </div>
        </div>

        <div className="gh-pinned">
          {github.pinned.map(r => (
            <a className="gh-repo" key={r.name} href={`https://github.com/${github.user}/${r.name}`} target="_blank" rel="noreferrer">
              <div className="repo-bar">
                <span className="nm">{r.name}</span>
                <span className="st">★ {r.stars}</span>
              </div>
              <div className="body">
                <div className="desc">{r.desc}</div>
                <div className="lang"><span className="ld" style={{ background: r.langColor }} /> {r.lang}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============ TESTIMONIALS ============ */
function Testimonials({ items }) {
  const SH = window.LabA.SectionHead;
  return (
    <section className="section shell" id="testimonials">
      <SH
        num="08 · FIELD REPORTS"
        title="What people " em="actually said"
        kicker="// Cerita langsung dari klien dan rekan kerja yang pernah saya bantu. Ini kalimat asli mereka, tidak diedit — hanya nama yang disamarkan sesuai permintaan."
      />
      <div className="testimonials">
        {items.map((t, i) => (
          <figure className="testi" key={i}>
            <div className="t-bar">
              <span>REPORT · <span className="num">{String(i + 1).padStart(3, '0')}</span></span>
              <span>VERIFIED ✓</span>
            </div>
            <div className="body">
              <blockquote>{t.quote}</blockquote>
              <figcaption className="who">
                <div className="av">{t.initials}</div>
                <div>
                  <div className="nm">{t.name}</div>
                  <div className="rl">{t.role}</div>
                </div>
              </figcaption>
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}

/* ============ BOOKING ============ */
function Booking({ booking, brand }) {
  const SH = window.LabA.SectionHead;
  return (
    <section className="section shell" id="booking">
      <SH
        num="09 · BOOK CONSULTATION"
        title="Reserve a " em="slot"
        useAmber
        kicker="// Sesi konsultasi 30 menit gratis — kita bahas project, scope, dan teknis. Tanpa komitmen, tanpa hard-sell."
      />
      <div className="booking-wrap">
        <div className="booking-intro">
          <div className="b-bar">
            <span>CONSULT REQUEST FORM</span>
            <span>FREE</span>
          </div>
          <div className="body">
            <h3><em>Free</em><br />30-min<br />consult call.</h3>
            <p>Pilih slot di kalender. Saya akan kirim Google Meet link 24 jam sebelumnya, plus form pre-call ringkas tentang project Anda.</p>
            <div className="note">{booking.note.toUpperCase()}</div>
            <div style={{ marginTop: 22 }}>
              <a className="cta" style={{ background: 'var(--amber)', color: 'var(--ink)', borderColor: 'var(--amber)' }}
                 href={`mailto:${brand.email}?subject=Consult%20Call%20Request`}>
                Or email directly →
              </a>
            </div>
          </div>
        </div>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.14em', color: 'var(--amber-d)', marginBottom: 14, textTransform: 'uppercase', fontWeight: 700 }}>
            // AVAILABLE SLOTS · GMT+7
          </div>
          <div className="booking-slots">
            {booking.slots.map((s, i) => (
              <button key={i} type="button" className={`slot ${s.avail ? 'avail' : 'full'}`} disabled={!s.avail}>
                <span className="day">{s.day}</span>
                <span className="date">{s.date}</span>
                <span className="time">{s.time} WIB</span>
                <span className="status">{s.avail ? 'AVAIL' : 'FULL'}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============ FAQ ============ */
function FAQ({ faq }) {
  const [open, setOpen] = useState(0);
  const SH = window.LabA.SectionHead;
  return (
    <section className="section shell" id="faq">
      <SH
        num="10 · OPERATING NOTES"
        title="Frequently " em="asked"
        kicker="// Hal-hal yang sering ditanyakan klien — pembayaran, garansi, scope, source code. Kalau ada yang belum terjawab, langsung email saja."
      />
      <div className="faq">
        {faq.map((item, i) => (
          <div className={`faq-item ${open === i ? 'open' : ''}`} key={i}>
            <button className="faq-q" onClick={() => setOpen(open === i ? -1 : i)}>
              <span className="num">Q · {String(i + 1).padStart(2, '0')}</span>
              <span>{item.q}</span>
              <span className="icon">{open === i ? '−' : '+'}</span>
            </button>
            <div className="faq-a">{item.a}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============ FOOTER ============ */
function FootBlock({ brand, facility }) {
  return (
    <footer className="foot">
      <div className="foot-strip">
        <span>● ADILABS · FULLSTACK ENGINEERING LABORATORY</span>
        <span>EST. 2021 · LIC {brand.license}</span>
        <span>{brand.coords}</span>
      </div>
      <div className="foot-grid">
        <div className="foot-brand">
          <h4>adi<em>labs</em>.</h4>
          <p>Fullstack engineering laboratory di Jakarta. Sistem produksi yang scalable, API yang bersih, dan migrasi legacy tanpa drama.</p>
        </div>
        <div className="foot-col">
          <h5>CATALOG</h5>
          <a href="#catalog">Experiments</a>
          <a href="#reagents">Reagents</a>
          <a href="#packages">Packages</a>
          <a href="#calculator">Calculator</a>
        </div>
        <div className="foot-col">
          <h5>CONTACT</h5>
          <a href={`mailto:${brand.email}`}>{brand.email}</a>
          <a href={brand.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={brand.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href="#booking">Book consult</a>
        </div>
        <div className="foot-col">
          <h5>REGISTRY</h5>
          <span>Cycle · {facility.cycle}</span>
          <span>Capacity · {facility.capacity}</span>
          <span>Intake · {facility.intake}</span>
          <span>Class · CLASS·II</span>
        </div>
      </div>
      <div className="foot-bar">
        <span>© 2026 ADILABS · ALL EXPERIMENTS OBSERVED</span>
        <span>● SYSTEM NOMINAL · 99.94 %</span>
      </div>
    </footer>
  );
}

window.LabB = { Calculator, Procedure, GitHubBlock, Testimonials, Booking, FAQ, FootBlock };
