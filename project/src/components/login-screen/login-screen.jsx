import React from 'react';
import Logo from '../logo/logo';
import { login } from '../../store/api-actions';
import { useDispatch } from 'react-redux';
import { useInput } from '../../hooks/useInput';

const EMAIL_MIN_LENGTH = 10;
const PASSWORD_MIN_LENGTH = 3;
const EMAIL_MAX_LENGTH = 50;
const PASSWORD_MAX_LENGTH = 20;

export default function LoginScreen() {
  const dispatch = useDispatch();
  const email = useInput('', { isEmpty: true, minLength: EMAIL_MIN_LENGTH, maxLength: EMAIL_MAX_LENGTH, isEmail: true });
  const password = useInput('', { isEmpty: true, minLength: PASSWORD_MIN_LENGTH, maxLength: PASSWORD_MAX_LENGTH });

  const handleSubmit = (evt) => {
    evt.preventDefault();

    dispatch(login({
      login: email.value,
      password: password.value,
    }));
  };

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action=''
          className="sign-in__form"
          onSubmit={handleSubmit}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              {(email.isDirty && email.isEmpty) && <div style={{ color: 'white' }}>Поле логина не может быть пустым</div>}
              {(email.isDirty && email.minLengthError) && <div style={{ color: 'white' }}>Слишком короткий логин, осталось: {EMAIL_MIN_LENGTH - email.value.length}</div>}
              {(email.isDirty && email.maxLengthError) && <div style={{ color: 'white' }}>Слишком длинный логин, превышен на: {email.value.length - EMAIL_MAX_LENGTH}</div>}
              {(email.isDirty && email.emailError) && <div style={{ color: 'white' }}>Некорректный email</div>}
              <input
                value={email.value}
                onChange={(e) => email.onChange(e)}
                onBlur={(e) => email.onBlur(e)}
                className="sign-in__input"
                type="email"
                placeholder="Email address"
                name="user-email"
                id="user-email"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              {(password.isDirty && password.isEmpty) && <div style={{ color: 'white' }}>Поле пароля не может быть пустым</div>}
              {(password.isDirty && password.minLengthError) && <div style={{ color: 'white' }}>Слишком короткий пароль, осталось: {PASSWORD_MIN_LENGTH - password.value.length}</div>}
              {(password.isDirty && password.maxLengthError) && <div style={{ color: 'white' }}>Слишком длинный пароль, осталось: {password.value.length - PASSWORD_MAX_LENGTH}</div>}
              <input
                value={password.value}
                onChange={(e) => password.onChange(e)}
                onBlur={(e) => password.onBlur(e)}
                className="sign-in__input"
                type="password" placeholder="Password"
                name="user-password"
                id="user-password"
              />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              className="sign-in__btn"
              type="submit"
              disabled={!email.inputValid || !password.inputValid}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <Logo />

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div >
  );
}
