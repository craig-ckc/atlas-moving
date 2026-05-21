import { z } from 'zod';

// --- shared helpers --------------------------------------------------------

const required = (label: string) =>
  z.string().trim().min(1, { message: `${label} is required` });

const optionalString = z
  .string()
  .trim()
  .optional()
  .or(z.literal('').transform(() => undefined));

const addressBlock = z.object({
  address: required('Address'),
  suburb: required('Area / suburb'),
  floor: optionalString,
  buildingType: z.enum(['apartment', 'house', 'office', 'student', 'other']),
  otherBuilding: optionalString,
  hasElevator: z.boolean(),
  hasStairs: z.boolean(),
  flightsOfStairs: z.number().int().min(1).max(40).optional(),
  parkingAvailable: z.boolean(),
});

const refineAddress = (val: z.infer<typeof addressBlock>, ctx: z.RefinementCtx) => {
  if (val.hasStairs && (val.flightsOfStairs == null || val.flightsOfStairs < 1)) {
    ctx.addIssue({
      code: 'custom',
      path: ['flightsOfStairs'],
      message: 'Tell us how many flights',
    });
  }
  if (val.buildingType === 'other' && !val.otherBuilding) {
    ctx.addIssue({
      code: 'custom',
      path: ['otherBuilding'],
      message: 'Describe the building type',
    });
  }
};

// --- step 1: customer ------------------------------------------------------

export const step1Schema = z.object({
  customer: z.object({
    fullName: required('Full name'),
    phone: required('Phone number').refine((v) => v.replace(/\D/g, '').length >= 7, {
      message: 'Looks too short — include the area code',
    }),
    altPhone: optionalString,
    email: required('Email').email('Enter a valid email'),
    preferredContact: z.enum(['call', 'whatsapp', 'email']),
  }),
});

// --- step 2: moving from --------------------------------------------------

export const step2Schema = z.object({
  origin: addressBlock.superRefine(refineAddress),
});

// --- step 3: moving to ----------------------------------------------------

export const step3Schema = z.object({
  sameAsOrigin: z.boolean().optional(),
  destination: addressBlock.superRefine(refineAddress),
});

// --- step 4: schedule -----------------------------------------------------

export const step4Schema = z.object({
  schedule: z.object({
    date: required('Moving date'),
    time: required('Preferred time'),
    flexible: z.boolean(),
    propertyType: z.enum([
      'studio',
      '1bed',
      '2bed',
      '3bed',
      '4bed',
      'office',
      'single-item',
    ]),
  }),
});

// --- step 5: inventory ----------------------------------------------------

export const step5Schema = z.object({
  inventory: z.object({
    furniture: z.record(z.string(), z.number().int().min(0).max(99)),
    fragileItems: z.array(z.string()),
    fragileNotes: optionalString,
    otherFurniture: optionalString,
  }),
});

// --- step 6: services -----------------------------------------------------

export const step6Schema = z.object({
  services: z.object({
    packing: z.enum([
      'full',
      'partial',
      'boxes-only',
      'materials',
      'already-packed',
      'none',
    ]),
    packingExtras: z.array(z.string()),
    unpacking: z.array(z.enum(['unload', 'unpack', 'arrange', 'full-setup'])),
    cleaning: z.enum(['none', 'move-out', 'move-in', 'both']),
    additional: z.array(z.string()),
  }),
});

// --- step 7: details ------------------------------------------------------

export const step7Schema = z.object({
  details: z.object({
    specialInstructions: optionalString,
    photos: z.array(
      z.object({
        photoId: z.string(),
        name: z.string(),
        size: z.number(),
        mimeType: z.string(),
      })
    ),
  }),
});

// --- step 8: quotation + terms --------------------------------------------

export const step8Schema = z.object({
  quotation: z.object({
    type: z.enum(['online', 'site-visit']),
    confirmAccurate: z.literal(true, {
      error: 'Please confirm the information is accurate',
    }),
    agreeContact: z.literal(true, {
      error: 'We need permission to contact you about your quote',
    }),
  }),
});

// --- fields-for-step (used by form.trigger() on Next) ---------------------

export const STEP_FIELDS = [
  // step 1
  [
    'customer.fullName',
    'customer.phone',
    'customer.altPhone',
    'customer.email',
    'customer.preferredContact',
  ],
  // step 2
  [
    'origin.address',
    'origin.suburb',
    'origin.floor',
    'origin.buildingType',
    'origin.otherBuilding',
    'origin.hasElevator',
    'origin.hasStairs',
    'origin.flightsOfStairs',
    'origin.parkingAvailable',
  ],
  // step 3
  [
    'sameAsOrigin',
    'destination.address',
    'destination.suburb',
    'destination.floor',
    'destination.buildingType',
    'destination.otherBuilding',
    'destination.hasElevator',
    'destination.hasStairs',
    'destination.flightsOfStairs',
    'destination.parkingAvailable',
  ],
  // step 4
  [
    'schedule.date',
    'schedule.time',
    'schedule.flexible',
    'schedule.propertyType',
  ],
  // step 5
  [
    'inventory.furniture',
    'inventory.fragileItems',
    'inventory.fragileNotes',
    'inventory.otherFurniture',
  ],
  // step 6
  [
    'services.packing',
    'services.packingExtras',
    'services.unpacking',
    'services.cleaning',
    'services.additional',
  ],
  // step 7
  ['details.specialInstructions', 'details.photos'],
  // step 8
  ['quotation.type', 'quotation.confirmAccurate', 'quotation.agreeContact'],
] as const;
