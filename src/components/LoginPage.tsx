//import React from 'react'
import { useAuthContext } from '../context/AuthContext';


export const LoginPage = () => {
  const { isChecking, isAuthenticated, loginWithEmailPassword, user, logout } = useAuthContext();

  if (isChecking) {
    return <div>Verificando usuario</div>
  }

  return (
    <>
      {
        isAuthenticated ? (
          <>
            <strong>Bienvenido</strong>
            <pre>
              {/* mostrar el usuario en formato JSON */}
              {/* {JSON.stringify(user, null, 2)} */}

              {/* mostrar el email y name del usuario */}
              {user?.email}<br />{user?.name}
            </pre>

            <hr />
            <button
              className="p-2 bg-blue-500 rounded-xl w-55 mt-2 hover:bg-blue-700 text-white"
              onClick={() => logout()}
            >
              Logout
            </button>
          </>

        ) : (
          <>
            <h3>Ingresar a la app</h3>

            <hr />
            <button
              onClick={() => loginWithEmailPassword('kevrodriguezmail@gmail.com', '123456')}
              className="p-2 bg-blue-500 rounded-xl mt-2 hover:bg-blue-700 text-white">Login

            </button>

          </>
        )
      }

    </>
  );
};
