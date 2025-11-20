import NavBar from "../components/Nav";
import BusFilter from "../components/BusFilter";
import BusCard from "../components/BusCard";
import axios from "axios";
import {useState, useEffect} from "react"; 

export default function BusListPage() {

    const [buses, setBuses] = useState([]);
    useEffect(() => {
        fetchBuses();
    }, []);

    async function fetchBuses() {
        // Fetch bus data from API
        const response = await axios.get('http://localhost:8000/api/bus/');
        setBuses(response.data);
    }

    return ( 
    <div class="relative flex min-h-screen w-full flex-col group/design-root overflow-x-hidden">
        <NavBar />
        <main className="flex flex-1 justify-center py-5 px-4 sm:px-6 md:px-8">
            <div className="layout-content-container flex flex-col w-full max-w-5xl flex-1">
                {/* Page Heading */}
                <div className="flex flex-wrap justify-between items-center gap-4 p-4">
                    <div className="flex min-w-72 flex-col gap-1">
                        <p className="text-[#0d141b] dark:text-slate-50 text-3xl md:text-4xl font-black leading-tight tracking-[-0.033em]">Buses from Roorkee to Gurugram</p>
                        <p className="text-slate-500 dark:text-slate-400 text-base font-normal leading-normal">Showing 12 buses for 25th December</p>
                    </div>
                    <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-4 bg-slate-200 dark:bg-slate-800 text-[#0d141b] dark:text-slate-50 text-sm font-bold leading-normal tracking-[0.015em]">
                        <span className="truncate">Modify Search</span>
                    </button>
                </div>

                {/* Bus Filters Component */}
                <BusFilter />

                <div className="flex flex-col gap-4 py-4">
                    {
                        buses.map((bus) => (
                             <BusCard key={bus.number_plate} bus={bus} />
                        ))
                    }
                                                      
                </div>
            </div>
        </main>
    </div>
    );
}