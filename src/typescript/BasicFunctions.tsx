import React from 'react'

const a:number = 5;
const b:number = 3;
const addTwoNumbers = (a:number, b:number):number => {
    return a + b;
    
    //retornar un string
    //return (a + b).toString();
    //return `${a + b}`;
}
export const BasicFunctions = () => {
  
    return (
    <>
        <h3>Funciones</h3>
        <p>El resultado de {a} + {b} es {addTwoNumbers(a, 8)}</p>
    </>
  )
}
