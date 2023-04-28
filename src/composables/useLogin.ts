import { LoginService } from 'libs/service/LoginService'
import type { Account } from 'libs/shared/Account'
import type { LoginSuccessResult } from 'libs/typings/type'

export function useLogin(account: Account): Promise<LoginSuccessResult> {
  return new Promise((resolve, reject) => {
    const _login = new LoginService()

    const onLoginSuccess = _login.onLoginSuccess
    const onLoginError = _login.onLoginError

    onLoginSuccess((e) => {
      _login.close()
      resolve(e)
    })

    onLoginError((e) => {
      _login.close()
      reject(e)
    })

    _login.login(account.username, account.password, account.version)
  })
}
