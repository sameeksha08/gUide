// ===== SANITARIUM PRODUCTS (always shown first) =====
const SANITARIUM_PRODUCTS = {
  crushIt: {
    id: 'crush_it',
    name: 'Hunger Crushing Combo — "Crush It"',
    emoji: '💪',
    brand: 'Sanitarium',
    why: 'High plant protein to crush hunger & fuel your day',
    tags: ['plant-protein', 'hunger-crushing', 'vegetarian'],
    time: '2 min',
    isSanitarium: true,
    recipe: {
      ingredients: [
        { text: 'Sanitarium Hunger Crushing Shake "Crush It" (1 serve)', sanitarium: true },
        { text: '1 frozen banana' },
        { text: '1 cup oat milk or soy milk' },
        { text: '1 tbsp almond butter' },
        { text: 'handful of ice' },
        { text: '½ tsp cinnamon' },
      ],
      steps: [
        'Add all ingredients to a blender.',
        'Blend on high for 30–45 seconds until smooth and creamy.',
        'Pour into a glass and drink immediately for best texture.',
        'Optional: top with a sprinkle of cinnamon or a few cacao nibs.',
      ],
      note: 'The Sanitarium Crush It shake provides 30g plant protein per serve — enough to genuinely crush hunger for hours.',
    },
  },
  vegieDelights: [
    {
      id: 'vd_burger',
      name: 'Vegie Delights Burger with Slaw',
      emoji: '🌿',
      brand: 'Sanitarium',
      why: 'Plant-based protein from Vegie Delights — familiar flavour, real nutrition',
      tags: ['plant-protein', 'vegie-delights', 'quick'],
      time: '15 min',
      isSanitarium: true,
      recipe: {
        ingredients: [
          { text: 'Sanitarium Vegie Delights Not Burger (1–2 patties)', sanitarium: true },
          { text: '2 wholegrain burger buns' },
          { text: '½ cup shredded red cabbage' },
          { text: '1 carrot, grated' },
          { text: '2 tbsp Greek yoghurt or vegan mayo' },
          { text: '1 tsp apple cider vinegar' },
          { text: 'lettuce, tomato, pickles' },
        ],
        steps: [
          'Cook Vegie Delights patties per packet instructions (pan or air fryer, 4–5 min each side).',
          'Mix cabbage, carrot, yoghurt, and vinegar for quick slaw.',
          'Toast buns lightly.',
          'Layer lettuce, patty, slaw, tomato and pickles. Serve immediately.',
        ],
        note: 'Vegie Delights patties are made by Sanitarium — Australian plant-based protein since 1898.',
      },
    },
    {
      id: 'vd_sausage',
      name: 'Vegie Delights Sausage & Roast Veg Bowl',
      emoji: '🥦',
      brand: 'Sanitarium',
      why: 'Vegie Delights plant sausages — easy weeknight protein',
      tags: ['plant-protein', 'vegie-delights', 'meal-prep'],
      time: '30 min',
      isSanitarium: true,
      recipe: {
        ingredients: [
          { text: 'Sanitarium Vegie Delights Sausages (3–4)', sanitarium: true },
          { text: '1 cup pumpkin, cubed' },
          { text: '1 zucchini, sliced' },
          { text: '1 red capsicum, sliced' },
          { text: '2 tbsp olive oil' },
          { text: '1 tsp smoked paprika' },
          { text: '½ cup cooked quinoa or brown rice' },
          { text: 'fresh parsley, lemon to serve' },
        ],
        steps: [
          'Preheat oven to 200°C. Toss pumpkin, zucchini, and capsicum in olive oil and paprika.',
          'Roast veg for 20–25 min until golden.',
          'Meanwhile, cook Vegie Delights sausages in a pan, 8–10 min turning regularly.',
          'Serve over quinoa or brown rice with roast veg. Squeeze lemon, top with parsley.',
        ],
        note: 'Sanitarium Vegie Delights have been fuelling Australians with plant protein for over 125 years.',
      },
    },
  ],
};

