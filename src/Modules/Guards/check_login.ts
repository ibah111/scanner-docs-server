import axios from 'axios';
import { AuthUser, AuthUserError, AuthUserSuccess } from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import client from 'src/utils/client';
import bitrix from 'src/utils/bitrix';

export const checkLogin = async (token: string) => {
  /**
   * тестовый ответ разработчика для пропуска в приложение
   */
  const dev_response = {
    output: 'Вы вошли',
    id: '4018',
    login_result: true,
    login: 'baledin@zakon43.ru',
    birthdate: '18.10.2001',
    department: 'Группа разработки IT',
    position: 'Младший разработчик',
    firstname: 'Иван',
    secondname: 'Балезин',
    thirdname: '',
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dev_condition = () => {
    return process.env.NODE_ENV === 'dev';
  };
  /** */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const problem_condition = () => {
    return client('demo');
  };

  if (problem_condition()) {
    return dev_response as unknown as AuthUserSuccess;
  } else {
    try {
      const url = bitrix('oauth') + '/oauth/login';
      const result = await axios.get<AuthUser<boolean>>(url, {
        headers: { token },
      });
      if (result.data === undefined || result.data === null) {
        return false;
      } else {
        if (result.data.login_result === true) {
          return result.data as AuthUserSuccess;
        } else {
          return result.data as AuthUserError;
        }
      }
    } catch (err) {
      throw new UnauthorizedException({
        message: 'Не удалось прочитать токен доступа',
        code: 'error_token',
      });
    }
  }
};
