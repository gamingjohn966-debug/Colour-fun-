// Color Fun - Professional Anime Line-Art Coloring Book Collection
(function() {
  const ARTWORKS = [
    {
      id: 'aria_celestial_mage',
      title: 'Aria - Starlight Astrologer',
      category: 'anime_girls',
      categories: ['anime_girls', 'fantasy', 'popular'],
      difficulty: 'Medium',
      description: 'Celestial star astrologer maiden with flowing wavy twintails, astral crystal staff, and ornate starry robe.',
      image: 'images/anime_mage_celestial_1788186366926.jpg'
    },
    {
      id: 'yuki_kitsune_maiden',
      title: 'Yuki - Kitsune Shrine Maiden',
      category: 'anime_girls',
      categories: ['anime_girls', 'cute', 'popular', 'animals'],
      difficulty: 'Medium',
      description: 'Fox spirit maiden in an elaborate cherry blossom kimono with obi sash, holding a traditional folding fan.',
      image: 'images/anime_fox_shrine_1788186385044.jpg'
    },
    {
      id: 'clara_tea_maid',
      title: 'Clara - Royal Manor Maid',
      category: 'anime_girls',
      categories: ['anime_girls', 'cute', 'popular'],
      difficulty: 'Hard',
      description: 'Graceful Victorian tea maid holding an ornate tea tray, wearing a ruffled apron dress, lace bonnet, and braided hair.',
      image: 'images/anime_tea_maid_1788186404790.jpg'
    },
    {
      id: 'nova_cyber_idol',
      title: 'Nova - Neo-Tokyo Cyber Idol',
      category: 'anime_girls',
      categories: ['anime_girls', 'popular'],
      difficulty: 'Medium',
      description: 'Futuristic cyberpunk pop idol singer with high ponytails, cyber ribbons, audio headset, and holographic microphone.',
      image: 'images/anime_cyber_idol_1788186424207.jpg'
    },
    {
      id: 'serena_rose_princess',
      title: 'Serena - Rose Lace Princess',
      category: 'princess',
      categories: ['princess', 'anime_girls', 'cute', 'popular'],
      difficulty: 'Medium',
      description: 'Beautiful anime girl with long layered hair, expressive eyes, lace Victorian dress with delicate fabric folds, and floral ribbons.',
      image: 'images/anime_girl_lineart_1_1788186337287.jpg'
    },
    {
      id: 'lyra_elf_ranger',
      title: 'Lyra - Whisperwind Elf Ranger',
      category: 'fantasy',
      categories: ['fantasy', 'anime_girls', 'nature', 'popular'],
      difficulty: 'Hard',
      description: 'Ethereal forest elf ranger with long pointed ears, braided leaf hair, wooden recurve bow, and layered leaf armor.',
      image: 'images/anime_elf_archer_1788186444925.jpg'
    },
    {
      id: 'violet_gothic_lolita',
      title: 'Violet - Midnight Lolita',
      category: 'princess',
      categories: ['princess', 'anime_girls', 'popular'],
      difficulty: 'Hard',
      description: 'Elegant gothic aristocrat holding a lace parasol umbrella, wearing a multi-tiered Victorian ruffled dress with rose corsages and drill ringlets.',
      image: 'images/anime_gothic_lolita_1788186461175.jpg'
    },
    {
      id: 'marina_ocean_mermaid',
      title: 'Princess Marina - Ocean Pearl',
      category: 'princess',
      categories: ['princess', 'fantasy', 'cute'],
      difficulty: 'Medium',
      description: 'Enchanting mermaid princess with long ocean waves, pearl tiara, sea bubbles, and shimmering iridescent scales.',
      image: 'images/anime_ocean_mermaid_1788186478873.jpg'
    },
    {
      id: 'mimi_catgirl_baker',
      title: 'Mimi - Sweet Paw Patisserie',
      category: 'chibi',
      categories: ['chibi', 'cute', 'animals', 'popular'],
      difficulty: 'Easy',
      description: 'Adorable catgirl pastry chef holding a plate of decorated cupcakes, wearing a frilly apron and baker hat between fluffy feline ears.',
      image: 'images/anime_catgirl_baker_1788186501245.jpg'
    },
    {
      id: 'hazel_steampunk_inventor',
      title: 'Hazel - Clockwork Aeronaut',
      category: 'fantasy',
      categories: ['fantasy', 'anime_girls'],
      difficulty: 'Hard',
      description: 'Intrepid steampunk engineer wearing brass goggles, layered coat with gears, clockwork watch, and holding a mechanical bird.',
      image: 'images/anime_steampunk_girl_1788186561291.jpg'
    },
    {
      id: 'aurelia_sunfire_valkyrie',
      title: 'Aurelia - Sunfire Valkyrie',
      category: 'fantasy',
      categories: ['fantasy', 'princess', 'popular'],
      difficulty: 'Hard',
      description: 'Seraph warrior maiden with majestic feathered wings, ornate jewel breastplate, flowing ribbon sash, and glowing crystal rapier.',
      image: 'images/anime_angel_valkyrie_1788186582488.jpg'
    },
    {
      id: 'hina_sakura_student',
      title: 'Hina - Springtime Walk',
      category: 'anime_girls',
      categories: ['anime_girls', 'cute', 'nature'],
      difficulty: 'Easy',
      description: 'Cheerful schoolgirl in sailor uniform with twintails and messenger bag under falling pink sakura blossoms.',
      image: 'images/anime_school_cherry_1788186601664.jpg'
    },
    // ========================================================
    // 🏡 NATURE & VILLAGE COLLECTION (Peaceful Indian Scenery)
    // ========================================================
    {
      id: 'village_houses_courtyard',
      title: 'Village Courtyard & Homestead',
      category: 'nature_village',
      categories: ['nature_village', 'village_homes', 'popular'],
      difficulty: 'Medium',
      description: 'Charming Indian village house with traditional courtyard, earthen water pots, carved wooden door, and shady banyan tree.',
      image: 'images/village_houses_courtyard_1788450010978.jpg'
    },
    {
      id: 'village_thatched_home',
      title: 'Traditional Thatched Cottage',
      category: 'nature_village',
      categories: ['nature_village', 'village_homes'],
      difficulty: 'Medium',
      description: 'Traditional village home with woven thatched straw roof, open veranda, sunflowers, clay urns, and stone pathway.',
      image: 'images/village_thatched_home_1788450125256.jpg'
    },
    {
      id: 'village_cluster_homes',
      title: 'Village Hamlet Among Trees',
      category: 'nature_village',
      categories: ['nature_village', 'village_homes', 'nature_roads'],
      difficulty: 'Hard',
      description: 'A cozy group of village cottages nestled under lush mango and neem trees with tiled roofs and cobblestone path.',
      image: 'images/village_cluster_homes_1788450292013.jpg'
    },
    {
      id: 'village_bicycle_porch',
      title: 'Bicycle by the Village Porch',
      category: 'nature_village',
      categories: ['nature_village', 'village_homes', 'popular'],
      difficulty: 'Easy',
      description: 'Classic vintage bicycle leaning against a cozy village cottage porch with blooming bougainvillea vines and stone courtyard.',
      image: 'images/village_bicycle_porch_1788450141374.jpg'
    },
    {
      id: 'village_riverside_homes',
      title: 'Riverside Village Cottages',
      category: 'nature_village',
      categories: ['nature_village', 'village_homes', 'river_bridges'],
      difficulty: 'Medium',
      description: 'Serene village houses built right beside the flowing river with stone washing steps and swaying coconut palms.',
      image: 'images/village_riverside_homes_1788450309130.jpg'
    },
    {
      id: 'village_river_bridge',
      title: 'Stone Bridge & Village River',
      category: 'nature_village',
      categories: ['nature_village', 'river_bridges', 'popular'],
      difficulty: 'Medium',
      description: 'Arched stone footbridge spanning a peaceful village river with wooden rowboat, riverbanks, and thatched cottages.',
      image: 'images/village_river_bridge_1788450035477.jpg'
    },
    {
      id: 'village_river_boat',
      title: 'Wooden Boat on Lotus River',
      category: 'nature_village',
      categories: ['nature_village', 'river_bridges'],
      difficulty: 'Medium',
      description: 'Tranquil wooden rowboat moored by stone ghat steps with floating lotus flowers, swimming ducks, and coconut palms.',
      image: 'images/village_river_boat_1788450156738.jpg'
    },
    {
      id: 'village_lotus_pond',
      title: 'Lotus Pond & Water Bearer',
      category: 'nature_village',
      categories: ['nature_village', 'river_bridges', 'nature_roads'],
      difficulty: 'Hard',
      description: 'Scenic village pond with blooming lotuses, lily pads, water birds, and a village lady carrying traditional water vessels.',
      image: 'images/village_lotus_pond_1788450371065.jpg'
    },
    {
      id: 'village_cows_courtyard',
      title: 'Mother Cow & Calf in Courtyard',
      category: 'nature_village',
      categories: ['nature_village', 'farm_animals', 'popular'],
      difficulty: 'Medium',
      description: 'Loving mother cow and playful calf resting peacefully in a village courtyard beside earthen clay pots and wooden fence.',
      image: 'images/village_cows_courtyard_1788450050560.jpg'
    },
    {
      id: 'village_grazing_goats',
      title: 'Goats on the Hillside Meadow',
      category: 'nature_village',
      categories: ['nature_village', 'farm_animals'],
      difficulty: 'Easy',
      description: 'Friendly village goats and baby kids nibbling wild daisies along a rustic wooden fence overlooking the valley.',
      image: 'images/village_grazing_goats_1788450348382.jpg'
    },
    {
      id: 'village_rooster_courtyard',
      title: 'Rooster & Chicks Morning',
      category: 'nature_village',
      categories: ['nature_village', 'farm_animals', 'village_homes'],
      difficulty: 'Medium',
      description: 'Proud rooster greeting the morning sun from a wooden fence while hen and fluffy chicks peck grains in the courtyard.',
      image: 'images/village_rooster_courtyard_1788450272562.jpg'
    },
    {
      id: 'village_children_play',
      title: 'Children Under the Great Banyan',
      category: 'nature_village',
      categories: ['nature_village', 'children_play', 'popular'],
      difficulty: 'Medium',
      description: 'Happy village boys and girls playing together beneath the sprawling canopy of an ancient sacred banyan tree.',
      image: 'images/village_children_play_1788450066719.jpg'
    },
    {
      id: 'village_outdoor_games',
      title: 'Village Street Games',
      category: 'nature_village',
      categories: ['nature_village', 'children_play'],
      difficulty: 'Medium',
      description: 'Joyful children playing hopscotch and spinning wooden tops in a peaceful sunlit village lane beside quaint cottages.',
      image: 'images/village_outdoor_games_1788450390827.jpg'
    },
    {
      id: 'village_banyan_tree',
      title: 'The Great Sacred Banyan Tree',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature', 'popular'],
      difficulty: 'Hard',
      description: 'Majestic old banyan tree with long twisting aerial roots, circular stone seating platform, and songbirds in leafy boughs.',
      image: 'images/village_banyan_tree_1788450326790.jpg'
    },
    {
      id: 'village_sunrise_fields',
      title: 'Sunrise Over Farmland Fields',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature', 'popular'],
      difficulty: 'Medium',
      description: 'Golden morning sunrise breaking over wide rice fields with farmer, bullock cart, flying birds, and distant mountain silhouettes.',
      image: 'images/village_sunrise_fields_1788450083882.jpg'
    },
    {
      id: 'village_farmer_fields',
      title: 'Farmer in Lush Paddy Fields',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature'],
      difficulty: 'Hard',
      description: 'Hardworking Indian farmer tending fertile green paddy fields with flying egrets, irrigation canals, and coconut groves.',
      image: 'images/village_farmer_fields_1788450255464.jpg'
    },
    {
      id: 'village_sunset_hills',
      title: 'Sunset Over Village Hills',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature'],
      difficulty: 'Medium',
      description: 'Radiant sunset dipping behind majestic hills with birds returning to roost above warm village rooftops.',
      image: 'images/village_sunset_hills_1788450415082.jpg'
    },
    {
      id: 'village_hills_valley',
      title: 'Mountain Valley Village Stream',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature', 'river_bridges'],
      difficulty: 'Hard',
      description: 'Panoramic mountain village with terraced slopes, cascading freshwater brook, wooden bridge, and cozy stone cottages.',
      image: 'images/village_hills_valley_1788450217648.jpg'
    },
    {
      id: 'village_rainy_day',
      title: 'Peaceful Monsoon Rainy Day',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature', 'village_homes'],
      difficulty: 'Medium',
      description: 'Soothing monsoon rain showering over village huts with rainwater droplets falling from thatched eaves and ducks waddling in puddles.',
      image: 'images/village_rainy_day_1788450188183.jpg'
    },
    {
      id: 'village_garden_flowers',
      title: 'Village Garden & Sunflowers',
      category: 'nature_village',
      categories: ['nature_village', 'fields_nature', 'popular'],
      difficulty: 'Easy',
      description: 'Lush village garden bursting with bright sunflowers, fragrant marigolds, fluttering butterflies, and painted clay pots.',
      image: 'images/village_garden_flowers_1788450238331.jpg'
    },
    {
      id: 'village_winding_road',
      title: 'Winding Village Road',
      category: 'nature_village',
      categories: ['nature_village', 'nature_roads'],
      difficulty: 'Medium',
      description: 'Scenic dirt path winding past flowering bushes, wooden fences, and tall shady trees leading toward distant hills.',
      image: 'images/village_winding_road_1788450172911.jpg'
    },
    {
      id: 'village_palm_well',
      title: 'Coconut Grove & Village Well',
      category: 'nature_village',
      categories: ['nature_village', 'nature_roads', 'village_homes'],
      difficulty: 'Easy',
      description: 'Charming stone water well with bucket and pulley surrounded by soaring coconut palms and blooming hibiscus flowers.',
      image: 'images/village_palm_well_1788450203334.jpg'
    }
  ];

  window.ARTWORKS = ARTWORKS;
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = { ARTWORKS };
  }
})();
