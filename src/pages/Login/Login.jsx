import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';

const Login = () => {
    return (
        <>
            <Navbar/>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={() => {}}>
                        <h4 className='text-2xl mb-7'>Inicie Sesión</h4>
                        <input type="text" placeholder='Correo' className='input-box'/>
                        <button type='submit' className='btn-primary'>Iniciar Sesión</button>
                        <p className='text-sm text-center mt-4'>
                            ¿Aún no se ha registrado?{" "}
                            <Link to='/signup' className='font-medium text-primary underline'>
                                Cree su cuenta
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login