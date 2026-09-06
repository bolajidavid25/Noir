export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tag?: string;
}

// ── Category definitions ──────────────────────────────────────────────────────
export const categories = [
  { id: "all",               label: "All" },
  { id: "Women's Shoes",     label: "Women's Shoes" },
  { id: "Bags",              label: "Bags" },
  { id: "Women's Clothing",  label: "Women's Clothing" },
  { id: "Women's Suits",     label: "Women's Suits" },
  { id: "Men's Clothing",    label: "Men's Clothing" },
  { id: "Men's Suits",       label: "Men's Suits" },
  { id: "Men's Shoes",       label: "Men's Shoes" },
  { id: "Jewelry",           label: "Jewelry" },
  { id: "Fragrance",         label: "Fragrance" },
];

export const categoryMeta: Record<string, { image: string; headline: string; sub: string }> = {
  "Women's Shoes": {
    image: "https://images.unsplash.com/photo-1778576069488-18c85f228716?w=800&h=1000&fit=crop&auto=format",
    headline: "Women's Shoes",
    sub: "10 brands · 50 styles",
  },
  "Bags": {
    image: "https://images.unsplash.com/photo-1562869323-d3d7be3e88a6?w=800&h=1000&fit=crop&auto=format",
    headline: "Bags",
    sub: "10 houses · 50 pieces",
  },
  "Women's Clothing": {
    image: "https://images.unsplash.com/photo-1732706431123-1aac2b46ace6?w=800&h=1000&fit=crop&auto=format",
    headline: "Women's Clothing",
    sub: "Ready-to-wear",
  },
  "Women's Suits": {
    image: "https://images.unsplash.com/photo-1677246791501-85875b1ab187?w=800&h=1000&fit=crop&auto=format",
    headline: "Women's Suits",
    sub: "10 cuts · 10 brands · 100 looks",
  },
  "Men's Clothing": {
    image: "https://images.unsplash.com/photo-1741709846033-67a45021fcb2?w=800&h=1000&fit=crop&auto=format",
    headline: "Men's Clothing",
    sub: "Ready-to-wear",
  },
  "Men's Suits": {
    image: "https://images.unsplash.com/photo-1676278746061-c5bac5b34ae5?w=800&h=1000&fit=crop&auto=format",
    headline: "Men's Suits",
    sub: "10 cuts · 10 houses · 100 suits",
  },
  "Men's Shoes": {
    image: "https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=800&h=1000&fit=crop&auto=format",
    headline: "Men's Shoes",
    sub: "20 styles · 100 brands",
  },
  "Jewelry": {
    image: "https://images.unsplash.com/photo-1744369382892-eb5b6a2fdc6f?w=800&h=1000&fit=crop&auto=format",
    headline: "Jewelry",
    sub: "Fine & precious",
  },
  "Fragrance": {
    image: "https://images.unsplash.com/photo-1654617058572-f1f473581778?w=800&h=1000&fit=crop&auto=format",
    headline: "Fragrance",
    sub: "20 ultra-luxury collections",
  },
};

// ── Core products (keep existing IDs 1–31) ────────────────────────────────────
import { womenShoesProducts } from "./womenShoes";
import { bagsProducts }        from "./bags";
import { womenSuitsProducts }  from "./womenSuits";
import { menSuitsProducts }    from "./menSuits";
import { menShoesProducts }    from "./menShoes";
import { fragrancesProducts }  from "./fragrances";

