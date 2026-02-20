
import { Product, Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'fasteners', name: 'Fasteners', icon: 'fa-bolt', itemCount: 154200 },
  { id: 'tools', name: 'Tools & Equipment', icon: 'fa-wrench', itemCount: 42300 },
  { id: 'safety', name: 'Safety', icon: 'fa-hard-hat', itemCount: 12100 },
  { id: 'plumbing', name: 'Plumbing', icon: 'fa-faucet', itemCount: 8500 },
  { id: 'electrical', name: 'Electrical', icon: 'fa-bolt-lightning', itemCount: 14200 },
  { id: 'material-handling', name: 'Material Handling', icon: 'fa-dolly', itemCount: 6700 },
  { id: 'cutting-tools', name: 'Cutting Tools', icon: 'fa-scissors', itemCount: 21000 },
  { id: 'janitorial', name: 'Janitorial', icon: 'fa-broom', itemCount: 5400 },
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 'p1',
    name: 'Hex Cap Screw, Grade 8, 1/2-13 x 2"',
    category: 'fasteners',
    price: 1.45,
    unit: 'Each',
    sku: 'AL-FAS-10293',
    description: 'High-strength steel hex cap screw, zinc yellow plated for corrosion resistance.',
    image: 'https://picsum.photos/seed/bolt1/400/400',
    specifications: { 'Grade': '8', 'Material': 'Steel', 'Finish': 'Zinc Yellow', 'Thread Size': '1/2-13' }
  },
  {
    id: 'p2',
    name: 'Industrial Torque Wrench, 1/2" Drive',
    category: 'tools',
    price: 189.99,
    unit: 'Each',
    sku: 'AL-TOO-88210',
    description: 'Precision calibrated torque wrench with heavy-duty storage case.',
    image: 'https://picsum.photos/seed/wrench/400/400',
    specifications: { 'Drive Size': '1/2"', 'Torque Range': '30-250 ft-lb', 'Length': '24"' }
  },
  {
    id: 'p3',
    name: 'Safety Glasses, Anti-Fog Clear Lens',
    category: 'safety',
    price: 8.50,
    unit: 'Pair',
    sku: 'AL-SAF-44102',
    description: 'Ultra-lightweight safety glasses with scratch-resistant coating.',
    image: 'https://picsum.photos/seed/glasses/400/400',
    specifications: { 'Lens Color': 'Clear', 'ANSI Rating': 'Z87.1', 'Coating': 'Anti-Fog' }
  },
  {
    id: 'p4',
    name: 'Nitrile Gloves, Powder Free, Large',
    category: 'safety',
    price: 15.95,
    unit: 'Box of 100',
    sku: 'AL-SAF-99012',
    description: 'Disposable nitrile gloves for industrial and laboratory use.',
    image: 'https://picsum.photos/seed/gloves/400/400',
    specifications: { 'Material': 'Nitrile', 'Thickness': '5 mil', 'Size': 'Large' }
  },
  {
    id: 'p5',
    name: 'LED Site Light, 5000 Lumens',
    category: 'electrical',
    price: 124.00,
    unit: 'Each',
    sku: 'AL-ELE-55123',
    description: 'Rugged portable LED site light for construction zones.',
    image: 'https://picsum.photos/seed/light/400/400',
    specifications: { 'Brightness': '5000 lm', 'Voltage': '120V', 'IP Rating': 'IP65' }
  },
  {
    id: 'p6',
    name: 'Heavy Duty Steel Dolly, 1000lb Cap',
    category: 'material-handling',
    price: 245.00,
    unit: 'Each',
    sku: 'AL-MAT-22310',
    description: 'Solid steel construction with 4-way caster wheels.',
    image: 'https://picsum.photos/seed/dolly/400/400',
    specifications: { 'Capacity': '1000 lbs', 'Wheel Type': 'Rubber', 'Material': 'Steel' }
  }
];
