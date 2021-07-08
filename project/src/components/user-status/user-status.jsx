import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { connect } from 'react-redux';
import { fetchFavoriteMovies, logout } from '../../store/api-actions';

export function UserStatus(props) {
  const { authorizationStatus, signOut, onMyListClick } = props;
  const handleLogout = (evt) => {
    evt.preventDefault();

    signOut();
  };

  const handleMyListClick = (evt) => {
    evt.preventDefault();

    onMyListClick();
  };

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    return (
      <ul className="user-block">
        <li className="user-block__item">
          <div className="user-block__avatar">
            <Link to={AppRoute.MY_LIST} onClick={handleMyListClick}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
          </div>
        </li>
        <li className="user-block__item">
          <Link className="user-block__link" onClick={handleLogout}>Sign out</Link>
        </li>
      </ul>
    );
  }
  else {
    return (
      <div className="user-block">
        <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      </div>
    );
  }
}

UserStatus.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  signOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: state.authorizationStatus,
});

const mapDispatchToProps = (dispatch) => ({
  signOut() {
    dispatch(logout());
  },
  onMyListClick() {
    dispatch(fetchFavoriteMovies());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);
