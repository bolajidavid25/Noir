import { products } from "./products.js";
import type { Product } from "./products.js";

const imgs = [
  "https://images.unsplash.com/photo-1676278746061-c5bac5b34ae5?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1613379171002-3610ae01cf4a?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1737691828374-da1f05d3029d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1493146146946-e907f69cdf23?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1741709845968-c42e2c0dbe1d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1741709846033-67a45021fcb2?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1746806375401-c53e9d4d725d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1619482694176-81b88b184c46?w=600&h=750&fit=crop&auto=format",
];

type Entry = [brand: string, price: number, desc: string, tag?: string];

const types: Array<{ type: string; entries: Entry[] }> = [
  {
    type: "Classic Business Suit",
    entries: [
      ["Tom Ford", 5800, "Super 120s wool in charcoal. Single-button, notch lapel, half-canvas construction.", "Featured"],
      ["Brioni", 7200, "Hand-stitched charcoal business suit. 40+ hours of Roman artisan work. Full canvas."],
      ["Kiton", 8500, "K-50 seven-fold silk lining. Super 150s wool. Bespoke Roman tailoring at its finest.", "Limited"],
      ["Ermenegildo Zegna", 4200, "Trofeo wool business suit. 14-micron fiber, water-repellent finish. Modern cut."],
      ["Canali", 2800, "Impeccable wool business suit. Canali's signature invisible buttonhole on the sleeve."],
      ["Loro Piana", 5100, "Gift of Kings baby cashmere suit. The softest business suit money can buy."],
      ["Brunello Cucinelli", 4900, "Stone-washed linen-wool business suit. Artisanal finish, understated luxury.", "New"],
      ["Ralph Lauren Purple Label", 3800, "Handmade English wool business suit. Gregory-cut with jetted pockets."],
      ["Turnbull & Asser", 3200, "English-made business suit in Prince of Wales check. Hallmark craftsmanship."],
      ["Huntsman", 6800, "Bespoke-quality Savile Row business suit. Military-straight back, clean lapels."],
    ],
  },
  {
    type: "Black Tie Tuxedo",
    entries: [
      ["Tom Ford", 6800, "Silk-satin shawl-lapel tuxedo in midnight wool. The definitive modern dinner suit.", "Featured"],
      ["Brioni", 9200, "Hand-sewn black tuxedo. Silk facings, matching silk-braid trouser stripe."],
      ["Kiton", 11500, "Full-bespoke black tuxedo. Super 160s wool, six-hand tailoring. Rome.", "Limited"],
      ["Ermenegildo Zegna", 5100, "Couture evening tuxedo. Cloth-of-silk blend with peak-lapel construction."],
      ["Canali", 3600, "Black barathea wool tuxedo. Notch shawl lapel, concealed placket, jetted pockets."],
      ["Loro Piana", 6200, "Cashmere-blend tuxedo in jet black. Unparalleled softness, peak satin lapels."],
      ["Brunello Cucinelli", 5800, "Italian artisan tuxedo in double-faced wool. Shawl lapel, self-tie bowtie included.", "New"],
      ["Ralph Lauren Purple Label", 4600, "Savile Row-inspired black tuxedo. Anthony-cut, two-button shawl."],
      ["Turnbull & Asser", 4100, "Bespoke English tuxedo with hand-rolled lapels and working cuff buttons."],
      ["Huntsman", 8200, "Black barathea Huntsman tuxedo. Militarily precise tailoring. The London alternative."],
    ],
  },
  {
    type: "Double-Breasted Suit",
    entries: [
      ["Tom Ford", 5400, "Peak-lapel DB in Super 120s wool. Six-button, two-to-button. Navy chalk stripe.", "New"],
      ["Brioni", 8100, "Six-button DB suit in pick-and-pick wool. Wide peak lapels, straight trouser."],
      ["Kiton", 9800, "Seven-button DB in handwoven wool-silk. Peak lapel, flap pockets. Rare construction.", "Limited"],
      ["Ermenegildo Zegna", 4600, "DB suit in Trofeo wool. Six-button, peak lapels, minimal suppression."],
      ["Canali", 3100, "DB suit in hopsack wool. Six-to-two button, wide notch lapel. Italian power."],
      ["Loro Piana", 5800, "Cashmere DB suit. Supremely soft, peak lapels, straight leg. Understated wealth."],
      ["Brunello Cucinelli", 5200, "Linen-wool DB suit in oatmeal. Unlined for summer, peak lapels. Cucinelli ease."],
      ["Ralph Lauren Purple Label", 4200, "Heritage DB suit. Prince of Wales check, chalk chalk stripe. Classic."],
      ["Turnbull & Asser", 3700, "English DB suit in fresco wool. Peak lapels, six-button, side-tab trouser.", "Featured"],
      ["Huntsman", 7400, "Savile Row DB. Wide peak lapels, suppressed waist, perfect drape."],
    ],
  },
  {
    type: "Pinstripe Suit",
    entries: [
      ["Tom Ford", 5200, "Chalk-stripe power suit. Slim notch lapel, flat-front trouser. Boardroom authority.", "Featured"],
      ["Brioni", 7600, "Fine-chalk pinstripe in Super 130s wool. Hand-stitched lapels, surgeon's cuffs."],
      ["Kiton", 9100, "Bespoke pinstripe in Super 150s wool. Invisible chalk stripe, full bespoke canvas."],
      ["Ermenegildo Zegna", 4100, "City pinstripe in Trofeo wool. Clean notch lapel, flat-front trouser."],
      ["Canali", 2950, "Classic chalk-stripe suit in fresco wool. Canali's signature invisible details.", "New"],
      ["Loro Piana", 5400, "Chalk-stripe baby cashmere suit. The most luxurious pinstripe in existence."],
      ["Brunello Cucinelli", 4700, "Stone-grey pinstripe in wool-silk. Artisanal finish, soft construction."],
      ["Ralph Lauren Purple Label", 3600, "Banker-stripe suit in English wool. Gregory-cut, flap pockets, jetted cuffs."],
      ["Turnbull & Asser", 3400, "Bold chalk-stripe fresco suit. Hand-finished Savile Row quality."],
      ["Huntsman", 7100, "Military-precision pinstripe. Huntsman's famous back, peak lapels available."],
    ],
  },
  {
    type: "Three-Piece Suit",
    entries: [
      ["Tom Ford", 6200, "Three-piece in Super 120s wool. Matching waistcoat with six-button closure.", "Featured"],
      ["Brioni", 9500, "Three-piece suit with double-breasted waistcoat. Hand-sewn throughout."],
      ["Kiton", 12000, "Three-piece bespoke in Amadeus cloth. Waistcoat with hand-finished edges.", "Limited"],
      ["Ermenegildo Zegna", 5200, "Three-piece Trofeo wool suit. Welt pockets, five-button waistcoat."],
      ["Canali", 3800, "Three-piece in hopsack wool. Peaked-lapel waistcoat, flat-front trouser."],
      ["Loro Piana", 6900, "Three-piece cashmere suit. Four-button waistcoat, hand-finished throughout."],
      ["Brunello Cucinelli", 5700, "Three-piece in wool-cashmere. Relaxed silhouette, artisan details.", "New"],
      ["Ralph Lauren Purple Label", 4800, "Three-piece heritage suit. Six-button DB waistcoat, classic Anthony-cut."],
      ["Turnbull & Asser", 4300, "Three-piece English wool. Hand-stitched waistcoat, surgeon cuffs."],
      ["Huntsman", 9200, "Three-piece Savile Row construction. The full British ceremony."],
    ],
  },
  {
    type: "Linen Suit",
    entries: [
      ["Tom Ford", 4100, "Oatmeal linen suit. Unlined jacket, straight-leg trouser. Resort season power."],
      ["Brioni", 5600, "Handmade linen suit in ecru. Unlined, hand-stitched. Roman summer tailoring."],
      ["Kiton", 7200, "Pure Irish linen suit. Hand-stitched throughout. The finest warm-weather suiting.", "Limited"],
      ["Ermenegildo Zegna", 3100, "Linen-silk suit in stone. Lightweight, breathable. Trofeo-quality finishing."],
      ["Canali", 2100, "Italian linen suit in taupe. Unlined, easy silhouette. Perfect beach-to-dinner.", "New"],
      ["Loro Piana", 4600, "Linen suit in natural ecru. Loro Piana's hallmark softness in summer weight."],
      ["Brunello Cucinelli", 4200, "Washed linen suit in sand. Stone-washed finish, deliberately relaxed construction.", "Featured"],
      ["Ralph Lauren Purple Label", 3100, "Linen summer suit in ivory. Soft-shoulder construction, side vents."],
      ["Turnbull & Asser", 2800, "English linen suit in pale blue. Soft shoulder, half-canvas, cool lining."],
      ["Huntsman", 5800, "Bespoke linen in natural. Huntsman's military posture applied to resort fabric."],
    ],
  },
  {
    type: "Velvet Dinner Jacket",
    entries: [
      ["Tom Ford", 4800, "Midnight-blue velvet dinner jacket with grosgrain shawl lapel. Cigarette trouser.", "Featured"],
      ["Brioni", 6400, "Black velvet dinner jacket, hand-sewn throughout. Silk-satin shawl lapel."],
      ["Kiton", 8900, "Burgundy velvet dinner jacket. Six-hand construction. The height of evening luxury.", "Limited"],
      ["Ermenegildo Zegna", 3600, "Deep forest-green velvet dinner jacket. Peak-lapel with black trouser."],
      ["Canali", 2600, "Midnight velvet jacket with peak lapel. Black grosgrain trim. Easy elegance.", "New"],
      ["Loro Piana", 5200, "Cashmere-velvet dinner jacket in bottle green. Impossibly soft evening wear."],
      ["Brunello Cucinelli", 4700, "Washed velvet dinner jacket in plum. Artisan washed finish for relaxed luxury."],
      ["Ralph Lauren Purple Label", 3700, "Black velvet jacket with shawl lapel. Anthony-cut, satin-button closure."],
      ["Turnbull & Asser", 3300, "Bespoke velvet dinner jacket. Hand-rolled shawl lapel, working cuff buttons."],
      ["Huntsman", 7600, "Savile Row velvet dinner jacket. Peak lapels with military-straight back."],
    ],
  },
  {
    type: "Chalk Stripe Suit",
    entries: [
      ["Tom Ford", 5500, "Wide chalk-stripe in Super 120s wool. Drape cut, peak lapels. Authority.", "Featured"],
      ["Brioni", 7800, "Bold chalk-stripe suit. Hand-stitched lapels, working cuffs. The Roman banker.", "New"],
      ["Kiton", 10200, "Wide chalk-stripe bespoke in Super 130s wool. Ultimate Roman power dressing.", "Limited"],
      ["Ermenegildo Zegna", 4300, "Chalk-stripe Trofeo wool suit. Classic banking cut, flat-front trouser."],
      ["Canali", 3000, "Chalk-stripe fresco suit. Canali's impeccable Italian banker silhouette."],
      ["Loro Piana", 5600, "Chalk-stripe cashmere suit. Immaculate drape, the most luxurious banker suit."],
      ["Brunello Cucinelli", 4900, "Chalk-stripe wool-linen suit. Artisan soft-shoulder construction."],
      ["Ralph Lauren Purple Label", 3900, "Wide chalk-stripe heritage suit. Gregory-cut, peak lapels, double vent."],
      ["Turnbull & Asser", 3500, "English chalk-stripe fresco. Hand-rolled lapels, Savile Row precision."],
      ["Huntsman", 7800, "Classic Huntsman chalk-stripe. Military silhouette applied to banking tradition."],
    ],
  },
  {
    type: "Morning Coat",
    entries: [
      ["Tom Ford", 5100, "Black morning coat in Super 120s wool. Notch lapel, double-breasted waistcoat.", "Limited"],
      ["Brioni", 7100, "Hand-sewn morning coat. Cutaway front, grey striped trouser. Ascot-ready.", "Featured"],
      ["Kiton", 9600, "Bespoke morning coat in Super 140s. Constructed for once-in-a-lifetime occasions.", "Limited"],
      ["Ermenegildo Zegna", 4600, "Morning coat in Trofeo wool. Peak lapel, dove-grey waistcoat, striped trouser."],
      ["Canali", 3200, "Black morning coat with cutaway front. Grey waistcoat, cashmere-striped trouser."],
      ["Loro Piana", 5900, "Morning coat in baby cashmere. The most luxurious ceremonial suit made."],
      ["Brunello Cucinelli", 5300, "Artisan morning coat in charcoal wool. Understated craft for formal occasions."],
      ["Ralph Lauren Purple Label", 4400, "Heritage morning coat. Gregory-cut jacket, contrast waistcoat and trouser."],
      ["Turnbull & Asser", 4000, "Savile Row morning coat. Hand-finished cutaway, English wool, chalk stripe."],
      ["Huntsman", 8500, "The original Huntsman morning coat. For Ascot, weddings, and state occasions."],
    ],
  },
  {
    type: "Slim Fit Suit",
    entries: [
      ["Tom Ford", 4900, "Extreme slim-fit in Super 110s wool. One-button, no suppression needed.", "New"],
      ["Brioni", 6800, "Roman slim-cut suit. Slightly suppressed waist, clean lapels. Modern Brioni."],
      ["Kiton", 8200, "Slim bespoke in Super 120s. High gorge, slim lapel. The contemporary Roman look."],
      ["Ermenegildo Zegna", 3800, "Slim Trofeo wool suit. High-gorge lapel, slightly tapered trouser."],
      ["Canali", 2600, "Slim fresco suit. Canali's cleanest contemporary cut. Impeccable Italian detail.", "Featured"],
      ["Loro Piana", 4800, "Slim cashmere suit. Lightweight, non-padded shoulder. Effortless slim luxury."],
      ["Brunello Cucinelli", 4400, "Slim washed-wool suit. Cucinelli's lived-in luxury at its most contemporary."],
      ["Ralph Lauren Purple Label", 3400, "Slim Anthony-cut suit. Peak lapels, quarter-top pockets. NYC polish."],
      ["Turnbull & Asser", 3100, "Slim English fresco suit. Hand-rolled slim lapels, flat-front trouser."],
      ["Huntsman", 7000, "Slim Savile Row suit. Military precision meets modern minimalism."],
    ],
  },
];

export const menSuitsProducts: Product[] = (() => {
  let id = 300;
  const out: Product[] = [];
  types.forEach(({ type, entries }, ti) => {
    entries.forEach(([brand, price, desc, tag], bi) => {
      out.push({
        id: id++,
        name: `${brand} — ${type}`,
        category: "Men's Suits",
        price,
        image: imgs[(ti + bi * 2) % imgs.length],
        description: desc,
        tag,
      });
    });
  });
  return out;
})();