// ===== VEGETARIAN MEAL DATABASE =====
// ALL meals are vegetarian — no meat included
const MEAL_DB = {
  iron: [
    { name: 'Spinach & Chickpea Curry', emoji: '🍛', cultural: ['south_asian', 'middle_eastern', 'any'], tags: ['iron-rich', 'vegetarian'], time: '25 min',
      recipe: { ingredients: [{ text: '1 can chickpeas, drained' }, { text: '3 cups baby spinach' }, { text: '1 can diced tomatoes' }, { text: '1 tsp cumin, coriander, turmeric' }, { text: '1 onion, diced' }, { text: '2 garlic cloves' }, { text: '1 tbsp olive oil' }, { text: 'salt to taste' }], steps: ['Sauté onion and garlic in oil until soft, 3–4 min.', 'Add spices and cook 1 min. Add tomatoes and chickpeas.', 'Simmer 15 min. Stir in spinach until wilted.', 'Serve with rice or flatbread.'] } },
    { name: 'Lentil & Kale Soup', emoji: '🍲', cultural: ['mediterranean', 'any'], tags: ['iron', 'warming', 'gut-friendly'], time: '30 min',
      recipe: { ingredients: [{ text: '1 cup red lentils' }, { text: '2 cups kale, chopped' }, { text: '1 can diced tomatoes' }, { text: '4 cups vegetable stock' }, { text: '1 tsp cumin, paprika' }, { text: '1 lemon, juiced' }], steps: ['Simmer lentils in stock 15 min.', 'Add tomatoes, kale, and spices.', 'Cook 10 more min. Finish with lemon juice.'] } },
    { name: 'Tofu & Edamame Noodle Bowl', emoji: '🍜', cultural: ['east_asian', 'any'], tags: ['iron-rich', 'plant-protein'], time: '20 min',
      recipe: { ingredients: [{ text: '200g firm tofu, cubed' }, { text: '1 cup edamame' }, { text: '150g soba noodles' }, { text: '2 tbsp soy sauce' }, { text: '1 tsp sesame oil' }, { text: 'spring onion, sesame seeds' }], steps: ['Cook noodles per packet. Pan-fry tofu until golden.', 'Toss noodles, tofu, edamame with soy sauce and sesame oil.', 'Top with spring onion and sesame seeds.'] } },
  ],
  protein: [
    { name: 'Greek Yoghurt & Seed Power Bowl', emoji: '🥣', cultural: ['mediterranean', 'any'], tags: ['high-protein', 'easy', 'breakfast'], time: '5 min',
      recipe: { ingredients: [{ text: '1 cup Greek yoghurt (full fat)' }, { text: '2 tbsp mixed seeds (pumpkin, sunflower, flax)' }, { text: '1 tbsp nut butter' }, { text: '½ cup berries' }, { text: 'drizzle of honey' }], steps: ['Spoon yoghurt into bowl.', 'Top with seeds, nut butter, berries.', 'Drizzle honey. Eat immediately.'] } },
    { name: 'Lentil & Paneer Bowl', emoji: '🫘', cultural: ['south_asian', 'any'], tags: ['vegetarian-protein', 'iron'], time: '20 min',
      recipe: { ingredients: [{ text: '200g paneer, cubed' }, { text: '1 cup cooked lentils' }, { text: '1 tsp garam masala' }, { text: '1 tsp turmeric' }, { text: 'cherry tomatoes, spinach' }, { text: '1 tbsp olive oil' }], steps: ['Pan-fry paneer until golden on all sides.', 'Toss with lentils, spices, tomatoes, spinach.', 'Serve warm with yoghurt.'] } },
    { name: 'Eggs & Avocado Toast', emoji: '🥑', cultural: ['any'], tags: ['quick-protein', 'breakfast'], time: '10 min',
      recipe: { ingredients: [{ text: '2 eggs (poached or fried)' }, { text: '1 ripe avocado' }, { text: '2 slices wholegrain bread' }, { text: 'lemon juice, chilli flakes' }, { text: 'salt and pepper' }], steps: ['Toast bread. Mash avocado with lemon, salt, pepper.', 'Cook eggs to your liking.', 'Spread avocado, top with eggs and chilli flakes.'] } },
  ],
  energy: [
    { name: 'Overnight Oats with Banana & Nut Butter', emoji: '🌾', cultural: ['any'], tags: ['slow-release', 'prep-ahead'], time: '5 min + overnight',
      recipe: { ingredients: [{ text: '½ cup rolled oats' }, { text: '½ cup oat milk' }, { text: '¼ cup Greek yoghurt' }, { text: '1 banana, sliced' }, { text: '1 tbsp almond butter' }, { text: '1 tsp chia seeds' }], steps: ['Mix oats, milk, yoghurt, chia seeds in a jar.', 'Refrigerate overnight.', 'Top with banana and almond butter in the morning.'] } },
    { name: 'Sweet Potato & Black Bean Tacos', emoji: '🌮', cultural: ['latin', 'any'], tags: ['complex-carbs', 'fibre', 'plant-protein'], time: '25 min',
      recipe: { ingredients: [{ text: '1 large sweet potato, cubed' }, { text: '1 can black beans, drained' }, { text: '1 tsp cumin, smoked paprika' }, { text: '4 small corn tortillas' }, { text: 'salsa, avocado, lime' }, { text: 'coriander leaves' }], steps: ['Roast sweet potato at 200°C for 20 min.', 'Warm black beans with cumin and paprika.', 'Fill tortillas with potato, beans. Top with salsa, avocado, lime.'] } },
    { name: 'Mango & Coconut Smoothie Bowl', emoji: '🥭', cultural: ['pacific', 'latin', 'any'], tags: ['quick-energy', 'refreshing'], time: '10 min',
      recipe: { ingredients: [{ text: '1 cup frozen mango' }, { text: '½ cup coconut milk' }, { text: '½ banana' }, { text: 'granola, fresh fruit, coconut flakes to top' }], steps: ['Blend mango, coconut milk, banana until thick.', 'Pour into bowl. Top with granola, fruit, coconut.'] } },
  ],
  gut: [
    { name: 'Miso Soup & Steamed Greens', emoji: '🍵', cultural: ['east_asian'], tags: ['probiotic', 'gut-healing'], time: '10 min',
      recipe: { ingredients: [{ text: '2 tbsp white miso paste' }, { text: '2 cups water' }, { text: '100g silken tofu, cubed' }, { text: '1 sheet nori, cut into strips' }, { text: '1 cup bok choy or broccolini' }, { text: '1 tsp sesame oil' }], steps: ['Dissolve miso in hot (not boiling) water.', 'Add tofu and nori. Steam greens separately.', 'Serve miso with greens alongside, drizzle sesame oil.'] } },
    { name: 'Dal Tadka', emoji: '🫘', cultural: ['south_asian'], tags: ['fibre-rich', 'gut-friendly', 'protein'], time: '30 min',
      recipe: { ingredients: [{ text: '1 cup yellow lentils (moong or toor)' }, { text: '1 tsp turmeric' }, { text: '1 tsp cumin seeds' }, { text: '2 garlic cloves, minced' }, { text: '1 green chilli (optional)' }, { text: '1 tsp ghee or oil' }, { text: 'fresh coriander' }], steps: ['Boil lentils with turmeric and water until soft, 20 min.', 'In a separate pan, heat ghee, add cumin seeds until they pop.', 'Add garlic and chilli, cook 1 min. Pour over dal.', 'Top with fresh coriander. Serve with rice or roti.'] } },
    { name: 'Kefir & Berry Parfait', emoji: '🍓', cultural: ['any'], tags: ['probiotic', 'easy', 'breakfast'], time: '5 min',
      recipe: { ingredients: [{ text: '1 cup kefir (plain)' }, { text: '½ cup mixed berries' }, { text: '¼ cup granola' }, { text: '1 tbsp honey or maple syrup' }, { text: '1 tsp vanilla extract' }], steps: ['Layer kefir in a glass or bowl.', 'Add berries and granola.', 'Drizzle honey and vanilla.'] } },
  ],
  hormonal: [
    { name: 'Flaxseed & Blueberry Smoothie', emoji: '🫐', cultural: ['any'], tags: ['oestrogen-balance', 'seed-cycling'], time: '5 min',
      recipe: { ingredients: [{ text: '2 tbsp ground flaxseed' }, { text: '1 cup frozen blueberries' }, { text: '1 banana' }, { text: '1 cup oat milk' }, { text: '1 tbsp almond butter' }], steps: ['Blend all ingredients until smooth.', 'Drink immediately — ground flax loses potency quickly.'] } },
    { name: 'Avocado & Pumpkin Seed Toast', emoji: '🥑', cultural: ['any'], tags: ['zinc', 'seed-cycling', 'hormones'], time: '10 min',
      recipe: { ingredients: [{ text: '1 avocado' }, { text: '2 tbsp pumpkin seeds (pepitas)' }, { text: '2 slices sourdough' }, { text: 'lemon juice, chilli flakes' }, { text: 'feta or goats cheese (optional)' }], steps: ['Toast bread. Mash avocado with lemon.', 'Spread on toast. Top with pumpkin seeds, chilli, feta.'] } },
    { name: 'Edamame & Soy Stir-Fry', emoji: '🥦', cultural: ['east_asian'], tags: ['phytoestrogens', 'hormonal', 'quick'], time: '15 min',
      recipe: { ingredients: [{ text: '1 cup edamame (shelled)' }, { text: '2 cups mixed veg (broccoli, snow peas, carrot)' }, { text: '2 tbsp soy sauce or tamari' }, { text: '1 tsp ginger, grated' }, { text: '1 tsp sesame oil' }, { text: 'cooked rice or noodles' }], steps: ['Heat sesame oil in wok. Add ginger.', 'Stir-fry veg on high heat 4–5 min.', 'Add edamame and soy sauce. Toss 2 more min.', 'Serve over rice or noodles.'] } },
  ],
  sleep: [
    { name: 'Warm Turmeric Milk (Haldi Doodh)', emoji: '🥛', cultural: ['south_asian', 'any'], tags: ['anti-inflammatory', 'sleep', 'calming'], time: '5 min',
      recipe: { ingredients: [{ text: '1 cup oat or almond milk' }, { text: '½ tsp turmeric' }, { text: '¼ tsp cinnamon' }, { text: 'pinch of black pepper' }, { text: '1 tsp honey' }], steps: ['Warm milk in a small saucepan.', 'Whisk in turmeric, cinnamon, pepper.', 'Pour into mug, stir in honey. Drink 30 min before bed.'] } },
    { name: 'Tart Cherry & Almond Oats', emoji: '🍒', cultural: ['any'], tags: ['melatonin', 'sleep-boost'], time: '10 min',
      recipe: { ingredients: [{ text: '½ cup rolled oats' }, { text: '1 cup oat milk' }, { text: '¼ cup tart cherries (fresh or frozen)' }, { text: '1 tbsp almond butter' }, { text: 'pinch of cinnamon' }], steps: ['Cook oats in milk on low heat 5 min.', 'Top with cherries, almond butter, cinnamon.', 'Eat as a light dinner or evening snack.'] } },
  ],
  stress: [
    { name: 'Ashwagandha Golden Latte', emoji: '☕', cultural: ['south_asian', 'any'], tags: ['adaptogen', 'stress', 'cortisol'], time: '5 min',
      recipe: { ingredients: [{ text: '1 cup oat milk' }, { text: '½ tsp ashwagandha powder' }, { text: '½ tsp turmeric' }, { text: '¼ tsp cinnamon' }, { text: '1 tsp maple syrup' }, { text: 'pinch of cardamom' }], steps: ['Warm oat milk gently.', 'Whisk in all powders and sweetener.', 'Pour into mug. Sip slowly.'] } },
    { name: 'Blueberry & Spinach Brain Smoothie', emoji: '🫐', cultural: ['any'], tags: ['antioxidants', 'brain', 'mood'], time: '5 min',
      recipe: { ingredients: [{ text: '1 cup frozen blueberries' }, { text: '1 cup baby spinach' }, { text: '1 banana' }, { text: '1 cup almond milk' }, { text: '1 tbsp chia seeds' }, { text: '1 tsp honey' }], steps: ['Blend all until smooth.', 'Add ice if desired. Drink immediately.'] } },
  ],
  south_asian: [
    { name: 'Masoor Dal & Roti', emoji: '🫓', cultural: ['south_asian'], tags: ['protein', 'iron', 'comfort'], time: '25 min',
      recipe: { ingredients: [{ text: '1 cup red lentils (masoor dal)' }, { text: '1 tsp cumin, turmeric, garam masala' }, { text: '1 tomato, diced' }, { text: '1 onion, diced' }, { text: '2 garlic cloves' }, { text: '1 tbsp ghee or oil' }, { text: 'fresh coriander, roti to serve' }], steps: ['Boil lentils until soft, 15 min.', 'Fry onion and garlic in ghee. Add spices and tomato.', 'Mix into lentils. Simmer 5 min.', 'Serve with roti and fresh coriander.'] } },
    { name: 'Saag Paneer', emoji: '🌿', cultural: ['south_asian'], tags: ['iron', 'calcium', 'vegetarian'], time: '30 min',
      recipe: { ingredients: [{ text: '200g paneer, cubed' }, { text: '4 cups spinach (saag)' }, { text: '1 tsp cumin, garam masala, turmeric' }, { text: '1 onion, 2 garlic cloves, 1 tsp ginger' }, { text: '2 tbsp cream or yoghurt' }, { text: '1 tbsp ghee' }], steps: ['Blanch spinach, blend roughly.', 'Fry paneer until golden. Set aside.', 'Sauté onion, garlic, ginger with spices.', 'Add spinach purée and paneer. Stir in cream. Simmer 5 min.'] } },
  ],
  east_asian: [
    { name: 'Congee with Ginger & Tofu', emoji: '🍚', cultural: ['east_asian'], tags: ['gut-healing', 'warming', 'gentle'], time: '35 min',
      recipe: { ingredients: [{ text: '½ cup short grain rice' }, { text: '4 cups vegetable stock' }, { text: '100g silken tofu, cubed' }, { text: '1 tbsp ginger, grated' }, { text: 'spring onion, soy sauce, sesame oil' }], steps: ['Simmer rice in stock 30 min, stirring occasionally until thick.', 'Add ginger and tofu in last 5 min.', 'Serve topped with spring onion, a dash of soy, sesame oil.'] } },
    { name: 'Sesame Soba Noodle Bowl', emoji: '🍜', cultural: ['east_asian'], tags: ['quick', 'energising', 'plant-protein'], time: '15 min',
      recipe: { ingredients: [{ text: '150g soba noodles' }, { text: '1 cup edamame' }, { text: '1 cucumber, sliced' }, { text: '2 tbsp tahini or sesame paste' }, { text: '1 tbsp soy sauce' }, { text: '1 tsp rice vinegar, sesame oil' }, { text: 'sesame seeds' }], steps: ['Cook soba noodles per packet, rinse cold.', 'Mix tahini, soy sauce, vinegar, sesame oil into dressing.', 'Toss noodles, edamame, cucumber in dressing.', 'Top with sesame seeds.'] } },
  ],
  middle_eastern: [
    { name: 'Shakshuka', emoji: '🍳', cultural: ['middle_eastern', 'mediterranean'], tags: ['iron', 'protein', 'one-pan'], time: '20 min',
      recipe: { ingredients: [{ text: '4 eggs' }, { text: '1 can diced tomatoes' }, { text: '1 red capsicum, diced' }, { text: '1 tsp cumin, paprika, chilli' }, { text: '1 onion, 2 garlic cloves' }, { text: 'feta cheese, fresh parsley' }, { text: '1 tbsp olive oil' }], steps: ['Sauté onion and capsicum in oil.', 'Add garlic and spices, cook 1 min. Add tomatoes.', 'Simmer 10 min. Make wells, crack eggs in.', 'Cover and cook until whites are set. Top with feta and parsley.'] } },
    { name: 'Fattoush & Falafel Bowl', emoji: '🥗', cultural: ['middle_eastern'], tags: ['plant-protein', 'fresh', 'fibre'], time: '20 min',
      recipe: { ingredients: [{ text: '4 store-bought or homemade falafels' }, { text: 'cos lettuce, tomato, cucumber, radish' }, { text: '1 wholemeal pita, toasted and broken' }, { text: '2 tbsp tahini dressing (tahini, lemon, water, garlic)' }, { text: 'fresh mint and parsley' }], steps: ['Warm falafels in oven 10 min at 180°C.', 'Make tahini dressing: whisk tahini, lemon, garlic, water.', 'Toss veg and pita pieces. Top with falafels and dressing.'] } },
  ],
  mediterranean: [
    { name: 'Greek Salad with Chickpeas', emoji: '🥗', cultural: ['mediterranean'], tags: ['anti-inflammatory', 'fresh', 'plant-protein'], time: '10 min',
      recipe: { ingredients: [{ text: '1 can chickpeas, drained' }, { text: 'tomatoes, cucumber, red onion, kalamata olives' }, { text: '100g feta cheese' }, { text: '2 tbsp olive oil, lemon juice' }, { text: 'dried oregano, salt' }], steps: ['Combine chickpeas and chopped veg in a bowl.', 'Drizzle oil and lemon. Toss with oregano.', 'Top with crumbled feta.'] } },
  ],
  pacific: [
    { name: 'Taro & Coconut Stew', emoji: '🥥', cultural: ['pacific'], tags: ['comfort', 'energy', 'warming'], time: '40 min',
      recipe: { ingredients: [{ text: '300g taro, peeled and cubed' }, { text: '1 can coconut milk' }, { text: '1 cup vegetable stock' }, { text: '1 onion, 2 garlic cloves' }, { text: '1 cup spinach or kumara leaves' }, { text: 'salt, pepper' }], steps: ['Sauté onion and garlic.', 'Add taro, stock, coconut milk. Simmer 25–30 min until taro is tender.', 'Stir in greens. Season and serve.'] } },
  ],
  african: [
    { name: 'Jollof Rice with Beans', emoji: '🍚', cultural: ['african'], tags: ['iron', 'fibre', 'complete-protein'], time: '40 min',
      recipe: { ingredients: [{ text: '1 cup long grain rice' }, { text: '1 can kidney beans, drained' }, { text: '1 can crushed tomatoes' }, { text: '1 red capsicum, 1 onion, 2 garlic cloves' }, { text: '1 tsp thyme, paprika, curry powder' }, { text: '2 cups vegetable stock' }], steps: ['Blend tomatoes, capsicum and onion.', 'Fry blended mix with garlic and spices 5 min.', 'Add rice and stock. Cover and cook 25–30 min on low.', 'Stir in beans in last 5 min.'] } },
  ],
  latin: [
    { name: 'Black Bean & Avocado Rice Bowl', emoji: '🫘', cultural: ['latin'], tags: ['iron', 'fibre', 'complete-protein'], time: '15 min',
      recipe: { ingredients: [{ text: '1 can black beans, drained' }, { text: '1 cup cooked brown rice' }, { text: '1 avocado, sliced' }, { text: 'lime juice, coriander' }, { text: '1 tsp cumin' }, { text: 'salsa or pico de gallo' }], steps: ['Warm beans with cumin in a small pan.', 'Serve over rice with avocado.', 'Top with salsa, coriander, lime juice.'] } },
  ],
  indigenous: [
    { name: 'Wattleseed & Oat Porridge', emoji: '🌾', cultural: ['indigenous'], tags: ['protein', 'fibre', 'warming'], time: '15 min',
      recipe: { ingredients: [{ text: '½ cup rolled oats' }, { text: '1 tsp wattleseed powder' }, { text: '1 cup oat milk' }, { text: '1 tbsp macadamia nuts, chopped' }, { text: 'bush honey or maple syrup' }, { text: 'seasonal fruit' }], steps: ['Cook oats in milk 5 min.', 'Stir in wattleseed powder.', 'Top with macadamias, honey, fruit.'] } },
  ],
};

