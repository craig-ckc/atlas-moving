import type { ComponentType } from 'react';
import type { ZodTypeAny } from 'zod';
import {
  step1Schema,
  step2Schema,
  step3Schema,
  step4Schema,
  step5Schema,
  step6Schema,
  step7Schema,
  step8Schema,
  STEP_FIELDS,
} from '@/lib/schema/steps';
import { Step1Customer } from './Step1Customer';
import { Step2MovingFrom } from './Step2MovingFrom';
import { Step3MovingTo } from './Step3MovingTo';
import { Step4Schedule } from './Step4Schedule';
import { Step5Inventory } from './Step5Inventory';
import { Step6Services } from './Step6Services';
import { Step7Details } from './Step7Details';
import { Step8Review } from './Step8Review';

export type StepDef = {
  slug: string;
  title: string;
  shortTitle: string;
  subtitle?: string;
  component: ComponentType;
  schema: ZodTypeAny;
  fields: ReadonlyArray<string>;
};

export const STEPS: StepDef[] = [
  {
    slug: 'customer',
    title: 'Tell us how to reach you',
    shortTitle: 'Your details',
    subtitle: 'A few quick details so we can send your quote.',
    component: Step1Customer,
    schema: step1Schema,
    fields: STEP_FIELDS[0],
  },
  {
    slug: 'moving-from',
    title: 'Where are you moving from?',
    shortTitle: 'Origin',
    subtitle: 'Tell us about the pickup location.',
    component: Step2MovingFrom,
    schema: step2Schema,
    fields: STEP_FIELDS[1],
  },
  {
    slug: 'moving-to',
    title: 'Where are you moving to?',
    shortTitle: 'Destination',
    subtitle: 'Now the drop-off location.',
    component: Step3MovingTo,
    schema: step3Schema,
    fields: STEP_FIELDS[2],
  },
  {
    slug: 'schedule',
    title: 'When are we moving you?',
    shortTitle: 'Schedule',
    subtitle: 'Pick a date and the size of the move.',
    component: Step4Schedule,
    schema: step4Schema,
    fields: STEP_FIELDS[3],
  },
  {
    slug: 'inventory',
    title: 'What are we bringing?',
    shortTitle: 'Inventory',
    subtitle: 'Add anything large or fragile — we’ll handle the rest.',
    component: Step5Inventory,
    schema: step5Schema,
    fields: STEP_FIELDS[4],
  },
  {
    slug: 'services',
    title: 'How much should we handle?',
    shortTitle: 'Services',
    subtitle: 'Packing, cleaning, setup — choose what helps.',
    component: Step6Services,
    schema: step6Schema,
    fields: STEP_FIELDS[5],
  },
  {
    slug: 'details',
    title: 'Anything else we should know?',
    shortTitle: 'Details & photos',
    subtitle: 'Add photos and notes to get a more accurate quote.',
    component: Step7Details,
    schema: step7Schema,
    fields: STEP_FIELDS[6],
  },
  {
    slug: 'review',
    title: 'Review and submit',
    shortTitle: 'Review',
    subtitle: 'Confirm everything looks right, then send it our way.',
    component: Step8Review,
    schema: step8Schema,
    fields: STEP_FIELDS[7],
  },
];

export function getStepIndex(slug?: string) {
  if (!slug) return 0;
  const i = STEPS.findIndex((s) => s.slug === slug);
  return i === -1 ? 0 : i;
}
