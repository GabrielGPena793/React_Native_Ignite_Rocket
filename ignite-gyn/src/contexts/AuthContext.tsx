import { ReactNode, createContext, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserSave, storageGetUser, storageRemoveUser } from "@storage/storageUser";
import { storageAuthTokenGet, storageAuthTokenRemove, storageAuthTokenSave } from "@storage/storageAuthToken";

export type AuthContextDataProps = {
  user: UserDTO;
  signIn: (email: string, password: string) => Promise<void>;
  verifyUserAuthentication: () => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  isLoadingUserData: boolean;
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext<AuthContextDataProps>(
  {} as AuthContextDataProps
)


export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [user, setUser] = useState<UserDTO>({} as UserDTO)
  const [isLoadingUserData, setIsLoadingUserData] = useState(true)

  function userAndTokenUpdate(userData: UserDTO, token: string) {
    api.defaults.headers.common.Authorization = `Bearer ${token}`

    setUser(userData)

  }

  async function storageUserAndTokenSave(userData: UserDTO, token: string) {
    try {
      await storageUserSave(userData)
      await storageAuthTokenSave(token)

    } catch (error) {
      throw error
    }
  }

  async function signIn(email: string, password: string) {
    try {
      setIsLoadingUserData(true)

      const { data } = await api.post('/sessions', { email, password })

      if (data.user && data.token) {
        await storageUserAndTokenSave(data.user, data.token)
        userAndTokenUpdate(data.user, data.token)
      }

    } catch (error) {
      throw error
    }

    setIsLoadingUserData(false)
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()
      await storageAuthTokenRemove()

    } catch (error) {
      throw error;
    }

    setIsLoadingUserData(false)
  }

  async function signUp(name: string, email: string, password: string) {
    try {
      const { data } = await api.post('/users', {
        email,
        name,
        password
      })

      signIn(email, password)


    } catch (error) {
      throw error
    }
  }

  async function verifyUserAuthentication() {
    try {
      setIsLoadingUserData(true)

      const user = await storageGetUser()
      const token = await storageAuthTokenGet()

      if (user && token) {
        userAndTokenUpdate(user, token)
      }
    } catch (error) {
      throw error
    }

    setIsLoadingUserData(false)
  }

  useEffect(() => {
    verifyUserAuthentication()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      signIn,
      verifyUserAuthentication,
      isLoadingUserData,
      signOut,
      signUp
    }}>
      {children}
    </AuthContext.Provider>
  )
}