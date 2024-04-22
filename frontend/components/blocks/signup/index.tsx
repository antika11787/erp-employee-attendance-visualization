'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormData } from '@/types/interface';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import FormInput from '@/components/elements/formInput';
import FormInputPassword from '@/components/elements/formInputPassword';
import { SignUpApi } from '@/apiEndpoints/auth';
import './index.scss';

const Signup = () => {
    const dispatch = useDispatch();
    const router = useRouter();

    const {
        handleSubmit,
        control,
        formState: { errors },
        watch,
    } = useForm({
        mode: 'onChange',
        defaultValues: {
            username: '',
            email: '',
            password: '',
            confirm_password: '',
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    const onSubmit = async (data: FormData) => {
        try {
            const response = await SignUpApi(data);
            if (response) {
                router.push('/login');
            }
            console.log(response);
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };
    return (
        <div className='signup-page'>
            <div className='signup-container'>
                <div className='signup-left'>
                    <Image src={'/stats.gif'} alt="signup-image" height={400} width={400} className='signup-image' />
                </div>
                <div className='signup-right'>
                    <h1 className='signup-header'>Create A New Account</h1>
                    <form onSubmit={handleSubmit(onSubmit)} className='signup-form'>
                        <FormInput
                            nameProp="username"
                            requiredProp="Username is required"
                            placeholder="Enter username"
                            control={control}
                            errors={errors}
                        />

                        <FormInput
                            nameProp="email"
                            requiredProp="Email is required"
                            placeholder="Enter email"
                            control={control}
                            errors={errors}
                        />

                        <FormInputPassword
                            nameProp="password"
                            requiredProp="Password is required"
                            placeholder="Enter password"
                            control={control}
                            errors={errors}
                            showPassword={showPassword}
                            togglePasswordVisibility={togglePasswordVisibility}
                            watch={watch}
                        />

                        <FormInputPassword
                            nameProp="confirm_password"
                            requiredProp="confirm the password"
                            placeholder="confirm password"
                            control={control}
                            errors={errors}
                            showPassword={showConfirmPassword}
                            togglePasswordVisibility={toggleConfirmPasswordVisibility}
                            watch={watch}
                        />

                        <div className='signup-submit-button-container'>
                            <button type="submit" className='signup-submit-button'>Sign Up</button>
                        </div>

                        <p className='login-form-text'>Already have an account? <Link href="/" className='login-form-link'>Log in</Link></p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Signup;
