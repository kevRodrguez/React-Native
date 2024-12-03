import { FormsPage } from './components/FormsPage'
import { UsersPage } from './components/UsersPage'
import { AuthProvider } from './context/AuthContext'
//import { Counter } from './components/Counter'
//import { BasicFunctions } from './typescript/BasicFunctions'
// import { LoginPage } from './components/LoginPage'
//import { ObjectLiterals } from './typescript/ObjectLiterals'
//import { BasicTypes } from './typescript/BasicTypes'

function App() {

  return (
    <AuthProvider>
      <div className="flex flex-col justify-center items-center h-svh bg-[#fffefe]">
        <h1 className="text-4xl mb-5" >React + TS</h1>

        {/* <BasicTypes /> */}
        {/*<ObjectLiterals />*/}
        {/*<BasicFunctions /> */}
        {/* {<Counter />}  */}
        {/* <LoginPage /> */}
        {/* <UsersPage /> */}
        <FormsPage />



      </div>
    </AuthProvider>
  )
}

export default App
