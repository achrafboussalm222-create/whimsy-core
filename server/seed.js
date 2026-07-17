const img = (seed, n) => `https://picsum.photos/seed/whimsycore-${seed}-${n}/900/1100`;

export const seedProducts = [
  {
    id: "1",
    slug: "crochet-tulip-bouquet",
    name: "Crochet Tulip Bouquet",
    category: "Bouquets",
    shortDescription: "A cheerful bunch of hand-stitched tulips that never wilt.",
    description:
      "A cheerful bunch of hand-stitched tulips that never wilt — perfect for brightening any corner of your home. Each tulip is individually crocheted, shaped, and wired onto a soft green stem, then gathered into a bouquet you can arrange in any vase, no water required.",
    details: [
      "Handmade with premium soft-touch acrylic yarn",
      "Bouquet stands approx. 30cm tall",
      "Wrapped in kraft paper with a linen ribbon",
      "Made to order — please allow 3–5 days",
    ],
    images: [img("tulip", 1), img("tulip", 2), img("tulip", 3)],
  },
  {
    id: "2",
    slug: "crochet-daisy-bouquet",
    name: "Crochet Daisy Bouquet",
    category: "Bouquets",
    shortDescription: "Soft, sunny daisies looped for an everlasting touch of spring.",
    description:
      "Soft, sunny daisies looped one petal at a time for an everlasting touch of spring. This bouquet pairs white and gold tones for a light, airy arrangement that suits any room, any season.",
    details: [
      "Hand-crocheted petals with embroidered centers",
      "Bouquet of 5 stems, approx. 28cm tall",
      "Reusable fabric wrap included",
      "Made to order — please allow 3–5 days",
    ],
    images: [img("daisy", 1), img("daisy", 2), img("daisy", 3)],
  },
  {
    id: "3",
    slug: "crochet-sunflower",
    name: "Crochet Sunflower",
    category: "Bouquets",
    shortDescription: "A single statement bloom in warm gold tones.",
    description:
      "A single statement bloom in warm gold tones, ready to bring a little sunshine indoors. Displayed alone in a bud vase or added to a mixed arrangement, this oversized sunflower is a lasting favorite.",
    details: [
      "Large single bloom, approx. 12cm wide",
      "Sturdy wired stem, 35cm long",
      "Rich gold and chestnut yarn palette",
      "Made to order — please allow 2–4 days",
    ],
    images: [img("sunflower", 1), img("sunflower", 2), img("sunflower", 3)],
  },
  {
    id: "4",
    slug: "crochet-rose-bouquet",
    name: "Crochet Rose Bouquet",
    category: "Bouquets",
    shortDescription: "Delicate layered petals styled into a romantic bouquet.",
    description:
      "Delicate layered petals styled into a romantic bouquet that lasts far beyond a single season. A timeless gift for anniversaries, proposals, or simply saying thank you.",
    details: [
      "Hand-layered petals for a realistic bloom shape",
      "Bouquet of 6 roses, approx. 32cm tall",
      "Available in classic red, blush, or ivory",
      "Made to order — please allow 4–6 days",
    ],
    images: [img("rose", 1), img("rose", 2), img("rose", 3)],
  },
  {
    id: "5",
    slug: "crochet-lavender-bouquet",
    name: "Crochet Lavender Bouquet",
    category: "Bouquets",
    shortDescription: "Calming lavender sprigs in soft violet hues.",
    description:
      "Calming lavender sprigs crocheted in soft violet hues for a touch of quiet elegance. A gentle, understated bouquet that brings a calm, textured accent to any shelf or table.",
    details: [
      "Textured bobble-stitch buds along each sprig",
      "Bundle of 7 stems, approx. 26cm tall",
      "Tied with natural jute twine",
      "Made to order — please allow 3–5 days",
    ],
    images: [img("lavender", 1), img("lavender", 2), img("lavender", 3)],
  },
  {
    id: "6",
    slug: "crochet-teddy-bear",
    name: "Crochet Teddy Bear",
    category: "Plushies",
    shortDescription: "A plush, huggable companion stitched with soft yarn.",
    description:
      "A plush, huggable companion stitched with soft yarn and even softer love. Generously stuffed and finished with hand-embroidered features, this bear makes a keepsake gift for any age.",
    details: [
      "Approx. 25cm tall, standing",
      "Hypoallergenic polyester filling",
      "Hand-embroidered face, safety-tested finish",
      "Made to order — please allow 5–7 days",
    ],
    images: [img("teddy", 1), img("teddy", 2), img("teddy", 3)],
  },
  {
    id: "7",
    slug: "crochet-bunny",
    name: "Crochet Bunny",
    category: "Plushies",
    shortDescription: "A gentle little bunny with floppy ears.",
    description:
      "A gentle little bunny with floppy ears, handmade for cuddles and keepsakes alike. Soft, lightweight, and finished with a tiny bow — a sweet addition to a nursery shelf or gift box.",
    details: [
      "Approx. 20cm tall including ears",
      "Removable bow, hand-stitched details",
      "Hypoallergenic polyester filling",
      "Made to order — please allow 5–7 days",
    ],
    images: [img("bunny", 1), img("bunny", 2), img("bunny", 3)],
  },
  {
    id: "8",
    slug: "crochet-heart-keychain",
    name: "Crochet Heart Keychain",
    category: "Keychains",
    shortDescription: "A tiny handmade heart to carry with you.",
    description:
      "A tiny handmade heart to carry with you — a sweet everyday reminder of someone dear. Clips easily onto keys, bags, or backpacks, and makes a lovely small gift on its own or alongside something bigger.",
    details: [
      "Approx. 5cm heart on a gold-tone clasp",
      "Light, durable cotton yarn",
      "Available in a range of colors",
      "Made to order — please allow 1–3 days",
    ],
    images: [img("heart", 1), img("heart", 2), img("heart", 3)],
  },
  {
    id: "9",
    slug: "crochet-flower-basket",
    name: "Crochet Flower Basket",
    category: "Gifts",
    shortDescription: "An arrangement of mixed blooms nestled in a woven basket.",
    description:
      "An arrangement of mixed blooms nestled in a woven basket, perfect for gifting as-is. A ready-made centerpiece that combines several of our signature flowers in one easy, giftable piece.",
    details: [
      "Handwoven basket, approx. 18cm wide",
      "Mixed arrangement of 8–10 blooms",
      "Arrives ready to display, no assembly needed",
      "Made to order — please allow 5–7 days",
    ],
    images: [img("basket", 1), img("basket", 2), img("basket", 3)],
  },
  {
    id: "10",
    slug: "crochet-gift-box",
    name: "Crochet Gift Box",
    category: "Gifts",
    shortDescription: "A curated little box of crochet delights.",
    description:
      "A curated little box of crochet delights, wrapped and ready for someone special. We hand-select a small mix of our pieces — think a mini bloom, a keychain, and a small surprise — packaged in a keepsake box.",
    details: [
      "Curated box contents vary seasonally",
      "Wrapped in tissue with a handwritten note",
      "Great for birthdays and thank-you gifts",
      "Made to order — please allow 5–7 days",
    ],
    images: [img("giftbox", 1), img("giftbox", 2), img("giftbox", 3)],
  },
];
