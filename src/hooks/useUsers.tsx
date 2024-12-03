import React, { useEffect, useRef, useState } from 'react'
import { User } from '../interfaces/reqres.response'
import { loadUsersAction } from '../actions/load-users.action'


export const useUsers = () => {
    const [users, SetUsers] = useState<User[]>([])
    const currentPageRef = useRef(1);  // useRef sirve para mantener el valor de una variable entre renderizaciones sin necesidad de que se vuelva a renderizar el componente

    useEffect(() => {
        loadUsersAction(1).then(users => SetUsers(users))
    }, [])
    
    const nextPage = async() => {
        currentPageRef.current++;
        const users = await loadUsersAction(currentPageRef.current);
        
        if(users.length > 0) SetUsers(users);
        else currentPageRef.current--;
    }
    
    const previousPage = async() => {
        if(currentPageRef.current > 1) {
            currentPageRef.current--;
            const users = await loadUsersAction(currentPageRef.current);
            SetUsers(users);
        }
    }

    return {
        users,
        nextPage,
        previousPage
    }
}
