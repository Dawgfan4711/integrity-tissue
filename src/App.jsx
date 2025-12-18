import { useState } from 'react'
import { Phone } from 'lucide-react'

function App() {
  const [phoneNumber, setPhoneNumber] = useState('')

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

        {/* Provider Portal Label */}
        <p style={{
          color: '#a0aec0',
          fontSize: '14px',
          marginBottom: '24px'
        }}>
          Provider Portal
        </p>

        {/* Phone Input */}
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
        </div>

        {/* Submit Button */}
        <button style={{
          width: '100%',
          padding: '12px',
          backgroundColor: '#4a5568',
          border: 'none',
          borderRadius: '6px',
          color: '#a0aec0',
          fontSize: '14px',
          cursor: 'pointer',
          marginBottom: '24px',
          transition: 'background-color 0.2s'
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#718096'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#4a5568'}
        >
          Send Verification Code
        </button>

        {/* Demo Info */}
        <p style={{
          color: '#718096',
          fontSize: '12px'
        }}>
          Demo: 4785550001 (Admin) or 4045551001 (Office Admin)
        </p>
      </div>
    </div>
  )
}

export default App