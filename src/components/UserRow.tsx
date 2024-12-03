import React from 'react'
import { User } from '../interfaces/reqres.response';

interface Props {
    user: User;


}

export const UserRow = ({user}: Props) => {
    return (
        <tr className='p-2'>
            <td>
                <img className='w-14 h-14 rounded-full p-1 ml-4 mt-2 '
                    src={user.avatar}
                    alt="User Avatar" />
            </td>
            <td>{user.first_name} {user.last_name}</td>
            <td>{user.email}</td>
        </tr>
    )
}
