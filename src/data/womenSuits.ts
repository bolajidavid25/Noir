import { products } from "./products.js";
import { gen } from "./utils.js";
import type { Product } from "./products.js";

const imgs = [
  "https://images.unsplash.com/photo-1614786269829-d24616faf56d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1629511565591-a1d494ad6c58?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1677246791501-85875b1ab187?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1659522761084-79196b64abe4?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1654512697681-8434b50096dd?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1596451984287-7a274406cbca?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1588189408846-30ad110a0f4c?w=600&h=750&fit=crop&auto=format",
];

// 10 suit types × 10 brands = 100 products
// Each brand contributes one suit of that type

const suiteTypes: Array<{ type: string; brands: Array<[string, number, string, string?]> }> = [
  {
    type: "Power Blazer Set",
    brands: [
      ["Chanel", 8900, "Double-C pearl-button tweed blazer and matching straight-leg trousers. Boucle wool.", "Featured"],
      ["Giorgio Armani", 4200, "Fluid crepe power blazer set. Cinched waist, wide-leg trouser. Armani ease."],
      ["Valentino", 5800, "Oversized blazer with built-in corset and pleated palazzo trousers. Bold."],
      ["Versace", 5200, "Medusa-button single-breast blazer with wide-leg palazzo. Rich viscose blend."],
      ["Max Mara", 3600, "Camel double-face wool blazer set. Clean lapels, tailored wide-leg trouser."],
      ["Alexander McQueen", 6200, "Structured sharp-shoulder blazer with zip-front trouser. Dramatic silhouette."],
      ["Victoria Beckham", 3400, "Fluid crepe blazer and slim-fit trouser set. Effortlessly polished.", "New"],
      ["Roland Mouret", 3800, "Sculpted blazer set with exaggerated shoulder. Pencil skirt alternative."],
      ["Stella McCartney", 3200, "Sustainable recycled-wool power blazer set. Oversized fit, sharp details."],
      ["Givenchy", 5100, "4G-button long blazer with wide-leg tailored trousers. Midnight black."],
    ],
  },
  {
    type: "Skirt Suit",
    brands: [
      ["Chanel", 9600, "Pastel boucle-wool skirt suit with gilt CC buttons. Knee-length A-line skirt."],
      ["Giorgio Armani", 3900, "Duchess satin skirt suit. Collarless jacket, pencil skirt. Italian precision.", "New"],
      ["Valentino", 5600, "Silk faille skirt suit with velvet flower detail at collar. Couture spirit."],
      ["Versace", 4800, "Baroque-print silk skirt suit with Medusa-head buttons. Statement-making."],
      ["Max Mara", 3200, "Cashmere skirt suit in camel and ivory. Boxy jacket, flared midi skirt.", "Featured"],
      ["Alexander McQueen", 6500, "Sharp-shouldered peplum jacket with pencil skirt. Anatomical tailoring."],
      ["Victoria Beckham", 3100, "Fitted crepe skirt suit. Double-breasted jacket, below-knee pencil skirt."],
      ["Roland Mouret", 4200, "Structured crepe skirt suit. Sculpted hip-detail jacket, sheath skirt."],
      ["Stella McCartney", 2900, "Eco-crepe pencil skirt suit in chalk white. Sustainable luxury at its finest."],
      ["Givenchy", 5300, "Architectural skirt suit with cape-sleeve jacket. Fluid silk-wool crepe."],
    ],
  },
  {
    type: "Pantsuit",
    brands: [
      ["Chanel", 8200, "Classic Chanel pantsuit in cream boucle. Gold chain hem, four CC buttons.", "Featured"],
      ["Giorgio Armani", 3800, "Fluid slouchy pantsuit in georgette. Unstructured jacket, wide-leg trouser."],
      ["Valentino", 5400, "Tonal pantsuit in heavy silk crepe. Straight-leg trouser, open-chest jacket."],
      ["Versace", 4600, "Logo-lining pantsuit in technical fabric. Medusa-clasp, flared trouser.", "New"],
      ["Max Mara", 3000, "Double-breasted camel pantsuit. Straight-cut trouser, wide grosgrain lapels."],
      ["Alexander McQueen", 6100, "Black wool pantsuit with dart seaming and blade lapels. Pure McQueen."],
      ["Victoria Beckham", 3300, "Tailored slim-leg pantsuit in stretch crepe. Clean, boss-worthy."],
      ["Roland Mouret", 3700, "Architectural pantsuit in bonded jersey. Structured jacket, slim trouser."],
      ["Stella McCartney", 2850, "Sustainable navy pantsuit. Slightly-flared trouser, long-line jacket."],
      ["Givenchy", 4900, "Masculine pantsuit in pinstriped wool-blend. Oversized jacket, tapered trouser."],
    ],
  },
  {
    type: "Tuxedo Suit",
    brands: [
      ["Chanel", 11500, "Black silk-satin tuxedo suit. Grosgrain lapels, satin-trim trouser. Pure elegance.", "Limited"],
      ["Giorgio Armani", 5100, "Black crepe tuxedo with silk-satin lapels. Narrow-leg trouser, concealed placket."],
      ["Valentino", 7200, "Ivory tuxedo in compact wool. Satin shawl lapel, kick-flare trouser.", "Featured"],
      ["Versace", 6200, "Brocade tuxedo jacket with cigarette trouser. Medusa satin-stitch lapels."],
      ["Max Mara", 4100, "Cashmere-blend tuxedo in midnight. Double-faced, structured with clean lines."],
      ["Alexander McQueen", 8100, "Sculptural tuxedo with anatomical seaming. Slim flare, signature tailoring."],
      ["Victoria Beckham", 4200, "Black silk tuxedo jacket with wide-leg trouser. Modern le smoking."],
      ["Roland Mouret", 4700, "Fitted tuxedo with exaggerated shoulder and slim trouser. Red-carpet ready."],
      ["Stella McCartney", 3600, "Sustainable black tuxedo in recycled polyester-wool. Sharp and conscious.", "New"],
      ["Givenchy", 6100, "Longline tuxedo jacket with satin lapels and straight-leg trouser. Minimal luxury."],
    ],
  },
  {
    type: "Double-Breasted Suit",
    brands: [
      ["Chanel", 10200, "Boucle double-breasted suit in ivory and gold. CC-logo buttons, wide lapels.", "Featured"],
      ["Giorgio Armani", 4500, "Peak-lapel DB suit in technical wool. Six-button, Prince of Wales check."],
      ["Valentino", 6400, "Oversized DB blazer with pleated trouser. Bold-button closure in black.", "New"],
      ["Versace", 5100, "Medusa-button DB suit in jacquard-weave. Wide lapels, cigarette trouser."],
      ["Max Mara", 3500, "Double-breasted camel coat-suit. Oversized blazer and wide-leg trouser."],
      ["Alexander McQueen", 7100, "Military DB suit with epaulettes. Sharp tailoring, anatomical construction."],
      ["Victoria Beckham", 3600, "Understated DB suit in stretch crepe. Clean buttons, straight-leg trouser."],
      ["Roland Mouret", 4000, "DB suit in bonded jersey. Sculptural lapels, slim trouser. Evening-ready."],
      ["Stella McCartney", 3100, "Sustainable DB suit in undyed wool. Minimal design, maximum integrity."],
      ["Givenchy", 5600, "Pinstripe DB suit. Peaked lapels, wide-leg trouser. Strong Givenchy lines."],
    ],
  },
  {
    type: "Tweed Suit",
    brands: [
      ["Chanel", 12800, "Runway tweed suit in multicolor boucle. Gilt-chain hem, CC-pearl buttons.", "Limited"],
      ["Giorgio Armani", 4800, "Herringbone tweed blazer set. Tonal lining, slim trouser, suede elbow patches."],
      ["Valentino", 6100, "Harris tweed suit with contrast velvet collar. Heritage craft, modern cut.", "New"],
      ["Versace", 5000, "Medusa-button tweed blazer and skirt. Rich double-faced texture."],
      ["Max Mara", 3800, "Scottish tweed blazer and straight-leg trouser. Weekend luxury at its finest."],
      ["Alexander McQueen", 7600, "Deconstructed tweed suit with raw edges and military buttons. Punk heritage."],
      ["Victoria Beckham", 3700, "Fine tweed slim blazer and tailored trouser. Polished British energy."],
      ["Roland Mouret", 4100, "Sculpted tweed suit with flared jacket hem and slim trouser."],
      ["Stella McCartney", 3300, "Eco-tweed blazer and trouser. Plant-dyed yarn, recycled construction."],
      ["Givenchy", 5500, "4G-embossed tweed suit. Structured jacket and wide-leg trouser. Editorial.", "Featured"],
    ],
  },
  {
    type: "Velvet Suit",
    brands: [
      ["Chanel", 11200, "Midnight-blue velvet suit. CC buttons, grosgrain trim, slim-leg trouser.", "Limited"],
      ["Giorgio Armani", 5400, "Crushed velvet tuxedo jacket and straight trouser. Deep emerald green.", "New"],
      ["Valentino", 7500, "Plum velvet suit with jewel-button closure. Oversized jacket, boot-cut trouser."],
      ["Versace", 5800, "Baroque-trim velvet suit. Medusa buttons, contrasting baroque-print lining."],
      ["Max Mara", 4200, "Bottle-green velvet blazer and slim trouser. Rich, deeply luxurious texture.", "Featured"],
      ["Alexander McQueen", 8300, "Architectural velvet suit with flared trouser and exaggerated shoulder."],
      ["Victoria Beckham", 4400, "Midnight velvet suit. Minimalist jacket and straight-leg trouser. Evening gold."],
      ["Roland Mouret", 4900, "Structured velvet suit with dramatic lapels and kick-flare trouser."],
      ["Stella McCartney", 3800, "Recycled velvet suit in midnight. Sustainable red-carpet dressing."],
      ["Givenchy", 6400, "Black velvet tuxedo suit with satin piping. Ultra-sleek ceremonial wear."],
    ],
  },
  {
    type: "Pinstripe Suit",
    brands: [
      ["Chanel", 9400, "Chalk-stripe boucle pantsuit with CC buttons. Powerful Parisian tailoring.", "Featured"],
      ["Giorgio Armani", 4100, "Fine-pinstripe wool pantsuit. Relaxed silhouette, wide-leg trouser."],
      ["Valentino", 5700, "Bold pinstripe suit with oversized blazer and cigarette trouser.", "New"],
      ["Versace", 4900, "Pinstripe pantsuit with Medusa buttons and contrast lining. Directional."],
      ["Max Mara", 3400, "Classic chalk-stripe wool pantsuit. Long blazer, wide-leg trouser. Timeless."],
      ["Alexander McQueen", 7000, "Sharp pinstripe suit with structured shoulder and tapered trouser."],
      ["Victoria Beckham", 3500, "Narrow pinstripe slim pantsuit. Double-breasted jacket, tapered leg."],
      ["Roland Mouret", 4300, "Sculpted pinstripe blazer and trouser. Statement shoulder, body-skimming cut."],
      ["Stella McCartney", 3200, "Sustainable pinstripe suit in organic wool. Effortless power dressing."],
      ["Givenchy", 5400, "Wide pinstripe oversized suit. Drop-shoulder jacket, relaxed wide-leg trouser."],
    ],
  },
  {
    type: "Linen Suit",
    brands: [
      ["Chanel", 7200, "White linen blazer set with CC trim. Gold-chain hem, slim trouser.", "New"],
      ["Giorgio Armani", 3600, "Unlined linen suit in oatmeal. Minimal construction, maximum breathability.", "Featured"],
      ["Valentino", 4800, "Ivory linen suit with floral-embroidered lapels. Couture lightness."],
      ["Versace", 4200, "Chalk-white linen suit. Medusa buttons, wide-leg trouser. Summer luxury."],
      ["Max Mara", 2900, "Double-faced linen blazer set in ecru. Refined resort dressing."],
      ["Alexander McQueen", 5800, "Deconstructed linen suit in stone. Raw hems, architectural silhouette."],
      ["Victoria Beckham", 2800, "Sand linen pantsuit. Boxy jacket, slim trouser. Hot-weather polish.", "New"],
      ["Roland Mouret", 3400, "Structured washed linen suit. Sculpted jacket, straight-leg trouser."],
      ["Stella McCartney", 2600, "Organic linen suit in sage. Sustainably sourced, naturally cool."],
      ["Givenchy", 4600, "Linen-blend suit with 4G-embossed buttons. Relaxed blazer, wide-leg trouser."],
    ],
  },
  {
    type: "Boucle Suit",
    brands: [
      ["Chanel", 13500, "Signature boucle suit in rose and ecru. Pearl trim, gold-chain hem. Iconic.", "Limited"],
      ["Giorgio Armani", 5100, "Textured boucle blazer set. Collarless jacket with contrast piping.", "New"],
      ["Valentino", 6600, "Jewel-tone boucle suit. Balloon sleeves, wide-leg trouser. Maximalist joy."],
      ["Versace", 5600, "Gold-threaded boucle suit with Medusa-head buttons. Rich and regal."],
      ["Max Mara", 4400, "Ivory boucle blazer set. Collarless jacket, straight-leg trouser. Effortless.", "Featured"],
      ["Alexander McQueen", 8100, "Sculptural boucle suit with curved seaming and boot-cut trouser."],
      ["Victoria Beckham", 4100, "Ivory boucle double-breasted blazer and straight trouser. Modern Chanel alternative."],
      ["Roland Mouret", 4600, "Structured boucle suit with exaggerated hips and ankle-length trouser."],
      ["Stella McCartney", 3700, "Organic boucle pantsuit. Collarless jacket, wide-leg trouser in cream."],
      ["Givenchy", 5900, "Black boucle suit with 4G embossed metal trim. Structured jacket, slim trouser."],
    ],
  },
];

export const womenSuitsProducts: Product[] = (() => {
  let id = 200;
  const out: Product[] = [];
  suiteTypes.forEach((suitType, ti) => {
    suitType.brands.forEach(([brand, price, desc, tag], bi) => {
      out.push({
        id: id++,
        name: `${brand} — ${suitType.type}`,
        category: "Women's Suits",
        price,
        image: imgs[(ti + bi) % imgs.length],
        description: desc,
        tag,
      });
    });
  });
  return out;
})();
