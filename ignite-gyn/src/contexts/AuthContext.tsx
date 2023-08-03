import { ReactNode, createContext, useEffect, useState } from "react";

import { UserDTO } from "@dtos/UserDTO";
import { api } from "@services/api";
import { storageUserSave, storageGetUser, storageRemoveUser } from "@storage/storageUser";

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

  async function signIn(email: string, password: string) {
    try {
      const { data } = await api.post('/sessions', { email, password })

      if (data.user) {
        setUser(data.user)
        await storageUserSave(data.user)
      }
    } catch (error) {
      throw error
    }
  }

  async function signOut() {
    try {
      setIsLoadingUserData(true)
      setUser({} as UserDTO)
      await storageRemoveUser()

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
      const user = await storageGetUser()

      if (user) {
        setUser(user)
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