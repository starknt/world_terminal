<script setup lang="ts">
import type { Version } from 'libs/shared/version'
import type { Form } from '~/types'

const emit = defineEmits<{
  (e: 'login', form: Form, version: Version): void
}>()

const login = (form: Form, version: Version) => {
  emit('login', form, version)
}
</script>

<template>
  <n-tabs w="[90%]" default-value="signin" type="segment">
    <n-tab-pane display-directive="show" m-auto max-w="[70%]" mt-4 name="signin" tab="登录">
      <Login @login="login" />
    </n-tab-pane>

    <n-tab-pane display-directive="show" m-auto max-w="[70%]" mt-4 name="signup" tab="注册">
      <Register />
    </n-tab-pane>
  </n-tabs>
</template>
