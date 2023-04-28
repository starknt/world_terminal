<script setup lang="ts">
import { Account } from 'libs/shared/Account'
import type { Version } from 'libs/shared/version'
import { VERSION, VERSION_KEY } from 'libs/shared/version'
import type { FormInst, FormRules } from 'naive-ui'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import type { AccountRepositoryInst, Form, WorldApi } from '~/types'

const emits = defineEmits<{
  (e: 'login', form: Form, version: Version): void
}>()

const api = inject<WorldApi>('api')

const repository = ref<AccountRepositoryInst>()
const formRef = ref<FormInst | null>(null)
const formValue = $ref<Form>({
  username: '',
  password: '',
  displayName: '',
})
const options = ref<SelectMixedOption[]>(
  Object.keys(VERSION).map(v => ({
    label: v,
    value: v,
  })),
)
let version = $ref(VERSION_KEY.GF)
const rules: FormRules = {
  username: [
    {
      required: true,
      message: '账号不能为空',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
    },
  ],
}

onMounted(() => {
  const { getAll } = useAccountRepository()

  const accountRepository = getAll()

  if (accountRepository.length > 0) {
    const account = accountRepository[0]
    handleChangeAccount(account)
    repository.value?.set(account)
  }
})

watch(() => version, () => {
  if (version !== VERSION_KEY.GF)
    formValue.password = 'chrome'

  repository.value?.clear()

  nextTick(() => repository.value?.update(version))
})

watchEffect(() => {
  api?.updateTitle(formValue.displayName)
})

const login = async () => {
  try {
    await formRef.value?.validate()

    emits('login', formValue, VERSION[version])
  }
  catch (error) {
  }
}

const save = async () => {
  try {
    await formRef.value?.validate()

    const account = Account.fromForm(formValue, VERSION[version])

    const { addAccount } = useAccountRepository()

    addAccount(account)

    nextTick(() => repository.value?.update(version))
  }
  catch (error) {
  }
}

const handleChangeAccount = (account: Account) => {
  if (account.version.name === VERSION_KEY.GF) {
    formValue.username = account.username
    formValue.password = account.password
  }
  else {
    formValue.username = account.url
  }
  version = account.version.name as VERSION_KEY
  formValue.displayName = account.displayName
}

const handleClearAccount = () => {
  formValue.username = ''
  formValue.password = ''
  version = VERSION_KEY.GF
}

const handleRenameAccount = (account: Account) => {
  formValue.displayName = account.displayName
}
</script>

<template>
  <account-repository
    ref="repository" :form="formValue" @change="handleChangeAccount" @clear="handleClearAccount"
    @rename="handleRenameAccount"
  />

  <div mt-4>
    <n-form ref="formRef" :rules="rules" :model="formValue" label-placement="left" label-width="70px">
      <n-form-item label="游戏版本">
        <n-select v-model:value="version" default-value="官方" :options="options" />
      </n-form-item>

      <n-form-item label="账号名" path="displayName">
        <n-input v-model:value="formValue.displayName" placeholder="输入账号名, 保存到账号仓库展示的名字" />
      </n-form-item>

      <n-form-item v-if="version === VERSION_KEY.GF" label="账号" path="username">
        <n-input v-model:value="formValue.username" placeholder="输入账号">
          <template #prefix>
            <Icon i-carbon:user-filled />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item v-if="version === VERSION_KEY.GF" label="密码" path="password">
        <n-input
          v-model:value="formValue.password" :input-props="{ autocomplete: '' }" type="password"
          show-password="mouse-down" placeholder="输入密码"
        >
          <template #prefix>
            <Icon i-oi:lock-locked />
          </template>
        </n-input>
      </n-form-item>

      <n-form-item v-if="version !== VERSION_KEY.GF" label="登录URL" path="username">
        <n-input v-model:value="formValue.username" placeholder="输入渠道服登录成功后URL">
          <template #prefix>
            <Icon i-carbon:user-filled />
          </template>
        </n-input>
      </n-form-item>
      <n-form-item v-if="version !== VERSION_KEY.GF" path="password" label="浏览器">
        <n-input v-model:value="formValue.password" disabled default-value="chrome" placeholder="chrome">
          <template #prefix>
            <Icon i-logos:chrome />
          </template>
        </n-input>
      </n-form-item>

      <n-space justify="space-evenly">
        <n-button type="success" size="medium" @click="login">
          登录
        </n-button>
        <n-button type="info" size="medium" title="保存到账号仓库" @click="save">
          保存
        </n-button>
      </n-space>
    </n-form>
  </div>
</template>
