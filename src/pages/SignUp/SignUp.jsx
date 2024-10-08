import React, { useState } from 'react'
import Navbar from '../../components/Navbar/Navbar';
import PasswordInput from '../../components/Input/PasswordInput';
import { Link, useNavigate } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';

const SignUp = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const handleSignUp = async (e) => {
        e.preventDefault();

        if(!name) {
            setError("Por favor agregue su nombre.");
            return;
        }

        if(!validateEmail(email)) {
            setError("Por favor agregue un correo electrónico válido.");
            return;
        }

        if(!password) {
            setError("Por favor agregue una contraseña.");
            return;
        }

        setError('')

        //Lamada a la API de registro
        try {
            const response = await axiosInstance.post("/crear-cuenta", {
                fullName: name,
                email: email,
                password: password,
            });

            // Respuesta de registro exitosa
            if(response.data && response.data.error) {
                setError(response.data.message);
                return
            }

            if(response.data && response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken)
                navigate("/dashboard")
            }
        } catch (error) {
            // Llamado de error
            if (error.response && error.response.data && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Algo salió mal. Por favor intente de nuevo.");
            }
        }
    };

    return (
        <>
            <Navbar/>
            <div className='flex items-center justify-center mt-28'>
                <div className='w-96 border rounded bg-white px-7 py-10'>
                    <form onSubmit={handleSignUp}>
                        
                        <h4 className='text-2xl mb-7'>
                            Registro
                        </h4>

                        <input 
                            type="text" 
                            placeholder='Nombre' 
                            className='input-box'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />

                        <input 
                            type="text" 
                            placeholder='Correo' 
                            className='input-box'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <PasswordInput 
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {error && <p className='text-red-500 text-xs pb-1'>{error}</p>}

                        <button type='submit' className='btn-primary'>
                            Crear Cuenta
                        </button>

                        <p className='text-sm text-center mt-4'>
                            ¿Ya tiene una cuenta creada?{" "}
                            <Link to='/login' className='font-medium text-primary underline'>
                                Inicie sesión
                            </Link>
                        </p>

                    </form>
                </div>
            </div>
        </>
    )
}

export default SignUp