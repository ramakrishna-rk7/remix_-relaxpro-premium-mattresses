import { Product } from '../types';

export const PRODUCTS: Product[] = [
  {
    slug: 'nirvana',
    name: 'Nirvana',
    tagline: 'Experience ultimate relaxation',
    subtitle: 'Luxury sleep begins with Nirvana latex mattress',
    warranty: 10,
    comfortLevel: 'plush',
    comfortRating: 5,
    totalThickness: 8,
    layers: [
      { thickness: 8, material: 'latex', brand: 'RelaxPro Kerala Organic', certification: ['GOLS', 'Oeko-Tex'], description: '8" Pure Certified Organic Kerala Latex — One side 7-Zone + One side Monozone' }
    ],
    fabricGsm: 450,
    fabricType: 'Quilted High GSM Knitted Organic Fabric',
    certifications: ['GOLS', 'Oeko-Tex', 'FSC'],
    accessories: ['2 Luxurious Latex Pillows', '1 Premium Waterproof Protector'],
    keyBenefit: "India's first one side 7 Zone & one side monozone full 8\" organic latex mattress for ultimate pressure relief & therapeutic deep sleep",
    badge: "India's First 7-Zone + Monozone Latex Mattress",
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 54000, queen: 45000, double: 36000, single: 27000 },
      withoutAccessories: { king: 49000, queen: 41000, double: 33000, single: 24500 }
    },
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    tier: 'luxury',
    features: [
      'Dual-zone alignment: 7-Zone target zone support on one side, seamless Monozone comfort on reverse',
      '100% natural biodegradable Dunlop latex sap harvested under strict GOLS organic standards',
      'Zero synthetic chemicals, fillers, or VOC emissions — completely safe for infants and elders',
      'Innately breathable open-cell matrix guarantees heat dispersion and a cool sleeping microclimate'
    ],
    metaTitle: 'Nirvana 8" Natural Latex Mattress - Ultimate 7-Zone Sleep | RelaxPro',
    metaDescription: "Buy the RelaxPro Nirvana 8-inch 100% natural latex mattress. Features India's leading 7-Zone pressure relief design. 10-year warranty, free shipping."
  },
  {
    slug: 'amrita',
    name: 'Amrita',
    tagline: 'Sleep that rejuvenates you',
    subtitle: 'Feel long-lasting luxury with Amrita latex mattress',
    warranty: 10,
    comfortLevel: 'medium-soft',
    comfortRating: 4,
    totalThickness: 10,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century High Density', description: '4" Rebonded Base Foam with 90 to 95 Density' },
      { thickness: 6, material: 'latex', brand: 'RelaxPro Pure Organic', certification: ['GOLS'], description: '6" Premium GOLS Certified Natural Kerala Latex' }
    ],
    fabricGsm: 450,
    fabricType: 'Quilted 450 GSM High-Knit Organic Bamboo Fabric',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Premium Latex Pillows', '1 Premium Waterproof Protector'],
    keyBenefit: 'Heavy hybrid foundation topped with a ultra-thick premium organic latex comfort layer for deep body contouring and muscle recovery',
    badge: 'Premium 10" Reversible Rebonded + Latex Hybrid',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 48000, queen: 40000, double: 32000, single: 24000 },
      withoutAccessories: { king: 43000, queen: 36000, double: 29000, single: 21500 }
    },
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tier: 'luxury',
    features: [
      'Luxurious 10-inch thick profile combining the posture support of premium rebonded foam and cloud latex comfort',
      '6 inches of pure Kerala latex handles natural spine-contouring, lowering tosses and turns',
      'Ultra durable Century 95-density rebonded base guarantees zero sagging for over a decade',
      'Crafted with antimicrobial fabric that deters dust mites, spores, and common allergens natively'
    ],
    metaTitle: 'Amrita 10" Rebonded & Latex Luxury Mattress | RelaxPro',
    metaDescription: 'Shop the Amrita 10-inch luxurious mattress with 4" rebonded support and 6" certified natural rubber latex. Optimal orthopedic relaxation.'
  },
  {
    slug: 'ananda',
    name: 'Ananda',
    tagline: 'Blissful comfort every night',
    subtitle: 'Turn bedtime into joy with Ananda latex mattress',
    warranty: 10,
    comfortLevel: 'soft-medium',
    comfortRating: 4,
    totalThickness: 6,
    layers: [
      { thickness: 6, material: 'latex', brand: 'RelaxPro Kerala Organic', certification: ['GOLS', 'Oeko-Tex'], description: '6" GOLS Certified 100% Pure Organic Latex' }
    ],
    fabricGsm: 400,
    fabricType: 'Soft Knitted Eco-Friendly Organic Cotton Cover',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Soft Latex Pillows', '1 Waterproof Mattress Shield'],
    keyBenefit: 'Pure seamless solid organic latex master block yielding a buoyant response that cradle curves while securing independent motion isolation',
    badge: '100% Pure Classic Latex Comfort',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 42000, queen: 35000, double: 28000, single: 21000 },
      withoutAccessories: { king: 37000, queen: 31000, double: 25000, single: 18500 }
    },
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    tier: 'luxury',
    features: [
      'Made purely of a robust 6" luxury solid core of natural Dunlop organic latex, no foam fillers added',
      'Highly elastic properties distribute physical pressure points uniformly across the system',
      'Unsurpassed motion isolation ensures partner movements generate zero seismic disturbance',
      'Premium knitted organic cover facilitates active ventilation for standard Indian tropical temperatures'
    ],
    metaTitle: 'Ananda 6" Pure Natural Latex Mattress | RelaxPro',
    metaDescription: 'Order the Ananda 6-inch solid natural latex mattress by RelaxPro. Dynamic orthopedic elasticity, eco-conscious materials, and durable build.'
  },
  {
    slug: 'prakriti',
    name: 'Prakriti',
    tagline: 'Comfort inspired by nature',
    subtitle: 'Breathe easy, sleep better with Prakriti latex mattress',
    warranty: 10,
    comfortLevel: 'medium-soft',
    comfortRating: 4,
    totalThickness: 8,
    layers: [
      { thickness: 4, material: 'latex_rebonded', brand: 'RelaxPro Core Tech', certification: ['ECO-Institut'], description: '4" Eco-Dense Latex Rebonded Foam made of upcycled latex shreds' },
      { thickness: 4, material: 'latex', brand: 'RelaxPro Pure Organic', certification: ['GOLS'], description: '4" pure certified organic Kerala latex' }
    ],
    fabricGsm: 400,
    fabricType: 'Premium Breathable Knitted Organic Fabric',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Organic Latex Pillows', '1 High-End Protector'],
    keyBenefit: 'Eco-conscious design utilizing organic latex shredded elements bound in high-density core topped with pure organic latex comfort layer',
    badge: 'Eco-Friendly Twin Latex Engineering',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 44000, queen: 36500, double: 29000, single: 22000 },
      withoutAccessories: { king: 39000, queen: 32500, double: 26000, single: 19500 }
    },
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    tier: 'luxury',
    features: [
      'Twin active latex components combine for uniform, cloud-like support with robust core endurance',
      '4" Eco-Dense latex rebonded base acts as a bouncy supportive core instead of conventional high-energy synthetic base foam',
      '4" pure Kerala top latex provides immediate luxurious contouring and comfort',
      'All materials undergo toxic chemical audits, and hold ISO/CE certifications'
    ],
    metaTitle: 'Prakriti 8" Natural & Eco-Rebonded Latex Mattress | RelaxPro',
    metaDescription: 'Discover the Prakriti 8-inch natural latex mattress. Engineered with natural eco-rebonded core and 100% natural latex topper.'
  },
  {
    slug: 'somya',
    name: 'Somya',
    tagline: 'Soft, Gentle comfort that your body will love',
    subtitle: 'Sleep peacefully with Somya — Natural latex mattress',
    warranty: 10,
    comfortLevel: 'medium-soft',
    comfortRating: 4,
    totalThickness: 10,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century Extra-Firm', description: '4" Rebonded Foam with 90 to 95 Density (Century brand)' },
      { thickness: 2, material: 'hr_softy_foam', brand: 'Century AirFlow', description: '2" Premium Highly Resilient Softy Cushioning Foam' },
      { thickness: 4, material: 'latex', brand: 'RelaxPro Pure Organic', certification: ['GOLS'], description: '4" Pure Certified Organic Kerala Latex' }
    ],
    fabricGsm: 400,
    fabricType: 'Plush High-GSM Quilted Organic Knit Cover',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Supportive Latex Pillows', '1 Fitted Protector'],
    keyBenefit: 'Triple-layer design featuring ultra-plush resilient softy foam nested under premium pure latex to cradle heavy pressure points with heavy-duty rebonded support below',
    badge: 'Soft Contouring Orthopedic Hybrid',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 41000, queen: 34000, double: 27000, single: 20500 },
      withoutAccessories: { king: 36000, queen: 30000, double: 24000, single: 18000 }
    },
    image: 'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80',
    tier: 'premium',
    features: [
      'Advanced 3-tier build that balances extreme surface soft comfort and rigid physical alignment',
      '4 inches of dense latex on top delivers immediate muscle easing properties',
      '2" HR softy foam transition layer eliminates joint pressure spikes from the hard base element',
      '4" century 90-95 density rebond keeps the spine in strict medical alignment'
    ],
    metaTitle: 'Somya 10" Natural Latex Comfort Mattress | RelaxPro',
    metaDescription: 'Shop Somya 10-inch mattress combining natural Kerala organic latex, plush HR soft foam, and sturdy rebonded base. Pure comfort and pain-free joints.'
  },
  {
    slug: 'arogya',
    name: 'Arogya',
    tagline: 'Health starts with good sleep',
    subtitle: 'Support your body naturally with Arogya latex mattress',
    warranty: 10,
    comfortLevel: 'medium-firm',
    comfortRating: 4,
    totalThickness: 8,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century High Firm', description: '4" Rebonded Support Foam with 90 to 95 Density' },
      { thickness: 4, material: 'latex', brand: 'RelaxPro GOLS Organic', certification: ['GOLS'], description: '4" Certified Organic Kerala Latex Core' }
    ],
    fabricGsm: 400,
    fabricType: 'Anti-Bacterial Organic Cotton Quilted fabric',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Contour Latex Pillows', '1 Waterproof Terry Shield'],
    keyBenefit: 'Perfect equal split of supportive heavy rebond base foam and cushioning latex, optimized for posture relief and corrective orthopedic support',
    badge: 'Doctor Recommended Ortho Core',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 38000, queen: 31500, double: 26000, single: 19000 },
      withoutAccessories: { king: 33000, queen: 27500, double: 23000, single: 16500 }
    },
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    tier: 'premium',
    features: [
      '50/50 balance engineering specifically configured for chronic lower back and spinal recovery',
      'Substantial 4" pure Kerala natural latex gives correct support for standard hip/shoulder pressure zones',
      'Durable orthopedic rebonded block distributes skeletal loads evenly, promoting healthier sleep postures',
      'Oeko-Tex certified cover prevents chemical off-gassing so you inhale clean air all night'
    ],
    metaTitle: 'Arogya 8" Orthopedic Latex Mattress | RelaxPro',
    metaDescription: 'Configure Arogya 8"-thick premium mattress with 4" GOLS latex and 4" high-density orthopedic rebond foam base. Eradicate back soreness.'
  },
  {
    slug: 'shuddha',
    name: 'Shuddha',
    tagline: 'Pure sleep begins here',
    subtitle: 'Shuddha is made for those who choose natural comfort',
    warranty: 10,
    comfortLevel: 'medium',
    comfortRating: 4,
    totalThickness: 6,
    layers: [
      { thickness: 4, material: 'latex_rebonded', brand: 'RelaxPro Eco Core', description: '4" Latex Rebonded Foam with Eco GOLS shredded materials (120 Density)' },
      { thickness: 2, material: 'latex', brand: 'RelaxPro Certified Organic', certification: ['GOLS'], description: '2" Pure Certified Organic Kerala Latex' }
    ],
    fabricGsm: 400,
    fabricType: '400 GSM Soft Quilted Breathable Bamboo Fiber',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Organic Shredded Pillows', '1 Protective Guard'],
    keyBenefit: 'Slick low-profile layout combining an eco-dense rebonded latex base with a highly responsive pure latex sleep zone',
    badge: 'Optimal Height Natural Comfort',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 33000, queen: 27500, double: 22000, single: 16500 },
      withoutAccessories: { king: 28000, queen: 23500, double: 19000, single: 14500 }
    },
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    tier: 'premium',
    features: [
      'Engineered with advanced upcycled latex-bonded material preserving high durability at a smart cost',
      '2" top of organic natural latex adds that signature luxury spring-back comfort',
      '120-density core provides high load distribution, preventing that sunken trapped feel',
      'Encased in Hypoallergenic highly woven fabric that guards against dust mites and moisture build'
    ],
    metaTitle: 'Shuddha 6" Premium Pure Latex Hybrid Mattress | RelaxPro',
    metaDescription: 'Buy Shuddha 6-inch premium mattress with natural latex and eco-dense rebond latex block. Organic comfort, medium support.'
  },
  {
    slug: 'sthira',
    name: 'Sthira',
    tagline: 'Strong support for deep sleep',
    subtitle: 'Firm, Stable comfort with Sthira latex mattress',
    warranty: 10,
    comfortLevel: 'firm',
    comfortRating: 5,
    totalThickness: 6,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century 95 Density Ortho', description: '4" Rebonded Support Foam with 90 to 95 Density (Century brand)' },
      { thickness: 2, material: 'latex', brand: 'RelaxPro GOLS Certified', certification: ['GOLS'], description: '2" pure certified organic Kerala latex' }
    ],
    fabricGsm: 450,
    fabricType: '400-450 GSM Quilted High-Knit Organic Fabric with Oeko-Tex Cert',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Soft Latex Pillows', '1 Mattress Protector'],
    keyBenefit: 'Highly requested firm orthopedic model packing a dense base with a high-tensile latex layer, designed specifically to address chronic posture issues',
    badge: 'Perfect Firm Extra-Support Ortho',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 27000, queen: 22500, double: 18000, single: 13500 },
      withoutAccessories: { king: 22000, queen: 18500, double: 15000, single: 11000 }
    },
    image: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=800&q=80',
    tier: 'premium',
    features: [
      'Firm orthopedic configuration that corrects bad sleeping habits and stabilizes the lumbar spine',
      '4" ultra-high density Century orthopedic foam block prevents any structural deflection',
      '2" true pure latex on top adds necessary gentle cushioning so hips and shoulders do not ache',
      'Tough premium knit fabric quilted to resist fiber shearing and extend product life'
    ],
    metaTitle: 'Sthira 6" Firm Orthopedic Latex Mattress | RelaxPro',
    metaDescription: 'Shop Sthira 6-inch extra supportive firm mattress. Features 4" heavy rebonded base and 2" organic latex luxury topper. Highly durable.'
  },
  {
    slug: 'bhumi',
    name: 'Bhumi',
    tagline: 'Strong Stable Support Inspired by the Earth',
    subtitle: 'Experience balanced sleep with Bhumi latex mattress',
    warranty: 10,
    comfortLevel: 'medium-firm',
    comfortRating: 4,
    totalThickness: 8,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century PU Rebonded', description: '4" PU Rebonded Support Base (Century Brand)' },
      { thickness: 2, material: 'latex_rebonded', brand: 'RelaxPro Eco Core', description: '2" Latex Rebonded Cushioning transition layer (120 Density)' },
      { thickness: 2, material: 'latex', brand: 'RelaxPro Pure Organic', certification: ['GOLS'], description: '2" Pure Certified Organic Kerala Latex' }
    ],
    fabricGsm: 400,
    fabricType: 'Soft Breathable Bamboo Knit Comfort Fabric',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Soft Latex Pillows', '1 Protective Cover'],
    keyBenefit: 'Triple-firm hybrid stacking rebonded base, latex-rebonded core, and luxurious latex cover for layered structural support inspired by organic earth strata',
    badge: 'Multi-Adaptive Posture Layering',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 33000, queen: 27500, double: 22000, single: 16500 },
      withoutAccessories: { king: 28000, queen: 23500, double: 19000, single: 14500 }
    },
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    tier: 'premium',
    features: [
      'Layered progressive firmness: gets firmer as more compression force is applied',
      'Combination of raw polyurethane rebond, eco latex rebond, and classic virgin latex sap sheets',
      'Helps back-sleepers keep their pelvis neutral and chest chest-aligned',
      'Fully organic bamboo breathable cover keeps standard moisture away from core foams'
    ],
    metaTitle: 'Bhumi 8" Triple-Core Hybrid Latex Mattress | RelaxPro',
    metaDescription: 'Unlock restorative sleep with Bhumi 8-inch mattress. Advanced triple core combining GOLS organic latex, latex-rebonded and PU-rebond base.'
  },
  {
    slug: 'sunidra',
    name: 'Sunidra',
    tagline: 'Sleep Deeper, Wake Refreshed',
    subtitle: 'Experience peaceful nights with Sunidra latex mattress',
    warranty: 10,
    comfortLevel: 'medium',
    comfortRating: 4,
    totalThickness: 8,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century High Firm', description: '4" Rebonded Base Foam with 90 to 95 Density' },
      { thickness: 2, material: 'hr_softy_foam', brand: 'Century AirFlow Softy', description: '2" Premium HR Softy transition foam' },
      { thickness: 2, material: 'latex', brand: 'RelaxPro Certified Organic', certification: ['GOLS'], description: '2" Pure Certified Organic Kerala Latex' }
    ],
    fabricGsm: 400,
    fabricType: 'Quilted High GSM Knitted Fabric with Anti-dustguard Cover',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Luxurious Latex Pillows', '1 Waterproof Protector'],
    keyBenefit: 'Three-layer premium hybrid with cooling soft transition elements, delivering reliable medium comfort suitable for all types of sleepers',
    badge: 'Universal Medium All-Rounder',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 30000, queen: 25000, double: 20000, single: 15000 },
      withoutAccessories: { king: 25000, queen: 21000, double: 17000, single: 12500 }
    },
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    tier: 'comfort',
    features: [
      'Universal comfort profile that adapts effortlessly to side, back, and stomach sleepers',
      '2" GOLS certified top natural latex delivers excellent active pressure point reduction',
      'Middle 2" highly resilient softy foam cushions sensitive areas like collarbones and tailbones',
      'Eco-knit cover protects skin and blocks humidity spikes to keep sleeping surfaces dry'
    ],
    metaTitle: 'Sunidra 8" Universal Latex Comfort Mattress | RelaxPro',
    metaDescription: 'Buy Sunidra 8-inch medium comfort mattress by RelaxPro. Sturdy rebonded core, breathable HR softy layer, and 2" pure natural latex sheet.'
  },
  {
    slug: 'vishram',
    name: 'Vishram',
    tagline: 'Rest, Relaxation, Complete Ease',
    subtitle: 'Vishram designed for true rest and deep relaxation',
    warranty: 10,
    comfortLevel: 'medium',
    comfortRating: 3,
    totalThickness: 7,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century High Density', description: '4" Rebonded support base (95 density)' },
      { thickness: 2, material: 'hr_softy_foam', brand: 'Century Softy', description: '2" highly responsive HR softy foam' },
      { thickness: 1, material: 'latex', brand: 'RelaxPro Organic Sheet', certification: ['GOLS'], description: '1" Pure Certified Organic Kerala Latex Sheet' }
    ],
    fabricGsm: 400,
    fabricType: 'Premium Quilted Soft Knit Organic Cover',
    certifications: ['GOLS', 'Oeko-Tex'],
    accessories: ['2 Comfortable Latex Pillows', '1 Waterproof Elastic Shield'],
    keyBenefit: 'Sleek entry-level latex hybrid focusing on value, blending standard cushioning transition foam with a genuine touch of natural latex comfort',
    badge: 'Great Value Sleep Solution',
    pricingModel: 'with_without_accessories',
    pricing: {
      withAccessories: { king: 24000, queen: 20000, double: 16000, single: 12000 },
      withoutAccessories: { king: 19000, queen: 16000, double: 13000, single: 9500 }
    },
    image: 'https://images.unsplash.com/photo-1540518614846-7eded433c457?auto=format&fit=crop&w=800&q=80',
    tier: 'comfort',
    features: [
      'Affordable entry layer to the luxurious universe of raw natural latex sleep',
      '1" organic Kerala latex sheet blocks thermal heat pockets of the base foams',
      '2" HR soft pillow cushioning transitions body lines smoothly onto the base layer',
      'century-standard dense base supports heavy weights without structural fatigue'
    ],
    metaTitle: 'Vishram 7" Hybrid Value Latex Mattress | RelaxPro',
    metaDescription: 'Experience Vishram 7" mattress: 4" Century rebond, 2" softy cushioning, and 1" raw natural latex. Comfort and savings combined.'
  },
  {
    slug: 'ojas',
    name: 'Ojas',
    tagline: 'Wake up refreshed and energised every morning',
    subtitle: 'Feel the power of natural sleep with Ojas ortho mattress',
    warranty: 10,
    comfortLevel: 'firm',
    comfortRating: 3,
    totalThickness: 6,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century Ortho', description: '4" Ultra-Firm Rebonded Support base foam' },
      { thickness: 2, material: 'hr_softy_foam', brand: 'Century Responsive', description: '2" highly responsive high-resilience softy foam' }
    ],
    fabricGsm: 300,
    fabricType: 'Super Soft 300 GSM Premium Micro-Quilted Cover',
    certifications: ['Oeko-Tex', 'CertiPUR-US'],
    accessories: ['2 Orthopedic Shredded Pillows', '1 Mattress Protector Shield'],
    keyBenefit: 'Value orthopedic mattress without natural latex, utilizing high density resilience softy core for back safety and deep recovery at an accessible price',
    badge: 'Best Ortho Value Mattress',
    pricingModel: 'fabric_options',
    pricing: {
      fabric300Gsm: { king: 13000, queen: 11000, double: 8500, single: 6500 },
      fabric450Gsm: { king: 15000, queen: 13000, double: 10000, single: 7500 }
    },
    image: 'https://images.unsplash.com/photo-1505693395321-883724634266?auto=format&fit=crop&w=800&q=80',
    tier: 'comfort',
    features: [
      'Tailored for budgets looking for robust spine stabilization without latex premium tags',
      'Dual foam profile: 4" highly dense rebond base with heavy 2" soft resilience topper',
      'Available with upgradable premium fabric options: 300 GSM standard vs 450 GSM luxury quilted',
      'Aero-ventilation channels promote passive heat dissipation'
    ],
    metaTitle: 'Ojas Ortho Value Mattress - Standard & Quilted Covers | RelaxPro',
    metaDescription: 'Buy Ojas 6" Orthopedic mattress. Tailored with density transitions for spine safety. Choose 300 GSM standard or upgrade to 450 GSM deluxe quilting.'
  },
  {
    slug: 'ayushrest',
    name: 'AyushRest',
    tagline: 'Sleep built to last',
    subtitle: 'Long-term comfort with AyushRest ortho mattress',
    warranty: 10,
    comfortLevel: 'firm',
    comfortRating: 4,
    totalThickness: 8,
    layers: [
      { thickness: 4, material: 'rebonded_foam', brand: 'Century Heavy Ortho', description: '4" Extra Density Rebonded Base Foam' },
      { thickness: 2, material: 'hr_foam', brand: 'Century Ortho HR', description: '2" High-Resilience Firm Orthopedic Support Foam' },
      { thickness: 2, material: 'hr_softy_foam', brand: 'Century Softy Cushion', description: '2" Super Soft Cushioning HR Softy Foam' }
    ],
    fabricGsm: 300,
    fabricType: 'Breathable 300 GSM Micro-Knit comfort weave fabric',
    certifications: ['Oeko-Tex'],
    accessories: ['2 Organic Pillows', '1 Waterproof Mattress Sheet'],
    keyBenefit: 'Heavy-duty 8" triple density orthopedic foam mattress featuring customized comfort zones to safely distribute skeletal weight and prevent pressure spots',
    badge: 'Tough Long-Life Ortho Choice',
    pricingModel: 'fabric_options',
    pricing: {
      fabric300Gsm: { king: 16000, queen: 13500, double: 10500, single: 8000 },
      fabric450Gsm: { king: 18000, queen: 15500, double: 12000, single: 9000 }
    },
    image: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=800&q=80',
    tier: 'comfort',
    features: [
      'Thick 8" orthopedic profile without latex, packing three distinct posture layers',
      'Heavy-duty 4" rebound base combined with central 2" structured orthopedic HR density',
      'Crowned with a plush 2" Century softy cushion, preventing skin or bone pressure sores',
      'Customizable cover fabric finishes for tailored texture and heat performance'
    ],
    metaTitle: 'AyushRest 8" Orthopedic Foam Mattress | RelaxPro',
    metaDescription: 'Explore the AyushRest 8" orthopedic mattress by RelaxPro. Three high-performance foam layers protect orthopedic alignment perfectly with custom fabric.'
  }
];

