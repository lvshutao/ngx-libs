/**
 * 临时凭证
 */
export class TmpCert {
  uid = '';
  user_sign = '';
  app_name = '';
  app_sign = '';
}

/**
 * 用户登录凭证
 */
export class UserCert {
  access_token = '';
  access_expire = 0;
  refresh_after = 0;
  uid = '';
}
