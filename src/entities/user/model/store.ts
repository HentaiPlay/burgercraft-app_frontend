import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { IUserInfo, IUser, IRole } from './types'

export const useUserStore = defineStore('user', () => {
  // Пользователь
  const user = ref<IUser>()

  // Роль
  const role = ref<IRole>()

  const hasInfo = computed((): boolean => !!user.value && !!role.value)

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

  return { user, role, hasInfo, setName, setUserInfo }
})
