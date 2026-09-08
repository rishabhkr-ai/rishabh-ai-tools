import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Loader2, ShieldCheck } from 'lucide-react'
import { isFirebaseConfigured } from '../firebase'
import { createUserProfile, getUserProfile, sendOtp, verifyOtp } from '../lib/otpAuth'

const STEPS = { PHONE: 'phone', OTP: 'otp', COMPLETE_PROFILE: 'complete_profile' }

export default function Login() {
  const navigate = useNavigate()
  const [step, setStep] = useState(STEPS.PHONE)
  const [countryCode, setCountryCode] = useState('+91')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const [confirmationResult, setConfirmationResult] = useState(null)
  const [uid, setUid] = useState(null)
  const [profileForm, setProfileForm] = useState({ name: '', email: '', dob: '' })
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const fullPhone = `${countryCode}${phone.replace(/\D/g, '')}`

  const handleSendOtp = async (e) => {
    e.preventDefault()
    setError('')
    if (phone.replace(/\D/g, '').length < 8) {
      setError('Enter a valid phone number.')
      return
    }
    setSubmitting(true)
    try {
      const result = await sendOtp(fullPhone)
      setConfirmationResult(result)
      setStep(STEPS.OTP)
    } catch (err) {
      setError(err?.message || 'Could not send OTP. Please try again.')
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
      const existingProfile = await getUserProfile(user.uid)
      if (existingProfile) {
        navigate('/')
      } else {
        // First time this phone number has ever completed OTP — ask for the
        // rest of their profile once, instead of creating a blank account.
        setUid(user.uid)
        setStep(STEPS.COMPLETE_PROFILE)
      }
    } catch (err) {
      setError(err?.message || 'That OTP was incorrect or has expired. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleCompleteProfile = async (e) => {
    e.preventDefault()
    setError('')
    if (!profileForm.name.trim() || !profileForm.email.trim() || !profileForm.dob) {
      setError('Please fill in your name, Gmail and date of birth.')
      return
    }
    setSubmitting(true)
    try {
      await createUserProfile(uid, { ...profileForm, phone: fullPhone })
      navigate('/')
    } catch (err) {
      setError(err?.message || 'Could not save your profile. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (!isFirebaseConfigured) {
    return (
      <div className="mx-auto max-w-md px-4 py-20 text-center sm:px-6">
        <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Login isn't connected yet</h1>
        <p className="mt-3 text-sm text-[var(--ink-muted)]">
          This site's owner hasn't added their Firebase project keys yet, so sign-in is temporarily unavailable.
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto flex max-w-md flex-col px-4 py-16 sm:px-6">
      <div id="recaptcha-container" />
      <h1 className="font-display text-2xl font-semibold text-[var(--ink)]">Log in</h1>
      <p className="mt-2 text-sm text-[var(--ink-muted)]">Verify with a one-time code sent to your phone.</p>

      {step === STEPS.PHONE && (
        <form onSubmit={handleSendOtp} className="card-surface mt-6 flex flex-col gap-4 rounded-2xl p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-[var(--ink-faint)]">Phone number</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="w-16 rounded-lg border border-[var(--border)] bg-transparent px-2 py-2.5 text-center text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
              />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="98765 43210"
                autoFocus
                className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
              />
            </div>
          </div>
          {error && <p className="text-sm text-[var(--rose)]">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--violet)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
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
            Verify &amp; Log In
          </button>
        </form>
      )}

      {step === STEPS.COMPLETE_PROFILE && (
        <form onSubmit={handleCompleteProfile} className="card-surface mt-6 flex flex-col gap-4 rounded-2xl p-6">
          <p className="text-sm text-[var(--ink-muted)]">
            Verified! Just need a few details to finish setting up your account.
          </p>
          <input
            type="text"
            placeholder="Full name"
            value={profileForm.name}
            onChange={(e) => setProfileForm((f) => ({ ...f, name: e.target.value }))}
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
          />
          <input
            type="email"
            placeholder="Gmail"
            value={profileForm.email}
            onChange={(e) => setProfileForm((f) => ({ ...f, email: e.target.value }))}
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
          />
          <input
            type="date"
            value={profileForm.dob}
            onChange={(e) => setProfileForm((f) => ({ ...f, dob: e.target.value }))}
            max={new Date().toISOString().split('T')[0]}
            className="w-full rounded-lg border border-[var(--border)] bg-transparent px-3 py-2.5 text-sm text-[var(--ink)] outline-none focus:border-[var(--violet)]"
          />
          {error && <p className="text-sm text-[var(--rose)]">{error}</p>}
          <button
            type="submit"
            disabled={submitting}
            className="flex items-center justify-center gap-2 rounded-xl bg-[var(--violet)] py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            Finish
          </button>
        </form>
      )}

      <p className="mt-6 text-center text-sm text-[var(--ink-muted)]">
        New here?{' '}
        <Link to="/signup" className="font-medium text-[var(--violet)]">Create an account</Link>
      </p>
    </div>
  )
}
