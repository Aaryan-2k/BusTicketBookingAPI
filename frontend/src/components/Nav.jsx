export default function NavBar() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 dark:border-slate-800 px-4 sm:px-10 py-3 bg-white dark:bg-background-dark/50 sticky top-0 z-20">
          <div className="flex items-center gap-4 text-slate-900 dark:text-white">
            <div className="size-6 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6H42L36 24L42 42H6L12 24L6 6Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-bold leading-tight tracking-[-0.015em]">BusBook</h2>
          </div>
          <div className="hidden md:flex items-center gap-9">
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal" href="#">Home</a>
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal" href="#">My Bookings</a>
            <a className="text-slate-700 dark:text-slate-300 text-sm font-medium leading-normal" href="#">Help</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] transition-colors hover:bg-primary/90">
                Register
            </button>
            <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-sm font-bold leading-normal tracking-[0.015em]">
              <span className="material-symbols-outlined text-xl">notifications</span>
            </button>
            <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10" data-alt="User profile picture" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDxjApXw1Gs4C4g51jQ-0KWrHVGwqN6hyCF5eP8cm-NPm53gC__fa-VMzMB53KvZ_avEaHsEf54bewEiwsSaq7E9ym4SypMmQkXNMYs69tPs8ZBwbgb5o_N8RJrynpvfS4r19oBTGoGrUDHcOZE7hcrq7v1qrP16lGhC8RXVwBtKr9CuGexaQqipb73osBB1_mjT56LhRO4wCFLWM498ZKVTUEEj0YlTySe2FcDLSFAoUwf9Yx79Xp4sh3dSAwmE4KFNJ8pjavWVBU")'}}></div>
          </div>
        </header>
  )
}