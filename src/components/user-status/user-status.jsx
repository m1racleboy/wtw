import React from 'react';
import { Link } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../store/api-actions';

export default function UserStatus() {
  const dispatch = useDispatch();
  const authorizationStatus = useSelector((state) => state.user.authorizationStatus);
  const userData = useSelector((state) => state.user.userData);

  const handleLogout = (evt) => {
    evt.preventDefault();

    dispatch(logout());
  };

  return authorizationStatus === AuthorizationStatus.AUTH ? (
    <ul className="user-block">
      <li className="user-block__item">
        <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}><img src={userData.avatar} alt="User avatar" width="63" height="63" /></Link>
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
