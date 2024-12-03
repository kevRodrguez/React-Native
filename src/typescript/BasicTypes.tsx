
export const BasicTypes = () => {
    const name:string = 'John Doe';
    const age:number = 35;
    const isActive:boolean = true;
    const powers:string[] = ['Super fuerza', 'Volar', 'Super velocidad'];


    return (
    <>
        <h3>Tipos basicos </h3>
        {name} - {age} - {isActive ? 'Activo' : 'Inactivo'}
        <p>{powers.join(', ')}</p>
    </>

  )
}