// ===== COMMUNITY TIPS =====
const COMMUNITY_TIPS = [
  { id: 't1', author: 'Priya S.', avatar: '👩🏽', avatarBg: '#e0f7f8', verified: true, category: 'hormonal', culturalContext: 'south_asian', content: 'Drinking warm water with fenugreek seeds (methi) first thing has helped regulate my cycle. Traditional remedy my mum swore by — took 6 weeks but genuinely noticed a difference.', stars: 4, resonances: 42, tried: 18 },
  { id: 't2', author: 'Joel T.', avatar: '👨🏾', avatarBg: '#fef7dc', verified: false, category: 'fitness', culturalContext: null, content: 'Zone 2 cardio (conversational pace) 3x a week changed my resting heart rate more than any HIIT I\'ve done. Consistency was the key.', stars: 5, resonances: 67, tried: 31 },
  { id: 't3', author: 'Amara N.', avatar: '👩🏿', avatarBg: '#e8ecfc', verified: true, category: 'cultural', culturalContext: 'african', content: 'Egusi soup is one of the most nutrient-dense things you can eat — iron, protein, healthy fats. My non-African friends are always surprised when I explain what\'s in it.', stars: 5, resonances: 55, tried: 22 },
  { id: 't4', author: 'Ravi K.', avatar: '👨🏽', avatarBg: '#e0f7f8', verified: false, category: 'gut', culturalContext: 'south_asian', content: 'Adding hing (asafoetida) to dal — the difference in bloating was noticeable within a week. Tiny amount goes a long way.', stars: 4, resonances: 38, tried: 24 },
  { id: 't5', author: 'Mei L.', avatar: '👩🏻', avatarBg: '#fef7dc', verified: true, category: 'energy', culturalContext: 'east_asian', content: 'Postpartum I was exhausted and my mum made me ginger & jujube soup every day — my iron recovered fast. There\'s real science behind traditional confinement foods.', stars: 4, resonances: 29, tried: 11 },
  { id: 't6', author: 'Sarah M.', avatar: '👩🏼', avatarBg: '#e8ecfc', verified: false, category: 'sleep', culturalContext: null, content: 'Stopping screens 45 min before bed — started with 15 min and built up. Sleep quality on my Garmin went from 65 to 82 average over 3 weeks.', stars: 5, resonances: 81, tried: 45 },
];

