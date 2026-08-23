/**
 * The Signal Desk design reminder: editorial utility, warm paper surfaces,
 * and visible recommendation reasoning guided by a signal-mint accent.
 */
import { useMemo, useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  Check,
  ChevronDown,
  CircleDotDashed,
  Cpu,
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
  accent: "mint" | "rust" | "ink";
  reason: string;
};

const catalog: Product[] = [
  {
    id: 1,
    name: "Aster 14",
    category: "Laptop",
    price: 1290,
    useCases: ["Build", "Everyday"],
    score: 94,
    summary: "A balanced all-day machine for focused work and serious browser tabs.",
    specs: ["16 GB memory", "512 GB SSD", "12 hr battery"],
    accent: "mint",
    reason: "Its memory and battery headroom match a long workday without overspending.",
  },
  {
    id: 2,
    name: "Canvas Studio",
    category: "Laptop",
    price: 1790,
    useCases: ["Create", "Build"],
    score: 91,
    summary: "A color-first workstation shaped for visuals, motion, and large creative files.",
    specs: ["32 GB memory", "1 TB SSD", "High-gamut display"],
    accent: "rust",
    reason: "The extra graphics and display room support visual work that a general laptop cannot.",
  },
  {
    id: 3,
    name: "Fold Note",
    category: "2-in-1",
    price: 980,
    useCases: ["Everyday", "Build"],
    score: 88,
    summary: "A flexible desk-to-sofa device for notes, study, and lighter technical work.",
    specs: ["16 GB memory", "Touch + pen", "1.25 kg"],
    accent: "ink",
    reason: "Its flexible form gives you the most usable day-to-day range within budget.",
  },
  {
    id: 4,
    name: "Field Tab",
    category: "Tablet",
    price: 690,
    useCases: ["Everyday", "Create"],
    score: 85,
    summary: "A light companion for reading, illustration notes, and travel-ready media work.",
    specs: ["11-inch display", "Pen support", "14 hr battery"],
    accent: "mint",
    reason: "It meets portability and note-taking needs while keeping most of the budget free.",
  },
];

const categories = ["All", "Laptop", "Tablet", "2-in-1"] as const;
const useCases = ["Build", "Create", "Everyday"] as const;

function ProductGlyph({ category }: { category: Product["category"] }) {
  return category === "Tablet" ? (
    <Tablet strokeWidth={1.6} />
  ) : (
    <Laptop strokeWidth={1.6} />
  );
}