export const TESTIMONIALS = [
  {
    id: 't1',
    name: 'Srinivas Rao',
    city: 'Hyderabad',
    rating: 5,
    comment: 'Buying the Nirvana mattress was the best decision for my chronic lower back issues. The 7-Zone support works like a charm. Absolutely highly recommended!',
    product: 'Nirvana 8"'
  },
  {
    id: 't2',
    name: 'Anvitha Reddy',
    city: 'Bangalore',
    rating: 5,
    comment: 'We got the Amrita mattress 6 months ago. Incredible comfort. It isolates motion perfectly; I do not feel my husband tossing and turning at all. The direct factory price represents fantastic value.',
    product: 'Amrita 10" Hybrid'
  },
  {
    id: 't3',
    name: 'Rajendra Prasad',
    city: 'Rajahmundry',
    rating: 5,
    comment: 'Sthira is perfect for those who want a firm but very comfortable orthopedic feel. Suresh the manufacturer explained the layers clearly. Excellent customer service!',
    product: 'Sthira 6"'
  },
  {
    id: 't4',
    name: 'Deepak Sharma',
    city: 'Hyderabad',
    rating: 5,
    comment: 'I am amazed by the Custom Mattress builder! I configured a custom 10-inch mattress with 5 inches of raw Kerala latex and it was delivered within 6 days. Best sleep ever.',
    product: 'Custom Build'
  }
];

