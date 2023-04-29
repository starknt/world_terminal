<script setup lang="ts">
import type { FormInst, FormItemRule, FormRules } from 'naive-ui'
import { $Logger } from '~/logger'
import type { RegisterForm } from '~/types'

const emit = defineEmits<{
  (e: 'register', username: string, password: string): void
}>()

const formRef = ref<FormInst | null>(null)
const formValue = $ref<RegisterForm>({
  username: '',
  password: '',
  confirmPassword: '',
})

function validatePasswordStartWith(
  _: FormItemRule,
  value: string,
): boolean {
  return (
    !!formValue.password
    && formValue.password.startsWith(value)
    && formValue.password.length >= value.length
  )
}

function validatePasswordSame(_: FormItemRule, value: string): boolean {
  return value === formValue.password
}

const rule: FormRules = {
  username: [
    {
      required: true,
      message: '用户名不能为空',
    },
  ],
  password: [
    {
      required: true,
      message: '密码不能为空',
    },
  ],
  confirmPassword: [
    {
      required: true,
      message: '请再次输入密码',
      trigger: ['input', 'blur'],
    },
    {
      validator: validatePasswordStartWith,
      message: '两次密码输入不一致',
      trigger: 'input',
    },
    {
      validator: validatePasswordSame,
      message: '两次密码输入不一致',
      trigger: ['blur', 'password-input'],
    },
  ],
}

async function register() {
  try {
    await formRef.value?.validate()

    $Logger.log('Register Account Info', formValue)

    emit('register', formValue.username, formValue.password)
  }
  catch (error) {

  }
}
</script>

<template>
  <n-form ref="formRef" :model="formValue" :rules="rule" label-placement="left" label-width="70px">
    <n-form-item label="用户名" path="username">
      <n-input v-model:value="formValue.username" />
    </n-form-item>
    <n-form-item label="密码" path="password">
      <n-input v-model:value="formValue.password" type="password" />
    </n-form-item>
    <n-form-item label="重复密码" path="confirmPassword">
      <n-input v-model:value="formValue.confirmPassword" type="password" />
    </n-form-item>
  </n-form>

  <n-space justify="center">
    <n-button text-black dark:text-white type="primary" @click="register">
      注册
    </n-button>
  </n-space>
</template>
