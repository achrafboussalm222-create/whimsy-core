-- ---------------------------------------------------------------------------
-- Optional: seeds the catalog with 10 starter products (with placeholder
-- photos) so the site isn't empty on day one. Run this in the SQL Editor
-- AFTER running schema.sql. Skip it if you'd rather start from zero and add
-- everything yourself through the admin panel.
-- ---------------------------------------------------------------------------

insert into products (slug, name, category, short_description, description, details, images) values

('crochet-tulip-bouquet', 'Crochet Tulip Bouquet', 'Bouquets',
 'A cheerful bunch of hand-stitched tulips that never wilt.',
 'A cheerful bunch of hand-stitched tulips that never wilt — perfect for brightening any corner of your home. Each tulip is individually crocheted, shaped, and wired onto a soft green stem, then gathered into a bouquet you can arrange in any vase, no water required.',
 ARRAY['Handmade with premium soft-touch acrylic yarn', 'Bouquet stands approx. 30cm tall', 'Wrapped in kraft paper with a linen ribbon', 'Made to order — please allow 3–5 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-tulip-1/900/1100', 'https://picsum.photos/seed/whimsycore-tulip-2/900/1100', 'https://picsum.photos/seed/whimsycore-tulip-3/900/1100']),

('crochet-daisy-bouquet', 'Crochet Daisy Bouquet', 'Bouquets',
 'Soft, sunny daisies looped for an everlasting touch of spring.',
 'Soft, sunny daisies looped one petal at a time for an everlasting touch of spring. This bouquet pairs white and gold tones for a light, airy arrangement that suits any room, any season.',
 ARRAY['Hand-crocheted petals with embroidered centers', 'Bouquet of 5 stems, approx. 28cm tall', 'Reusable fabric wrap included', 'Made to order — please allow 3–5 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-daisy-1/900/1100', 'https://picsum.photos/seed/whimsycore-daisy-2/900/1100', 'https://picsum.photos/seed/whimsycore-daisy-3/900/1100']),

('crochet-sunflower', 'Crochet Sunflower', 'Bouquets',
 'A single statement bloom in warm gold tones.',
 'A single statement bloom in warm gold tones, ready to bring a little sunshine indoors. Displayed alone in a bud vase or added to a mixed arrangement, this oversized sunflower is a lasting favorite.',
 ARRAY['Large single bloom, approx. 12cm wide', 'Sturdy wired stem, 35cm long', 'Rich gold and chestnut yarn palette', 'Made to order — please allow 2–4 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-sunflower-1/900/1100', 'https://picsum.photos/seed/whimsycore-sunflower-2/900/1100', 'https://picsum.photos/seed/whimsycore-sunflower-3/900/1100']),

('crochet-rose-bouquet', 'Crochet Rose Bouquet', 'Bouquets',
 'Delicate layered petals styled into a romantic bouquet.',
 'Delicate layered petals styled into a romantic bouquet that lasts far beyond a single season. A timeless gift for anniversaries, proposals, or simply saying thank you.',
 ARRAY['Hand-layered petals for a realistic bloom shape', 'Bouquet of 6 roses, approx. 32cm tall', 'Available in classic red, blush, or ivory', 'Made to order — please allow 4–6 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-rose-1/900/1100', 'https://picsum.photos/seed/whimsycore-rose-2/900/1100', 'https://picsum.photos/seed/whimsycore-rose-3/900/1100']),

('crochet-lavender-bouquet', 'Crochet Lavender Bouquet', 'Bouquets',
 'Calming lavender sprigs in soft violet hues.',
 'Calming lavender sprigs crocheted in soft violet hues for a touch of quiet elegance. A gentle, understated bouquet that brings a calm, textured accent to any shelf or table.',
 ARRAY['Textured bobble-stitch buds along each sprig', 'Bundle of 7 stems, approx. 26cm tall', 'Tied with natural jute twine', 'Made to order — please allow 3–5 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-lavender-1/900/1100', 'https://picsum.photos/seed/whimsycore-lavender-2/900/1100', 'https://picsum.photos/seed/whimsycore-lavender-3/900/1100']),

('crochet-teddy-bear', 'Crochet Teddy Bear', 'Plushies',
 'A plush, huggable companion stitched with soft yarn.',
 'A plush, huggable companion stitched with soft yarn and even softer love. Generously stuffed and finished with hand-embroidered features, this bear makes a keepsake gift for any age.',
 ARRAY['Approx. 25cm tall, standing', 'Hypoallergenic polyester filling', 'Hand-embroidered face, safety-tested finish', 'Made to order — please allow 5–7 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-teddy-1/900/1100', 'https://picsum.photos/seed/whimsycore-teddy-2/900/1100', 'https://picsum.photos/seed/whimsycore-teddy-3/900/1100']),

('crochet-bunny', 'Crochet Bunny', 'Plushies',
 'A gentle little bunny with floppy ears.',
 'A gentle little bunny with floppy ears, handmade for cuddles and keepsakes alike. Soft, lightweight, and finished with a tiny bow — a sweet addition to a nursery shelf or gift box.',
 ARRAY['Approx. 20cm tall including ears', 'Removable bow, hand-stitched details', 'Hypoallergenic polyester filling', 'Made to order — please allow 5–7 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-bunny-1/900/1100', 'https://picsum.photos/seed/whimsycore-bunny-2/900/1100', 'https://picsum.photos/seed/whimsycore-bunny-3/900/1100']),

('crochet-heart-keychain', 'Crochet Heart Keychain', 'Keychains',
 'A tiny handmade heart to carry with you.',
 'A tiny handmade heart to carry with you — a sweet everyday reminder of someone dear. Clips easily onto keys, bags, or backpacks, and makes a lovely small gift on its own or alongside something bigger.',
 ARRAY['Approx. 5cm heart on a gold-tone clasp', 'Light, durable cotton yarn', 'Available in a range of colors', 'Made to order — please allow 1–3 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-heart-1/900/1100', 'https://picsum.photos/seed/whimsycore-heart-2/900/1100', 'https://picsum.photos/seed/whimsycore-heart-3/900/1100']),

('crochet-flower-basket', 'Crochet Flower Basket', 'Gifts',
 'An arrangement of mixed blooms nestled in a woven basket.',
 'An arrangement of mixed blooms nestled in a woven basket, perfect for gifting as-is. A ready-made centerpiece that combines several of our signature flowers in one easy, giftable piece.',
 ARRAY['Handwoven basket, approx. 18cm wide', 'Mixed arrangement of 8–10 blooms', 'Arrives ready to display, no assembly needed', 'Made to order — please allow 5–7 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-basket-1/900/1100', 'https://picsum.photos/seed/whimsycore-basket-2/900/1100', 'https://picsum.photos/seed/whimsycore-basket-3/900/1100']),

('crochet-gift-box', 'Crochet Gift Box', 'Gifts',
 'A curated little box of crochet delights.',
 'A curated little box of crochet delights, wrapped and ready for someone special. We hand-select a small mix of our pieces — think a mini bloom, a keychain, and a small surprise — packaged in a keepsake box.',
 ARRAY['Curated box contents vary seasonally', 'Wrapped in tissue with a handwritten note', 'Great for birthdays and thank-you gifts', 'Made to order — please allow 5–7 days'],
 ARRAY['https://picsum.photos/seed/whimsycore-giftbox-1/900/1100', 'https://picsum.photos/seed/whimsycore-giftbox-2/900/1100', 'https://picsum.photos/seed/whimsycore-giftbox-3/900/1100']);