// ===== VILLAGERS =====
const VILLAGERS = [
  { id: 'priya', name: 'Priya', avatar: '👩🏽', bg: '#ffb7c5', cultural: 'south_asian', gender: 'woman', speech: 'I shared a tip about methi water for cycles — 42 others resonated! This community gets it 💛' },
  { id: 'joel', name: 'Joel', avatar: '👨🏾', bg: '#b5d5f5', cultural: null, gender: 'man', speech: 'Zone 2 cardio is so underrated. My resting heart rate dropped 8bpm in 2 months!' },
  { id: 'amara', name: 'Amara', avatar: '👩🏿', bg: '#ffd59e', cultural: 'african', gender: 'woman', speech: 'Trying to get more people to discover West African superfoods — egusi, moringa, baobab 🌿' },
  { id: 'ravi', name: 'Ravi', avatar: '👨🏽', bg: '#c5e8c5', cultural: 'south_asian', gender: 'man', speech: 'The community tips here have been better than any app recommendation I\'ve had.' },
];

// ===== CORE FUNCTIONS =====
function getPhaseFromDay(day) {
  if (!day) return null;
  if (day <= 5) return 'menstrual';
  if (day <= 13) return 'follicular';
  if (day <= 16) return 'ovulation';
  return 'luteal';
}