const coreProducts: Product[] = [
  // Women's Clothing
  {
    id: 19,
    name: "Noir Sequin Gown",
    category: "Women's Clothing",
    price: 1950,
    image: "https://images.unsplash.com/photo-1551113006-731674fbb3ff?w=600&h=750&fit=crop&auto=format",
    description: "Full-length sequined gown with V-neck and open back. Dry clean only.",
    tag: "Featured",
  },
  {
    id: 20,
    name: "Cocoa Wool Coat",
    category: "Women's Clothing",
    price: 1280,
    image: "https://images.unsplash.com/photo-1618244965061-1d27b208d6e8?w=600&h=750&fit=crop&auto=format",
    description: "Double-breasted cocoa cashmere-wool blend. Oversized silhouette.",
    tag: "New",
  },
  {
    id: 21,
    name: "Smoke Draped Dress",
    category: "Women's Clothing",
    price: 1640,
    image: "https://images.unsplash.com/photo-1732706431123-1aac2b46ace6?w=600&h=750&fit=crop&auto=format",
    description: "Bias-cut silk charmeuse. One-shoulder draped silhouette with train.",
  },
  {
    id: 22,
    name: "Midnight Slip Gown",
    category: "Women's Clothing",
    price: 1380,
    image: "https://images.unsplash.com/photo-1732706432460-f8c52a9ae549?w=600&h=750&fit=crop&auto=format",
    description: "Silk satin slip dress in midnight. Lace trim, adjustable straps.",
  },
  {
    id: 23,
    name: "Crimson Statement Gown",
    category: "Women's Clothing",
    price: 2200,
    image: "https://images.unsplash.com/photo-1634709511970-38f6725e636e?w=600&h=750&fit=crop&auto=format",
    description: "Structured strapless gown in deep crimson. Boned bodice, full skirt.",
    tag: "Limited",
  },
  // Men's Clothing
  {
    id: 13,
    name: "Obsidian Tuxedo",
    category: "Men's Clothing",
    price: 2400,
    image: "https://images.unsplash.com/photo-1676278746061-c5bac5b34ae5?w=600&h=750&fit=crop&auto=format",
    description: "Black wool-mohair blend. Satin lapels, single button, bespoke lining.",
    tag: "Featured",
  },
  {
    id: 14,
    name: "Midnight Slim Suit",
    category: "Men's Clothing",
    price: 1850,
    image: "https://images.unsplash.com/photo-1613379171002-3610ae01cf4a?w=600&h=750&fit=crop&auto=format",
    description: "Italian Super 120s wool. Slim two-button cut. Available in 36–52.",
  },
  {
    id: 15,
    name: "Embroidered Evening Jacket",
    category: "Men's Clothing",
    price: 3200,
    image: "https://images.unsplash.com/photo-1741709846033-67a45021fcb2?w=600&h=750&fit=crop&auto=format",
    description: "Hand-embroidered velvet evening jacket. 200 hours of atelier work.",
    tag: "Limited",
  },
  {
    id: 16,
    name: "Tailored Dress Suit",
    category: "Men's Clothing",
    price: 2100,
    image: "https://images.unsplash.com/photo-1741709845968-c42e2c0dbe1d?w=600&h=750&fit=crop&auto=format",
    description: "Bespoke canvas construction, full lining, surgeon's cuffs.",
    tag: "New",
  },
  {
    id: 17,
    name: "Maroon Heritage Jacket",
    category: "Men's Clothing",
    price: 1650,
    image: "https://images.unsplash.com/photo-1493146146946-e907f69cdf23?w=600&h=750&fit=crop&auto=format",
    description: "Deep maroon wool sport jacket. Patch pockets, notch lapel.",
  },
  {
    id: 18,
    name: "Field Dress Coat",
    category: "Men's Clothing",
    price: 1980,
    image: "https://images.unsplash.com/photo-1619482694176-81b88b184c46?w=600&h=750&fit=crop&auto=format",
    description: "Double-faced cashmere overcoat in jet black. Fly-front closure.",
  },
  // Women's Clothing (extended)
  {
    id: 29,
    name: "Scarlet Power Blazer Dress",
    category: "Women's Clothing",
    price: 1780,
    image: "https://images.unsplash.com/photo-1580478491436-fd6a937acc9e?w=600&h=750&fit=crop&auto=format",
    description: "Single-button blazer dress in crimson crepe. Structured shoulders, belted waist, midi length.",
    tag: "New",
  },
  {
    id: 30,
    name: "Dune Asymmetric Gown",
    category: "Women's Clothing",
    price: 2350,
    image: "https://images.unsplash.com/photo-1595882669314-919b3d51f2c7?w=600&h=750&fit=crop&auto=format",
    description: "Sand-toned silk gown with asymmetric hem and one-shoulder construction. Desert luxury.",
    tag: "Limited",
  },
  {
    id: 31,
    name: "Ivory Tailored Pantsuit",
    category: "Women's Clothing",
    price: 1490,
    image: "https://images.unsplash.com/photo-1613915617430-8ab0fd7c6baf?w=600&h=750&fit=crop&auto=format",
    description: "Wide-leg ivory crepe pantsuit. Double-breasted single button, flowing trousers.",
    tag: "Featured",
  },
  {
    id: 32,
    name: "White Editorial Mini Dress",
    category: "Women's Clothing",
    price: 1120,
    image: "https://images.unsplash.com/photo-1657815929003-b97cc426cb3d?w=600&h=750&fit=crop&auto=format",
    description: "Architectural mini in ivory cotton poplin. Balloon sleeves, structured bodice.",
    tag: "New",
  },
  // Men's Clothing (extended)
  {
    id: 33,
    name: "Matte Onyx Power Suit",
    category: "Men's Clothing",
    price: 2850,
    image: "https://images.unsplash.com/photo-1617127365659-c47fa864d8bc?w=600&h=750&fit=crop&auto=format",
    description: "Black wool-silk blend. Two-button single-breasted. Satin lapel detail. Full canvas.",
    tag: "Featured",
  },
  {
    id: 34,
    name: "Obsidian Slim Suit",
    category: "Men's Clothing",
    price: 2100,
    image: "https://images.unsplash.com/photo-1600091166971-7f9faad6c1e2?w=600&h=750&fit=crop&auto=format",
    description: "Slim-cut charcoal Super 130s wool. Notch lapel, surgeon's cuffs, bespoke half-canvas.",
    tag: "New",
  },
  {
    id: 35,
    name: "Forest Green Statement Suit",
    category: "Men's Clothing",
    price: 1980,
    image: "https://images.unsplash.com/photo-1611937663641-5cef5189d71b?w=600&h=750&fit=crop&auto=format",
    description: "Deep forest wool suit. Peak lapel, flap pockets. The suit for those who refuse grey.",
    tag: "Limited",
  },
  // Bags (extended)
  {
    id: 36,
    name: "Ivory Cloud Mini Bag",
    category: "Bags",
    price: 1650,
    image: "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=600&h=750&fit=crop&auto=format",
    description: "Ivory quilted lambskin mini bag. Gold chain, magnetic clasp. Parisian ease.",
    tag: "New",
  },
  {
    id: 37,
    name: "Ebony Structured Tote",
    category: "Bags",
    price: 2200,
    image: "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=600&h=750&fit=crop&auto=format",
    description: "Full-grain black leather tote. Reinforced base, suede interior, polished turn-lock.",
    tag: "Featured",
  },
  {
    id: 38,
    name: "Ash Gray Leather Satchel",
    category: "Bags",
    price: 1890,
    image: "https://images.unsplash.com/photo-1683921470299-b8f0f3331657?w=600&h=750&fit=crop&auto=format",
    description: "Ash-gray pebbled leather satchel. Detachable crossbody strap, 3 interior compartments.",
    tag: "New",
  },
  // Women's Shoes (extended)
  {
    id: 39,
    name: "Jardin Floral Pump",
    category: "Women's Shoes",
    price: 920,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=600&h=750&fit=crop&auto=format",
    description: "Hand-painted floral brocade pump. 95mm heel, pointed toe, leather sole.",
    tag: "Limited",
  },
  {
    id: 40,
    name: "Rose Patent Stiletto",
    category: "Women's Shoes",
    price: 780,
    image: "https://images.unsplash.com/photo-1573100925118-870b8efc799d?w=600&h=750&fit=crop&auto=format",
    description: "Rose-pink patent leather stiletto. 105mm heel, barely-there strap, signature red sole.",
    tag: "Featured",
  },
  {
    id: 41,
    name: "Alabaster Leather Pump",
    category: "Women's Shoes",
    price: 640,
    image: "https://images.unsplash.com/photo-1562687848-c1664eff566d?w=600&h=750&fit=crop&auto=format",
    description: "White leather pointed toe pump. 90mm stiletto heel, cushioned insole. Timeless.",
    tag: "New",
  },
  // Men's Shoes (extended)
  {
    id: 42,
    name: "Cognac Burnished Derby",
    category: "Men's Shoes",
    price: 780,
    image: "https://images.unsplash.com/photo-1625357165350-bdbcb6d7d524?w=600&h=750&fit=crop&auto=format",
    description: "Hand-burnished cognac calfskin derby. Goodyear welted, single leather sole. Milan-made.",
    tag: "New",
  },
  {
    id: 43,
    name: "Tan Longwing Brogue",
    category: "Men's Shoes",
    price: 695,
    image: "https://images.unsplash.com/photo-1603191659812-ee978eeeef76?w=600&h=750&fit=crop&auto=format",
    description: "Full-brogue longwing in rich tan calfskin. American Goodyear welt, leather insole.",
    tag: "Featured",
  },
  // Jewelry (extended)
  {
    id: 44,
    name: "Verdant Leaf Pendant",
    category: "Jewelry",
    price: 780,
    image: "https://images.unsplash.com/photo-1724937721228-f7bf3df2a4d8?w=600&h=750&fit=crop&auto=format",
    description: "18k gold leaf pendant with emerald detail. Nature-inspired haute joaillerie.",
    tag: "New",
  },
  {
    id: 45,
    name: "Prism Bib Necklace",
    category: "Jewelry",
    price: 3400,
    image: "https://images.unsplash.com/photo-1561060511-78b14b799fe1?w=600&h=750&fit=crop&auto=format",
    description: "Multi-gemstone bib necklace set in oxidized silver. Sapphire, ruby, emerald, amethyst.",
    tag: "Limited",
  },
  {
    id: 46,
    name: "Pearl Cascade Choker",
    category: "Jewelry",
    price: 2800,
    image: "https://images.unsplash.com/photo-1719862056514-0cdacd9142b5?w=600&h=750&fit=crop&auto=format",
    description: "South Sea pearl and diamond choker set in platinum. 11mm AAA-grade pearls.",
    tag: "Featured",
  },
  // Jewelry
  {
    id: 24,
    name: "Gemstone Pendant",
    category: "Jewelry",
    price: 1100,
    image: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=750&fit=crop&auto=format",
    description: "Natural alexandrite pendant in 18k white gold. Changes color with light.",
    tag: "Featured",
  },
  {
    id: 25,
    name: "Gold Signet Ring",
    category: "Jewelry",
    price: 680,
    image: "https://images.unsplash.com/photo-1605089315599-ca966e96b56a?w=600&h=750&fit=crop&auto=format",
    description: "14k solid gold signet, hand-engraved. Unisex sizing 4–12.",
  },
  {
    id: 26,
    name: "Stone & Chain Set",
    category: "Jewelry",
    price: 890,
    image: "https://images.unsplash.com/photo-1673131158657-4404fd1f041a?w=600&h=750&fit=crop&auto=format",
    description: "Matched labradorite pendant with 18k gold chain and stacking ring.",
    tag: "New",
  },
  {
    id: 27,
    name: "Diamond Collar Necklace",
    category: "Jewelry",
    price: 4800,
    image: "https://images.unsplash.com/photo-1744369382892-eb5b6a2fdc6f?w=600&h=750&fit=crop&auto=format",
    description: "2.4 ct total weight VS1 diamonds, set in platinum. Runway piece.",
    tag: "Limited",
  },
  {
    id: 28,
    name: "Stacked Onyx Rings",
    category: "Jewelry",
    price: 460,
    image: "https://images.unsplash.com/photo-1701450706884-9cd56416ac6c?w=600&h=750&fit=crop&auto=format",
    description: "Set of three oxidized silver rings with raw black onyx stones.",
  },
];

