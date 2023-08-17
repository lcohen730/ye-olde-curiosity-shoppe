import { useState } from 'react';
import styles from './AuthPage.module.scss';
import LoginForm from '../../components/LoginForm/LoginForm';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import Logo from '../../components/Logo/Logo';

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(null);

  return (
    <>
      {
        showLogin === true ?
          <main className={styles.AuthPage}>
            <div className={styles.container}>
              <Logo />
              {/* <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3> */}
              <div className={styles.buttons}>
                <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
                <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
              </div>
            </div>
            <div className={styles.form}>
              <LoginForm setUser={setUser} />
            </div>
          </main>
          : showLogin === false ?
            <main className={styles.AuthPage}>
              <div className={styles.container}>
                <Logo />
                {/* <h3 onClick={() => setShowLogin(!showLogin)}>{showLogin ? 'SIGN UP' : 'LOG IN'}</h3> */}
                <div className={styles.buttons}>
                  <h3 onClick={() => setShowLogin(false)}>SIGN UP</h3>
                  <h3 onClick={() => setShowLogin(true)}>LOGIN</h3>
                </div>
              </div>
              <div className={styles.form}>
                <SignUpForm setUser={setUser} />
              </div>
            </main>
            :
            <div className={styles.home}>
              <Logo home={true} />
              <h1 className={styles.enter} onClick={() => setShowLogin(true)}>ENTER...IF YOU DARE</h1>
            </div>
      }
    </>
  );
}