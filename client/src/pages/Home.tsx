/**
 * Cobalt Workbench design reminder: realistic laptop-oriented blue surfaces,
 * source-linked product facts, and a clear reasoning trail for every shortlist.
 */
import { useMemo, useState, type CSSProperties } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  BadgeCheck,
  Check,
  CircleDotDashed,
  Cpu,
  Database,
  ExternalLink,
  Filter,
  Gauge,
  Laptop,
  LoaderCircle,
  ScanSearch,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Tablet,
} from "lucide-react";

import { Button } from "@/components/ui/button";

type Product = {
  id: number;
  name: string;
  category: "Laptop" | "Tablet" | "2-in-1";
  price: number;
  useCases: string[];
  score: number;
  summary: string;
  specs: string[];
  accent: "cobalt" | "cyan" | "ice" | "slate";
  reason: string;
  sourceLabel: string;
  sourceUrl: string;
};

/**
 * Reference prices are USD amounts observed on the linked manufacturer pages.
 * They are not live retailer quotes; users can verify current configurations at the source.
 */
const catalog: Product[] = [
  {
    id: 1,
    name: "MacBook Air 13 (M5)",
    category: "Laptop",
    price: 1299,
    useCases: ["Build", "Create", "Everyday"],
    score: 94,
    summary: "Apple lists a 16GB / 512GB configuration with a 13.6-inch Liquid Retina display.",
    specs: ["M5 · 16GB", "512GB SSD", "13.6-in Liquid Retina"],
    accent: "cobalt",
    reason: "Its sourced baseline configuration balances portable build work, creative tasks, and a full-day desk-to-travel routine.",
    sourceLabel: "Apple technical specifications",
    sourceUrl: "https://www.apple.com/macbook-air/specs/",
  },
  {
    id: 2,
    name: "Surface Laptop 13",
    category: "Laptop",
    price: 850,
    useCases: ["Everyday", "Build"],
    score: 91,
    summary: "Microsoft lists an 8-core Snapdragon X Plus model with a 13-inch PixelSense touchscreen.",
    specs: ["Snapdragon X Plus", "13-in PixelSense", "Up to 23h video"],
    accent: "cyan",
    reason: "It is the lowest reference-price laptop in the sourced set while keeping an explicit focus on portable daily work.",
    sourceLabel: "Microsoft product page",
    sourceUrl: "https://www.microsoft.com/en-us/surface/devices/surface-laptop",
  },
  {
    id: 3,
    name: "Dell XPS 13 (9345)",
    category: "Laptop",
    price: 1400,
    useCases: ["Build", "Everyday"],
    score: 89,
    summary: "A reference configuration lists a 13.4-inch display, 512GB SSD, and Snapdragon X-series hardware.",
    specs: ["13.4-in display", "512GB SSD", "Snapdragon X"],
    accent: "ice",
    reason: "This is a compact Windows option for users prioritizing a premium 13-inch form factor and a clearly sourced configuration.",
    sourceLabel: "Dell product page",
    sourceUrl: "https://www.dell.com/en-us/shop/dell-laptops/xps-13-laptop/spd/xps-13-9345-laptop",
  },
  {
    id: 4,
    name: "ROG Zephyrus G14 (2025)",
    category: "Laptop",
    price: 2500,
    useCases: ["Create", "Build"],
    score: 92,
    summary: "ASUS lists a 14-inch Zephyrus G14 family with options up to RTX 5080 Laptop GPU and 2TB storage.",
    specs: ["Up to RTX 5080", "Up to 2TB SSD", "14-in class"],
    accent: "cobalt",
    reason: "It sits at the performance end of this catalog, making sense when graphics-heavy creative work is part of the brief.",
    sourceLabel: "ASUS ROG product page",
    sourceUrl: "https://rog.asus.com/us/laptops/rog-zephyrus/rog-zephyrus-g14-2025/",
  },
  {
    id: 5,
    name: "Yoga 7i 2-in-1 16",
    category: "2-in-1",
    price: 1512,
    useCases: ["Everyday", "Build", "Create"],
    score: 90,
    summary: "Lenovo lists a 16-inch Intel Yoga convertible with a 360-degree design and a starting weight of 3.9 lb.",
    specs: ["16-in convertible", "Intel", "Starts at 3.9 lb"],
    accent: "cyan",
    reason: "Its tablet-to-laptop form is the useful compromise when note-taking, media, and laptop work have equal weight.",
    sourceLabel: "Lenovo product page",
    sourceUrl: "https://www.lenovo.com/us/en/p/laptops/yoga/yoga-2-in-1-series/lenovo-yoga-7i-2-in-1-gen-10-16-inch-intel/len101y0057",
  },
  {
    id: 6,
    name: "ThinkPad X1 Carbon Gen 14",
    category: "Laptop",
    price: 2137,
    useCases: ["Build", "Everyday"],
    score: 88,
    summary: "Lenovo lists the Aura Edition with Intel Core Ultra 5 vPro configuration options and a 14-inch business form factor.",
    specs: ["Core Ultra 5 vPro", "14-in business", "Aura Edition"],
    accent: "slate",
    reason: "It is the source-backed choice for a business-first brief that values a mature 14-inch productivity format.",
    sourceLabel: "Lenovo product page",
    sourceUrl: "https://www.lenovo.com/us/en/p/laptops/thinkpad/thinkpadx1/lenovo-thinkpad-x1-carbon-gen-14-aura-edition-14-inch-intel/len101t0159",
  },
  {
    id: 7,
    name: "Galaxy Tab S10 Ultra",
    category: "Tablet",
    price: 1100,
    useCases: ["Create", "Everyday"],
    score: 87,
    summary: "Samsung lists 12GB RAM with 256GB or 512GB storage options and an anti-reflective display treatment.",
    specs: ["12GB RAM", "256 / 512GB", "Anti-reflective"],
    accent: "ice",
    reason: "It is a larger-screen tablet option when drawing, viewing, and portable productivity matter more than desktop apps.",
    sourceLabel: "Samsung product page",
    sourceUrl: "https://www.samsung.com/us/tablets/galaxy-tab-s10/",
  },
  {
    id: 8,
    name: "iPad Air (M4)",
    category: "Tablet",
    price: 599,
    useCases: ["Create", "Everyday"],
    score: 86,
    summary: "Apple lists M4-powered iPad Air models in 11-inch and 13-inch sizes with Liquid Retina displays.",
    specs: ["M4 chip", "11 / 13-in", "Liquid Retina"],
    accent: "cyan",
    reason: "This entry gives the shortlist a lighter, touch-first route for visual thinking, notes, and everyday media.",
    sourceLabel: "Apple technical specifications",
    sourceUrl: "https://www.apple.com/ipad-air/specs/",
  },
];

