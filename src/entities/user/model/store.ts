import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IUserInfo, IUser, IRole } from './types'

export const useUserStore = defineStore('user', () => {
  // Пользователь
  const user = ref<IUser | null>(null)

  // Роль
  const role = ref<IRole | null>(null)

  const hasInfo = computed((): boolean => !!user.value && !!role.value)
  const isAdmin = computed<boolean>(() => (role.value?.name ? role.value.name === 'admin' : false))

  function setName(name: string) {
    if (user.value?.name) {
      user.value.name = name
    }
  }

  function setUserInfo(dto: IUserInfo) {
    user.value = {
      id: dto.id,
      name: dto.name,
      avatar: dto.avatar
    }
    role.value = dto.role
  }

  function clearState() {
    user.value = null
    role.value = null
  }

  return { user, role, hasInfo, isAdmin, setName, setUserInfo, clearState }
})
