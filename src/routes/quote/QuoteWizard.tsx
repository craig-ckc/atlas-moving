import { useEffect, useMemo, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronLeft } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { StepperRail } from '@/components/wizard/StepperRail';
import { ProgressBar } from '@/components/wizard/ProgressBar';
import { STEPS, getStepIndex } from './steps';

import {
  defaultQuoteValues,
  type QuoteDraftValues,
  type QuoteFormValues,
} from '@/lib/schema/quote';
import { useSubmissionsStore } from '@/state/submissionsStore';
import {
  clearDraft,
  loadDraft,
  useDraftAutosave,
} from '@/state/draftPersistence';

export function QuoteWizard() {
  const { stepSlug } = useParams<{ stepSlug?: string }>();
  const navigate = useNavigate();

  const initial = useRef<QuoteDraftValues>(loadDraft());

  const form = useForm<QuoteDraftValues>({
    defaultValues: initial.current ?? defaultQuoteValues,
    mode: 'onTouched',
    shouldUnregister: false,
  });

  useDraftAutosave(form);

  const currentIndex = getStepIndex(stepSlug);
  const currentStep = STEPS[currentIndex];
  const isLast = currentIndex === STEPS.length - 1;

  // Redirect bare /quote → /quote/customer
  useEffect(() => {
    if (!stepSlug) navigate(`/quote/${STEPS[0].slug}`, { replace: true });
  }, [stepSlug, navigate]);

  const goTo = (idx: number) => {
    const next = STEPS[Math.min(Math.max(idx, 0), STEPS.length - 1)];
    navigate(`/quote/${next.slug}`);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNext = async () => {
    const ok = await form.trigger(currentStep.fields as never);
    if (ok) goTo(currentIndex + 1);
  };

  const handleBack = () => goTo(currentIndex - 1);

  const addSubmission = useSubmissionsStore((s) => s.add);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    const ok = await form.trigger();
    if (!ok) {
      setSubmitting(false);
      return;
    }
    const values = form.getValues() as QuoteFormValues;
    const record = addSubmission(values);
    clearDraft();
    form.reset(defaultQuoteValues);
    setSubmitting(false);
    navigate(`/quote/complete/${record.id}`);
  };

  const StepComponent = currentStep.component;
  const memoSteps = useMemo(() => STEPS, []);

  return (
    <FormProvider {...form}>
      <div className="min-h-dvh px-4 py-6 sm:py-10 md:py-14">
        <div className="mx-auto w-full max-w-6xl">
          {/* Top bar */}
          <div className="mb-5 flex items-center justify-between px-1">
            <Logo />
            <a
              href="/"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-700 hover:text-slate-900"
            >
              <ChevronLeft className="h-4 w-4" />
              Back to home
            </a>
          </div>

          <div className="rounded-[var(--radius-card)] bg-white ring-1 ring-white/60 card-shadow overflow-hidden">
            {/* Mobile: progress bar across the top */}
            <div className="border-b border-slate-200/70 px-5 py-4 md:hidden">
              <ProgressBar steps={memoSteps} currentIndex={currentIndex} />
            </div>

            <div className="grid md:grid-cols-[260px_minmax(0,1fr)]">
              {/* Desktop: left rail */}
              <aside className="hidden border-r border-slate-200/70 px-6 py-7 md:block">
                <StepperRail
                  steps={memoSteps}
                  currentIndex={currentIndex}
                  onStepClick={(i) => goTo(i)}
                />
              </aside>

              <section className="relative flex min-h-[560px] flex-col">
                <div className="flex-1 px-5 py-7 sm:px-8 sm:py-9">
                  <div className="max-w-2xl">
                    <h1 className="text-2xl font-semibold tracking-tight text-slate-900 sm:text-[26px]">
                      {currentStep.title}
                    </h1>
                    {currentStep.subtitle && (
                      <p className="mt-1.5 text-[15px] text-slate-500">{currentStep.subtitle}</p>
                    )}

                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentStep.slug}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        transition={{ duration: 0.18, ease: [0.2, 0.8, 0.2, 1] }}
                        className="mt-7 flex flex-col gap-7"
                      >
                        <StepComponent />
                      </motion.div>
                    </AnimatePresence>
                  </div>
                </div>

                <footer className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200/70 bg-white/95 px-5 py-3.5 backdrop-blur sm:px-8">
                  <Button
                    variant="ghost"
                    size="md"
                    onClick={handleBack}
                    disabled={currentIndex === 0}
                    iconLeft={<ArrowLeft className="h-4 w-4" />}
                  >
                    Back
                  </Button>
                  {isLast ? (
                    <Button
                      size="md"
                      onClick={handleSubmit}
                      loading={submitting}
                      iconRight={<ArrowRight className="h-4 w-4" />}
                    >
                      Submit request
                    </Button>
                  ) : (
                    <Button
                      size="md"
                      onClick={handleNext}
                      iconRight={<ArrowRight className="h-4 w-4" />}
                    >
                      Continue
                    </Button>
                  )}
                </footer>
              </section>
            </div>
          </div>

          <p className="mt-4 text-center text-xs text-slate-500/90">
            Your details auto-save as you type. Come back any time from this device.
          </p>
        </div>
      </div>
    </FormProvider>
  );
}
