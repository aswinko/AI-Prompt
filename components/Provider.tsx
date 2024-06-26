"use client"

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

// Define the props interface
interface ProviderProps {
  children: ReactNode;
  session?:  null; // or `undefined` if session can be undefined
}

const Provider: React.FC<ProviderProps>  = ({children, session}) => {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}

export default Provider