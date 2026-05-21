import { useEffect, useRef } from 'react';
import type { UseFormReturn } from 'react-hook-form';
import { readJSON, writeJSON, clearKey, StorageKeys } from '@/lib/storage/localStorage';
import { defaultQuoteValues, type QuoteDraftValues } from '@/lib/schema/quote';

export function loadDraft(): QuoteDraftValues {
  const stored = readJSON<QuoteDraftValues>(StorageKeys.draft);
  if (!stored) return defaultQuoteValues;
  // Shallow-deep merge so newly added top-level fields don't crash older drafts.
  return {
    ...defaultQuoteValues,
    ...stored,
    customer: { ...defaultQuoteValues.customer, ...(stored.customer ?? {}) },
    origin: { ...defaultQuoteValues.origin, ...(stored.origin ?? {}) },
    destination: { ...defaultQuoteValues.destination, ...(stored.destination ?? {}) },
    schedule: { ...defaultQuoteValues.schedule, ...(stored.schedule ?? {}) },
    inventory: { ...defaultQuoteValues.inventory, ...(stored.inventory ?? {}) },
    services: { ...defaultQuoteValues.services, ...(stored.services ?? {}) },
    details: { ...defaultQuoteValues.details, ...(stored.details ?? {}) },
    quotation: { ...defaultQuoteValues.quotation, ...(stored.quotation ?? {}) },
  };
}

export function clearDraft() {
  clearKey(StorageKeys.draft);
}

export function useDraftAutosave(form: UseFormReturn<QuoteDraftValues>) {
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => {
    const sub = form.watch((values) => {
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        writeJSON(StorageKeys.draft, values);
      }, 300);
    });
    return () => {
      window.clearTimeout(timer.current);
      sub.unsubscribe();
    };
  }, [form]);
}
