import { useState, type FormEvent } from 'react';
import { Lock } from 'lucide-react';
import { Logo } from '@/components/brand/Logo';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { TextInput } from '@/components/ui/TextInput';
import { Field } from '@/components/ui/Field';
import { StorageKeys } from '@/lib/storage/localStorage';

const EXPECTED_PIN = import.meta.env.VITE_ADMIN_PIN ?? '1234';

export function isAdminAuthed() {
  try {
    return sessionStorage.getItem(StorageKeys.adminSession) === 'true';
  } catch {
    return false;
  }
}

export function AdminGate({ onSuccess }: { onSuccess: () => void }) {
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | undefined>();

  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (pin === EXPECTED_PIN) {
      try {
        sessionStorage.setItem(StorageKeys.adminSession, 'true');
      } catch {
        /* ignore */
      }
      onSuccess();
    } else {
      setError("That PIN doesn't match — try again.");
      setPin('');
    }
  };

  return (
    <div className="min-h-dvh px-4 py-12">
      <div className="mx-auto max-w-md">
        <div className="mb-6 flex justify-center">
          <Logo />
        </div>
        <Card>
          <form onSubmit={submit} className="p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-slate-100 text-slate-700">
                <Lock className="h-4 w-4" />
              </span>
              <div>
                <h1 className="text-lg font-semibold tracking-tight text-slate-900">
                  Admin sign-in
                </h1>
                <p className="text-xs text-slate-500">
                  Enter the team PIN to view submissions.
                </p>
              </div>
            </div>
            <Field label="PIN" required error={error} layout="stacked">
              <TextInput
                type="password"
                autoFocus
                autoComplete="off"
                placeholder="••••"
                value={pin}
                invalid={!!error}
                onChange={(e) => setPin(e.target.value)}
              />
            </Field>
            <div className="mt-5">
              <Button type="submit" className="w-full">
                Sign in
              </Button>
            </div>
            <p className="mt-4 text-center text-[11px] text-slate-400">
              Default PIN for this demo is <span className="font-mono">{EXPECTED_PIN}</span>.
            </p>
          </form>
        </Card>
      </div>
    </div>
  );
}