function getRecommendedMeals() {
  const needs = new Set();
  const phase = USER.today.phase || USER.cyclePhase;
  const sleep = USER.today.sleepHours;
  const conditions = USER.conditions;
  const goals = USER.goals;
  const fitnessGoals = USER.fitnessGoals || [];

  if (phase === 'menstrual') { needs.add('iron'); needs.add('gut'); }
  if (phase === 'follicular') { needs.add('protein'); needs.add('energy'); }
  if (phase === 'ovulation') { needs.add('iron'); needs.add('hormonal'); }
  if (phase === 'luteal') { needs.add('hormonal'); needs.add('sleep'); }
  if (sleep !== null && sleep < 7) { needs.add('energy'); needs.add('sleep'); }
  if (goals.includes('energy')) needs.add('energy');
  if (goals.includes('hormonal')) needs.add('hormonal');
  if (goals.includes('gut')) needs.add('gut');
  if (goals.includes('fitness') || goals.includes('weight') || fitnessGoals.includes('build_strength')) needs.add('protein');
  if (goals.includes('mental')) needs.add('stress');
  if (conditions.includes('pcos') || conditions.includes('endometriosis')) needs.add('hormonal');
  if (conditions.includes('ibs')) needs.add('gut');
  if (conditions.includes('fatigue')) needs.add('iron');
  if (conditions.includes('anxiety')) needs.add('stress');
  if (USER.proteinScore !== null && USER.proteinScore < 3) needs.add('protein');
  if (needs.size === 0) { needs.add('energy'); needs.add('protein'); }

  let meals = [];
  const cultural = USER.culturalFood;
  const cuisines = USER.cuisines || [];

  // Cultural + cuisine match meals
  const allCulturals = [cultural, ...cuisines].filter(Boolean);
  allCulturals.forEach(c => {
    if (MEAL_DB[c]) {
      MEAL_DB[c].forEach(m => meals.push({ ...m, why: `${getCultureLabel(c)} — familiar flavour that fits your goals` }));
    }
  });

  // Need-based meals
  needs.forEach(need => {
    if (MEAL_DB[need]) {
      MEAL_DB[need].forEach(meal => {
        const whyText = getNeedWhy(need, phase, sleep);
        meals.push({ ...meal, why: whyText });
      });
    }
  });

  // Deduplicate
  const seen = new Set();
  const unique = [];
  meals.forEach(m => { if (!seen.has(m.name)) { seen.add(m.name); unique.push(m); } });
  return unique.slice(0, 3);
}