const categories = ["All", "Laptop", "Tablet", "2-in-1"] as const;
const useCases = ["Build", "Create", "Everyday"] as const;

function ProductGlyph({ category }: { category: Product["category"] }) {
  return category === "Tablet" ? <Tablet strokeWidth={1.6} /> : <Laptop strokeWidth={1.6} />;
}

export default function Home() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [useCase, setUseCase] = useState<(typeof useCases)[number]>("Build");
  const [budget, setBudget] = useState(1700);
  const [note, setNote] = useState("A durable laptop with long battery life for development and travel.");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const recommendations = useMemo(() => {
    const byCategory = catalog.filter((item) => category === "All" || item.category === category);
    const withinBudget = byCategory.filter((item) => item.price <= budget);
    const candidateSet = withinBudget.length ? withinBudget : byCategory;

    return candidateSet
      .sort((a, b) => {
        const aMatch = a.useCases.includes(useCase) ? 1 : 0;
        const bMatch = b.useCases.includes(useCase) ? 1 : 0;
        return bMatch - aMatch || b.score - a.score;
      })
      .slice(0, 4)
      .map((item, index) => ({
        ...item,
        score: Math.max(74, item.score - index * 3 + (item.useCases.includes(useCase) ? 2 : 0)),
      }));
  }, [budget, category, useCase]);

  function handleSearch() {
    setIsSearching(true);
    window.setTimeout(() => {
      setHasSearched(true);
      setIsSearching(false);
    }, 620);
  }

  return (
    <main className="signal-page">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Signal Desk home">
          <img src="/manus-storage/signal-ring-logo_5dc594e7.png" alt="" className="brand-mark" />
          <span className="brand-type"><b>signal</b><em>desk</em></span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" />
          <span>source-backed catalog</span>
          <span className="topbar-divider" />
          <span className="topbar-code">{catalog.length} DEVICE REFERENCES</span>
        </div>
      </header>

      <section id="top" className="workbench-shell">
        <aside className="request-sheet" aria-label="Your product brief">
          <div className="sheet-index">01 / DEVICE BRIEF</div>
          <div className="sheet-heading">
            <p className="eyebrow"><CircleDotDashed size={16} /> selection inputs</p>
            <h1>Set the work.<br />Find the fit.</h1>
            <p>Compare real product references through the constraints that shape a useful device.</p>
            <p className="margin-annotation">“A budget is a boundary, not a verdict.”</p>
          </div>

          <section className="field-group">
            <div className="field-label"><span>01</span> Device category</div>
            <div className="segmented-control" role="group" aria-label="Device category">
              {categories.map((item) => (
                <button key={item} className={category === item ? "selected" : ""} onClick={() => setCategory(item)} type="button">{item}</button>
              ))}
            </div>
          </section>

          <section className="field-group">
            <div className="field-label"><span>02</span> Main use</div>
            <div className="use-options" role="group" aria-label="Main use">
              {useCases.map((item) => (
                <button key={item} className={useCase === item ? "use-option active" : "use-option"} type="button" onClick={() => setUseCase(item)}>
                  <span className="option-dot"><Check size={12} /></span>{item}
                </button>
              ))}
            </div>
          </section>

          <section className="field-group budget-field">
            <div className="field-label"><span>03</span> Maximum budget</div>
            <div className="budget-reading"><strong>${budget.toLocaleString()}</strong><span>USD reference ceiling</span></div>
            <input type="range" min="500" max="3000" step="50" value={budget} onChange={(event) => setBudget(Number(event.target.value))} aria-label="Maximum budget" style={{ "--range-value": `${((budget - 500) / 2500) * 100}%` } as CSSProperties} />
            <div className="range-scale"><span>$500</span><span>$3,000</span></div>
          </section>

          <section className="field-group note-field">
            <div className="field-label"><span>04</span> Decision note</div>
            <textarea value={note} onChange={(event) => setNote(event.target.value)} aria-label="Additional requirements" placeholder="What should this device make easier?" />
            <p className="input-note">Reference prices are not live quotes. Verify a current configuration at the manufacturer source.</p>
          </section>

          <Button className="signal-button" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? <LoaderCircle className="animate-spin" /> : <ScanSearch />}
            {isSearching ? "Comparing references…" : "Build my shortlist"}
            {!isSearching && <ArrowUpRight size={17} />}
          </Button>
          <p className="prototype-note"><BadgeCheck size={15} /> Product facts link directly to manufacturers. No ratings or reviews are used.</p>
        </aside>

        <section className="results-canvas" aria-live="polite">
          <div className="hero-panel">
            <img src="/manus-storage/cobalt-workbench-hero_5749e5f5.jpg" alt="Blue-toned laptop product workspace" />
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={16} /> a sourced device search</p>
              <h2>Fewer tabs.<br />Better hardware.</h2>
              <p>Use a technical brief to surface real devices, reference configurations, and direct source links.</p>
              <span className="hero-annotation">A shortlist should keep its evidence.</span>
            </div>
            <div className="hero-corner-note"><span>Catalog / {catalog.length}</span><b>Sources · specs · shortlist</b></div>
          </div>

          <div className="canvas-intro">
            <div>
              <p className="eyebrow"><SlidersHorizontal size={15} /> current constraints</p>
              <h2>{hasSearched ? "Your sourced shortlist" : "Start with a real catalog"}</h2>
            </div>
            <div className="signal-status">
              <span className={isSearching ? "status-ring searching" : "status-ring"}><span /></span>
              <div><b>{isSearching ? "Comparing" : hasSearched ? "Shortlisted" : "Ready"}</b><span>{isSearching ? "Ranking catalog entries" : hasSearched ? `${recommendations.length} product references` : `${catalog.length} products with direct sources`}</span></div>
            </div>
          </div>

          <div className="constraint-trail" aria-label="Current search constraints">
            <span className="trail-label">Match inputs</span>
            <span><i className="trail-ring" /> category <b>{category}</b></span>
            <span><i className="trail-ring" /> use <b>{useCase}</b></span>
            <span><i className="trail-ring" /> ceiling <b>${budget.toLocaleString()}</b></span>
            <span><i className="trail-ring" /> note <b>{note ? "captured" : "open"}</b></span>
          </div>
          <p className="canvas-annotation">Margin note — the source link is the confidence check, not a footnote.</p>

          {hasSearched ? (
            <div className="results-list">
              {recommendations.length ? recommendations.map((product, index) => (
                <article className="recommendation-row" key={product.id} style={{ "--row-delay": `${index * 60}ms` } as CSSProperties}>
                  <div className={`product-glyph ${product.accent}`}><ProductGlyph category={product.category} /></div>
                  <div className="rank-number">0{index + 1}</div>
                  <div className="product-main">
                    <div className="product-title-row"><h3>{product.name}</h3><span>{product.category}</span></div>
                    <p>{product.summary}</p>
                    <div className="spec-chips">{product.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
                    <a className="source-link" href={product.sourceUrl} target="_blank" rel="noreferrer"><ExternalLink size={13} /> {product.sourceLabel}</a>
                  </div>
                  <div className="match-ledger"><strong>{product.score}%</strong><span>brief match</span><div className="match-track"><i style={{ width: `${product.score}%` }} /></div></div>
                  <div className="price-ledger"><strong>${product.price.toLocaleString()}</strong><span>reference USD</span></div>
                  <div className="reason-popover"><b>Why it surfaced</b><p>{product.reason}</p></div>
                </article>
              )) : (
                <div className="empty-ledger"><Filter size={26} /><h3>No close references at this ceiling.</h3><p>Raise the budget or widen the category to search the full catalog.</p></div>
              )}
            </div>
          ) : (
            <div className="pre-search-panel">
              <img src="/manus-storage/cobalt-laptop-lineup_a5f02c1d.jpg" alt="Blue and silver laptops in a product comparison lineup" />
              <div>
                <span className="large-index">/ {catalog.length.toString().padStart(2, "0")}</span>
                <h3>Real models. Direct sources. A smaller decision field.</h3>
                <p>The catalog spans lightweight laptops, performance hardware, convertible designs, and tablets. Every surfaced item keeps a manufacturer link beside the stated configuration.</p>
                <div className="preview-ledger" aria-label="Catalog evidence">
                  <div><span className="mini-ring"><i /></span><p><b>{catalog.length} product references</b><small>laptops, 2-in-1s, and tablets</small></p></div>
                  <div><span className="mini-ring"><i /></span><p><b>Manufacturer sources</b><small>specification and product pages remain one click away</small></p></div>
                  <div><span className="mini-ring"><i /></span><p><b>Reference-price filtering</b><small>values are labeled clearly and never presented as live deals</small></p></div>
                </div>
                <div className="method-points"><span><Cpu size={16} /> fit the workload</span><span><Database size={16} /> retain the source</span><span><Gauge size={16} /> respect the ceiling</span></div>
              </div>
            </div>
          )}

          <footer className="canvas-footer"><span>Signal Desk / manufacturer reference catalog</span><span>Verify configurations at the source before purchase</span><span className="developer-credit">Developed by Eng. Samar M. Balousha</span></footer>
        </section>
      </section>
    </main>
  );
}
