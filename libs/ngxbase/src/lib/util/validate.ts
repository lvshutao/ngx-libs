// 验证器
import {AbstractControl, FormGroup, ValidatorFn} from '@angular/forms';
import {MyAssets} from "my-tsbase";

/**
 * 账号检测
 * receive: ['', [Validators.required, matchingAccount()]],
 */
export function matchingAccount(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const a = control.value;
    const r = MyAssets.isPhoneCn(a) || MyAssets.isEmail(a);
    return r ? null : {msg: '格式错误'};
  };
}

/**
 * 使用 Validators.email 代替
 */
export function matchingEmail(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const a = control.value;
    if (a === '') {
      return null;
    }
    return MyAssets.isEmail(a) ? null : {msg: '电子邮件地址格式错误'};
  };
}

export function matchingPhone(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
    const a = control.value;
    if (a == '') {
      return null;
    }
    return MyAssets.isPhoneCn(a) ? null : {msg: '手机号码格式错误'};
  };
}


export function matchingCaptcha(): ValidatorFn {
  return control => {
    const v = control.value;
    return MyAssets.isCaptcha(v) ? null : {msg: '验证码格式错误'};
  };
}

export function matchingPassword(): ValidatorFn {
  return control => {
    const v = control.value;
    return v && (v as string).length > 5 ? null : {msg: '密码最少6位'};
  };
}

export function matchingPrice(): ValidatorFn {
  return control => {
    const v = control.value;
    if (v) {
      if (!/^\d+\.?\d{0,2}?$/.test(v)) {
        return {msg: '金额格式 0.01'};
      }
    }
    return null;
  };
}

export function matchingLetter(): ValidatorFn {
  return control => {
    const v = control.value;
    if (v) {
      if (!/^[a-zA-Z0-9]+$/.test(v)) {
        return {msg: '只支持数字及字母'};
      }
    }
    return null;
  };
}

/**
 * @example
 this.fb.group({
  pwd1: ['', Validations.required],
  pwd2: ['', Validations.required],
},{
  validators: [matchingPasswords('pwd1', 'pwd2')]
})
 */
export function matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
  return (group: FormGroup) => {
    const password = group.controls[passwordKey];
    const password2 = group.controls[confirmPasswordKey];

    if (password.value !== password2.value) {
      return {mismatchedPasswords: true};
    }
    return null;
  };
}
