import { useState } from "react"
import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../context/AppContext"
import { useNavigate } from "react-router-dom"


export default function LoginForm() {
    const navigate =useNavigate()
    const {setIsLogin}=useContext(AppContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
  
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }
    
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }   

    async function HandleLoginSubmit() {
        try{
            const response=await axios.post('http://localhost:8000/account/login/', {
                email: email,
                password: password
            })
            localStorage.setItem('access_token', response.data.access)
            localStorage.setItem('refresh_token', response.data.refresh)
            setIsLogin(true)
            console.log("Login successful:", response.data)
            navigate('/')
        }
        catch(error){
            console.error("Login failed:", error)
        }

    }
    return (

<main className="flex-grow flex items-center justify-center">
  <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      {/* Left Column: Hero/Visual */}
      <div className="hidden lg:flex flex-col gap-6">
        <div className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl" data-alt="Stylized illustration of a modern blue bus on a scenic road with mountains in the background" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBScAFyxmu-HHipfN2qMfXecaSqAq15aUHz7PDHF2R4W51tYVHQYm49wU84t_ONXffaJoGWaO_raDRwt7A6A_EO-6aS0EkeazvEhwVBlChkBQwMfo9Tk0lyeI1niE0rMy3ppsDHZjeIt665g7k8mpBnOJlfHuueglMFNtLjD3v66rf8accsioNfGsfmRZGzRPtbVy3E3QLtni2yw5OVP-Q2snGz2as-8mSCt6NU8ZVkOM1cXMn_vNp2dlm6Mj8ImOT1Al1UEfmOW2o")'}}></div>
        <div className="flex flex-col gap-2 text-left">
          <h1 className="text-slate-900 dark:text-white text-4xl font-black leading-tight tracking-[-0.033em] sm:text-5xl">Book the bus in minutes</h1>
          <h2 className="text-slate-600 dark:text-slate-400 text-base font-normal leading-normal sm:text-lg">Access your account to manage your bookings and explore new destinations.</h2>
        </div>
      </div>
      {/* Right Column: Login Form */}
      <div className="flex justify-center">
        <div className="w-full max-w-md bg-white dark:bg-slate-900/50 p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-8">
            {/* Heading */}
            <div className="flex flex-col gap-2 text-center lg:text-left">
              <p className="text-slate-900 dark:text-white text-3xl font-bold leading-tight tracking-tight">Log in to your account</p>
              <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Enter your credentials to access your account.</p>
            </div>
            {/* Form */}
            <div className="flex flex-col gap-6">
              {/* Email Field */}
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Email or Username</p>
                <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] text-base font-normal leading-normal" placeholder="Enter your email or username" value={email}  onChange={()=>handleEmailChange(event)}/>
              </label>
              {/* Password Field */}
              <label className="flex flex-col w-full">
                <p className="text-slate-900 dark:text-white text-base font-medium leading-normal pb-2">Password</p>
                <div className="flex w-full flex-1 items-stretch rounded-lg">
                  <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-l-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-2 focus:ring-primary/50 border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 focus:border-primary dark:focus:border-primary h-14 placeholder:text-slate-400 dark:placeholder-slate-500 p-[15px] border-r-0 pr-2 text-base font-normal leading-normal" placeholder="Enter your password" type="password" value={password} onChange={()=>handlePasswordChange(event)}/>
                  <div className="text-slate-400 dark:text-slate-500 flex border border-slate-300 dark:border-slate-700 bg-background-light dark:bg-slate-800 items-center justify-center px-4 rounded-r-lg border-l-0">
                    <span className="material-symbols-outlined" style={{fontSize: '24px'}}>visibility</span>
                  </div>
                </div>
              </label>
              <p className="text-primary hover:underline text-sm font-medium leading-normal text-right cursor-pointer">Forgot Password?</p>
              {/* Login Button */}
              <button className="flex items-center justify-center whitespace-nowrap h-14 px-6 rounded-lg w-full text-base font-bold leading-normal text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 dark:focus:ring-offset-background-dark transition-colors" onClick={()=>HandleLoginSubmit()}>Login</button>
            </div>
            {/* Social Login */}
            <div className="flex flex-col gap-4">
              <div className="relative flex items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
                <span className="flex-shrink mx-4 text-sm text-slate-400 dark:text-slate-500">Or log in with</span>
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
            {/* Sign up link */}
            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal text-center">Don't have an account? <a className="font-medium text-primary hover:underline" href="#">Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
    )
    }