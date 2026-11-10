export type SizeOption = {
  id: string;
  label: string;
  grams: number;
  price: number;
  courierNote: string;
};

export const sizeOptions: SizeOption[] = [
  { id: "100g", label: "100 g", grams: 100, price: 75, courierNote: "+ courier" },
  { id: "250g", label: "250 g", grams: 250, price: 150, courierNote: "+ courier" },
  { id: "500g", label: "500 g", grams: 500, price: 300, courierNote: "+ courier" },
  { id: "1kg", label: "1 kg / 1000 g", grams: 1000, price: 600, courierNote: "+ courier charges" },
];

export type IngredientItem = {
  name: string;
  note?: string;
};

export type Product = {
  id: number;
  name: string;
  category: string;
  benefits: string;
  image: string;
  description: string;
  ingredients: string;
  ingredientItems?: IngredientItem[];
  usage: string;
  shelfLife: string;
  certification: string;
  rating: number;
  reviews: number;
  isBestSeller: boolean;
};

export function getIngredientItems(product: Product): IngredientItem[] {
  if (product.ingredientItems?.length) return product.ingredientItems;
  return product.ingredients
    .split(",")
    .map((name) => ({ name: name.trim() }))
    .filter((item) => item.name.length > 0);
}

export const products: Product[] = [
  {
    id: 1,
    name: "Bavapriya Facial Powder",
    category: "face pack",
    benefits: "Traditional herbal glow, everyday self-care ritual",
    image: "https://i.pinimg.com/736x/4d/00/1c/4d001c84470bce9f13c034a05399eab3.jpg",
    description:
      "Bavapriya Facial Powder brings together traditional Indian herbal wisdom and botanical ingredients for a simple, natural face ritual. Mix with rose water, curd, or honey according to your skin — never as a one-size-fits-all paste.",
    ingredients:
      "Green gram, wild turmeric, sandalwood, dried rose petals, neem, tulsi, orange peel",
    ingredientItems: [
      { name: "Green gram (moong)", note: "A gentle everyday cleanse" },
      { name: "Wild turmeric", note: "Traditional glow in the herbal base" },
      { name: "Sandalwood", note: "Cooling, calming botanical" },
      { name: "Dried rose petals", note: "A soothing floral note" },
      { name: "Neem", note: "Clarifying herbal leaf" },
      { name: "Tulsi", note: "Everyday herbal balance" },
      { name: "Orange peel", note: "Light freshness in the blend" },
    ],
    usage:
      "Take 1–2 teaspoons of powder. Mix with rose water (and curd or honey if suited to your skin) into a smooth paste. Apply evenly, avoiding eyes and lips. Leave for 10–15 minutes. Do not let it dry completely tight. Rinse gently and pat dry.",
    shelfLife: "12 months from date of manufacture, if stored dry",
    certification: "Handmade • Natural • No harsh chemicals",
    rating: 4.2,
    reviews: 186,
    isBestSeller: true,
  },
  {
    id: 2,
    name: "Turmeric Face Pack",
    category: "face pack",
    benefits: "Brightens skin, traditional glow ritual",
    image: "https://i.pinimg.com/474x/be/52/f4/be52f43cf114b93d0013c2f9c64b10ba.jpg",
    description:
      "A turmeric-forward herbal pack rooted in everyday Indian self-care. Best prepared according to your skin type — lemon is never a default ingredient.",
    ingredients: "Turmeric, sandalwood, herbal powders",
    usage:
      "Mix with rose water or curd. Apply for 10–15 minutes. Rinse gently. Patch test before first use.",
    shelfLife: "12 months",
    certification: "Natural blend",
    rating: 4.2,
    reviews: 87,
    isBestSeller: false,
  },
  {
    id: 3,
    name: "Herbal Face Pack",
    category: "face pack",
    benefits: "Gentle cleanse, natural everyday ritual",
    image: "https://i.pinimg.com/736x/6d/f4/72/6df4720fc4e18483489b8fdff857e08f.jpg",
    description:
      "A balanced herbal face pack for those who want a simple, trustworthy ritual without complicated routines.",
    ingredients: "Neem, tulsi, botanical clays, herbal powders",
    ingredientItems: [
      { name: "Neem", note: "Clarifying leaf in the pack" },
      { name: "Tulsi", note: "Everyday herbal balance" },
      { name: "Botanical clays", note: "A gentle mineral base" },
      { name: "Herbal powders", note: "Traditional kitchen botanicals" },
    ],
    usage: "Mix with rose water. Apply an even layer. Leave 10–15 minutes. Rinse and pat dry.",
    shelfLife: "12 months",
    certification: "Natural blend",
    rating: 4.3,
    reviews: 102,
    isBestSeller: false,
  },
  {
    id: 4,
    name: "Herbal Ubtan Pack",
    category: "face pack",
    benefits: "Traditional ubtan, soft glow",
    image: "https://i.pinimg.com/736x/42/27/96/422796a4cf6404e4e365c802aeac0192.jpg",
    description:
      "A traditional ubtan-style blend for a weekly glow ritual. Prepare it richer or lighter depending on how your skin feels that day.",
    ingredients: "Turmeric, rose petals, sandalwood, chickpea flour",
    usage: "Mix with rose water or a little curd. Use as a weekly face ritual.",
    shelfLife: "12 months",
    certification: "Handmade and natural",
    rating: 4.4,
    reviews: 98,
    isBestSeller: true,
  },
  {
    id: 5,
    name: "Sandalwood Nalangu Maavu",
    category: "nalangu mavu",
    benefits: "Cooling effect, traditional body ritual",
    image: "https://i.pinimg.com/736x/1f/6f/fe/1f6ffeffb0f0e75f6a368716783c2060.jpg",
    description:
      "A cooling nalangu maavu with sandalwood for festive and everyday body care, in the spirit of traditional Tamil self-care.",
    ingredients: "Sandalwood, vetiver, rose powder, wild turmeric",
    usage: "Apply on damp skin, gently massage, and rinse. Store away from moisture.",
    shelfLife: "12 months",
    certification: "Handmade and natural",
    rating: 4.2,
    reviews: 76,
    isBestSeller: true,
  },
  {
    id: 6,
    name: "Bavapriya Herbal Bath Powder",
    category: "bath powder",
    benefits: "Soap-free cleanse, natural fragrance",
    image: "https://i.pinimg.com/736x/86/c9/4d/86c94ddd04322d22555c766d5d0c6484.jpg",
    description:
      "A herbal bath powder meant to replace harsh soaps with a gentler, traditional cleanse. Mix with water and use on damp skin.",
    ingredients: "Green gram, rose petals, orange peel, neem leaves",
    usage:
      "Take a small amount, mix with water into a paste, and use in place of soap. Rinse well. Keep the powder strictly dry.",
    shelfLife: "12 months",
    certification: "Natural and preservative-conscious",
    rating: 4.2,
    reviews: 61,
    isBestSeller: false,
  },
  {
    id: 7,
    name: "Ayurvedic Bath Powder",
    category: "bath powder",
    benefits: "Daily herbal bath, soft skin",
    image: "https://i.pinimg.com/736x/28/af/6e/28af6e60961df70f1bcaacaa7eab9b6e.jpg",
    description:
      "An everyday ayurvedic bathing powder to cleanse without stripping the skin. Suitable as part of a simple daily ritual.",
    ingredients: "Vetiver, sandalwood, tulsi, amla, reetha",
    usage: "Mix with water before applying. Ideal for regular bathing. Store in an airtight container.",
    shelfLife: "12 months",
    certification: "Traditional herbal blend",
    rating: 4.2,
    reviews: 55,
    isBestSeller: false,
  },
  {
    id: 8,
    name: "Herbal Holi Colour Powder",
    category: "holi colors",
    benefits: "Chemical-free, skin-friendly play",
    image: "https://i.pinimg.com/736x/eb/32/28/eb3228ee69ef5c129e7c85f1f9794e19.jpg",
    description:
      "Skin-friendlier festive colours inspired by botanicals — a joyful, less harsh way to celebrate.",
    ingredients: "Plant-based colourants, herbal powders",
    usage: "Use during celebrations. Wash promptly after play. Not a skincare treatment.",
    shelfLife: "12 months",
    certification: "Botanical colour blend",
    rating: 4.5,
    reviews: 143,
    isBestSeller: true,
  },
];

export const startingPrice = sizeOptions[0].price;

/** The two signature products shown on the homepage. */
export const FEATURED_PRODUCT_IDS = [1, 3] as const;

export function getFeaturedProducts() {
  return FEATURED_PRODUCT_IDS.map((id) => {
    const product = products.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Featured product ${id} is missing from the catalogue.`);
    }
    return product;
  });
}

export function formatPrice(price: number, courierNote: string) {
  return `₹${price} ${courierNote}`;
}
