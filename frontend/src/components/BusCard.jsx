import { useState } from 'react';
import BusSeats from './BusSeats.jsx';
import { formatTimeRangeWithDuration } from '../utils.js/timeFormatter.js';

export default function BusCard({ bus }) {
    const [isSeatsVisible, setIsSeatsVisible] = useState(false);

    const handleSelectSeatsClick = () => {
        setIsSeatsVisible(prev => !prev);
    };

    return (
        <div className="p-4">
            <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-lg bg-white dark:bg-background-dark p-4 shadow-sm hover:shadow-lg transition-shadow">
                <div className="flex flex-1 flex-col justify-between gap-4">
                    <div className="flex flex-col gap-1">
                        <p className="text-[#0d141b] dark:text-slate-50 text-lg font-bold leading-tight">{bus.name}</p>
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-normal">{formatTimeRangeWithDuration(bus.start_time, bus.reach_time)}</p>
                        <div className="flex items-center gap-3 mt-2 text-slate-600 dark:text-slate-300">
                            {bus.has_ac && <span className="material-symbols-outlined" title="AC">ac_unit</span>}
                            {bus.has_wifi && <span className="material-symbols-outlined" title="WiFi">wifi</span>}
                            {bus.has_chargingport && <span className="material-symbols-outlined" title="Charging Port">power</span>}
                            <span className="material-symbols-outlined" title="Restroom">wc</span>
                            <span className="material-symbols-outlined" title="Reading Light">lightbulb_outline</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">{bus.available_seats} Seats Available</p>
                    </div>
                </div>
                <div className="flex flex-col justify-between items-start sm:items-end gap-4">
                    <div className="text-right">
                        <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Starting at</p>
                        <p className="text-[#0d141b] dark:text-slate-50 text-2xl font-bold leading-tight">$ {bus.min_price}</p>
                    </div>
                    <button 
                        className="flex w-full sm:w-auto min-w-[120px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-primary text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-primary/90"
                        onClick={handleSelectSeatsClick}
                    >
                        <span className="truncate">{isSeatsVisible ? 'Hide Seats' : 'Select Seats'}</span>
                    </button>
                </div>
            </div>
            
            {isSeatsVisible && (
                <BusSeats busId={bus.id} bus={bus}/>
            )}
        </div>
    )
}