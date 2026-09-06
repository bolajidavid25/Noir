import { gen } from "./utils";
import type { Product } from "./products";

const imgs = [
  "https://images.unsplash.com/photo-1562869323-d3d7be3e88a6?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1682745230951-8a5aa9a474a0?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1591348278900-019a8a2a8b1d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1559563458-527698bf5295?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1705909237050-7a7625b47fac?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1590739225287-bd31519780c3?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1589363458-527698bf5295?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1685800750376-f4497f5da428?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1575202332411-b01fe9ace7a8?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1782527062511-608766192dfd?w=600&h=750&fit=crop&auto=format",
];

export const bagsProducts: Product[] = gen(150, "Bags", imgs, [
  {
    b: "Hermès",
    items: [
      ["Birkin 25 Togo Noir", 12500, "Togo calfskin Birkin in black. Palladium hardware, lock and keys.", "Limited"],
      ["Kelly 28 Sellier Epsom", 9800, "Rigid Kelly in epsom calfskin. Gold buckle, one handle, removable strap.", "Limited"],
      ["Constance 18 Lizard", 8500, "Exotic lizard leather Constance with H-buckle closure. Iconic silhouette."],
      ["Picotin 18 Tressage", 3200, "Bucket tote with woven handles. Unlined interior, brass turn-lock.", "New"],
      ["Evelyne 29 Clemence", 2850, "Perforated H-motif shoulder bag in clemence leather. Casual and refined."],
    ],
  },
  {
    b: "Chanel",
    items: [
      ["Classic Flap Medium Caviar", 9100, "Quilted caviar calfskin CC-lock flap bag. Gold chain. The original.", "Featured"],
      ["Boy Bag Old Medium", 6750, "Boy bag in black calfskin with ruthenium CC-turn lock. Structured shape."],
      ["19 Bag Large Tweed", 7200, "Interwoven chain strap bag in tweed. Gold, silver, and ruthenium hardware."],
      ["22 Bag Shiny Calfskin", 5400, "Crumpled shiny calfskin with camellia zipper pull. Modern Chanel.", "New"],
      ["Coco Handle Mini", 4100, "Mini bag with top handle and CC-clasp. Quilted lambskin, removable strap."],
    ],
  },
  {
    b: "Louis Vuitton",
    items: [
      ["Capucines MM Black", 5800, "Taurillon calfskin with LV buckle detail. Structured, top-handle silhouette.", "Featured"],
      ["On My Side PM", 3450, "LV tricolor monogram with tonal calfskin trim. Flexible, distinctive."],
      ["Loop Hobo Monogram", 2850, "Monogram coated canvas hobo with single shoulder strap. Relaxed elegance."],
      ["Twist MM Epi Leather", 4200, "Epi leather Twist with LV turn-lock. Two-way carry: shoulder or crossbody."],
      ["Dauphine Mini Reverse", 3700, "Mini Dauphine in reverse monogram canvas. Magnetic flap, chain strap.", "New"],
    ],
  },
  {
    b: "Gucci",
    items: [
      ["Jackie 1961 Small Hobo", 1950, "Soft leather Jackie with piston-clasp closure. Original 1961 silhouette.", "New"],
      ["Diana Mini Tote Bamboo", 2100, "Mini tote with bamboo handles and GG canvas. Double zip top closure."],
      ["Horsebit 1955 Mini Bag", 1850, "Small flap bag with horsebit hardware. Supreme canvas with leather trim."],
      ["Ophidia Medium GG Tote", 1450, "GG supreme canvas tote with Web stripe and suede lining."],
      ["Blondie Medium Chain Wallet", 1680, "Leather chain bag with interlocking G. Evening-to-day versatility.", "Limited"],
    ],
  },
  {
    b: "Prada",
    items: [
      ["Re-Edition 2005 Nylon", 1490, "Iconic Prada nylon shoulder bag with saffiano leather triangle logo."],
      ["Galleria Medium Saffiano", 3200, "Structured saffiano tote with double zip and rolled handles. Office-ready.", "Featured"],
      ["Cleo Brushed Leather", 2100, "Brushed calfskin Cleo with arc-shaped flap. Shoulder chain and push-lock."],
      ["Symbole Jacquard", 2650, "Woven jacquard fabric with saffiano leather trim and Prada logo plate."],
      ["Arqué Leather Shoulder", 2400, "Curved leather shoulder bag with a sculptural gold clasp. Contemporary.", "New"],
    ],
  },
  {
    b: "Bottega Veneta",
    items: [
      ["Jodie Intrecciato Knot Bag", 3600, "Signature intrecciato woven leather with knotted handles. Unlined.", "Featured"],
      ["Cassette Padded Shoulder", 2850, "Padded intrecciato cassette bag. Snap-button magnetic closure."],
      ["Andiamo Large Tote", 3200, "Hammered leather tote with integrated woven handles. Minimal, maximal.", "New"],
      ["Sardine Box Bag", 2450, "Rectangular frame bag in calfskin. Single handle, shoulder strap included."],
      ["Cobble Crossbody", 1950, "Small crossbody in cobblestone-texture calfskin. Gold adjustable chain."],
    ],
  },
  {
    b: "Saint Laurent",
    items: [
      ["Le 5 à 7 Smooth Leather", 2050, "Envelope-shaped bag in smooth calfskin. Cassandre-engraved flap clasp.", "New"],
      ["Loulou Small Puffer", 1850, "Quilted puffer bag with YSL chain. Soft, pillowy calfskin in noir."],
      ["Jamie 4.3 Suede", 1650, "Suede top-handle bag with chain crossbody strap. 70s-inspired."],
      ["Solferino Medium Flap", 2200, "Smooth calfskin flap bag with Cassandre buckle and removable strap."],
      ["Manhattan Small Monogram", 1750, "Monogram canvas with leather trim. Top handle and magnetic flap.", "Featured"],
    ],
  },
  {
    b: "Givenchy",
    items: [
      ["Antigona Soft Medium", 2450, "Unstructured Antigona in grained calfskin with G-lock closure."],
      ["Kenny Small Crossbody", 1350, "Mini crossbody in smooth leather. Golden G hardware, chain strap.", "New"],
      ["4G Leather Bucket", 1750, "Bucket silhouette with embossed 4G pattern. Drawstring and single strap."],
      ["Voyou Baguette", 1550, "Baguette bag in crocodile-effect calfskin. Adjustable leather strap."],
      ["Cut-Out Small Shoulder", 1850, "Architectural cut-out bag in smooth calfskin. Statement hardware.", "Limited"],
    ],
  },
  {
    b: "Celine",
    items: [
      ["Triomphe Mini Canvas", 850, "Signature Triomphe canvas with calfskin trim. Timeless minimalism.", "New"],
      ["16 Medium Grained Calf", 2900, "Structured 16 bag with flap closure and chunky ring hardware."],
      ["Ava Teen Smooth Calfskin", 2100, "Small shoulder bag with adjustable chain. Minimal Celine rigor.", "Featured"],
      ["Tilly Small Bucket", 1750, "Soft bucket bag with Celine tab closure. Grained calfskin, short strap."],
      ["Wiltern Open Tote", 1650, "Soft open tote in calfskin. Structured base, open-top silhouette."],
    ],
  },
  {
    b: "Fendi",
    items: [
      ["Baguette 1997 Medium", 2950, "The original 1997 Baguette in FF jacquard. Fendi's most iconic piece.", "Featured"],
      ["Peekaboo X-Lite Small", 3800, "Transparent peek-a-boo top-panel Peekaboo. Contrast-color interior."],
      ["First Medium Nappa", 2650, "First bag with eye-shaped clasp in smooth nappa leather. Chain strap."],
      ["Sunshine Medium Shopper", 1050, "FF canvas shopper with tan calfskin handles. Everyday luxury.", "New"],
      ["Mon Trésor Mini Bucket", 1450, "Logo-embossed bucket bag with chain strap. Compact, distinctive."],
    ],
  },
]);
