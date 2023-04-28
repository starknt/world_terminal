import { Account } from 'libs/shared/Account'
import { VERSION_KEY } from 'libs/shared/version'

const accountRepository = useLocalStorage<Account[]>('account', [], {
  serializer: {
    read(raw) {
      const rawAccount: string[] = JSON.parse(raw)

      const account = rawAccount.map(Account.from)

      return account
    },
    write(value) {
      const rawAccount: string[] = value.map(v => v.toString())

      return JSON.stringify(rawAccount)
    },
  },
})

export function useAccountRepository() {
  const addAccount = (account: Account) => {
    if (getAccountById(account.id) || getAccountByName(account.username)) {
      updateAccount(account)

      return
    }

    accountRepository.value.push(account)
  }

  const removeAccountByName = (username: string) => {
    accountRepository.value = accountRepository.value.filter(v => v.username !== username)
  }

  const removeAccountById = (id: string) => {
    accountRepository.value = accountRepository.value.filter(v => v.id !== id)
  }

  const getAccountByName = (username: string) => {
    return accountRepository.value.find((v) => {
      if (v.version.name === VERSION_KEY.GF)
        return v.username === username

      return v.url === username
    })
  }

  const getAccountById = (id: string) => {
    return accountRepository.value.find(v => v.id === id)
  }

  const getAll = () => {
    return accountRepository.value ?? []
  }

  const updateAccount = (account: Account) => {
    account = isRef(account) ? toRaw(account) : account

    accountRepository.value = accountRepository.value.map((v) => {
      if (v.username === account.username)
        v = account
      return v
    })
  }

  return {
    addAccount,
    removeAccountByName,
    removeAccountById,
    getAccountByName,
    getAccountById,
    getAll,
    updateAccount,
  }
}
