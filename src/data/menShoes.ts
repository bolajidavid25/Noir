import type { Product } from "./products";

const imgs = [
  "https://images.unsplash.com/photo-1616406432452-07bc5938759d?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1641893843833-a006778dc00b?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1668069226492-508742b03147?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1634304138376-43a922e96c80?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1675947258177-aa8120ddefa3?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1563434564528-8fdf5996e622?w=600&h=750&fit=crop&auto=format",
  "https://images.unsplash.com/photo-1673332655640-d97338b1c6b7?w=600&h=750&fit=crop&auto=format",
];

type Entry = [brand: string, price: number, desc: string, tag?: string];
type ShoeType = { type: string; entries: Entry[] };

const shoeTypes: ShoeType[] = [
  {
    type: "Oxford",
    entries: [
      ["Berluti", 1850, "Scritto hand-painted calfskin Oxford. Each pair uniquely aged by Berluti artisans.", "Featured"],
      ["John Lobb", 1650, "City II in black calf. The Oxford that defines the London business establishment."],
      ["Edward Green", 1380, "Piccadilly last Oxford in dark oak antique calf. Goodyear welted, bench-made.", "New"],
      ["Crockett & Jones", 685, "Hallam Oxford in black calf. Crockett's finest last, double leather sole."],
      ["Gaziano & Girling", 1950, "Deco Oxford on the Deco last. Hand-lasted, hand-stitched, hand-finished.", "Limited"],
    ],
  },
  {
    type: "Derby",
    entries: [
      ["Church's", 680, "Consul Derby in black calf. Open lacing, triple sole. Church's hallmark craftsmanship."],
      ["Grenson", 495, "Archie triple-welt Derby in tan burnished calf. Heritage English shoemaking.", "New"],
      ["Tricker's", 590, "Bourton Derby brogue in conker country calf. Dainite sole, Goodyear welted."],
      ["G.J. Cleverley", 1420, "Bespoke-quality Derby in dark brown calf. Cleverley last, featherweight construction."],
      ["Foster & Son", 2100, "Made-to-order Derby in black calf. Savile Row of shoemaking since 1840.", "Limited"],
    ],
  },
  {
    type: "Loafer",
    entries: [
      ["Gucci", 820, "Horsebit 1953 loafer in black leather. The original horsebit. Nothing competes.", "Featured"],
      ["Tod's", 595, "Gommino driving shoe in deerskin. 133 rubber pebbles, hand-stitched apron toe."],
      ["Ferragamo", 745, "Gancini loafer in calfskin. Iconic interlocking G-buckle, leather-wrapped sole."],
      ["Prada", 890, "Brushed leather loafer with triangle logo. Clean silhouette, rubber lugged sole."],
      ["Bottega Veneta", 980, "Intrecciato woven leather loafer. Signature weave on a classic loafer last.", "New"],
    ],
  },
  {
    type: "Chelsea Boot",
    entries: [
      ["Saint Laurent", 1050, "Wyatt Chelsea in black burnished calfskin. Beatle heel, elastic gusset. Iconic.", "Featured"],
      ["Acne Studios", 680, "Desert Chelsea boot in oiled suede. Minimal branding, clean silhouette.", "New"],
      ["Common Projects", 590, "Chelsea boot in black calf. Gold serial number, crepe sole. The modernist choice."],
      ["Rick Owens", 1250, "DRKSHDW extended-sole Chelsea. Platform construction, distressed calfskin.", "Limited"],
      ["R.M. Williams", 545, "Craftsman Chelsea in yearling leather. Australian icon. Single-piece upper."],
    ],
  },
  {
    type: "Brogue",
    entries: [
      ["Tricker's", 650, "Bourton full-brogue in acorn antique calf. The original Tricker's country brogue.", "Featured"],
      ["Grenson", 520, "Fred triple-welt brogue in tan. Three-layer construction, Dainite rubber sole."],
      ["Alfred Sargent", 480, "Exclusive full-brogue in dark oak calf. Open-channel welt, leather sole.", "New"],
      ["Cheaney", 440, "Joseph brogue in dark leaf calf. Made in Northamptonshire, Goodyear welted."],
      ["Sanders", 385, "Military Derby brogue in black calf. Contract shoe heritage. Bullet-proof durability."],
    ],
  },
  {
    type: "Monk Strap",
    entries: [
      ["Magnanni", 595, "Double-monk in cognac burnished calf. Spanish craftsmanship, leather welt.", "New"],
      ["Bally", 680, "Scribe double-monk in dark brown calf. Swiss heritage, clean contemporary lines."],
      ["A. Testoni", 890, "Bologna-construction double-monk. Hand-stitched to the sole, featherweight feel.", "Featured"],
      ["Moreschi", 720, "Antiqued leather double-monk. Burnished by hand, Lorenzo last."],
      ["Magnanni", 545, "Single-monk in black calf. Brushed brass buckle, goodyear welted construction."],
    ],
  },
  {
    type: "Chukka Boot",
    entries: [
      ["Paul Smith", 450, "Desert chukka in tan suede. Two-eyelet lacing, crepe rubber sole. Classic.", "New"],
      ["Grenson", 495, "Fred chukka in suede. Triple-welt construction, Dainite sole. Versatile boot."],
      ["Belstaff", 545, "Chukka boot in waxed leather. Subtle brogue detail, Vibram sole. British tough."],
      ["Harrys of London", 890, "Luxury chukka in hand-grained calf. Half-brogue detail, rubber city sole.", "Featured"],
      ["Tricker's", 620, "Stow chukka boot in espresso calf. Dainite sole, Goodyear welt."],
    ],
  },
  {
    type: "Penny Loafer",
    entries: [
      ["Alden", 580, "990 penny loafer in black calfskin. American institution since 1884. Unibody construction.", "Featured"],
      ["Weejuns by G.H. Bass", 195, "Larson penny loafer in tan leather. The original penny loafer from 1936."],
      ["Allen Edmonds", 395, "Ranger penny in brown burnished calf. American Goodyear welt, recraftable.", "New"],
      ["Johnston & Murphy", 280, "Melton penny loafer in black calfskin. Cushion-plus comfort system."],
      ["Cole Haan", 250, "Pinch penny loafer in British tan. Grand.ØS cushioning, flexible leather sole."],
    ],
  },
  {
    type: "Luxury Sneaker",
    entries: [
      ["Christian Louboutin", 895, "Spike Sock sneaker in black calfskin. Studded toe and heel. Signature red sole.", "Featured"],
      ["Golden Goose", 595, "Super-Star in white calfskin. Deliberately distressed finish, star patch.", "New"],
      ["Axel Arigato", 285, "Clean 90 sneaker in white leather. Minimal branding, vulcanized sole."],
      ["Filling Pieces", 310, "Low Top Lux in sand suede. Portuguese-made, cupsole, premium finish."],
      ["Common Projects", 465, "Achilles Low in white. The definitive minimal luxury sneaker since 2004.", "Limited"],
    ],
  },
  {
    type: "Combat Boot",
    entries: [
      ["Rick Owens", 1650, "Tractor sole combat boot in black calfskin. 50mm platform. Apocalyptic luxury.", "Featured"],
      ["Balenciaga", 1250, "Steroid boot in black leather. Extreme sole, deliberate construction excess.", "New"],
      ["Julius", 1100, "Asymmetric combat boot in horse leather. Japanese avant-garde craftsmanship.", "Limited"],
      ["Ann Demeulemeester", 980, "Leather combat boot with lace-up front. Belgian minimalism, max structure."],
      ["Boris Bidjan Saberi", 890, "BBS combat boot in hand-dyed horsehide. Each pair unique by construction."],
    ],
  },
  {
    type: "Wholecut Oxford",
    entries: [
      ["Stefano Bemer", 3200, "Hand-lasted wholecut in black boxcalf. Single piece of leather. Florence.", "Limited"],
      ["Aubercy", 2800, "Wholecut Derby in brown calfskin. Parisian bespoke quality, ready to wear.", "Featured"],
      ["Carmina", 895, "Wholecut Oxford on Simpson last. Spanish Goodyear welt, burnished finish."],
      ["Vass", 980, "F-last wholecut in dark cognac calf. Hungarian bespoke bench-made construction."],
      ["Laszlo Vass", 1150, "Budapest wholecut in dark brown calf. Hand-sewn welting, single-piece upper.", "New"],
    ],
  },
  {
    type: "Tassel Loafer",
    entries: [
      ["Alden", 620, "986 tassel loafer in burgundy cordovan shell. American heritage. Museum-quality.", "Featured"],
      ["Weejuns by G.H. Bass", 220, "Logan tassel loafer in black leather. Clean American styling since 1936."],
      ["O'Keeffe", 1450, "Bespoke tassel loafer in whisky cordovan. Irish handcraft, single-piece upper.", "Limited"],
      ["Bestetti", 1850, "Made-to-order tassel loafer in dark cognac calf. Milan hand-crafted excellence."],
      ["Brooks Brothers", 295, "Classic tassel loafer in brown calfskin. Ivy League heritage, leather sole.", "New"],
    ],
  },
  {
    type: "Cap Toe Oxford",
    entries: [
      ["Santoni", 780, "Cap-toe Oxford in black calf. Hand-painted patina finish. Italian benchmark.", "Featured"],
      ["Bontoni", 1650, "Artisanal cap-toe in dark brown boxcalf. Hand-lasted, hand-sewn welt. Bologna.", "Limited"],
      ["Sutor Mantellassi", 1450, "Cap-toe Oxford in black polish calf. Rome's finest ready-to-wear shoemaker."],
      ["Gravati", 650, "Classic cap-toe in black calfskin. Milan-made, Goodyear welt, leather sole.", "New"],
      ["Artioli", 2100, "Hand-lasted cap-toe in ebony boxcalf. Rare Venetian shoemaker. Collector's piece."],
    ],
  },
  {
    type: "Wingtip Brogue",
    entries: [
      ["Florsheim Imperial", 295, "Kenmoor wingtip in cognac leather. Genuine shell cordovan option available.", "New"],
      ["Mezlan", 395, "Wingtip Oxford in two-tone suede and leather. Spanish craftsmanship, leather sole."],
      ["Rancourt", 345, "Wingtip boot in brown chromexcel. American Goodyear welt, leather insole."],
      ["Oak Street Bootmakers", 325, "Wingtip Oxford in tan calfskin. Chicago-made, Goodyear Welt, leather outsole.", "Featured"],
      ["Paul Bond", 895, "Custom wingtip in exotic ostrich. Handmade in Nogales, AZ. Western luxury."],
    ],
  },
  {
    type: "Double Monk Strap",
    entries: [
      ["Berluti", 1750, "Andy double monk in burnished calf. Scritto patina lining, Berluti sole.", "Featured"],
      ["Maison Margiela", 1150, "Tabi double-monk in black calf. Split-toe construction, stacked heel.", "New"],
      ["Doucal's", 680, "Double monk in cognac deer-suede. Italian soft-construction, Dainite sole."],
      ["Brunello Cucinelli", 1250, "Artisan double monk in dark brown calf. Cucinelli's elevated everyday shoe.", "Limited"],
      ["Valentino", 980, "Rockstud double monk. Tonal studs on strap, smooth calfskin, rubber sole."],
    ],
  },
  {
    type: "Jodhpur Boot",
    entries: [
      ["Ralph Lauren", 595, "Polo jodhpur boot in tan leather. Equestrian heritage, ankle-strap closure.", "Featured"],
      ["Harrys of London", 980, "Luxury jodhpur in hand-burnished calf. Single strap, wooden last.", "New"],
      ["Dior Homme", 1350, "Jodhpur boot in smooth black calfskin. Elevated equestrian for the couture set.", "Limited"],
      ["Paul Harnden", 1650, "Handmade jodhpur in goat leather. Essex-based artisan, singular vision."],
      ["Grenson", 520, "Jodhpur boot in tan calf. Goodyear welt, leather sole. English elegance."],
    ],
  },
  {
    type: "Desert Boot",
    entries: [
      ["Clarks Originals", 145, "Desert Boot in beeswax leather. The original 1949 Nathan Clark design.", "Featured"],
      ["Astorflex", 185, "Bitflex desert boot in dark khaki nubuck. Italian vegetable-tanned leather.", "New"],
      ["Tricker's", 580, "Desert boot in espresso suede. Dainite sole, hand-stitched apron toe."],
      ["Grenson", 445, "Declan desert boot in sand suede. Triple-welt construction, crepe sole."],
      ["Blundstone", 220, "Series 1609 desert boot in rustic brown leather. Australian durable elegance."],
    ],
  },
  {
    type: "Side-Buckle Boot",
    entries: [
      ["Givenchy", 1250, "Side-buckle boot in black calfskin. Squared toe, stacked heel. Paris edge.", "Featured"],
      ["Balmain", 1450, "Ranger buckle boot in black leather. Military influence, heavy sole.", "New"],
      ["Lanvin", 980, "Side-buckle ankle boot in suede. Minimal Lanvin lines, leather sole.", "Limited"],
      ["Alexander McQueen", 1150, "Wander buckle boot in calfskin. Exaggerated sole, structural silhouette."],
      ["Raf Simons", 850, "Redux buckle boot in metallic leather. Archive reference, collector piece."],
    ],
  },
  {
    type: "Moccasin",
    entries: [
      ["Quoddy", 345, "Hand-sewn trail moc in beeswax leather. American Goodyear welt, Vibram sole.", "Featured"],
      ["Rancourt & Co.", 295, "Camp moc in chromexcel leather. Maine-made, hand-sewn, Vibram sole.", "New"],
      ["Minnetonka", 125, "Double-fringe moc in tan suede. Iconic American design since 1946."],
      ["L.L. Bean Signature", 195, "Handsewn moccasin in brown leather. Classic Bean construction, flexible sole."],
      ["Quoddy", 425, "Blucher moc in horween natural chromexcel. Double-welt, leather insole.", "Limited"],
    ],
  },
  {
    type: "Espadrille",
    entries: [
      ["Castañer", 195, "Chiara wedge espadrille in natural jute. Spanish hand-woven jute platform.", "Featured"],
      ["Yves Saint Laurent", 645, "Tribute espadrille in canvas. YSL logo, jute sole, ankle-tie closure.", "New"],
      ["Aquazzura", 545, "Positano flat espadrille in linen canvas. Italian luxury, natural sole.", "Limited"],
      ["Manebí", 245, "Surf espadrille in natural canvas. Barcelona-made, organic jute base."],
      ["Soludos", 135, "Classic espadrille in striped canvas. NYC brand, ethically made in Spain."],
    ],
  },
];

export const menShoesProducts: Product[] = (() => {
  let id = 400;
  const out: Product[] = [];
  shoeTypes.forEach(({ type, entries }, ti) => {
    entries.forEach(([brand, price, desc, tag], bi) => {
      out.push({
        id: id++,
        name: `${brand} — ${type}`,
        category: "Men's Shoes",
        price,
        image: imgs[(ti + bi * 3) % imgs.length],
        description: desc,
        tag,
      });
    });
  });
  return out;
})();
