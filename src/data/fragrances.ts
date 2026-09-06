import type { Product } from "./products";

const imgs = [
  "https://images.unsplash.com/photo-1654617058572-f1f473581778?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1758225502621-9102d2856dc8?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1604588715397-aa9b2fa10fa5?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1615160460366-2c9a41771b51?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1615160460524-432433ba1b8f?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1615634260167-c8cdede054de?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1608721279136-cd41b752fa41?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1585218356022-6a53145f56f6?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1535683577427-740aaac4ec25?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1541108564883-bec8126021f5?w=600&h=750&fit=crop&auto=format",
];

type F = { id: number; name: string; category: string; price: number; image: string; description: string; tag?: string };

const data: Array<[brand: string, line: string, price: number, desc: string, tag?: string]> = [
  ["Creed", "Aventus Collector's Edition", 860, "Blackcurrant, bergamot, apple; birch, oakmoss, ambergris. The most copied scent in history. 250ml flacon.", "Limited"],
  ["Clive Christian", "No.1 Imperial Majesty", 2200, "Bergamot, cardamom, Florentine iris, Indian sandalwood. 50ml baccarat crystal flacon with 18k gold.", "Limited"],
  ["Tom Ford", "Private Blend Discovery Set", 495, "Twelve 5ml Privée Collection vials: Oud Wood, Tobacco Vanille, Noir de Noir, Rose Prick, and more.", "Featured"],
  ["Roja Parfums", "Elysium Pour Homme Parfum", 590, "Grapefruit, bergamot, violet leaf, cedarwood, vetiver, ambergris. Cologne Absolue concentration.", "Featured"],
  ["Amouage", "Reflection Man Eau de Parfum", 480, "Neroli, white musk, woody amber, sandalwood. The mirror of modern masculinity. 100ml.", "New"],
  ["Xerjoff", "Naxos Eau de Parfum", 420, "Sicilian lemon, tobacco, lavender, vanilla, tonka bean. The dolce vita in a bottle. 100ml."],
  ["Parfums de Marly", "Layton Royal Essence", 650, "Apple, bergamot, jasmine, sandalwood, vanilla. The beloved Layton in a gilded 75ml flacon.", "New"],
  ["Maison Francis Kurkdjian", "Baccarat Rouge 540 Extrait", 780, "Jasmine, saffron, amberwood, fir resin. Extrait concentration in the iconic Baccarat crystal bottle.", "Featured"],
  ["Byredo", "Bibliothèque Parfum Collection", 890, "Peach skin, plum, violet, vanilla. Set of six 12ml Bibliothèque and bestseller parfums.", "New"],
  ["Dior Privée", "Ambre Nuit Grand Soir", 560, "Turkish rose, labdanum, benzoin, ambre gris. The ultimate winter-nights fragrance. 200ml.", "Limited"],
  ["Chanel Les Exclusifs", "No.22 & Gardenia Discovery Duo", 420, "Two 75ml Exclusifs flacons: No.22 with ylang-ylang and musk; Gardenia with Grasse tuberose."],
  ["Guerlain", "L'Art & La Matière: Cuir Beluga", 520, "Iris, almond, vanilla, white musks, leather. Limited art-object bottle from the Guerlain atelier.", "Limited"],
  ["Van Cleef & Arpels", "Bois d'Iris Extraordinaire", 680, "White iris, cedar, sandalwood, amber. Issued in a Swarovski-decorated faceted glass flacon.", "Limited"],
  ["Bvlgari", "Le Gemme Tygar Collection Set", 750, "Saffron, tobacco, amber, Atlas cedarwood. Full Le Gemme set: three 100ml flacons.", "Featured"],
  ["Penhaligon's", "Halfeti Leather Grand Edition", 610, "Black rose, oud, leather, amber, saffron. 200ml gravity-blown bottle. Hand-engraved label.", "New"],
  ["Memo Paris", "Irish Leather Collector's Flacon", 540, "Bergamot, pink pepper, leather, patchouli, sandalwood. 200ml artisan-glass bottle.", "Limited"],
  ["Orto Parisi", "Megamare Parfum", 295, "Sea minerals, ambergris, iris, oakmoss. Alta concentrazione. Minimal bottle, maximal scent."],
  ["Fueguia 1833", "Revolución Parfum", 480, "Yerba mate, tobacco, leather, cedar, musk. Buenos Aires atelier. Hyper-limited production.", "Limited"],
  ["Floraïku", "The Sword Under The Pillow", 420, "Yuzu, violet, iris, white musk, orris root. Poetic Japanese-French perfume house. 50ml + 10ml.", "New"],
  ["Parfums MDCI", "Invasion Barbare Collection", 980, "Cumin, labdanum, castoreum, leather, woods. Classic French parfumerie. Two 75ml flacons.", "Limited"],
];

export const fragrancesProducts: F[] = data.map(([brand, line, price, desc, tag], i) => ({
  id: 500 + i,
  name: `${brand} — ${line}`,
  category: "Fragrance",
  price,
  image: imgs[i % imgs.length],
  description: desc,
  tag,
}));
