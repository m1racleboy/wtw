import React from 'react';

export default function LoadingScreen() {
  return (
    <div className="user-page">
      <header style={{ margin: 'auto' }} className="page-header user-page__head">
        <h1 data-testid="loader" className="page-title user-page__title">Loading ...</h1>
      </header>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </div>
  );
}
