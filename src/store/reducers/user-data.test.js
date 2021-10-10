import userData, { loadUserData, requireAuthorization, signOut } from './user-data';
import { AuthorizationStatus } from '../../const';

const authInfo = {
  id: 1,
  email: 'Oliver.conner@gmail.com',
  name: 'Oliver.conner',
  avatar: 'img/1.png',
  token: 'T2xpdmVyLmNvbm5lckBnbWFpbC5jb20=',
};

describe('Тестирование редьюсера userData', () => {
  it('Должен вернуть начальное состояние', () => {
    expect(userData(undefined, {}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.UNKNOWN,
        userData: {},
      });
  });

  it('Должен изменить состояние пользователя на AUTH', () => {
    expect(userData({ authorizationStatus: AuthorizationStatus.UNKNOWN }, requireAuthorization(AuthorizationStatus.AUTH)))
      .toEqual({
        authorizationStatus: AuthorizationStatus.AUTH,
      });
  });

  it('Должен вернуть данные пользователя', () => {
    expect(userData({}, loadUserData(authInfo)))
      .toEqual({
        userData: authInfo,
      });
  });

  it('Должен изменить состояние пользователя на NO_AUTH и очистить информацию о пользователе', () => {
    expect(userData({
      authorizationStatus: AuthorizationStatus.AUTH,
      userData: { login: 'test@gmail.com', password: '322' },
    }, signOut()))
      .toEqual({
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      });
  });
});