export default function Home() {
  const [category, setCategory] = useState<(typeof categories)[number]>("All");
  const [useCase, setUseCase] = useState<(typeof useCases)[number]>("Build");
  const [budget, setBudget] = useState(1500);
  const [note, setNote] = useState("Long battery life and a comfortable display for daily work.");
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const recommendations = useMemo(() => {
    const filtered = catalog
      .filter((item) => category === "All" || item.category === category)
      .filter((item) => item.price <= budget)
      .sort((a, b) => {
        const aMatch = a.useCases.includes(useCase) ? 1 : 0;
        const bMatch = b.useCases.includes(useCase) ? 1 : 0;
        return bMatch - aMatch || b.score - a.score;
      });

    return (filtered.length ? filtered : catalog.filter((item) => item.price <= budget))
      .slice(0, 3)
      .map((item, index) => ({
        ...item,
        score: Math.max(76, item.score - index * 3 + (item.useCases.includes(useCase) ? 2 : 0)),
      }));
  }, [budget, category, useCase]);

  function handleSearch() {
    setIsSearching(true);
    window.setTimeout(() => {
      setHasSearched(true);
      setIsSearching(false);
    }, 720);
  }

  return (
    <main className="signal-page">
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Signal Desk home">
          <img
            src="/manus-storage/signal-ring-logo_5dc594e7.png"
            alt=""
            className="brand-mark"
          />
          <span className="brand-type"><b>signal</b><em>desk</em></span>
        </a>
        <div className="topbar-meta">
          <span className="live-dot" />
          <span>Recommendation workspace</span>
          <span className="topbar-divider" />
          <span className="topbar-code">RAG / local preview</span>
        </div>
      </header>

      <section id="top" className="workbench-shell">
        <aside className="request-sheet" aria-label="Your product brief">
          <div className="sheet-index">01 / YOUR BRIEF</div>
          <div className="sheet-heading">
            <p className="eyebrow"><CircleDotDashed size={16} /> preference capture</p>
            <h1>Give the brief.<br />Keep the signal.</h1>
            <p>Shape a concise device shortlist using the constraints that matter most.</p>
          </div>

          <section className="field-group">
            <div className="field-label"><span>01</span> Device category</div>
            <div className="segmented-control" role="group" aria-label="Device category">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "selected" : ""}
                  onClick={() => setCategory(item)}
                  type="button"
                >
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="field-group">
            <div className="field-label"><span>02</span> Main use</div>
            <div className="use-options" role="group" aria-label="Main use">
              {useCases.map((item) => (
                <button
                  key={item}
                  className={useCase === item ? "use-option active" : "use-option"}
                  type="button"
                  onClick={() => setUseCase(item)}
                >
                  <span className="option-dot"><Check size={12} /></span>
                  {item}
                </button>
              ))}
            </div>
          </section>

          <section className="field-group budget-field">
            <div className="field-label"><span>03</span> Maximum budget</div>
            <div className="budget-reading"><strong>${budget.toLocaleString()}</strong><span>USD ceiling</span></div>
            <input
              type="range"
              min="500"
              max="3000"
              step="50"
              value={budget}
              onChange={(event) => setBudget(Number(event.target.value))}
              aria-label="Maximum budget"
              style={{ "--range-value": `${((budget - 500) / 2500) * 100}%` } as React.CSSProperties}
            />
            <div className="range-scale"><span>$500</span><span>$3,000</span></div>
          </section>

          <section className="field-group note-field">
            <div className="field-label"><span>04</span> Margin note</div>
            <textarea
              value={note}
              onChange={(event) => setNote(event.target.value)}
              aria-label="Additional requirements"
              placeholder="What should this device make easier?"
            />
            <p className="input-note">A note helps the reasoning feel more specific.</p>
          </section>

          <Button className="signal-button" onClick={handleSearch} disabled={isSearching}>
            {isSearching ? <LoaderCircle className="animate-spin" /> : <ScanSearch />}
            {isSearching ? "Reading the brief…" : "Find my signal"}
            {!isSearching && <ArrowUpRight size={17} />}
          </Button>
          <p className="prototype-note"><ShieldCheck size={15} /> Front-end preview with a sample local catalog.</p>
        </aside>

        <section className="results-canvas" aria-live="polite">
          <div className="hero-panel">
            <img
              src="/manus-storage/signal-desk-hero_49e59473.jpg"
              alt="A composed technology research desk with laptop, tablet, and paper notes"
            />
            <div className="hero-copy">
              <p className="eyebrow"><Sparkles size={16} /> a measured search</p>
              <h2>Less scrolling.<br />More signal.</h2>
              <p>Turn your constraints into a compact, explainable shortlist.</p>
            </div>
            <div className="hero-corner-note"><span>Method / 04</span><b>Retrieve · compare · explain</b></div>
          </div>

          <div className="canvas-intro">
            <div>
              <p className="eyebrow"><SlidersHorizontal size={15} /> live selection</p>
              <h2>{hasSearched ? "Your working shortlist" : "A calmer way to choose"}</h2>
            </div>
            <div className="signal-status">
              <span className={isSearching ? "status-ring searching" : "status-ring"}><span /></span>
              <div><b>{isSearching ? "Reading" : hasSearched ? "Matched" : "Ready"}</b><span>{isSearching ? "Checking constraints" : hasSearched ? `${recommendations.length} devices surfaced` : "Set your brief to begin"}</span></div>
            </div>
          </div>

          <div className="constraint-trail" aria-label="Current search constraints">
            <span className="trail-label">Evidence trail</span>
            <span><i className="trail-ring" /> category <b>{category}</b></span>
            <span><i className="trail-ring" /> use <b>{useCase}</b></span>
            <span><i className="trail-ring" /> ceiling <b>${budget.toLocaleString()}</b></span>
            <span><i className="trail-ring" /> note <b>{note ? "captured" : "open"}</b></span>
          </div>

          {hasSearched ? (
            <div className="results-list">
              {recommendations.length ? recommendations.map((product, index) => (
                <article className="recommendation-row" key={product.id} style={{ "--row-delay": `${index * 60}ms` } as React.CSSProperties}>
                  <div className={`product-glyph ${product.accent}`}><ProductGlyph category={product.category} /></div>
                  <div className="rank-number">0{index + 1}</div>
                  <div className="product-main">
                    <div className="product-title-row"><h3>{product.name}</h3><span>{product.category}</span></div>
                    <p>{product.summary}</p>
                    <div className="spec-chips">{product.specs.map((spec) => <span key={spec}>{spec}</span>)}</div>
                  </div>
                  <div className="match-ledger">
                    <strong>{product.score}%</strong>
                    <span>signal match</span>
                    <div className="match-track"><i style={{ width: `${product.score}%` }} /></div>
                  </div>
                  <div className="price-ledger"><strong>${product.price.toLocaleString()}</strong><span>within brief</span></div>
                  <div className="reason-popover"><b>Why it surfaced</b><p>{product.reason}</p></div>
                </article>
              )) : (
                <div className="empty-ledger"><Filter size={26} /><h3>No close matches under this ceiling.</h3><p>Raise the budget or open the category filter to widen the field.</p></div>
              )}
            </div>
          ) : (
            <div className="pre-search-panel">
              <img src="/manus-storage/signal-desk-product-still_3d19f820.jpg" alt="Curated product silhouettes arranged on paper" />
              <div>
                <span className="large-index">/ 03</span>
                <h3>The result is a small field of useful choices.</h3>
                <p>When you run a search, this panel turns your budget, use case, and note into three explainable product directions.</p>
                <div className="preview-ledger" aria-label="Example recommendation evidence">
                  <div><span className="mini-ring"><i /></span><p><b>Brief captured</b><small>budget, use, and note become retrieval signals</small></p></div>
                  <div><span className="mini-ring"><i /></span><p><b>Candidate field</b><small>the catalog narrows before a final comparison</small></p></div>
                  <div><span className="mini-ring"><i /></span><p><b>Reason attached</b><small>each shortlisted device keeps a decision trace</small></p></div>
                </div>
                <div className="method-points"><span><Cpu size={16} /> fit the workload</span><span><BatteryCharging size={16} /> respect the day</span><span><Gauge size={16} /> stay inside the ceiling</span></div>
              </div>
            </div>
          )}

          <footer className="canvas-footer">
            <span>Signal Desk / sample interface</span>
            <span>Made for thoughtful product decisions</span>
          </footer>
        </section>
      </section>
    </main>
  );
}
