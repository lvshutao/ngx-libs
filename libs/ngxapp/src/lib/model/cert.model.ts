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
  accessToken = '';
  accessExpire = 0;
  refreshAfter = 0;
  uid = '';
}
