import { products } from "./products.js";
import { gen } from "./utils.js";
import type { Product } from "./products.js";

const imgs = [
  "https://images.unsplash.com/photo-1632793039179-8d97795d20c6?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1632793039681-2cf5f97be82c?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1632761298177-51e35403e27e?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1651126581286-a6ae76cb5c78?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1503758425033-cd7b21496e21?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1778576069488-18c85f228716?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1780327011415-7496f9d66da9?w=600&h=750&fit=crop&auto=format",
];

export const womenShoesProducts: Product[] = gen(100, "Women's Shoes", imgs, [
  {
    b: "Christian Louboutin",
    items: [
      ["Pigalle 120 Pump", 895, "Iconic pointed-toe pump, 120mm heel in black nappa leather. The original power shoe.", "New"],
      ["So Kate 120 Patent", 795, "Patent leather version of the So Kate. Mirror-like finish, 120mm stiletto."],
      ["Lady Peep 150 Slingback", 1050, "Open-toe slingback with 150mm heel. Peep toe, adjustable strap."],
      ["Iriza D'Orsay 100", 745, "D'Orsay silhouette with low-cut vamp. 100mm heel, almond toe."],
      ["Bianca 140 Platform", 1095, "Platform pump with 140mm heel and 40mm platform. Full leather lining.", "Limited"],
    ],
  },
  {
    b: "Manolo Blahnik",
    items: [
      ["Hangisi 105 Satin", 1090, "Satin court shoe with jewelled buckle. The wedding-famous silhouette.", "New"],
      ["BB 105 Pump", 895, "The BB — the quintessential Blahnik pump. Pointed toe, 105mm heel."],
      ["Tuya 90 Mule", 945, "Slip-on mule with squared toe and 90mm block heel. Suede upper."],
      ["Maysale 50 Flat", 695, "Pointed-toe flat with signature Blahnik last. Buttery calfskin."],
      ["Satin D'Orsay 95", 1025, "Pleated satin d'Orsay with 95mm heel. Evening essential.", "Featured"],
    ],
  },
  {
    b: "Jimmy Choo",
    items: [
      ["Azia 95 Suede Pump", 725, "Classic suede pump in midnight blue. 95mm heel, almond toe."],
      ["Romy 60 Ballet Flat", 625, "Pointed-toe ballet flat. Satin finish, cushioned insole."],
      ["Viola 65 Mule", 680, "Kitten-heel mule in leather with squared toe. Day-to-evening ease."],
      ["Carrie 120 Slingback", 845, "Slingback with double strap and 120mm heel. Ankle-strap closure."],
      ["Luna 100 Platform", 895, "Platform sandal with ankle strap. 100mm heel, 30mm platform.", "Limited"],
    ],
  },
  {
    b: "Stuart Weitzman",
    items: [
      ["Nudist 75 Sandal", 495, "Barely-there strappy sandal. 75mm heel, four-point strap silhouette."],
      ["5050 OTK Boot", 695, "Over-the-knee suede boot. 50mm heel, elasticated back gusset."],
      ["Mira 100 Platform", 545, "Platform sandal with chunky 100mm heel and adjustable ankle strap."],
      ["Nori 60 Kitten Mule", 445, "Suede mule with kitten heel and pointed toe. Workwear staple.", "New"],
      ["Brixton 90 Loafer Heel", 545, "Leather loafer pump with penny-strap detail. 90mm block heel."],
    ],
  },
  {
    b: "Gianvito Rossi",
    items: [
      ["105 Satin Court Pump", 875, "Satin court shoe on 105mm heel. The most refined silhouette in luxury footwear.", "Featured"],
      ["Lela 85 Strappy Sandal", 795, "Square-toe strappy sandal. 85mm block heel, adjustable ankle strap."],
      ["Bijoux 105 Embellished", 1250, "Crystal-embellished sandal on 105mm stiletto. Pure couture energy.", "Limited"],
      ["Piper 20 Mule", 645, "Flat mule with wide strap and almond toe. Italian calf leather."],
      ["Skimmer 05 Flat", 595, "Pointed-toe flat in suede. The definitive off-duty shoe from Gianvito."],
    ],
  },
  {
    b: "Aquazzura",
    items: [
      ["Temptation 105 Sandal", 845, "Crystal-trimmed suede sandal with ankle wrap strap. 105mm heel.", "New"],
      ["Wild Thing 95 Fringe", 795, "Fringe-detailed suede pump. Bohemian spirit, Italian craftsmanship."],
      ["Bellariva 50 Espadrille Wedge", 495, "Espadrille wedge in canvas with ankle ties. Summer icon."],
      ["Tequila 70 Block-heel Sandal", 725, "Block-heel sandal in metallic leather. Square toe, back zip."],
      ["Forever Marilyn 150 Platform", 1095, "Crystal-embellished PVC platform. 150mm heel. Red-carpet ready.", "Limited"],
    ],
  },
  {
    b: "Casadei",
    items: [
      ["Blade 120 Patent", 895, "The Blade — 120mm knife-edge heel in patent calf. The sharpest shoe alive.", "Featured"],
      ["Punta 100 Nappa", 745, "Pointed-toe pump on razor-thin 100mm heel. Nappa leather upper."],
      ["Sofia 75 Satin Block", 695, "Block-heel satin pump. 75mm heel, square toe. Event-ready."],
      ["Techno Blade 105 Mesh", 845, "Mesh and patent-leather Blade heel. Futurist sportswear aesthetic."],
      ["Flaminia 60 Kitten", 625, "Kitten-heel mule in soft nappa. Flaminia toe with grosgrain detail."],
    ],
  },
  {
    b: "Sergio Rossi",
    items: [
      ["SR1 105 Nappa Pump", 795, "Signature SR1 silhouette on 105mm heel. Clean, timeless, Italian.", "New"],
      ["Godiva 120 Sandal", 845, "Strappy sandal with 120mm heel. Double toe strap, single ankle strap."],
      ["Segreto 90 Slingback", 745, "Hidden-platform slingback. 90mm heel with 10mm concealed platform."],
      ["Mermaid 105 PVC", 895, "Clear PVC and leather strappy sandal. Barely-there illusion silhouette."],
      ["Sabot 55 Block", 595, "Wood-effect block-heel sabot in smooth leather. Elegant everyday option."],
    ],
  },
  {
    b: "Alexander McQueen",
    items: [
      ["Armadillo 12cm Platform", 1295, "The iconic McQueen lobster-claw platform. Hand-constructed, museum-worthy.", "Limited"],
      ["Faithful 100 Ankle Boot", 1095, "Structured ankle boot in calfskin. 100mm stacked leather heel."],
      ["Punk Creeper Platform", 795, "Chunky creeper platform with lug sole. Asymmetric lacing detail.", "New"],
      ["Razor Heel Sandal 110", 1050, "Open-toe sandal with sculpted razor heel. Architectural silhouette."],
      ["Curve Sole Boot 90", 945, "Curved-sole ankle boot. Signature McQueen construction, 90mm heel."],
    ],
  },
  {
    b: "Valentino Garavani",
    items: [
      ["Rockstud 100 Pump", 995, "The Rockstud — studded stiletto pump on 100mm heel. A Valentino icon.", "Featured"],
      ["Tan-Go 105 Platform", 1095, "Platform pump with 105mm heel, tan-go strap across the vamp."],
      ["VLTN 60 Sneaker Heel", 895, "Logo-strap low block-heel sandal. Casual luxury, maximum comfort."],
      ["Open Loafer 20 Flat", 745, "Studded loafer in calfskin. Flat with chain and stud detail."],
      ["Vlogo Chain 100 Sandal", 945, "Strappy sandal with chain embellishment and 100mm heel. Eveningwear.", "New"],
    ],
  },
]);
