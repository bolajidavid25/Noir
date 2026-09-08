import { products } from "./products.js";
import type { Product } from "./products.js";

type ItemTuple = [name: string, price: number, desc: string, tag?: string];
type BrandConfig = { b: string; items: ItemTuple[] };

export function gen(
  startId: number,
  category: string,
  images: string[],
  brands: BrandConfig[]
): Product[] {
  let id = startId;
  const out: Product[] = [];
  brands.forEach((brand, bi) => {
    brand.items.forEach(([name, price, desc, tag], ii) => {
      out.push({
        id: id++,
        name: `${brand.b} — ${name}`,
        category,
        price,
        image: images[(bi * 3 + ii * 2) % images.length],
        description: desc,
        tag,
      });
    });
  });
  return out;
}
