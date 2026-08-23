# Smart Product Recommender — Design Directions

## Three Directions

| Theme Name | Very Brief Intro | Probability |
|---|---|---:|
| The Signal Desk | A precision-workbench interface inspired by editorial research desks, using warm paper, ink, and electric mint indicators. It makes choosing a device feel thoughtful rather than transactional. | 0.07 |
| Chrome & Citrus | A crisp product-lab look with silver surfaces, bright citrus highlights, and modular control panels. It feels fast, capable, and contemporary. | 0.04 |
| Quiet Observatory | A calm night-mode exploration space with deep charcoal, star-map geometry, and careful data emphasis. It turns product discovery into a measured search through possibilities. | 0.09 |

## Chosen Direction — The Signal Desk

### Design Movement

**Contemporary editorial utility.** The experience borrows from a well-designed research journal and a product laboratory: generous paper-like space, dense but legible annotations, and purposeful tool-like controls. It avoids a generic dashboard aesthetic.

### Core Principles

1. **Decisions before decoration.** Every visual unit should make it easier to set a preference, understand a constraint, or compare a recommendation.
2. **Warm intelligence.** Analytical components are softened through paper tones, organic spacing, and small handwritten-style annotations.
3. **Asymmetric hierarchy.** A strong left-side request panel balances a wider recommendation canvas instead of centering everything in repeated cards.
4. **Visible reasoning.** The product should explain how it reaches recommendations through short, readable signals rather than opaque scores.

### Color Philosophy

The base is **ivory paper** and **charcoal ink**: quiet, credible, and readable for long product comparisons. A saturated **signal mint** acts as the ownable active color; it is reserved for discovery, matching, and system-ready moments. Rust red is used sparingly for budget boundaries and warnings, creating a tactile editorial contrast instead of a synthetic gradient-heavy UI.

### Layout Paradigm

The page uses a **split editorial workbench**. The left rail is a persistent “request sheet” with form controls and a physical index-tab feel. The right region is a continuous research canvas that begins with a visual product-search scene, then transforms into a stacked match ledger. Thin ruled lines, margin labels, and pinned notes connect the two regions.

### Signature Elements

1. A large **signal ring** with a shifting mint dot, used as the brand mark and system status motif.
2. **Margin annotations** in a restrained serif italic, used for small explanations and confidence notes.
3. **Ruled-paper dividers** and rounded rectangular evidence chips, used to frame filters and product reasoning.

### Interaction Philosophy

Interactions feel like marking a research sheet. Filter selection receives a quick, tactile highlight; the “find my match” action shifts the signal ring into a searching state, then reveals recommendation rows with explicit match reasons. Empty state controls remain useful and never pretend the static prototype is connected to a live model.

### Animation

Use short, physical transitions: 160ms button compression, 180ms filter highlights, and 220ms opacity/translate entrances for recommendation rows. The signal dot may orbit subtly during the simulated search, but motion stops under `prefers-reduced-motion`. Never use dramatic parallax, continuous floating, or long loading animation.

### Typography System

**DM Sans** is the functional sans for controls, data, and body copy. **Fraunces** is the editorial display face for product identity, section labels, and margin notes. Headlines use Fraunces at high contrast; labels use uppercase DM Sans with wide tracking; body copy is compact and direct.

### Brand Essence

**A considered device-finding desk for people who want a reasoned shortlist, not more tabs.**

Personality: **precise, calm, resourceful**.

### Brand Voice

The voice is clear, grounded, and lightly editorial. Headlines frame a decision; calls to action promise a useful next move instead of generic enthusiasm.

Example lines:

> “Give the brief. Keep the signal.”

> “Three devices, each with a reason to be here.”

### Wordmark & Logo

The wordmark pairs a compact DM Sans “signal” with a distinctive Fraunces “desk.” The graphic mark is an offset mint ring intersected by one precise charcoal line: a device search becoming a decision. The symbol appears alone in the header and as the favicon.

### Signature Brand Color

**Signal Mint — `#8EF5C2`**

## Style Decisions

- The default canvas always includes a visible evidence trail and a compact reasoning ledger, so the experience reads as an active recommendation surface rather than an intake form alone.
- The signal ring is reserved for readiness, searching, match confidence, and shortlist states; it is not used as generic decoration.
- Every headline, CTA, and supporting label should frame a concrete decision step and avoid generic SaaS language.
