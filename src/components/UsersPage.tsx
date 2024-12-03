import React from 'react'
import { UserRow } from './UserRow'
import { useUsers } from '../hooks/useUsers'

// https://reqres.in/api/users?page=2

export const UsersPage = () => {
    const {users, nextPage, previousPage} = useUsers();
    console.log(users);

    return (
    <>
            <strong className='text-2xl'>Usuarios</strong>

            <table className='w-[450px] bg-[#282828] rounded-xl text-white mt-4 mb-4'>
                <thead className=''>
                    <tr className='flex-auto'>
                        <th>Avatar</th>
                        <th>Nombre</th>
                        <th>Email</th>
                    </tr>
                </thead>
 
                <tbody>
                    {
                        users.map(user => (
                            <UserRow key={user.id} user={user} />
                        ))
                    }
                    
                </tbody>
            </table>

            <div className='flex justify-between w-[450px] mt-2'>
                <button className='p-2 bg-blue-500 rounded-xl w-20 hover:bg-blue-700 text-white'
                onClick={previousPage}
                >Anterior</button>
                <button className='p-2 bg-blue-500 rounded-xl w-20 hover:bg-blue-700 text-white'
                onClick={nextPage}
                >Siguiente</button>
            </div>
        </>
    )
}
