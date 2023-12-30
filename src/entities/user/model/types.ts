export interface IRole {
  id: number
  name: string
  accessList: {
    pages: Record<string, boolean>
    interfaces: Record<string, boolean>
  }
}

export interface IUser {
  id: number
  name: string
  avatar: string
}

export interface IUserInfo extends IUser {
  role: IRole
}

export const enum Roles {
  ADMIN = 1,
  CRAFTER = 2
}
