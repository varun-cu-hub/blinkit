import React, { FormEvent, useState } from 'react';
import { LockKeyhole, ShieldCheck, X } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthenticated: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onAuthenticated
}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'same-origin',
        body: JSON.stringify({ username, password })
      });
      const result = await response.json() as { error?: string };

      if (!response.ok) {
        setError(result.error || 'Unable to verify administrator credentials.');
        return;
      }

      setPassword('');
      onAuthenticated();
    } catch {
      setError('Could not reach the admin service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-2xl">
        <div className="mb-5 flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-neutral-900 text-amber-400">
              <LockKeyhole className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-black text-neutral-900">Admin access</h2>
              <p className="text-[11px] text-neutral-500">Sign in to view database records.</p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-full p-1.5 text-neutral-400 hover:bg-neutral-100 hover:text-neutral-700" aria-label="Close admin sign in">
            <X className="h-4 w-4" />
          </button>
        </div>

        <label className="mb-3 block text-xs font-bold text-neutral-700">
          Username
          <input autoComplete="username" value={username} onChange={(event) => setUsername(event.target.value)} required className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
        </label>
        <label className="block text-xs font-bold text-neutral-700">
          Password
          <input type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required className="mt-1.5 w-full rounded-xl border border-neutral-200 px-3 py-2.5 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
        </label>
        {error && <p role="alert" className="mt-3 text-xs font-medium text-red-600">{error}</p>}
        <button disabled={isSubmitting} className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-neutral-900 py-3 text-xs font-bold text-white transition-colors hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60">
          <ShieldCheck className="h-4 w-4 text-amber-400" />
          {isSubmitting ? 'Checking access…' : 'Sign in as admin'}
        </button>
      </form>
    </div>
  );
};
