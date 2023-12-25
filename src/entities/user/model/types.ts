export interface IRole {
  id: number
  name: string
  accessList: {
    functions: Record<string, boolean>
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
