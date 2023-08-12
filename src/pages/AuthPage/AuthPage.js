import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(null);

  return (
    <main className={styles.AuthPage}>
      <div className={styles.container}>
        <Logo onClick={() => setShowLogin(null)} />
        {/* <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3> */}
        <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
        <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
      </div>
      {showLogin === true ? <LoginForm setUser={setUser} /> : showLogin === false ? <SignUpForm setUser={setUser} /> : null}
    </main>
  );
}