import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, ShieldCheck } from 'lucide-react'
import { isFirebaseConfigured } from '../firebase'
import { createUserProfile, sendOtp, verifyOtp } from '../lib/otpAuth'

const STEPS = { FORM: 'form', OTP: 'otp' }

export default function Signup() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.FORM)
  const [form, setForm] = useState({ name: '', email: '', dob: '', countryCode: '+91', phone: '' })
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fullPhone = `${form.countryCode}${form.phone.replace(/\D/g, '')}`

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || !form.email.trim() || !form.dob || form.phone.replace(/\D/g, '').length < 8) {
      setError('Please fill in your name, Gmail, date of birth and phone number.')
      return
    }

    setSubmitting(true)
    try {
      const result = await sendOtp(fullPhone)
      setConfirmationResult(result)
      setStep(STEPS.OTP)
    } catch (err) {
      setError(err?.message || 'Could not send OTP. Please check the phone number and try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleVerifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (otp.trim().length < 4) {
      setError('Enter the OTP you received by SMS.')
      return
    }
    setSubmitting(true)
    try {
      const user = await verifyOtp(confirmationResult, otp.trim())
      await createUserProfile(user.uid, {
        name: form.name.trim(),
        email: form.email.trim(),
        dob: form.dob,
        phone: fullPhone,
      })
      navigate('/')
    } catch (err) {
      setError(err?.message || 'That OTP was incorrect or has expired. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Sign up isn't connected yet</h1>
        <p className="mt-3 text-sm text-[var(--ink-muted)]">
          This site's owner hasn't added their Firebase project keys yet, so account creation is temporarily
          unavailable. Check back soon.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div id="recaptcha-container" />
      <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Create your account</h1>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">
        We'll text you a one-time code to verify your number — no password to remember.
      </p>

      {step === STEPS.FORM && (
        <form onSubmit={handleSendOtp} className="card-surface mt-6 flex flex-col gap-4 rounded-2xl p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Full name</label>
            <input
              type="text"
              value={form.name}
              onChange={update('name')}
              placeholder="Your name"
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Gmail</label>
            <input
              type="email"
              value={form.email}
              onChange={update('email')}
              placeholder="you@gmail.com"
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Date of birth</label>
            <input
              type="date"
              value={form.dob}
              onChange={update('dob')}
              max={new Date().toISOString().split('T')[0]}
              className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Phone number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={form.countryCode}
                onChange={update('countryCode')}
                className="w-16 rounded-lg border border-[var(--border)] bg-transparent px-2 py-2.5 text-center text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
              />
              <input
                type="tel"
                value={form.phone}
                onChange={update('phone')}
                placeholder="98765 43210"
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
              />
            </div>
          </div>

          {error && <p className="text-sm text-[var(--rose)]">{error}</p>}

          <button
            type="submit"
            disabled={submitting}
            className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-[var(--violet)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            Send OTP
          </button>
        </form>
      )}

      {step === STEPS.OTP && (
        <form onSubmit={handleVerifyOtp} className="card-surface mt-6 flex flex-col gap-4 rounded-2xl p-6">
          <div className="flex items-center gap-2 text-sm text-[var(--ink-muted)]">
            <ShieldCheck size={16} className="text-[var(--mint)]" />
            OTP sent to {fullPhone}
          </div>
          <input
            type="text"
            inputMode="numeric"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="6-digit code"
            autoFocus
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-center text-lg tracking-[0.3em] text-[var(--ink)] outline-none focus:border-[var(--violet)]"
          />
          {error && <p className="text-sm text-[var(--rose)]">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--violet)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            Verify &amp; Create Account
          </button>
          <button
            type="button"
            onClick={() => setStep(STEPS.FORM)}
            className="text-xs text-[var(--ink-faint)] hover:text-[var(--ink)]"
          >
            Change phone number
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        Already have an account?{' '}
        <Link to="/login" className="font-medium text-[var(--violet)]">Log in</Link>
      </p>
    </div>
  )
}
