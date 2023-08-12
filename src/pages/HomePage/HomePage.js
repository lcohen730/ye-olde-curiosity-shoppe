// import { useState } from 'react';
import styles from './HomePage.module.scss';
import Logo from '../../components/Logo/Logo';

export default function HomePage() {

  return (
    <main className={styles.HomePage}>
        <Logo />
        <div className={styles.buttons}>
            <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
            <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
        </div>
        {showLogin ? <LoginForm setUser={setUser} /> : <SignUpForm setUser={setUser} />}
    </main>
  );
}