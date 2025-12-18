import { UserButton } from '@clerk/clerk-react';

export default function Dashboard() {
  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      backgroundColor: '#1a1a2e',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      color: '#e2e8f0',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ fontSize: '32px', marginBottom: '20px' }}>Welcome to the Dashboard!</h1>
      <p>You are successfully signed in.</p>
      {/* Optional: Clerk's UserButton for profile/logout */}
      <div style={{ marginTop: '40px' }}>
        <UserButton />
      </div>
    </div>
  );
}