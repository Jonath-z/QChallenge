import React, { useState, useEffect } from 'react';
import { useForm } from "react-hook-form";


const Signup = () => {

    const { register } = useForm({
        defaultValues: {
            email: '',
            pseudo: '',
            password: ''
        }
    });

    const {getValues } = useForm();
        const signup = () => {
        const values = getValues('email');
        console.log(values);
    }

    return (
        <div>
            {/* <form> */}
                <input {...register('email')}></input>
                <input {...register('pseudo')}></input>
                <input {...register('password')}></input>
                <button onClick={signup}>Login</button>
            {/* </form> */}
        </div>
    );
}

export default Signup;