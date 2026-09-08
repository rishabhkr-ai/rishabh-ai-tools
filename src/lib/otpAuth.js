import { RecaptchaVerifier, signInWithPhoneNumber, signOut } from 'firebase/auth'
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { auth, db } from '../firebase'

// Firebase requires a reCAPTCHA check before it will send an SMS OTP, to
// stop the API from being used to spam phone numbers. This is invisible —
// the user does not need to solve anything in the normal case.
export function getRecaptchaVerifier(containerId = 'recaptcha-container') {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible',
    })
  }
  return window.recaptchaVerifier
}

// Sends a fresh random OTP by SMS to `phoneNumber` (must be in E.164 format,
// e.g. +919876543210). Returns a confirmationResult — call .confirm(code) on
// it with the code the user typed in to complete verification.
export async function sendOtp(phoneNumber) {
  const verifier = getRecaptchaVerifier()
  return signInWithPhoneNumber(auth, phoneNumber, verifier)
}

export async function verifyOtp(confirmationResult, code) {
  const credential = await confirmationResult.confirm(code)
  return credential.user
}

export async function createUserProfile(uid, { name, email, dob, phone }) {
  await setDoc(doc(db, 'users', uid), {
    name,
    email,
    dob,
    phone,
    createdAt: serverTimestamp(),
  })
}

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid))
  return snap.exists() ? snap.data() : null
}

export async function logout() {
  await signOut(auth)
}
