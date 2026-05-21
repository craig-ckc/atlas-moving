import { z } from 'zod';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
} from './steps';

// Compose every step into the final form schema. Each step is an object schema
// that owns a unique top-level field, so a plain `merge` chain works.
export const quoteSchema = step1Schema
  .merge(step2Schema)
  .merge(step3Schema)
  .merge(step4Schema)
  .merge(step5Schema)
  .merge(step6Schema)
  .merge(step7Schema)
  .merge(step8Schema);

export type QuoteFormValues = z.infer<typeof quoteSchema>;

// Permissive type used while the user is still filling things out (booleans
// like `confirmAccurate` aren't literally `true` yet).
export type QuoteDraftValues = {
  customer: QuoteFormValues['customer'];
  origin: QuoteFormValues['origin'];
  sameAsOrigin?: boolean;
  destination: QuoteFormValues['destination'];
  schedule: QuoteFormValues['schedule'];
  inventory: QuoteFormValues['inventory'];
  services: QuoteFormValues['services'];
  details: QuoteFormValues['details'];
  quotation: {
    type: QuoteFormValues['quotation']['type'];
    confirmAccurate: boolean;
    agreeContact: boolean;
  };
};

export const defaultQuoteValues: QuoteDraftValues = {
  customer: {
    fullName: '',
    phone: '',
    altPhone: undefined,
    email: '',
    preferredContact: 'whatsapp',
  },
  origin: {
    address: '',
    suburb: '',
    floor: undefined,
    buildingType: 'apartment',
    otherBuilding: undefined,
    hasElevator: false,
    hasStairs: false,
    flightsOfStairs: undefined,
    parkingAvailable: true,
  },
  sameAsOrigin: false,
  destination: {
    address: '',
    suburb: '',
    floor: undefined,
    buildingType: 'apartment',
    otherBuilding: undefined,
    hasElevator: false,
    hasStairs: false,
    flightsOfStairs: undefined,
    parkingAvailable: true,
  },
  schedule: {
    date: '',
    time: '',
    flexible: false,
    propertyType: '1bed',
  },
  inventory: {
    furniture: {},
    fragileItems: [],
    fragileNotes: undefined,
    otherFurniture: undefined,
  },
  services: {
    packing: 'none',
    packingExtras: [],
    unpacking: [],
    cleaning: 'none',
    additional: [],
  },
  details: {
    specialInstructions: undefined,
    photos: [],
  },
  quotation: {
    type: 'online',
    confirmAccurate: false,
    agreeContact: false,
  },
};

// --- Submission record (shape kept in the Zustand store) ------------------

export type SubmissionStatus = 'new' | 'quoted' | 'booked' | 'done';

export const SUBMISSION_STATUSES: SubmissionStatus[] = [
  'new',
  'quoted',
  'booked',
  'done',
];

export type SubmissionNote = {
  id: string;
  at: string;
  body: string;
};

export type Submission = {
  id: string;
  createdAt: string;
  status: SubmissionStatus;
  notes: SubmissionNote[];
  data: QuoteFormValues;
};
