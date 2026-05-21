import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { StorageKeys } from '@/lib/storage/localStorage';
import type {
  QuoteFormValues,
  Submission,
  SubmissionStatus,
} from '@/lib/schema/quote';

type State = {
  submissions: Submission[];
  add: (data: QuoteFormValues) => Submission;
  updateStatus: (id: string, status: SubmissionStatus) => void;
  addNote: (id: string, body: string) => void;
  deleteNote: (submissionId: string, noteId: string) => void;
  remove: (id: string) => void;
  hydrateSeed: (records: Submission[]) => void;
};

export const useSubmissionsStore = create<State>()(
  persist(
    (set) => ({
      submissions: [],

      add: (data) => {
        const record: Submission = {
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
          status: 'new',
          notes: [],
          data,
        };
        set((s) => ({ submissions: [record, ...s.submissions] }));
        return record;
      },

      updateStatus: (id, status) =>
        set((s) => ({
          submissions: s.submissions.map((x) =>
            x.id === id ? { ...x, status } : x
          ),
        })),

      addNote: (id, body) =>
        set((s) => ({
          submissions: s.submissions.map((x) =>
            x.id === id
              ? {
                  ...x,
                  notes: [
                    ...x.notes,
                    {
                      id: crypto.randomUUID(),
                      at: new Date().toISOString(),
                      body,
                    },
                  ],
                }
              : x
          ),
        })),

      deleteNote: (submissionId, noteId) =>
        set((s) => ({
          submissions: s.submissions.map((x) =>
            x.id === submissionId
              ? { ...x, notes: x.notes.filter((n) => n.id !== noteId) }
              : x
          ),
        })),

      remove: (id) =>
        set((s) => ({
          submissions: s.submissions.filter((x) => x.id !== id),
        })),

      hydrateSeed: (records) =>
        set((s) => (s.submissions.length === 0 ? { submissions: records } : s)),
    }),
    {
      name: StorageKeys.submissions,
      storage: createJSONStorage(() => localStorage),
    }
  )
);
