import { useState } from "react"
import axios from "axios";


export default function RegisterForm() {

    const [formData, setFormData] = useState({ first_name: '', last_name: '', email: '', password: '', confirm_password: '' });
    const [formErrors, setFormErrors] = useState({});

    function FormChangeHandler(event) {
        const { name, value } = event.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
        if (formErrors[name]) {
            setFormErrors(prevErrors => ({
                ...prevErrors,
                [name]: null
            }));
        }
    }

    async function FormSubmitHandler(event) {
        event.preventDefault();
        setFormErrors({}); 
        try {
            const response = await axios.post('http://localhost:8000/account/register/', formData);
            console.log("Registration successful:", response.data);
        } catch (error) {
            console.log("Error occurred during registration:", error);

            if (error.response) {
                setFormErrors(error.response.data);
        }
    }}
    
    const getFieldProps = (fieldName) => {
        const isError = formErrors[fieldName] && formErrors[fieldName].length > 0;
        const baseClass = "form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal";
        const borderClass = isError 
            ? 'border border-red-500 focus:ring-red-500/50 dark:border-red-500 dark:focus:border-red-500' 
            : 'border border-slate-300 dark:border-slate-700 focus:border-primary dark:focus:border-primary';
        
        return {
            className: `${baseClass} ${borderClass} bg-background-light dark:bg-slate-800`,
            isError: isError,
            errorMessage: isError ? formErrors[fieldName][0] : null
        };
    };

    return (
        <main className="flex-grow flex items-center justify-center">
            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column: Hero/Visual */}
                    <div className="hidden lg:flex flex-col gap-8">
                        <div className="relative w-full aspect-square rounded-xl bg-primary/10 dark:bg-primary/20 overflow-hidden p-8 flex flex-col justify-between">
                            <div className="absolute inset-0 z-0">
                                <svg className="w-full h-full text-primary/20 dark:text-primary/30" fill="none" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M-100 200 C -100 100, 0 0, 100 0 S 300 100, 300 200 S 200 400, 100 400 S -100 300, -100 200 Z" stroke="currentColor" strokeDasharray="8 8" strokeWidth="2" transform="translate(150, 0) rotate(15 200 200)"></path>
                                    <path d="M100 400 C 100 500, 200 600, 300 600 S 500 500, 500 400 S 400 200, 300 200 S 100 300, 100 400 Z" stroke="currentColor" strokeDasharray="8 8" strokeWidth="2" transform="translate(-150, -200) rotate(-15 200 200)"></path>
                                </svg>
                            </div>
                            <div className="relative z-10 flex flex-col gap-2">
                                <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">Your next journey starts here.</h1>
                                <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal sm:text-lg">Sign up to easily book and manage your bus tickets.</p>
                            </div>
                            <div className="relative z-10 grid grid-cols-2 gap-6">
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">confirmation_number</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-slate-900 dark:text-white">Instant Booking</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Secure your seat in just a few clicks.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">explore</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-slate-900 dark:text-white">Explore Destinations</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Discover new places to visit.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">schedule</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-slate-900 dark:text-white">Easy Scheduling</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Find the best time that works for you.</p>
                                    </div>
                                </div>
                                <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm p-6 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-start gap-3">
                                    <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center">
                                        <span className="material-symbols-outlined text-2xl">encrypted</span>
                                    </div>
                                    <div className="flex flex-col">
                                        <p className="font-bold text-slate-900 dark:text-white">Secure Payments</p>
                                        <p className="text-sm text-slate-500 dark:text-slate-400">Your transactions are safe with us.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Right Column: Register Form */}
                    <div className="flex justify-center">
                        <div className="w-full max-w-md bg-white dark:bg-slate-900/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
                            <div className="flex flex-col gap-8">
                                <div className="flex flex-col gap-2 text-center lg:text-left">
                                    <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Create your account</p>
                                    <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Let's get you started with your free account.</p>
                                </div>
                                
                                {/* Form element added */}
                                <form onSubmit={FormSubmitHandler} className="flex flex-col gap-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* First Name */}
                                        <label className="flex flex-col w-full">
                                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">First Name</p>
                                            <input 
                                                name='first_name' 
                                                placeholder="Enter your first name" 
                                                onChange={FormChangeHandler} 
                                                value={formData.first_name} 
                                                {...getFieldProps('first_name')} 
                                            />
                                            {getFieldProps('first_name').isError && (
                                                <p className="text-red-500 text-sm mt-1">{getFieldProps('first_name').errorMessage}</p>
                                            )}
                                        </label>
                                        
                                        {/* Last Name */}
                                        <label className="flex flex-col w-full">
                                            <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Last Name</p>
                                            <input p
                                                name='last_name' 
                                                placeholder="Enter your last name" 
                                                onChange={FormChangeHandler} 
                                                value={formData.last_name}
                                                {...getFieldProps('last_name')}
                                            />
                                            {getFieldProps('last_name').isError && (
                                                <p className="text-red-500 text-sm mt-1">{getFieldProps('last_name').errorMessage}</p>
                                            )}
                                        </label>
                                    </div>
                                    
                                    {/* Email */}
                                    <label className="flex flex-col w-full">
                                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Email</p>
                                        <input 
                                            name='email' 
                                            type="email" 
                                            placeholder="Enter your email" 
                                            onChange={FormChangeHandler} 
                                            value={formData.email}
                                            {...getFieldProps('email')}
                                        />
                                        {getFieldProps('email').isError && (
                                            <p className="text-red-500 text-sm mt-1">{getFieldProps('email').errorMessage}</p>
                                        )}
                                    </label>
                                    
                                    {/* Password */}
                                    <label className="flex flex-col w-full">
                                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                                            <input 
                                                name='password' 
                                                type="password" 
                                                placeholder="Create a password" 
                                                onChange={FormChangeHandler} 
                                                value={formData.password} 
                                                {...getFieldProps('password')}
                                                className={getFieldProps('password').className.replace('rounded-lg', 'rounded-l-lg') + ' border-r-0 pr-2'}
                                            />
                                            <div className="text-slate-400 dark:text-slate-500 flex border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 items-center justify-center px-4 rounded-r-lg border-l-0">
                                                <span className="material-symbols-outlined" style={{fontSize: '24px'}}>visibility</span>
                                            </div>
                                        </div>
                                        {getFieldProps('password').isError && (
                                            <p className="text-red-500 text-sm mt-1">{getFieldProps('password').errorMessage}</p>
                                        )}
                                    </label>
                                    
                                    {/* Confirm Password */}
                                    <label className="flex flex-col w-full">
                                        <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Confirm Password</p>
                                        <div className="flex w-full flex-1 items-stretch rounded-lg">
                                            <input 
                                                name='confirm_password' 
                                                type="password" 
                                                placeholder="Confirm your password" 
                                                onChange={FormChangeHandler} 
                                                value={formData.confirm_password}
                                                {...getFieldProps('confirm_password')}
                                                className={getFieldProps('confirm_password').className.replace('rounded-lg', 'rounded-l-lg') + ' border-r-0 pr-2'}
                                            />
                                            <div className="text-slate-400 dark:text-slate-500 flex border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 items-center justify-center px-4 rounded-r-lg border-l-0">
                                                <span className="material-symbols-outlined" style={{fontSize: '24px'}}>visibility_off</span>
                                            </div>
                                        </div>
                                        {getFieldProps('confirm_password').isError && (
                                            <p className="text-red-500 text-sm mt-1">{getFieldProps('confirm_password').errorMessage}</p>
                                        )}
                                    </label>
                                    
                                    <button 
                                        type="submit"
                                        className="flex items-center justify-center whitespace-nowrap h-14 px-6 rounded-lg w-full text-base font-bold leading-normal text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors mt-2">
                                        Sign Up
                                    </button>
                                </form>
                                
                                <div className="flex flex-col gap-4">
                                    <div className="relative flex items-center">
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                                        <span className="flex-shrink mx-4 text-sm text-slate-400 dark:text-slate-500">Or sign up with</span>
                                        <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <button className="flex items-center justify-center whitespace-nowrap h-12 px-4 rounded-lg w-full text-base font-medium leading-normal text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-300 dark:focus:ring-slate-600 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors gap-2">
                                            <svg className="h-5 w-5" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                                                <g clipPath="url(#clip0_17_80)">
                                                    <path d="M47.532 24.5528C47.532 22.9214 47.3998 21.29 47.1166 19.71H24.2383V28.818H37.3352C36.7628 31.8623 35.0937 34.4955 32.5878 36.3134V42.22H40.242C44.7862 38.1328 47.532 31.8623 47.532 24.5528Z" fill="#4285F4"></path>
                                                    <path d="M24.2383 48.0007C30.8622 48.0007 36.4336 45.8632 40.242 42.2207L32.5878 36.3141C30.3444 37.7818 27.5019 38.6548 24.2383 38.6548C18.2934 38.6548 13.2003 34.8231 11.2339 29.53H3.4375V35.5604C7.246 43.1425 15.1916 48.0007 24.2383 48.0007Z" fill="#34A853"></path>
                                                    <path d="M11.2339 29.5302C10.7431 28.0902 10.4599 26.5645 10.4599 24.9993C10.4599 23.4355 10.7248 21.9084 11.2339 20.4698V14.4395H3.4375C1.87371 17.5838 0.963867 21.1685 0.963867 24.9993C0.963867 28.8315 1.87371 32.4162 3.4375 35.5604L11.2339 29.5302Z" fill="#FBBC05"></path>
                                                    <path d="M24.2383 9.34482C27.823 9.34482 31.1401 10.6067 33.689 12.9848L40.4536 6.22C36.4153 2.59338 30.8622 0 24.2383 0C15.1916 0 7.246 4.85815 3.4375 12.4395L11.2339 18.4698C13.2003 13.1769 18.2934 9.34482 24.2383 9.34482Z" fill="#EA4335"></path>
                                                </g>
                                                <defs>
                                                    <clipPath id="clip0_17_80">
                                                        <rect fill="white" height="48" width="48"></rect>
                                                    </clipPath>
                                                </defs>
                                            </svg>
                                            <span>Google</span>
                                        </button>
                                        <button className="flex items-center justify-center whitespace-nowrap h-12 px-4 rounded-lg w-full text-base font-medium leading-normal text-white bg-[#1877F2] hover:bg-[#1877F2]/90 focus:outline-none focus:ring-2 focus:ring-[#1877F2]/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors gap-2">
                                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M14 13.5H16.5L17.5 9.5H14V7.5C14 6.47 14 5.5 16 5.5H17.5V2.14C17.174 2.097 15.943 2 14.643 2C11.928 2 10 3.657 10 6.7V9.5H7V13.5H10V22H14V13.5Z"></path>
                                            </svg>
                                            <span>Facebook</span>
                                        </button>
                                    </div>
                                </div>
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal text-center">Already have an account? <a className="font-medium text-primary hover:underline" href="#">Log In</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}