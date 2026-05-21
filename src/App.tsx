import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Landing } from '@/routes/Landing';
import { QuoteWizard } from '@/routes/quote/QuoteWizard';
import { QuoteComplete } from '@/routes/quote/QuoteComplete';
import { AdminLayout } from '@/routes/admin/AdminLayout';
import { SubmissionsList } from '@/routes/admin/SubmissionsList';
import { useEffect } from 'react';
import { seedIfEmpty } from '@/lib/storage/seed';

export default function App() {
  useEffect(() => {
    seedIfEmpty();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />

        <Route path="/quote" element={<QuoteWizard />} />
        <Route path="/quote/complete/:id" element={<QuoteComplete />} />
        <Route path="/quote/:stepSlug" element={<QuoteWizard />} />

        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="submissions" replace />} />
          <Route path="submissions" element={<SubmissionsList />} />
          <Route path="submissions/:id" element={<SubmissionsList />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
