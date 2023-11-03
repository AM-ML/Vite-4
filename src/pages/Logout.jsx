import { useEffect } from 'react';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { PageError } from './Error';

export function Logout() {
  const navig = useNavigate();
  let willError = false;

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      window.logged = false;
    } catch (err) {
      console.error(err);
      willError = true;
    }
    navig("/home");
  };

  useEffect(() => {
    handleSignOut();
  }, []);

  return (
    <div>
      {willError && <PageError msg="Unable to Logout." />}
    </div>
  );
}

