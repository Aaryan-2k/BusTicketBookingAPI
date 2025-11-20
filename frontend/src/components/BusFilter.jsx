export default function BusFilter() {
    return (
                <div className="flex gap-2 p-3 overflow-x-auto w-full border-b border-slate-200 dark:border-slate-800">
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3">
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">sort</span>
                        <p className="text-[#0d141b] dark:text-slate-50 text-sm font-medium leading-normal">Sort by: Price</p>
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">expand_more</span>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3">
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">ac_unit</span>
                        <p className="text-[#0d141b] dark:text-slate-50 text-sm font-medium leading-normal">AC</p>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3">
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">bed</span>
                        <p className="text-[#0d141b] dark:text-slate-50 text-sm font-medium leading-normal">Sleeper</p>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3">
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">wifi</span>
                        <p className="text-[#0d141b] dark:text-slate-50 text-sm font-medium leading-normal">WiFi</p>
                    </button>
                    <button className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 px-3">
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">light_mode</span>
                        <p className="text-[#0d141b] dark:text-slate-50 text-sm font-medium leading-normal">Morning</p>
                        <span className="material-symbols-outlined text-[#0d141b] dark:text-slate-50">expand_more</span>
                    </button>
                </div>
    )
}