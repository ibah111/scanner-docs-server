import axios from 'axios';
import { AuthUser, AuthUserError, AuthUserSuccess } from './auth.guard';
import { UnauthorizedException } from '@nestjs/common';
import client from 'src/utils/client';
import bitrix from 'src/utils/bitrix';

export const checkLogin = async (token: string) => {
  // Тестируем систему................................
  console.log('check login: ', token);
  if (process.env.NODE_ENV === 'dev')
    return {
      login_result: true,
      login: 'baledin@zakon43.ru',
    } as unknown as AuthUserSuccess;

  try {
    const result = await axios.get<AuthUser<boolean>>(
      bitrix('oauth') + '/oauth/login',
      { headers: { token } },
    );

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
};
