import { AuthenticationClient } from 'authing-sdk-js';
import { createContext } from 'react';

export interface LockContextProps {
  authClient?: AuthenticationClient;
  setScene?: (scene: string) => void;
}

const AuthLockContext = createContext<LockContextProps>({});
export default AuthLockContext;
