// Роль
export const enum Roles {
  ADMIN = 1,
  CRAFTER = 2
}

export interface IRole {
  id: number
  name: string
  accessList: {
    pages: Record<string, boolean>
    interfaces: Record<string, boolean>
  }
}

// Пользователь
export interface IUser {
  id: number
  name: string
  avatar: string
}

export interface IUserInfo extends IUser {
  role: IRole
}

export interface IUserUpdateDTO {
  name: string
  password: string
  file: File
}