export const LOCATIONS = [
  {
    city: 'Hyderabad',
    address: 'RelaxPro Factory Showroom, Jeedimetla Industrial Area, Phase 3, Near Prasad Labs, Hyderabad, Telangana - 500055',
    phones: ['+918977024494', '+917207424494'],
    hours: 'Mon - Sun: 10:00 AM - 9:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3807.41!2d78.434!3d17.415!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb973a00000001%3A0x6bba8dddb9c17679!2sHyderabad!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin'
  },
  {
    city: 'Rajahmundry',
    address: 'RelaxPro Experience Store, Danavaipeta Mall Road, Opposite Municipal Complex, Rajahmundry, Andhra Pradesh - 533103',
    phones: ['+918977024494'],
    hours: 'Mon - Sat: 10:00 AM - 8:30 PM, Sun: 11:00 AM - 7:00 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3815.11!2d81.777!3d17.000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37a3b333333333%3A0x1111111111111111!2sRajahmundry!5e0!3m2!1sen!2sin!4v1620000000001!5m2!1sen!2sin'
  },
  {
    city: 'Bangalore',
    address: 'RelaxPro Partner Store, Indiranagar 100 Feet Road, Near Halasuru Metro Station, Bangalore, Karnataka - 560038',
    phones: ['+917207424494'],
    hours: 'Mon - Sun: 10:30 AM - 8:30 PM',
    mapUrl: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.91!2d77.638!3d12.971!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae13f000000001%3A0x1111111111111112!2sIndiranagar!5e0!3m2!1sen!2sin!4v1620000000002!5m2!1sen!2sin'
  }
];
