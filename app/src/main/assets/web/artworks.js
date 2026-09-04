// Color Fun - 22+ High-Quality Original Anime Line-Art Coloring Pages
// Clean enclosed vector boundaries designed specifically for flood fill & tap coloring

export const ARTWORKS = [
  {
    id: 'aria_magical_girl',
    title: 'Aria - Starlight Magical Girl',
    category: 'anime_girls',
    categories: ['anime_girls', 'fantasy', 'popular'],
    difficulty: 'Medium',
    description: 'Magical girl with flowing twintails, starry wand, and ribbon dress.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Background Halo & Stars -->
        <circle cx="400" cy="380" r="320" stroke-width="3" stroke-dasharray="8,6"/>
        <polygon points="160,180 175,215 210,215 180,235 195,270 160,250 125,270 140,235 110,215 145,215"/>
        <polygon points="650,220 660,245 685,245 665,260 675,285 650,270 625,285 635,260 615,245 640,245"/>
        <polygon points="200,600 208,620 230,620 212,632 220,652 200,640 180,652 188,632 170,620 192,620"/>
        <polygon points="620,580 628,600 650,600 632,612 640,632 620,620 600,632 608,612 590,600 612,600"/>
        
        <!-- Back Hair Left -->
        <path d="M300,240 C200,280 120,420 150,600 C170,640 220,650 240,580 C260,520 270,440 290,380 Z"/>
        <path d="M150,600 C110,520 100,380 180,290 Z"/>
        <!-- Back Hair Right -->
        <path d="M500,240 C600,280 680,420 650,600 C630,640 580,650 560,580 C540,520 530,440 510,380 Z"/>
        <path d="M650,600 C690,520 700,380 620,290 Z"/>

        <!-- Magical Ribbon Wing Left -->
        <path d="M260,400 C180,380 120,440 140,510 C160,570 240,530 260,480 Z"/>
        <!-- Magical Ribbon Wing Right -->
        <path d="M540,400 C620,380 680,440 660,510 C640,570 560,530 540,480 Z"/>

        <!-- Head / Face Contour -->
        <path d="M320,260 C320,370 340,430 400,470 C460,430 480,370 480,260 C480,180 320,180 320,260 Z"/>
        <!-- Neck & Shoulders -->
        <path d="M370,455 L370,510 C320,530 270,560 250,620 L550,620 C530,560 480,530 430,510 L430,455 Z"/>

        <!-- Eyes Left -->
        <path d="M340,320 C355,305 385,305 395,325 C390,328 355,330 340,320 Z" fill="#111111"/>
        <ellipse cx="370" cy="350" rx="24" ry="32"/>
        <ellipse cx="365" cy="340" rx="10" ry="14" fill="#FFFFFF"/>
        <ellipse cx="378" cy="365" rx="5" ry="6" fill="#FFFFFF"/>
        <path d="M345,305 C360,295 380,295 395,305" stroke-width="4"/>

        <!-- Eyes Right -->
        <path d="M460,320 C445,305 415,305 405,325 C410,328 445,330 460,320 Z" fill="#111111"/>
        <ellipse cx="430" cy="350" rx="24" ry="32"/>
        <ellipse cx="425" cy="340" rx="10" ry="14" fill="#FFFFFF"/>
        <ellipse cx="438" cy="365" rx="5" ry="6" fill="#FFFFFF"/>
        <path d="M455,305 C440,295 420,295 405,305" stroke-width="4"/>

        <!-- Cute Anime Blush & Mouth -->
        <path d="M335,375 C345,375 355,378 350,385" stroke-width="2"/>
        <path d="M465,375 C455,375 445,378 450,385" stroke-width="2"/>
        <path d="M398,370 L402,375" stroke-width="3"/>
        <path d="M385,405 Q400,425 415,405 Z"/>

        <!-- Forehead Bangs -->
        <path d="M310,240 C330,300 350,330 365,310 C380,290 390,330 400,340 C410,330 420,290 435,310 C450,330 470,300 490,240 C460,190 340,190 310,240 Z"/>
        <!-- Side Bangs Left -->
        <path d="M315,240 C300,310 290,380 310,430 C320,430 330,380 330,320 Z"/>
        <!-- Side Bangs Right -->
        <path d="M485,240 C500,310 510,380 490,430 C480,430 470,380 470,320 Z"/>

        <!-- Hair Ribbon Accessories Left -->
        <ellipse cx="280" cy="240" rx="35" ry="25"/>
        <polygon points="280,240 230,220 250,260"/>
        <polygon points="280,240 240,280 270,270"/>
        <!-- Hair Ribbon Accessories Right -->
        <ellipse cx="520" cy="240" rx="35" ry="25"/>
        <polygon points="520,240 570,220 550,260"/>
        <polygon points="520,240 560,280 530,270"/>

        <!-- Magical Dress Collar & Gem -->
        <path d="M350,510 Q400,530 450,510 Q400,560 350,510 Z"/>
        <polygon points="400,525 415,545 400,565 385,545"/>
        <!-- Dress Bodice -->
        <path d="M330,550 L330,680 Q400,700 470,680 L470,550 Q400,570 330,550 Z"/>
        <path d="M370,560 L370,685"/>
        <path d="M430,560 L430,685"/>
        
        <!-- Big Waist Ribbon & Bow -->
        <ellipse cx="400" cy="680" rx="20" ry="18"/>
        <path d="M380,680 C320,640 280,690 320,730 C360,740 385,695 385,685 Z"/>
        <path d="M420,680 C480,640 520,690 480,730 C440,740 415,695 415,685 Z"/>
        <path d="M385,695 C360,740 330,790 340,800 C360,800 390,750 395,700 Z"/>
        <path d="M415,695 C440,740 470,790 460,800 C440,800 410,750 405,700 Z"/>

        <!-- Skirt Frills -->
        <path d="M310,710 C260,740 220,780 200,800 L600,800 C580,780 540,740 490,710 Q400,740 310,710 Z"/>

        <!-- Magical Star Wand -->
        <path d="M540,460 L680,300 L695,315 L555,475 Z"/>
        <circle cx="688" cy="308" r="45" stroke-width="4"/>
        <polygon points="688,275 700,300 725,308 700,316 688,341 676,316 651,308 676,300"/>
      </g>
    </svg>`
  },
  {
    id: 'sakura_schoolgirl',
    title: 'Sakura - Cherry Blossom Maiden',
    category: 'anime_girls',
    categories: ['anime_girls', 'cute', 'popular'],
    difficulty: 'Easy',
    description: 'Joyful school maiden under falling sakura cherry blossoms with sailor uniform.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Floating Sakura Petals -->
        <path d="M150,160 C140,140 160,120 180,135 C195,120 215,140 205,160 C195,180 160,180 150,160 Z"/>
        <path d="M640,140 C630,120 650,100 670,115 C685,100 705,120 695,140 C685,160 650,160 640,140 Z"/>
        <path d="M180,680 C170,660 190,640 210,655 C225,640 245,660 235,680 C225,700 190,700 180,680 Z"/>
        <path d="M680,620 C670,600 690,580 710,595 C725,580 745,600 735,620 C725,640 690,640 680,620 Z"/>

        <!-- Hair Back -->
        <path d="M280,240 C200,320 220,550 250,680 C290,680 320,550 330,420 Z"/>
        <path d="M520,240 C600,320 580,550 550,680 C510,680 480,550 470,420 Z"/>

        <!-- Face Base -->
        <path d="M310,270 C310,380 340,450 400,480 C460,450 490,380 490,270 C490,190 310,190 310,270 Z"/>
        <!-- Neck -->
        <path d="M375,470 L375,520 L425,520 L425,470 Z"/>

        <!-- Big Anime Eyes Left -->
        <ellipse cx="365" cy="360" rx="26" ry="34"/>
        <ellipse cx="360" cy="350" rx="12" ry="15" fill="#FFFFFF"/>
        <circle cx="374" cy="376" r="6" fill="#FFFFFF"/>
        <path d="M335,325 C355,315 385,315 395,330" stroke-width="5"/>
        <path d="M340,305 C360,295 380,298 390,305" stroke-width="3"/>

        <!-- Big Anime Eyes Right -->
        <ellipse cx="435" cy="360" rx="26" ry="34"/>
        <ellipse cx="430" cy="350" rx="12" ry="15" fill="#FFFFFF"/>
        <circle cx="444" cy="376" r="6" fill="#FFFFFF"/>
        <path d="M465,325 C445,315 415,315 405,330" stroke-width="5"/>
        <path d="M460,305 C440,295 420,298 410,305" stroke-width="3"/>

        <!-- Nose & Cheerful Open Smile -->
        <circle cx="400" cy="385" r="2" fill="#111111"/>
        <path d="M375,415 Q400,455 425,415 Z"/>
        <path d="M385,435 Q400,445 415,435" stroke-width="2"/>
        <line x1="330" y1="385" x2="350" y2="385" stroke-width="3"/>
        <line x1="450" y1="385" x2="470" y2="385" stroke-width="3"/>

        <!-- Hair Fringe & Hairpin -->
        <path d="M295,240 C320,310 345,340 360,310 C375,340 400,350 415,315 C430,350 460,320 480,310 C500,300 505,240 505,240 C470,160 330,160 295,240 Z"/>
        <!-- Sakura Hairclip -->
        <circle cx="320" cy="250" r="22"/>
        <polygon points="320,230 332,245 348,248 335,260 338,276 320,268 302,276 305,260 292,248 308,245"/>

        <!-- Sailor Uniform Collar & Scarf -->
        <path d="M300,540 L240,620 L330,620 L370,540 Z"/>
        <path d="M500,540 L560,620 L470,620 L430,540 Z"/>
        <!-- Sailor Scarf / Red Tie -->
        <polygon points="400,535 375,565 400,590 425,565"/>
        <path d="M385,585 L365,700 L400,680 L435,700 L415,585 Z"/>

        <!-- Uniform Torso & Sleeves -->
        <path d="M330,620 L330,780 L470,780 L470,620 Z"/>
        <path d="M240,620 L210,750 L280,750 L310,640 Z"/>
        <path d="M560,620 L590,750 L520,750 L490,640 Z"/>
        <line x1="330" y1="720" x2="470" y2="720" stroke-width="4"/>
      </g>
    </svg>`
  },
  {
    id: 'princess_seraphina',
    title: 'Princess Seraphina of Sunvale',
    category: 'princess',
    categories: ['princess', 'fantasy', 'popular'],
    difficulty: 'Hard',
    description: 'Regal anime princess wearing a jewel-encrusted tiara, necklace, and royal gown.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Sunburst Palace Arch -->
        <path d="M150,750 C150,250 650,250 650,750" stroke-width="3" stroke-dasharray="10,6"/>
        <circle cx="400" cy="180" r="40" stroke-width="3"/>
        <polygon points="400,120 410,155 440,145 425,175 455,185 425,200 440,225 410,215 400,245 390,215 360,225 375,200 345,185 375,175 360,145 390,155"/>

        <!-- Long Majestic Hair Waves -->
        <path d="M260,250 C160,360 140,550 180,750 C230,750 260,620 280,480 Z"/>
        <path d="M540,250 C640,360 660,550 620,750 C570,750 540,620 520,480 Z"/>

        <!-- Princess Tiara / Crown -->
        <path d="M320,210 L400,140 L480,210 L450,230 L400,190 L350,230 Z"/>
        <circle cx="400" cy="165" r="12"/>
        <circle cx="350" cy="205" r="8"/>
        <circle cx="450" cy="205" r="8"/>

        <!-- Face Shape -->
        <path d="M325,270 C325,380 350,440 400,470 C450,440 475,380 475,270 C475,200 325,200 325,270 Z"/>
        <path d="M375,465 L375,515 L425,515 L425,465 Z"/>

        <!-- Noble Elegant Eyes Left -->
        <path d="M345,335 C360,320 385,320 395,338 Z" fill="#111111"/>
        <ellipse cx="370" cy="358" rx="20" ry="28"/>
        <circle cx="365" cy="348" r="8" fill="#FFFFFF"/>
        <circle cx="376" cy="368" r="4" fill="#FFFFFF"/>
        <path d="M340,315 C360,305 385,308 395,315" stroke-width="3"/>

        <!-- Noble Elegant Eyes Right -->
        <path d="M455,335 C440,320 415,320 405,338 Z" fill="#111111"/>
        <ellipse cx="430" cy="358" rx="20" ry="28"/>
        <circle cx="425" cy="348" r="8" fill="#FFFFFF"/>
        <circle cx="436" cy="368" r="4" fill="#FFFFFF"/>
        <path d="M460,315 C440,305 415,308 405,315" stroke-width="3"/>

        <!-- Elegant Smile -->
        <circle cx="400" cy="385" r="2" fill="#111111"/>
        <path d="M388,415 Q400,430 412,415"/>

        <!-- Royal Hair Curls -->
        <path d="M310,250 C340,310 360,325 380,310 C400,295 400,325 420,310 C440,325 460,310 490,250 Z"/>

        <!-- Royal Pearl Necklace -->
        <path d="M350,505 Q400,535 450,505" stroke-width="3"/>
        <circle cx="370" cy="516" r="6"/>
        <circle cx="400" cy="524" r="9"/>
        <circle cx="430" cy="516" r="6"/>

        <!-- Corset Gown & Frills -->
        <path d="M320,530 C270,550 220,620 200,690 L260,700 C275,650 310,590 340,560 Z"/>
        <path d="M480,530 C530,550 580,620 600,690 L540,700 C525,650 490,590 460,560 Z"/>
        <!-- Center Bodice -->
        <path d="M340,540 L340,680 Q400,720 460,680 L460,540 Q400,565 340,540 Z"/>
        <path d="M340,600 Q400,630 460,600"/>
        <path d="M340,640 Q400,670 460,640"/>

        <!-- Royal Ballgown Skirt -->
        <path d="M340,680 C260,700 150,740 120,800 L680,800 C650,740 540,700 460,680 Z"/>
        <path d="M280,720 Q400,760 520,720"/>
        <path d="M220,760 Q400,800 580,760"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_neko_boba',
    title: 'Chibi Neko Boba Barista',
    category: 'chibi',
    categories: ['chibi', 'cute', 'animals', 'popular'],
    difficulty: 'Easy',
    description: 'Adorable cat-eared chibi girl happily holding a giant delicious boba milk tea.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cute Bubble Background -->
        <circle cx="200" cy="200" r="50" stroke-width="3"/>
        <circle cx="620" cy="220" r="45" stroke-width="3"/>
        <circle cx="160" cy="550" r="35" stroke-width="3"/>
        <circle cx="650" cy="560" r="55" stroke-width="3"/>

        <!-- Cat Ears Outer & Inner -->
        <polygon points="260,250 200,110 340,190"/>
        <polygon points="255,230 215,135 315,190"/>
        <polygon points="540,250 600,110 460,190"/>
        <polygon points="545,230 585,135 485,190"/>

        <!-- Giant Cute Chibi Head -->
        <ellipse cx="400" cy="320" rx="190" ry="160"/>

        <!-- Big Sparkling Chibi Eyes Left -->
        <ellipse cx="320" cy="330" rx="40" ry="50"/>
        <ellipse cx="310" cy="315" rx="18" ry="22" fill="#FFFFFF"/>
        <circle cx="335" cy="350" r="10" fill="#FFFFFF"/>
        <circle cx="315" cy="360" r="5" fill="#FFFFFF"/>
        <path d="M275,270 C300,255 345,255 365,270" stroke-width="5"/>

        <!-- Big Sparkling Chibi Eyes Right -->
        <ellipse cx="480" cy="330" rx="40" ry="50"/>
        <ellipse cx="470" cy="315" rx="18" ry="22" fill="#FFFFFF"/>
        <circle cx="495" cy="350" r="10" fill="#FFFFFF"/>
        <circle cx="475" cy="360" r="5" fill="#FFFFFF"/>
        <path d="M435,270 C455,255 500,255 525,270" stroke-width="5"/>

        <!-- Anime Cat Mouth ':3' & Blush -->
        <path d="M375,375 Q388,390 400,375 Q412,390 425,375" stroke-width="4"/>
        <ellipse cx="270" cy="370" rx="20" ry="10"/>
        <ellipse cx="530" cy="370" rx="20" ry="10"/>

        <!-- Cute Bangs & Hair -->
        <path d="M230,280 C260,340 310,340 340,300 C370,340 430,340 460,300 C490,340 540,340 570,280 C540,190 260,190 230,280 Z"/>
        <!-- Side Hair Tuft Left -->
        <path d="M220,300 C180,380 200,480 240,490 C250,450 250,380 240,320 Z"/>
        <!-- Side Hair Tuft Right -->
        <path d="M580,300 C620,380 600,480 560,490 C550,450 550,380 560,320 Z"/>

        <!-- Giant Boba Cup with Tapioca Pearls -->
        <path d="M330,470 L345,710 C345,740 455,740 455,710 L470,470 Z"/>
        <ellipse cx="400" cy="470" rx="70" ry="15"/>
        <!-- Straw -->
        <rect x="390" y="380" width="20" height="120" rx="5" transform="rotate(8 400 440)"/>
        <!-- Boba Pearls -->
        <circle cx="370" cy="690" r="14"/>
        <circle cx="405" cy="695" r="14"/>
        <circle cx="430" cy="685" r="13"/>
        <circle cx="365" cy="660" r="14"/>
        <circle cx="395" cy="665" r="14"/>
        <circle cx="425" cy="655" r="14"/>
        <!-- Cup Face -->
        <path d="M380,560 Q400,575 420,560" stroke-width="3"/>

        <!-- Chibi Paws Hugging Cup -->
        <ellipse cx="325" cy="520" rx="25" ry="20"/>
        <ellipse cx="475" cy="520" rx="25" ry="20"/>

        <!-- Chibi Feet -->
        <ellipse cx="320" cy="740" rx="30" ry="20"/>
        <ellipse cx="480" cy="740" rx="30" ry="20"/>

        <!-- Cat Tail -->
        <path d="M570,580 C680,550 710,680 640,730 C580,770 540,680 570,640 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'elysia_dragon_guardian',
    title: 'Elysia - Crystal Dragon Guardian',
    category: 'fantasy',
    categories: ['fantasy', 'anime_girls', 'popular'],
    difficulty: 'Hard',
    description: 'Fierce and beautiful dragon maiden with horn crown, armored pauldrons, and dragon wings.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Dragon Wings Left -->
        <path d="M300,320 C180,200 90,260 60,350 C120,380 180,380 220,440 C140,460 100,510 120,560 C180,550 240,510 280,480 Z"/>
        <!-- Dragon Wings Right -->
        <path d="M500,320 C620,200 710,260 740,350 C680,380 620,380 580,440 C660,460 700,510 680,560 C620,550 560,510 520,480 Z"/>

        <!-- Dragon Horns Left & Right -->
        <path d="M310,210 C260,140 240,60 210,40 C220,90 250,180 290,230 Z"/>
        <path d="M490,210 C540,140 560,60 590,40 C580,90 550,180 510,230 Z"/>

        <!-- Flowing Long Hair -->
        <path d="M260,260 C160,380 170,600 200,740 C240,740 270,600 290,460 Z"/>
        <path d="M540,260 C640,380 630,600 600,740 C560,740 530,600 510,460 Z"/>

        <!-- Face Shape -->
        <path d="M320,250 C320,360 345,430 400,460 C455,430 480,360 480,250 C480,170 320,170 320,250 Z"/>
        <path d="M375,450 L375,500 L425,500 L425,450 Z"/>

        <!-- Fierce Anime Eyes Left -->
        <path d="M335,310 L395,315 L385,328 L345,325 Z" fill="#111111"/>
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <ellipse cx="365" cy="335" rx="6" ry="14" fill="#111111"/>
        <circle cx="358" cy="330" r="5" fill="#FFFFFF"/>
        <path d="M330,290 L395,300" stroke-width="4"/>

        <!-- Fierce Anime Eyes Right -->
        <path d="M465,310 L405,315 L415,328 L455,325 Z" fill="#111111"/>
        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <ellipse cx="435" cy="335" rx="6" ry="14" fill="#111111"/>
        <circle cx="428" cy="330" r="5" fill="#FFFFFF"/>
        <path d="M470,290 L405,300" stroke-width="4"/>

        <!-- Confident Smirk -->
        <path d="M390,400 Q405,410 420,395" stroke-width="3"/>

        <!-- Sharp Layered Bangs -->
        <path d="M300,230 C330,300 350,330 365,290 C380,340 400,340 415,290 C430,330 460,300 500,230 Z"/>

        <!-- Dragon Armor Pauldron Left -->
        <path d="M250,510 C210,540 210,600 250,640 L310,580 Z"/>
        <circle cx="260" cy="570" r="10"/>
        <!-- Dragon Armor Pauldron Right -->
        <path d="M550,510 C590,540 590,600 550,640 L490,580 Z"/>
        <circle cx="540" cy="570" r="10"/>

        <!-- Dragon Armor Breastplate & Crystal Core -->
        <path d="M330,510 L330,660 L400,710 L470,660 L470,510 Z"/>
        <polygon points="400,540 425,580 400,620 375,580"/>
        <path d="M340,660 L400,780 L460,660 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'luna_moon_sorceress',
    title: 'Luna - Crescent Moon Sorceress',
    category: 'fantasy',
    categories: ['fantasy', 'anime_girls', 'popular'],
    difficulty: 'Medium',
    description: 'Enchanting mage perched on a glowing crescent moon surrounded by constellations.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Crescent Moon -->
        <path d="M550,100 C280,160 200,450 350,700 C150,580 120,280 380,100 Z"/>
        <!-- Star Constellations -->
        <polygon points="150,150 160,175 185,175 165,190 175,215 150,200 125,215 135,190 115,175 140,175"/>
        <polygon points="680,480 688,500 710,500 692,512 700,532 680,520 660,532 668,512 650,500 672,500"/>
        <polygon points="220,680 228,700 250,700 232,712 240,732 220,720 200,732 208,712 190,700 212,700"/>

        <!-- Mage Witch Hat -->
        <path d="M280,240 L450,60 L540,240 Z"/>
        <ellipse cx="410" cy="240" rx="140" ry="30"/>
        <circle cx="410" cy="220" r="14"/>
        <polygon points="450,60 470,40 450,50"/>

        <!-- Flowing Celestial Hair -->
        <path d="M320,270 C240,360 250,580 290,690 C330,690 350,580 350,460 Z"/>
        <path d="M480,270 C560,360 550,580 510,690 C470,690 450,580 450,460 Z"/>

        <!-- Face Shape -->
        <path d="M335,270 C335,370 360,430 405,455 C450,430 475,370 475,270 Z"/>

        <!-- Dreamy Sorceress Eyes Left & Right -->
        <ellipse cx="365" cy="345" rx="22" ry="28"/>
        <ellipse cx="360" cy="338" rx="9" ry="12" fill="#FFFFFF"/>
        <path d="M340,315 C360,305 385,305 395,315" stroke-width="4"/>

        <ellipse cx="445" cy="345" rx="22" ry="28"/>
        <ellipse cx="440" cy="338" rx="9" ry="12" fill="#FFFFFF"/>
        <path d="M470,315 C450,305 425,305 415,315" stroke-width="4"/>

        <!-- Gentle Smile -->
        <path d="M395,400 Q405,412 415,400" stroke-width="3"/>

        <!-- Sorceress Robe & Cloak -->
        <path d="M345,460 L310,680 L500,680 L465,460 Z"/>
        <polygon points="405,475 420,500 405,525 390,500"/>
        <path d="M340,540 Q405,570 470,540"/>
        <path d="M325,610 Q405,640 485,610"/>
      </g>
    </svg>`
  },
  {
    id: 'hana_kimono_maiden',
    title: 'Hana - Kimono Festival Maiden',
    category: 'nature',
    categories: ['nature', 'anime_girls', 'cute'],
    difficulty: 'Medium',
    description: 'Graceful Japanese festival maiden in floral kimono with ornate folding fan.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Festive Paper Lanterns -->
        <ellipse cx="160" cy="180" rx="45" ry="60"/>
        <line x1="160" y1="110" x2="160" y2="120" stroke-width="4"/>
        <rect x="140" y="120" width="40" height="10"/>
        <rect x="140" y="230" width="40" height="10"/>
        <line x1="160" y1="240" x2="160" y2="280" stroke-width="3"/>

        <ellipse cx="640" cy="200" rx="45" ry="60"/>
        <line x1="640" y1="130" x2="640" y2="140" stroke-width="4"/>
        <rect x="620" y="140" width="40" height="10"/>
        <rect x="620" y="250" width="40" height="10"/>

        <!-- Traditional Updo Hair & Floral Kanzashi -->
        <ellipse cx="400" cy="180" rx="100" ry="70"/>
        <circle cx="310" cy="210" r="28"/>
        <circle cx="300" cy="200" r="8"/>
        <circle cx="320" cy="200" r="8"/>
        <circle cx="310" cy="220" r="8"/>
        <line x1="290" y1="230" x2="270" y2="290" stroke-width="3"/>

        <!-- Face Shape -->
        <path d="M320,260 C320,370 345,440 400,470 C455,440 480,370 480,260 Z"/>

        <!-- Eyes Left & Right -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="360" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M335,310 C355,300 380,300 395,312" stroke-width="4"/>

        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="430" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M465,310 C445,300 420,300 405,312" stroke-width="4"/>

        <!-- Gentle Lips -->
        <path d="M390,410 Q400,420 410,410" stroke-width="3"/>

        <!-- Kimono Necklines (Left over Right) -->
        <path d="M340,490 L400,580 L420,550 L380,480 Z"/>
        <path d="M460,490 L370,610 L340,570 L420,480 Z"/>

        <!-- Wide Obi Sash -->
        <rect x="300" y="610" width="200" height="90" rx="5"/>
        <line x1="300" y1="655" x2="500" y2="655" stroke-width="4"/>
        <ellipse cx="400" cy="655" rx="16" ry="14"/>

        <!-- Folding Fan (Sensu) -->
        <path d="M480,480 C560,430 630,470 660,540 L530,580 Z"/>
        <line x1="530" y1="580" x2="520" y2="450"/>
        <line x1="530" y1="580" x2="570" y2="440"/>
        <line x1="530" y1="580" x2="620" y2="460"/>

        <!-- Kimono Sleeves & Skirt -->
        <path d="M260,530 C210,580 180,680 200,750 L280,720 L300,610 Z"/>
        <path d="M300,700 L250,800 L550,800 L500,700 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_fox_spirit',
    title: 'Chibi Fox Spirit Inari',
    category: 'chibi',
    categories: ['chibi', 'animals', 'cute'],
    difficulty: 'Easy',
    description: 'Playful nine-tailed fox spirit chibi with huge fluffy tails and sacred bells.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Fluffy Tails -->
        <path d="M260,450 C120,380 60,540 140,680 C200,730 260,650 280,560 Z"/>
        <path d="M540,450 C680,380 740,540 660,680 C600,730 540,650 520,560 Z"/>
        <path d="M400,480 C360,600 320,740 400,780 C480,740 440,600 400,480 Z"/>

        <!-- Fox Ears -->
        <polygon points="270,260 210,90 350,180"/>
        <polygon points="265,230 230,125 320,180"/>
        <polygon points="530,260 590,90 450,180"/>
        <polygon points="535,230 570,125 480,180"/>

        <!-- Chibi Face -->
        <ellipse cx="400" cy="330" rx="180" ry="150"/>

        <!-- Fox Eye Markings & Eyes -->
        <ellipse cx="325" cy="340" rx="35" ry="45"/>
        <ellipse cx="315" cy="328" rx="15" ry="18" fill="#FFFFFF"/>
        <circle cx="340" cy="360" r="8" fill="#FFFFFF"/>
        <path d="M280,285 C310,270 350,270 370,285" stroke-width="5"/>
        <path d="M275,340 C255,340 245,355 240,370" stroke-width="3"/>

        <ellipse cx="475" cy="340" rx="35" ry="45"/>
        <ellipse cx="465" cy="328" rx="15" ry="18" fill="#FFFFFF"/>
        <circle cx="490" cy="360" r="8" fill="#FFFFFF"/>
        <path d="M520,285 C490,270 450,270 430,285" stroke-width="5"/>
        <path d="M525,340 C545,340 555,355 560,370" stroke-width="3"/>

        <!-- Fox Nose & Open Mouth -->
        <polygon points="400,370 393,362 407,362"/>
        <path d="M385,390 Q400,415 415,390 Z"/>

        <!-- Sacred Bell Collar -->
        <path d="M310,460 Q400,490 490,460" stroke-width="8"/>
        <circle cx="400" cy="500" r="26"/>
        <line x1="380" y1="495" x2="420" y2="495" stroke-width="3"/>
        <circle cx="400" cy="512" r="5" fill="#111111"/>

        <!-- Paws & Body -->
        <ellipse cx="340" cy="560" rx="28" ry="36"/>
        <ellipse cx="460" cy="560" rx="28" ry="36"/>
        <path d="M320,600 L320,680 L480,680 L480,600 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'mio_cyberpunk_idol',
    title: 'Mio - Cyberpunk Pop Star',
    category: 'anime_girls',
    categories: ['anime_girls', 'popular', 'bright'],
    difficulty: 'Medium',
    description: 'Futuristic sci-fi idol with holographic visor, cyber headphones, and synth jacket.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Cyber Soundwaves & Neon Hexagons -->
        <polygon points="160,180 200,160 240,180 240,220 200,240 160,220"/>
        <polygon points="560,180 600,160 640,180 640,220 600,240 560,220"/>
        <line x1="100" y1="400" x2="200" y2="400" stroke-width="6"/>
        <line x1="600" y1="400" x2="700" y2="400" stroke-width="6"/>

        <!-- Cyber Headphones -->
        <path d="M260,280 C260,140 540,140 540,280" stroke-width="8"/>
        <rect x="230" y="260" width="50" height="90" rx="15"/>
        <circle cx="255" cy="305" r="14"/>
        <rect x="520" y="260" width="50" height="90" rx="15"/>
        <circle cx="545" cy="305" r="14"/>

        <!-- Futuristic Asymmetric Hair -->
        <path d="M280,240 C200,320 210,540 240,650 C270,650 300,520 310,380 Z"/>
        <path d="M520,240 C600,320 590,540 560,650 C530,650 500,520 490,380 Z"/>

        <!-- Face Shape -->
        <path d="M315,260 C315,370 340,440 400,470 C460,440 485,370 485,260 Z"/>

        <!-- Cyber Holographic Visor -->
        <polygon points="290,310 510,310 490,370 310,370"/>
        <line x1="300" y1="340" x2="500" y2="340" stroke-width="2"/>

        <!-- Nose & Confident Smile -->
        <circle cx="400" cy="395" r="2" fill="#111111"/>
        <path d="M380,420 Q400,440 420,420 Z"/>

        <!-- Cyberpunk Jacket & High Collar -->
        <path d="M330,500 L260,560 L240,780 L350,780 L360,620 Z"/>
        <path d="M470,500 L540,560 L560,780 L450,780 L440,620 Z"/>
        <path d="M340,490 L400,560 L460,490 L440,640 L360,640 Z"/>
        <rect x="385" y="580" width="30" height="180"/>
      </g>
    </svg>`
  },
  {
    id: 'forest_spirit_deer',
    title: 'Enchanted Forest Spirit & Sacred Deer',
    category: 'nature',
    categories: ['nature', 'animals', 'fantasy'],
    difficulty: 'Hard',
    description: 'Majestic sacred white stag with blooming floral antlers in an ancient enchanted glade.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Sacred Antlers with Blooming Flowers Left -->
        <path d="M340,320 C300,200 240,160 160,110 C200,160 220,240 260,290 Z"/>
        <path d="M240,160 C180,80 120,60 80,40 C100,100 160,160 190,190 Z"/>
        <circle cx="160" cy="110" r="15"/>
        <circle cx="80" cy="40" r="12"/>

        <!-- Antlers Right -->
        <path d="M460,320 C500,200 560,160 640,110 C600,160 580,240 540,290 Z"/>
        <path d="M560,160 C620,80 680,60 720,40 C700,100 640,160 610,190 Z"/>
        <circle cx="640" cy="110" r="15"/>
        <circle cx="720" cy="40" r="12"/>

        <!-- Deer Ears -->
        <ellipse cx="260" cy="330" rx="60" ry="25" transform="rotate(-30 260 330)"/>
        <ellipse cx="540" cy="330" rx="60" ry="25" transform="rotate(30 540 330)"/>

        <!-- Deer Head & Muzzle -->
        <path d="M320,320 C320,400 350,520 400,560 C450,520 480,400 480,320 C430,300 370,300 320,320 Z"/>
        <!-- Forehead Star Mark -->
        <polygon points="400,340 410,365 435,370 415,385 422,410 400,395 378,410 385,385 365,370 390,365"/>

        <!-- Gentle Anime Deer Eyes Left & Right -->
        <ellipse cx="350" cy="410" rx="22" ry="26"/>
        <circle cx="342" cy="402" r="8" fill="#FFFFFF"/>
        <ellipse cx="450" cy="410" rx="22" ry="26"/>
        <circle cx="442" cy="402" r="8" fill="#FFFFFF"/>

        <!-- Deer Black Nose & Mouth -->
        <ellipse cx="400" cy="540" rx="20" ry="14" fill="#111111"/>
        <path d="M400,554 L400,570"/>

        <!-- Slender Graceful Neck & Body -->
        <path d="M340,540 C310,620 280,720 260,800 L540,800 C520,720 490,620 460,540 Z"/>
        <!-- Floral Garland on Neck -->
        <circle cx="340" cy="650" r="18"/>
        <circle cx="400" cy="680" r="22"/>
        <circle cx="460" cy="650" r="18"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_star_mage',
    title: 'Chibi Star Mage with Wand',
    category: 'chibi',
    categories: ['chibi', 'fantasy', 'cute'],
    difficulty: 'Easy',
    description: 'Charming pint-sized sorceress casting glittery starlight spells.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Wizard Hat -->
        <path d="M260,260 L400,60 L540,260 Z"/>
        <ellipse cx="400" cy="260" rx="170" ry="35"/>
        <polygon points="400,160 415,190 445,195 420,215 430,245 400,230 370,245 380,215 355,195 385,190"/>

        <!-- Chibi Face -->
        <ellipse cx="400" cy="360" rx="160" ry="130"/>

        <!-- Big Sparkling Eyes Left & Right -->
        <ellipse cx="330" cy="370" rx="35" ry="45"/>
        <ellipse cx="320" cy="358" rx="14" ry="18" fill="#FFFFFF"/>
        <circle cx="345" cy="390" r="8" fill="#FFFFFF"/>
        <path d="M290,320 C315,305 355,305 375,320" stroke-width="5"/>

        <ellipse cx="470" cy="370" rx="35" ry="45"/>
        <ellipse cx="460" cy="358" rx="14" ry="18" fill="#FFFFFF"/>
        <circle cx="485" cy="390" r="8" fill="#FFFFFF"/>
        <path d="M510,320 C485,305 445,305 425,320" stroke-width="5"/>

        <!-- Smile & Rosy Cheeks -->
        <path d="M385,420 Q400,435 415,420" stroke-width="4"/>
        <ellipse cx="280" cy="405" rx="18" ry="9"/>
        <ellipse cx="520" cy="405" rx="18" ry="9"/>

        <!-- Cloak & Wand -->
        <path d="M320,480 L280,680 L520,680 L480,480 Z"/>
        <!-- Star Wand -->
        <line x1="530" y1="440" x2="650" y2="340" stroke-width="8"/>
        <polygon points="650,300 665,330 700,340 670,360 680,395 650,375 620,395 630,360 600,340 635,330"/>
      </g>
    </svg>`
  },
  {
    id: 'yuki_frost_princess',
    title: 'Yuki - Frost Crystal Princess',
    category: 'princess',
    categories: ['princess', 'fantasy', 'nature'],
    difficulty: 'Medium',
    description: 'Serene winter princess adorned in snowflake crystals and icy diadem.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Floating Snowflake Geometrics -->
        <line x1="160" y1="160" x2="220" y2="220" stroke-width="4"/>
        <line x1="220" y1="160" x2="160" y2="220" stroke-width="4"/>
        <circle cx="190" cy="190" r="8"/>
        <line x1="640" y1="180" x2="700" y2="240" stroke-width="4"/>
        <line x1="700" y1="180" x2="640" y2="240" stroke-width="4"/>
        <circle cx="670" cy="210" r="8"/>

        <!-- Ice Crystal Crown -->
        <polygon points="340,210 370,120 400,190 430,120 460,210 400,225"/>
        <circle cx="400" cy="160" r="10"/>

        <!-- Face Shape -->
        <path d="M320,260 C320,370 345,440 400,470 C455,440 480,370 480,260 Z"/>

        <!-- Gentle Princess Eyes -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="358" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M335,312 C355,302 380,302 395,315" stroke-width="4"/>

        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="428" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M465,312 C445,302 420,302 405,315" stroke-width="4"/>

        <path d="M390,410 Q400,422 410,410" stroke-width="3"/>

        <!-- Fur Cloak & Winter Gown -->
        <path d="M310,490 C240,530 200,640 240,780 L560,780 C600,640 560,530 490,490 Q400,530 310,490 Z"/>
        <circle cx="400" cy="540" r="16"/>
      </g>
    </svg>`
  },
  {
    id: 'rin_mermaid_singer',
    title: 'Rin - Ocean Mermaid Singer',
    category: 'fantasy',
    categories: ['fantasy', 'nature', 'anime_girls'],
    difficulty: 'Hard',
    description: 'Beautiful mermaid singing amidst seashells, pearl reefs, and swirling bubbles.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Swirling Ocean Bubbles -->
        <circle cx="160" cy="220" r="30"/>
        <circle cx="190" cy="140" r="18"/>
        <circle cx="650" cy="240" r="35"/>
        <circle cx="620" cy="150" r="20"/>

        <!-- Sea Shell Hair Ornament -->
        <path d="M300,220 C280,180 340,170 330,220 Z"/>
        <ellipse cx="315" cy="205" rx="25" ry="20"/>

        <!-- Face Shape -->
        <path d="M325,270 C325,370 350,440 400,470 C450,440 475,370 475,270 Z"/>

        <!-- Eyes Left & Right -->
        <ellipse cx="365" cy="345" rx="22" ry="28"/>
        <circle cx="358" cy="336" r="8" fill="#FFFFFF"/>
        <path d="M335,315 C355,305 385,305 395,318" stroke-width="4"/>

        <ellipse cx="435" cy="345" rx="22" ry="28"/>
        <circle cx="428" cy="336" r="8" fill="#FFFFFF"/>
        <path d="M465,315 C445,305 415,305 405,318" stroke-width="4"/>

        <!-- Singing Mouth -->
        <ellipse cx="400" cy="415" rx="14" ry="18"/>

        <!-- Seashell Top -->
        <path d="M330,520 C310,480 370,470 385,520 C370,550 340,550 330,520 Z"/>
        <path d="M470,520 C490,480 430,470 415,520 C430,550 460,550 470,520 Z"/>

        <!-- Mermaid Waist & Scaled Tail -->
        <path d="M350,560 C320,640 280,720 340,780 C400,820 440,740 420,680 C410,640 450,560 450,560 Z"/>
        <!-- Mermaid Fluke Fin -->
        <path d="M340,780 C260,740 200,800 240,850 C300,860 350,810 350,790 Z"/>
        <path d="M340,780 C420,740 480,800 440,850 C380,860 350,810 350,790 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_panda_boba',
    title: 'Chibi Panda Boba Dreamer',
    category: 'cute',
    categories: ['cute', 'chibi', 'animals'],
    difficulty: 'Easy',
    description: 'Chubby cute panda girl with panda ears snacking on bamboo sweets.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Panda Round Ears -->
        <circle cx="260" cy="200" r="50"/>
        <circle cx="540" cy="200" r="50"/>

        <!-- Giant Round Head -->
        <ellipse cx="400" cy="340" rx="180" ry="150"/>

        <!-- Panda Eye Patches & Eyes -->
        <ellipse cx="320" cy="340" rx="40" ry="48" transform="rotate(-15 320 340)"/>
        <circle cx="310" cy="328" r="14" fill="#FFFFFF"/>
        <circle cx="330" cy="355" r="6" fill="#FFFFFF"/>

        <ellipse cx="480" cy="340" rx="40" ry="48" transform="rotate(15 480 340)"/>
        <circle cx="470" cy="328" r="14" fill="#FFFFFF"/>
        <circle cx="490" cy="355" r="6" fill="#FFFFFF"/>

        <!-- Cute Nose & Mouth -->
        <ellipse cx="400" cy="390" rx="12" ry="8" fill="#111111"/>
        <path d="M385,410 Q400,425 415,410" stroke-width="4"/>

        <!-- Panda Hoodie Paws -->
        <ellipse cx="310" cy="530" rx="35" ry="40"/>
        <ellipse cx="490" cy="530" rx="35" ry="40"/>

        <!-- Bamboo Treat -->
        <rect x="375" y="470" width="50" height="150" rx="10"/>
        <line x1="375" y1="520" x2="425" y2="520" stroke-width="4"/>
        <line x1="375" y1="570" x2="425" y2="570" stroke-width="4"/>

        <path d="M310,580 L290,740 L510,740 L490,580 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'kitsune_shrine_maiden',
    title: 'Kitsune Shrine Maiden under Torii',
    category: 'anime_girls',
    categories: ['anime_girls', 'nature', 'fantasy', 'popular'],
    difficulty: 'Medium',
    description: 'Fox-eared miko maiden standing gracefully before a sacred crimson Torii gate.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Torii Gate Pillars & Lintel -->
        <rect x="120" y="100" width="560" height="35" rx="5"/>
        <rect x="160" y="150" width="480" height="25" rx="4"/>
        <rect x="180" y="175" width="40" height="600"/>
        <rect x="580" y="175" width="40" height="600"/>

        <!-- Miko Fox Ears -->
        <polygon points="280,260 220,120 340,190"/>
        <polygon points="520,260 580,120 460,190"/>

        <!-- Face Shape -->
        <path d="M320,270 C320,380 345,440 400,470 C455,440 480,370 480,270 Z"/>

        <!-- Eyes Left & Right -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="358" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M335,310 C355,300 380,300 395,312" stroke-width="4"/>

        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="430" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M465,310 C445,300 420,300 405,312" stroke-width="4"/>

        <path d="M390,410 Q400,422 410,410" stroke-width="3"/>

        <!-- Miko White Robe & Red Hakama Pants -->
        <path d="M330,500 L400,580 L470,500 L450,650 L350,650 Z"/>
        <path d="M320,650 L260,800 L540,800 L480,650 Z"/>
        <line x1="400" y1="650" x2="400" y2="800" stroke-width="4"/>
      </g>
    </svg>`
  },
  {
    id: 'princess_rosalind',
    title: 'Princess Rosalind in Rose Garden',
    category: 'princess',
    categories: ['princess', 'nature'],
    difficulty: 'Medium',
    description: 'Fair princess surrounded by blossoming English roses and vine trellises.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Blooming Roses Left & Right -->
        <circle cx="160" cy="200" r="35"/>
        <path d="M140,200 C150,180 170,180 180,200 C170,220 150,220 140,200 Z"/>
        <circle cx="640" cy="220" r="35"/>
        <path d="M620,220 C630,200 650,200 660,220 C650,240 630,240 620,220 Z"/>

        <!-- Princess Tiara -->
        <path d="M340,210 L400,160 L460,210 Z"/>
        <circle cx="400" cy="185" r="8"/>

        <!-- Face Shape -->
        <path d="M320,270 C320,380 345,440 400,470 C455,440 480,370 480,270 Z"/>

        <!-- Eyes -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="358" cy="332" r="8" fill="#FFFFFF"/>
        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="428" cy="332" r="8" fill="#FFFFFF"/>
        <path d="M390,410 Q400,422 410,410" stroke-width="3"/>

        <!-- Rose Gown -->
        <path d="M320,520 L300,780 L500,780 L480,520 Z"/>
        <ellipse cx="400" cy="540" rx="40" ry="20"/>
      </g>
    </svg>`
  },
  {
    id: 'aoi_sky_aviator',
    title: 'Aoi - Sky Aviator Explorer',
    category: 'anime_girls',
    categories: ['anime_girls', 'popular'],
    difficulty: 'Medium',
    description: 'Adventurous steampunk aviator girl with flight goggles, scarf, and pocket compass.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Steampunk Aviator Goggles on Forehead -->
        <ellipse cx="340" cy="220" rx="35" ry="30"/>
        <circle cx="340" cy="220" r="18"/>
        <ellipse cx="460" cy="220" rx="35" ry="30"/>
        <circle cx="460" cy="220" r="18"/>
        <line x1="375" y1="220" x2="425" y2="220" stroke-width="8"/>

        <!-- Face Shape -->
        <path d="M320,270 C320,380 345,440 400,470 C455,440 480,370 480,270 Z"/>

        <!-- Eyes -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="358" cy="332" r="8" fill="#FFFFFF"/>
        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="428" cy="332" r="8" fill="#FFFFFF"/>

        <!-- Aviator Scarf -->
        <path d="M310,480 Q400,520 490,480 L470,560 Q400,590 330,560 Z"/>
        <path d="M450,550 L580,680 L520,700 L420,580 Z"/>

        <!-- Leather Flight Jacket -->
        <path d="M310,560 L240,780 L560,780 L490,560 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'celestial_phoenix',
    title: 'Celestial Phoenix & Lotus Bloom',
    category: 'animals',
    categories: ['animals', 'fantasy', 'nature'],
    difficulty: 'Hard',
    description: 'Radiant mythical firebird spreading solar feather plumage over a blooming sacred lotus.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Sun Crest & Head -->
        <ellipse cx="400" cy="320" rx="40" ry="60"/>
        <polygon points="400,260 380,180 400,220 420,180"/>
        <!-- Phoenix Sharp Beak & Eye -->
        <polygon points="380,320 310,340 380,360"/>
        <circle cx="390" cy="330" r="6"/>

        <!-- Phoenix Wings Left -->
        <path d="M360,340 C220,240 100,320 60,420 C120,440 200,420 260,460 C160,490 120,560 140,620 C200,600 280,540 320,500 Z"/>
        <!-- Phoenix Wings Right -->
        <path d="M440,340 C580,240 700,320 740,420 C680,440 600,420 540,460 C640,490 680,560 660,620 C600,600 520,540 480,500 Z"/>

        <!-- Sacred Lotus Bloom Base -->
        <path d="M320,680 C360,620 440,620 480,680 C440,740 360,740 320,680 Z"/>
        <path d="M260,700 C300,660 350,680 340,740 C290,750 260,720 260,700 Z"/>
        <path d="M540,700 C500,660 450,680 460,740 C510,750 540,720 540,700 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_dragon_pearl',
    title: 'Chibi Dragon Hugging Pearl',
    category: 'cute',
    categories: ['cute', 'chibi', 'animals', 'fantasy'],
    difficulty: 'Easy',
    description: 'Baby oriental dragon cheerfully coiled around a glowing magical wishing pearl.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Glowing Wishing Pearl -->
        <circle cx="400" cy="500" r="140"/>
        <ellipse cx="360" cy="450" rx="30" ry="15" fill="#FFFFFF"/>

        <!-- Baby Dragon Head -->
        <ellipse cx="400" cy="280" rx="140" ry="110"/>
        <!-- Horns Left & Right -->
        <polygon points="300,200 240,110 330,170"/>
        <polygon points="500,200 560,110 470,170"/>

        <!-- Cute Big Eyes -->
        <ellipse cx="340" cy="280" rx="30" ry="38"/>
        <circle cx="330" cy="270" r="12" fill="#FFFFFF"/>
        <ellipse cx="460" cy="280" rx="30" ry="38"/>
        <circle cx="450" cy="270" r="12" fill="#FFFFFF"/>

        <path d="M385,330 Q400,345 415,330" stroke-width="4"/>

        <!-- Little Dragon Paws Hugging Pearl -->
        <ellipse cx="290" cy="460" rx="30" ry="25"/>
        <ellipse cx="510" cy="460" rx="30" ry="25"/>

        <!-- Curled Tail -->
        <path d="M450,620 C540,680 560,760 480,780 C400,790 350,720 380,660 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'kaede_autumn_tea',
    title: 'Kaede - Autumn Leaves Tea Master',
    category: 'nature',
    categories: ['nature', 'anime_girls'],
    difficulty: 'Medium',
    description: 'Serene maiden preparing ceremonial matcha under golden swirling maple foliage.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Maple Leaves -->
        <polygon points="160,180 180,150 195,170 225,140 210,180 230,200 200,210 190,240 175,210 145,210"/>
        <polygon points="640,190 660,160 675,180 705,150 690,190 710,210 680,220 670,250 655,220 625,220"/>

        <!-- Face Shape -->
        <path d="M320,270 C320,380 345,440 400,470 C455,440 480,370 480,270 Z"/>

        <!-- Eyes -->
        <ellipse cx="365" cy="340" rx="20" ry="26"/>
        <circle cx="358" cy="332" r="8" fill="#FFFFFF"/>
        <ellipse cx="435" cy="340" rx="20" ry="26"/>
        <circle cx="428" cy="332" r="8" fill="#FFFFFF"/>

        <!-- Tea Bowl (Chawan) -->
        <path d="M350,620 L360,700 C360,720 440,720 440,700 L450,620 Z"/>
        <ellipse cx="400" cy="620" rx="50" ry="12"/>

        <path d="M320,530 L260,780 L540,780 L480,530 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'starlight_pegasus',
    title: 'Starlight Pegasus & Rainbow Clouds',
    category: 'fantasy',
    categories: ['fantasy', 'animals', 'cute'],
    difficulty: 'Medium',
    description: 'Winged unicorn pegasus galloping gracefully across dreamy celestial clouds.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Fluffy Clouds Bottom -->
        <path d="M120,720 C100,660 180,620 240,650 C280,600 380,600 420,650 C460,610 560,610 600,660 C660,630 720,680 700,740 Z"/>

        <!-- Pegasus Horn -->
        <polygon points="400,240 370,100 410,210"/>
        <line x1="380" y1="140" x2="395" y2="150" stroke-width="3"/>
        <line x1="385" y1="180" x2="402" y2="190" stroke-width="3"/>

        <!-- Head & Mane -->
        <path d="M340,250 C300,320 320,440 370,470 C420,450 460,340 440,250 Z"/>
        <ellipse cx="370" cy="340" rx="18" ry="24"/>
        <circle cx="364" cy="332" r="7" fill="#FFFFFF"/>

        <!-- Majestic Feather Wings -->
        <path d="M440,360 C580,240 700,300 740,400 C680,440 600,420 540,460 C620,500 660,560 620,600 C560,580 500,520 460,480 Z"/>
        <path d="M340,360 C200,240 80,300 40,400 C100,440 180,420 240,460 C160,500 120,560 160,600 C220,580 280,520 320,480 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'chibi_magical_bunny',
    title: 'Chibi Usagi Moon Bunny',
    category: 'cute',
    categories: ['cute', 'chibi', 'animals'],
    difficulty: 'Easy',
    description: 'Cute bunny girl wearing fluffy ribbon rabbit ears holding sweet strawberry mochi.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Giant Fluffy Bunny Ears -->
        <path d="M260,240 C220,120 260,20 310,40 C350,60 330,160 300,240 Z"/>
        <path d="M265,210 C240,130 270,60 295,70 C320,85 310,160 290,210 Z"/>

        <path d="M540,240 C580,120 540,20 490,40 C450,60 470,160 500,240 Z"/>
        <path d="M535,210 C560,130 530,60 505,70 C480,85 490,160 510,210 Z"/>

        <!-- Round Head -->
        <ellipse cx="400" cy="340" rx="170" ry="140"/>

        <!-- Big Sparkling Eyes -->
        <ellipse cx="330" cy="345" rx="35" ry="45"/>
        <ellipse cx="320" cy="332" rx="14" ry="18" fill="#FFFFFF"/>
        <circle cx="345" cy="365" r="8" fill="#FFFFFF"/>

        <ellipse cx="470" cy="345" rx="35" ry="45"/>
        <ellipse cx="460" cy="332" rx="14" ry="18" fill="#FFFFFF"/>
        <circle cx="485" cy="365" r="8" fill="#FFFFFF"/>

        <!-- Bunny Nose & Mouth -->
        <polygon points="400,380 393,372 407,372"/>
        <path d="M385,395 Q400,410 415,395" stroke-width="4"/>

        <!-- Strawberry Mochi Treat -->
        <ellipse cx="400" cy="540" rx="60" ry="45"/>
        <polygon points="400,500 385,530 415,530"/>

        <!-- Paws -->
        <ellipse cx="320" cy="520" rx="26" ry="22"/>
        <ellipse cx="480" cy="520" rx="26" ry="22"/>

        <path d="M310,580 L280,740 L520,740 L490,580 Z"/>
      </g>
    </svg>`
  },
  {
    id: 'flame_fox_kitsune_cub',
    title: 'Kitsune Cub & Fire Orbs',
    category: 'animals',
    categories: ['animals', 'cute', 'fantasy'],
    difficulty: 'Easy',
    description: 'Baby mythic spirit fox playing happily with swirling gentle spirit flame wisps.',
    svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
      <rect width="800" height="800" fill="#FFFFFF"/>
      <g fill="#FFFFFF" stroke="#111111" stroke-width="4" stroke-linecap="round" stroke-linejoin="round">
        <!-- Floating Spirit Flames -->
        <path d="M180,240 C140,200 160,140 200,160 C230,120 260,180 220,230 C200,260 190,250 180,240 Z"/>
        <path d="M620,240 C660,200 640,140 600,160 C570,120 540,180 580,230 C600,260 610,250 620,240 Z"/>

        <!-- Big Fox Ears -->
        <polygon points="280,280 200,120 340,200"/>
        <polygon points="520,280 600,120 460,200"/>

        <!-- Fox Face -->
        <ellipse cx="400" cy="350" rx="160" ry="130"/>

        <!-- Eyes -->
        <ellipse cx="335" cy="355" rx="30" ry="40"/>
        <circle cx="325" cy="345" r="12" fill="#FFFFFF"/>
        <ellipse cx="465" cy="355" rx="30" ry="40"/>
        <circle cx="455" cy="345" r="12" fill="#FFFFFF"/>

        <polygon points="400,390 392,382 408,382"/>
        <path d="M388,405 Q400,420 412,405" stroke-width="4"/>

        <!-- Fluffy Body & Big Tail -->
        <ellipse cx="400" cy="560" rx="100" ry="110"/>
        <path d="M480,520 C640,460 700,640 580,720 C500,760 460,650 480,580 Z"/>
      </g>
    </svg>`
  }
];
