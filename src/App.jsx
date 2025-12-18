import { useState } from 'react'
import { Phone } from 'lucide-react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate
} from 'react-router-dom'
import Dashboard from './components/Dashboard'
import { useEffect } from 'react'

// Simple in-memory auth (replace with real JWT/session later)
let isAuthenticated = false

function AuthFlow() {
  const [phoneNumber, setPhoneNumber] = useState('')
  const [code, setCode] = useState('')
  const [stage, setStage] = useState('enterPhone') // 'enterPhone' or 'enterCode'
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const formatPhoneNumber = (value) => {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }

  const handlePhoneChange = (e) => {
    const formatted = formatPhoneNumber(e.target.value)
    setPhoneNumber(formatted)
  }

  const handleSendCode = async () => {
    if (phoneNumber.replace(/\D/g, '').length !== 10) {
      setError('Please enter a valid 10-digit phone number')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const fullPhone = `+1${phoneNumber.replace(/\D/g, '')}`

    try {
      const res = await fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone })
      })

      const data = await res.json()

      if (res.ok) {
        setStage('enterCode')
        alert('Verification code sent! Check your phone.')
      } else {
        setError(data.error || 'Failed to send code')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleVerifyCode = async () => {
    if (!code || code.length !== 6) {
      setError('Please enter the 6-digit verification code')
      return
    }

    setIsSubmitting(true)
    setError(null)

    const fullPhone = `+1${phoneNumber.replace(/\D/g, '')}`

    try {
      const res = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone: fullPhone, code })
      })

      const data = await res.json()

      if (res.ok && data.success) {
        isAuthenticated = true
        navigate('/dashboard')
      } else {
        setError(data.error || 'Invalid or expired code')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true })
    }
  }, [])

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '40px',
        textAlign: 'center'
      }}>
        {/* Logo Area */}
        <div style={{ marginBottom: '40px' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '2px solid #4a5568',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px',
            color: '#a0aec0'
          }}>
            <span style={{ fontSize: '24px' }}>+</span>
          </div>
          
          <div style={{
            width: '60px',
            height: '8px',
            backgroundColor: '#3182ce',
            borderRadius: '4px',
            margin: '0 auto 24px'
          }}></div>
          
          <h1 style={{
            color: '#e2e8f0',
            fontSize: '28px',
            fontWeight: '300',
            letterSpacing: '4px',
            marginBottom: '4px'
          }}>
            INTEGRITY
          </h1>
          <h1 style={{
            color: '#e2e8f0',
            fontSize: '28px',
            fontWeight: '300',
            letterSpacing: '4px',
            marginBottom: '8px'
          }}>
            TISSUE
          </h1>
          <p style={{
            color: '#718096',
            fontSize: '14px',
            letterSpacing: '6px'
          }}>
            — SOLUTIONS —
          </p>
        </div>

        <p style={{
          color: '#a0aec0',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          Provider Portal
        </p>

        {/* Phone Input Stage */}
        {stage === 'enterPhone' ? (
          <>
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                color: '#a0aec0',
                fontSize: '14px',
                textAlign: 'left',
                marginBottom: '8px'
              }}>
                Mobile Phone Number
              </label>
              <div style={{ position: 'relative' }}>
                <Phone style={{
                  position: 'absolute',
                  left: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#718096',
                  width: '18px',
                  height: '18px'
                }} />
                <input
                  type="tel"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  placeholder="(555) 123-4567"
                  style={{
                    width: '100%',
                    padding: '12px 12px 12px 44px',
                    backgroundColor: '#2d3748',
                    border: '1px solid #4a5568',
                    borderRadius: '6px',
                    color: '#e2e8f0',
                    fontSize: '16px',
                    outline: 'none'
                  }}
                />
              </div>
              {error && (
                <p style={{ color: '#f56565', fontSize: '12px', marginTop: '8px', textAlign: 'left' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleSendCode}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isSubmitting ? '#2d3748' : '#4a5568',
                border: 'none',
                borderRadius: '6px',
                color: '#a0aec0',
                fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginBottom: '24px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#718096')}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#4a5568')}
            >
              {isSubmitting ? 'Sending...' : 'Send Verification Code'}
            </button>
          </>
        ) : (
          <>
            {/* Verification Code Stage */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block',
                color: '#a0aec0',
                fontSize: '14px',
                textAlign: 'left',
                marginBottom: '8px'
              }}>
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                placeholder="123456"
                maxLength="6"
                style={{
                  width: '100%',
                  padding: '12px',
                  backgroundColor: '#2d3748',
                  border: '1px solid #4a5568',
                  borderRadius: '6px',
                  color: '#e2e8f0',
                  fontSize: '16px',
                  textAlign: 'center',
                  letterSpacing: '8px',
                  outline: 'none'
                }}
              />
              {error && (
                <p style={{ color: '#f56565', fontSize: '12px', marginTop: '8px', textAlign: 'left' }}>
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleVerifyCode}
              disabled={isSubmitting}
              style={{
                width: '100%',
                padding: '12px',
                backgroundColor: isSubmitting ? '#2d3748' : '#4a5568',
                border: 'none',
                borderRadius: '6px',
                color: '#a0aec0',
                fontSize: '14px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                marginBottom: '12px',
                transition: 'background-color 0.2s'
              }}
              onMouseOver={(e) => !isSubmitting && (e.target.style.backgroundColor = '#718096')}
              onMouseOut={(e) => !isSubmitting && (e.target.style.backgroundColor = '#4a5568')}
            >
              {isSubmitting ? 'Verifying...' : 'Verify Code'}
            </button>

            <button
              onClick={() => {
                setStage('enterPhone')
                setCode('')
                setError(null)
              }}
              style={{
                color: '#718096',
                background: 'transparent',
                border: 'none',
                fontSize: '13px',
                cursor: 'pointer',
                textDecoration: 'underline'
              }}
            >
              Back to phone number
            </button>
          </>
        )}
      </div>
    </div>
  )
}

function ProtectedRoute({ children }) {
  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthFlow />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  )
}

export default App