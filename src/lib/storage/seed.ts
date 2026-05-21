import type { Submission } from '@/lib/schema/quote';
import { readJSON, writeJSON, StorageKeys } from './localStorage';
import { useSubmissionsStore } from '@/state/submissionsStore';

const SEED: Submission[] = [
  {
    id: '7e2b9c5a-2e8d-4ac7-8e4a-19f4b3e2b001',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    status: 'new',
    notes: [],
    data: {
      customer: {
        fullName: 'Mara Johansson',
        phone: '+1 415 555 0144',
        altPhone: undefined,
        email: 'mara@example.com',
        preferredContact: 'whatsapp',
      },
      origin: {
        address: '482 Hayes Street',
        suburb: 'Hayes Valley, SF',
        floor: 'Apt 3B',
        buildingType: 'apartment',
        otherBuilding: undefined,
        hasElevator: false,
        hasStairs: true,
        flightsOfStairs: 2,
        parkingAvailable: true,
      },
      destination: {
        address: '1820 Cedar Avenue',
        suburb: 'Berkeley, CA',
        floor: undefined,
        buildingType: 'house',
        otherBuilding: undefined,
        hasElevator: false,
        hasStairs: false,
        flightsOfStairs: undefined,
        parkingAvailable: true,
      },
      schedule: {
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14).toISOString().slice(0, 10),
        time: '09:00',
        flexible: true,
        propertyType: '2bed',
      },
      inventory: {
        furniture: { bed: 1, mattress: 1, sofa: 1, fridge: 1, 'washing-machine': 1, wardrobe: 2, desk: 1, 'dining-table': 1, chairs: 4 },
        fragileItems: ['mirrors', 'artwork', 'computers'],
        fragileNotes: 'Vintage record player and a framed Yayoi Kusama print — both irreplaceable.',
        otherFurniture: 'A 4ft potted fiddle-leaf fig.',
      },
      services: {
        packing: 'partial',
        packingExtras: ['bubble-wrap', 'furniture-wrap'],
        unpacking: ['unload', 'arrange'],
        cleaning: 'move-out',
        additional: ['disassembly', 'reassembly'],
      },
      details: {
        specialInstructions:
          'Front door has a tight 90° turn — measure the sofa first. Building requires reservation for elevator (none here, but the loading bay).',
        photos: [],
      },
      quotation: {
        type: 'online',
        confirmAccurate: true,
        agreeContact: true,
      },
    },
  },
  {
    id: '7e2b9c5a-2e8d-4ac7-8e4a-19f4b3e2b002',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: 'quoted',
    notes: [
      {
        id: 'n-1',
        at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
        body: 'Quoted $1,840 incl. packing. Awaiting confirmation. Customer mentioned they may need storage for ~3 weeks — flagged.',
      },
    ],
    data: {
      customer: {
        fullName: 'Devon Park',
        phone: '+1 718 555 0193',
        altPhone: '+1 718 555 0194',
        email: 'devon.park@example.com',
        preferredContact: 'email',
      },
      origin: {
        address: '212 Greenpoint Avenue',
        suburb: 'Brooklyn, NY',
        floor: '4',
        buildingType: 'apartment',
        otherBuilding: undefined,
        hasElevator: true,
        hasStairs: false,
        flightsOfStairs: undefined,
        parkingAvailable: false,
      },
      destination: {
        address: '88 Albany Court',
        suburb: 'Jersey City, NJ',
        floor: '12',
        buildingType: 'apartment',
        otherBuilding: undefined,
        hasElevator: true,
        hasStairs: false,
        flightsOfStairs: undefined,
        parkingAvailable: true,
      },
      schedule: {
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString().slice(0, 10),
        time: '11:00',
        flexible: false,
        propertyType: '1bed',
      },
      inventory: {
        furniture: { bed: 1, mattress: 1, sofa: 1, tv: 1, 'tv-stand': 1, desk: 1, 'office-chair': 1, bookshelf: 2 },
        fragileItems: ['monitors', 'computers', 'instruments'],
        fragileNotes: 'A classical guitar and a 32-inch monitor.',
        otherFurniture: undefined,
      },
      services: {
        packing: 'full',
        packingExtras: ['bubble-wrap', 'fragile-wrap', 'furniture-wrap', 'tape-materials'],
        unpacking: ['unload', 'unpack', 'arrange', 'full-setup'],
        cleaning: 'both',
        additional: ['disassembly', 'reassembly', 'storage'],
      },
      details: {
        specialInstructions:
          'Building requires COI 48h in advance. Elevator booking confirmed for 12pm slot. Storage pickup will be a separate booking.',
        photos: [],
      },
      quotation: {
        type: 'site-visit',
        confirmAccurate: true,
        agreeContact: true,
      },
    },
  },
  {
    id: '7e2b9c5a-2e8d-4ac7-8e4a-19f4b3e2b003',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    status: 'done',
    notes: [
      {
        id: 'n-1',
        at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(),
        body: 'Move completed Tuesday. Customer left a 5-star review. Send referral code to email.',
      },
    ],
    data: {
      customer: {
        fullName: 'Aiyana Lockhart',
        phone: '+1 503 555 0166',
        altPhone: undefined,
        email: 'aiyana@example.com',
        preferredContact: 'call',
      },
      origin: {
        address: '906 SE Belmont',
        suburb: 'Portland, OR',
        floor: undefined,
        buildingType: 'house',
        otherBuilding: undefined,
        hasElevator: false,
        hasStairs: false,
        flightsOfStairs: undefined,
        parkingAvailable: true,
      },
      destination: {
        address: '5400 SE Powell Blvd',
        suburb: 'Portland, OR',
        floor: undefined,
        buildingType: 'house',
        otherBuilding: undefined,
        hasElevator: false,
        hasStairs: false,
        flightsOfStairs: undefined,
        parkingAvailable: true,
      },
      schedule: {
        date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString().slice(0, 10),
        time: '07:00',
        flexible: false,
        propertyType: '3bed',
      },
      inventory: {
        furniture: { bed: 2, mattress: 2, sofa: 2, 'coffee-table': 1, 'dining-table': 1, chairs: 6, fridge: 1, 'washing-machine': 1, dryer: 1, wardrobe: 3 },
        fragileItems: ['mirrors', 'glass-tables', 'artwork'],
        fragileNotes: undefined,
        otherFurniture: 'Outdoor BBQ + patio set (6 chairs).',
      },
      services: {
        packing: 'none',
        packingExtras: [],
        unpacking: ['unload'],
        cleaning: 'none',
        additional: ['disassembly', 'reassembly', 'appliance-install'],
      },
      details: {
        specialInstructions: 'Side gate code: 2104. Two friendly dogs in the back yard.',
        photos: [],
      },
      quotation: {
        type: 'online',
        confirmAccurate: true,
        agreeContact: true,
      },
    },
  },
];

export function seedIfEmpty() {
  if (typeof window === 'undefined') return;
  if (readJSON<true>(StorageKeys.seeded)) return;
  const state = useSubmissionsStore.getState();
  if (state.submissions.length === 0) {
    state.hydrateSeed(SEED);
  }
  writeJSON(StorageKeys.seeded, true);
}
