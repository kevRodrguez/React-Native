import React from 'react'

interface Person{
    firstName: string;
    lastName: string;
    age: number;
    isActive: boolean;
    powers: string[];
    address: Address;
}

interface Address{
    street: string;
    city: string;
    country?: string;
}

export const ObjectLiterals = () => {
    const user : Person = {
        firstName: 'John',
        lastName: 'Doe',
        age: 35,
        isActive: true,
        powers: ['Super fuerza', 'Volar', 'Super velocidad'],
        address : {
            street: 'Main St',
            city: 'Springfield'
        }
    }

  return (
    <>
        <h3>Object Literals</h3>
        <pre>
            {JSON.stringify(user, null, 2)}
        </pre>
    </>
    
  )
}