function getNeedWhy(need, phase, sleep) {
  if (need === 'iron') {
    if (phase === 'menstrual') return 'Iron-replenishing — day 1–5 of your cycle';
    if (phase === 'ovulation') return 'Iron-boosting for ovulation phase';
    return 'Iron support based on your goals';
  }
  if (need === 'protein') {
    if (USER.proteinScore < 3) return 'You said you don\'t eat enough protein — this helps';
    return 'High plant protein for your fitness goals';
  }
  if (need === 'energy') {
    if (sleep !== null && sleep < 7) return `Energy boost — you got ${sleep}h sleep`;
    return 'Sustained energy for your day';
  }
  if (need === 'gut') return 'Gut-friendly — supports your digestive health';
  if (need === 'hormonal') {
    if (phase === 'luteal') return 'Hormone-balancing for luteal phase';
    if (USER.conditions.includes('pcos')) return 'Hormone support for PCOS';
    return 'Hormonal balance support';
  }
  if (need === 'sleep') return 'Sleep-supporting nutrients — for better recovery';
  if (need === 'stress') return 'Stress-reducing nutrients for your nervous system';
  return 'Based on your health goals';
}

function getGreetingInsight() {
  const { steps, sleepHours, phase, cycleDay, mood } = USER.today;
  if (phase === 'menstrual') return `Day ${cycleDay || 1} of your period — your body needs rest and iron today.`;
  if (phase === 'ovulation') return `Around ovulation — energy tends to peak now. Make the most of it.`;
  if (phase === 'luteal') return `Luteal phase — you may feel hungrier and need more rest than usual.`;
  if (sleepHours !== null && sleepHours < 6.5) return `You got ${sleepHours}h sleep — let's support your energy today.`;
  if (steps !== null && steps > 8000) return `Great movement today — ${steps.toLocaleString()} steps already!`;
  if (mood !== null && mood <= 2) return `Mood's been low today — your meal suggestions below can help.`;
  if (steps !== null) return `${steps.toLocaleString()} steps so far — keep it up!`;
  return `Connect your apps to get personalised daily insights.`;
}

