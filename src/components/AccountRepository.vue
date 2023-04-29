<script setup lang="ts">
import type { Account } from 'libs/shared/Account'
import type { InputInst } from 'naive-ui'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { $Logger } from '~/logger'
import type { Form } from '~/types'

const props = defineProps<{
  form: Form
}>()

const emit = defineEmits<{
  (e: 'change', account: Account): void
  (e: 'rename', account: Account): void
  (e: 'clear'): void
}>()

defineExpose({
  clear,
  update,
  set,
})

const { getAll, getAccountByName, getAccountById, updateAccount, removeAccountById } = useAccountRepository()

let value = $ref<string | null>(null)
let show = $ref(false)
const inputInstRef = ref<InputInst | null>(null)
const options: Account[] = $ref(getAll())

watch(() => props.form.username, (newValue) => {
  const account = getAccountByName(newValue)
  if (account)
    value = account.id
})

const cOptions: SelectMixedOption[] = $computed(() => {
  return options.map(account => ({
    label: `${account.displayName} (${account.version.name})`,
    value: account.id,
  }))
})

function handleValueUpdate(newValue: string) {
  value = newValue

  if (!newValue) {
    emit('clear')

    return
  }

  const account = getAccountById(newValue)

  if (account)
    emit('change', account)
}

function showRename() {
  if (value) {
    show = !show

    nextTick(() => inputInstRef.value?.select())
  }
}

function handleRenameAccount(v: string) {
  if (!value)
    return

  const account = getAccountById(value)

  if (account) {
    account.setDisplayName(v)
    updateAccount(account)

    emit('rename', account)
  }
}

function handleDeleteAccount() {
  $Logger.log('删除账号', value)

  if (value) {
    removeAccountById(value)

    value = null
  }
}

const displayName = $computed(() => {
  return getAccountById(value!)!.displayName
})

function clear() {
  value = null
}

function update(version?: string) {
  if (!props.form)
    return

  const account = getAccountByName(props.form.username!)

  if (!account) {
    value = null

    return
  }

  if (version && version === account.version.name)
    value = account.id
}

function set(account: Account) {
  value = account.id
}
</script>

<template>
  <div flex="~" justify-start items-center gap-2 @dblclick="showRename">
    <n-text min-w="[64px]" inline-flex justify-center pl="[12px]">
      账号库
    </n-text>
    <n-input
      v-if="show" ref="inputInstRef" :default-value="displayName" @blur="showRename"
      @change="handleRenameAccount"
    />
    <n-select v-if="!show" v-model:value="value" clearable :options="cOptions" @update:value="handleValueUpdate">
      <template #action>
        <n-space justify="center">
          <n-button text-black dark:text-white :disabled="!value" type="success" @click="showRename">
            修改名字
          </n-button>
          <n-button text-black dark:text-white :disabled="!value" type="warning" @click="handleDeleteAccount">
            删除账号
          </n-button>
        </n-space>
      </template>
    </n-select>
  </div>
</template>
