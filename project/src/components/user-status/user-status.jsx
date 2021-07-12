import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { connect } from 'react-redux';
import { logout } from '../../store/api-actions';

export function UserStatus(props) {
  const { authorizationStatus, signOut } = props;

  const handleLogout = (evt) => {
    evt.preventDefault();

    signOut();
  };

  return authorizationStatus === AuthorizationStatus.AUTH ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}><img src="img/avatar.jpg" alt="User avatar" width="63" height="63" /></Link>
        </div>
      </li>
      <li className="user-block__item">
        <a className="user-block__link" onClick={handleLogout}>Sign out</a>
      </li>
    </ul>
  )
    : (
      <div className="user-block">
        <Link to={AppRoute.LOGIN} className="user-block__link">Sign in</Link>
      </div>
    );
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
});

export default connect(mapStateToProps, mapDispatchToProps)(UserStatus);