function getRelevantTips() {
  const cultural = USER.culturalFood;
  const goals = USER.goals;
  const conditions = USER.conditions;
  return [...COMMUNITY_TIPS].sort((a, b) => {
    let sA = 0, sB = 0;
    if (a.culturalContext === cultural) sA += 3;
    if (b.culturalContext === cultural) sB += 3;
    if (goals.includes(a.category)) sA += 2;
    if (goals.includes(b.category)) sB += 2;
    return sB - sA;
  });
}

function getCultureLabel(c) {
  const map = { south_asian: 'South Asian', east_asian: 'East & South-East Asian', middle_eastern: 'Middle Eastern', mediterranean: 'Mediterranean', indigenous: 'Indigenous Australian', pacific: 'Pacific Islander', african: 'African', latin: 'Latin American', none: 'Global' };
  return map[c] || c;
}

function getGoalLabel(g) {
  const map = { energy: 'More energy', hormonal: 'Hormonal balance', gut: 'Gut health', mental: 'Mental wellbeing', fitness: 'Fitness', weight: 'Weight management', longevity: 'Longevity' };
  return map[g] || g;
}

function getCondLabel(c) {
  const map = { pcos: 'PCOS', endometriosis: 'Endometriosis', thyroid: 'Thyroid', ibs: 'IBS/IBD', diabetes: 'Diabetes', celiac: 'Coeliac', fatigue: 'Chronic fatigue', heart: 'Heart health', anxiety: 'Anxiety/depression' };
  return map[c] || c;
}

function getPhaseAdvice(phase) {
  const map = { menstrual: 'Rest, warmth, iron-rich foods', follicular: 'Fresh starts, lighter meals, moderate exercise', ovulation: 'Peak energy — great for harder workouts & social plans', luteal: 'Wind down, prioritise sleep, magnesium-rich foods' };
  return map[phase] || '';
}
