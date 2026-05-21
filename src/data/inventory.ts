import {
  Armchair,
  Bed,
  Box,
  Briefcase,
  ChefHat,
  Dumbbell,
  Lamp,
  Laptop,
  type LucideIcon,
  Monitor,
  Music,
  Package,
  Palette,
  Refrigerator,
  Shirt,
  Sofa,
  Tv,
  UtensilsCrossed,
  WashingMachine,
} from 'lucide-react';

export type FurnitureItem = {
  key: string;
  label: string;
  icon: LucideIcon;
  group: 'living' | 'bedroom' | 'kitchen' | 'office' | 'other';
};

export const FURNITURE: FurnitureItem[] = [
  { key: 'bed', label: 'Bed', icon: Bed, group: 'bedroom' },
  { key: 'mattress', label: 'Mattress', icon: Bed, group: 'bedroom' },
  { key: 'wardrobe', label: 'Wardrobe', icon: Shirt, group: 'bedroom' },
  { key: 'dressing-table', label: 'Dressing table', icon: Lamp, group: 'bedroom' },
  { key: 'chest', label: 'Chest of drawers', icon: Package, group: 'bedroom' },

  { key: 'sofa', label: 'Couch / Sofa', icon: Sofa, group: 'living' },
  { key: 'coffee-table', label: 'Coffee table', icon: Armchair, group: 'living' },
  { key: 'tv', label: 'TV', icon: Tv, group: 'living' },
  { key: 'tv-stand', label: 'TV stand', icon: Tv, group: 'living' },
  { key: 'bookshelf', label: 'Bookshelf', icon: Box, group: 'living' },

  { key: 'fridge', label: 'Fridge', icon: Refrigerator, group: 'kitchen' },
  { key: 'washing-machine', label: 'Washing machine', icon: WashingMachine, group: 'kitchen' },
  { key: 'dryer', label: 'Tumble dryer', icon: WashingMachine, group: 'kitchen' },
  { key: 'dishwasher', label: 'Dishwasher', icon: ChefHat, group: 'kitchen' },
  { key: 'dining-table', label: 'Dining table', icon: UtensilsCrossed, group: 'kitchen' },
  { key: 'chairs', label: 'Dining chairs', icon: Armchair, group: 'kitchen' },

  { key: 'desk', label: 'Desk', icon: Briefcase, group: 'office' },
  { key: 'office-chair', label: 'Office chair', icon: Armchair, group: 'office' },

  { key: 'outdoor', label: 'Outdoor furniture', icon: Sofa, group: 'other' },
  { key: 'appliances', label: 'Appliances', icon: Refrigerator, group: 'other' },
  { key: 'gym', label: 'Gym equipment', icon: Dumbbell, group: 'other' },
];

export const FURNITURE_GROUPS: Array<{ key: FurnitureItem['group']; label: string }> = [
  { key: 'living', label: 'Living room' },
  { key: 'bedroom', label: 'Bedroom' },
  { key: 'kitchen', label: 'Kitchen & dining' },
  { key: 'office', label: 'Office' },
  { key: 'other', label: 'Other' },
];

export const FRAGILE_ITEMS = [
  { key: 'mirrors', label: 'Mirrors', icon: Palette },
  { key: 'glass-tables', label: 'Glass tables', icon: Palette },
  { key: 'artwork', label: 'Artwork', icon: Palette },
  { key: 'computers', label: 'Computers', icon: Laptop },
  { key: 'instruments', label: 'Musical instruments', icon: Music },
  { key: 'antiques', label: 'Antiques', icon: Box },
  { key: 'monitors', label: 'Monitors / TVs', icon: Monitor },
] as const;

export const PACKING_EXTRAS = [
  { key: 'bubble-wrap', label: 'Bubble wrap' },
  { key: 'fragile-wrap', label: 'Wrapping for fragile items' },
  { key: 'furniture-wrap', label: 'Furniture wrapping' },
  { key: 'tape-materials', label: 'Tape & packing materials' },
] as const;

export const UNPACKING_OPTIONS = [
  { key: 'unload', label: 'Unloading only', desc: 'Truck → inside the door.' },
  { key: 'unpack', label: 'Unpacking', desc: 'We empty boxes and recycle them.' },
  { key: 'arrange', label: 'Furniture arrangement', desc: 'Place furniture where you want it.' },
  { key: 'full-setup', label: 'Full setup', desc: 'Everything unboxed, placed, beds made.' },
] as const;

export const ADDITIONAL_SERVICES = [
  { key: 'disassembly', label: 'Furniture disassembly' },
  { key: 'reassembly', label: 'Furniture reassembly' },
  { key: 'appliance-install', label: 'Appliance installation' },
  { key: 'storage', label: 'Storage assistance' },
  { key: 'removal', label: 'Removal of unwanted items' },
  { key: 'office-relo', label: 'Office relocation assistance' },
] as const;

type Choice = { key: string; label: string; desc?: string };

export const PROPERTY_TYPES: ReadonlyArray<Choice> = [
  { key: 'studio', label: 'Bachelor / Studio', desc: 'A single room and bath.' },
  { key: '1bed', label: '1 bedroom', desc: 'One bedroom with living area.' },
  { key: '2bed', label: '2 bedroom' },
  { key: '3bed', label: '3 bedroom' },
  { key: '4bed', label: '4+ bedroom' },
  { key: 'office', label: 'Office move' },
  { key: 'single-item', label: 'Single-item move', desc: 'Just a couch, fridge, etc.' },
];

export const BUILDING_TYPES = [
  { key: 'apartment', label: 'Apartment' },
  { key: 'house', label: 'House' },
  { key: 'office', label: 'Office' },
  { key: 'student', label: 'Student accommodation' },
  { key: 'other', label: 'Other' },
] as const;

export const PACKING_OPTIONS: ReadonlyArray<Choice> = [
  { key: 'full', label: 'Full packing service', desc: 'We pack everything for you.' },
  { key: 'partial', label: 'Partial packing', desc: 'We handle the rooms you choose.' },
  { key: 'boxes-only', label: 'Boxes only', desc: 'Drop off boxes in advance.' },
  { key: 'materials', label: 'Materials only', desc: 'Boxes + tape + wrapping.' },
  { key: 'already-packed', label: 'Already packed', desc: 'Everything is boxed and ready.' },
  { key: 'none', label: 'No packing help', desc: 'You’ve got it covered.' },
];

export const CLEANING_OPTIONS: ReadonlyArray<Choice> = [
  { key: 'none', label: 'No cleaning' },
  { key: 'move-out', label: 'Move-out cleaning', desc: 'Old place, deep clean.' },
  { key: 'move-in', label: 'Move-in cleaning', desc: 'New place, ready to live in.' },
  { key: 'both', label: 'Both', desc: 'Move-out + move-in.' },
];

export const QUOTATION_OPTIONS: ReadonlyArray<Choice> = [
  {
    key: 'online',
    label: 'Online quote',
    desc: 'We send a price by email or WhatsApp within 24 hours.',
  },
  {
    key: 'site-visit',
    label: 'Site visit',
    desc: 'A coordinator visits to assess and quote in person.',
  },
];

export const CONTACT_METHODS = [
  { key: 'call', label: 'Phone call' },
  { key: 'whatsapp', label: 'WhatsApp' },
  { key: 'email', label: 'Email' },
] as const;