// ── Merge all products ────────────────────────────────────────────────────────
export const products: Product[] = [
  ...coreProducts,
  ...womenShoesProducts,
  ...bagsProducts,
  ...womenSuitsProducts,
  ...menSuitsProducts,
  ...menShoesProducts,
  ...fragrancesProducts,
];

// ── Hero slides ───────────────────────────────────────────────────────────────
export const heroSlides = [
  {
    id: 1,
    headline: "Scent of\nExcellence",
    subline: "Ultra-rare fragrance collections — 20 houses, each a masterpiece of perfumery.",
    cta: "Explore Fragrance",
    video: "https://assets.mixkit.co/videos/20766/mixkit-pressing-down-on-a-bottle-of-perfume-20766-preview.mp4",
    poster: "https://images.unsplash.com/photo-1654617058572-f1f473581778?w=1400&h=900&fit=crop&auto=format",
    accent: "Fragrance Edit",
  },
  {
    id: 2,
    headline: "Walk with\nPurpose",
    subline: "Chelsea boots, Oxfords, and every silhouette in between — 100 styles of men's luxury.",
    cta: "Shop Men's Shoes",
    video: "https://assets.mixkit.co/videos/6118/mixkit-boots-on-the-ground-6118-preview.mp4",
    poster: "https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=1400&h=900&fit=crop&auto=format",
    accent: "Men's Shoes",
  },
  {
    id: 3,
    headline: "Carry\nthe Story",
    subline: "Hermès, Chanel, Bottega — the world's greatest bags, curated in one place.",
    cta: "Discover Bags",
    video: "https://assets.mixkit.co/videos/6302/mixkit-women-walking-with-shopping-bags-6302-preview.mp4",
    poster: "https://images.unsplash.com/photo-1562869323-d3d7be3e88a6?w=1400&h=900&fit=crop&auto=format",
    accent: "Bag Collection",
  },
];
