import AuthLayout from '../layouts/AuthLayout';
import PageTransition from '../components/PageTransition';

export default function LoginPage() {
  return (
    <AuthLayout>
      <PageTransition>
        <h2>Login</h2>
        <form>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email</label>
            <input type="email" required style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <label>Password</label>
            <input type="password" required style={{ width: '100%', padding: '0.5rem' }} />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>Login</button>
        </form>
      </PageTransition>
    </AuthLayout>
  );
}
