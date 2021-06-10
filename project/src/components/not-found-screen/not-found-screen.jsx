import React from 'react';
import Logo from '../logo/logo';

export default function NotFoundScreen() {
  return (
    <>
      <div className="user-page">
        <header className="page-header user-page__head">
          <Logo />

          <h1 className="page-title user-page__title">404. Page not found</h1>
        </header>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </div>
    </>
  );
}
