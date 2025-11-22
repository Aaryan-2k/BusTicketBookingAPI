import { useState, useMemo, useEffect } from 'react'
import axios from 'axios';
import { Seat } from './Seat';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext.jsx';
import {useNavigate } from 'react-router-dom'

export default function BusSeats({ busId,bus}) {
    const navigate=useNavigate()
    const [seatsData, setSeatsData] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [totalFare, setTotalFare] = useState(0);
    const [Fare, setFare] = useState(0);
    const { setBookingDetails } = useContext(AppContext);

    function handleBookingButton(){
        console.log("button clicked");
        setBookingDetails({
            bus:busId,
            selectedSeats:selectedSeats,
            totalFare:totalFare,
            bus_name:bus.name,
            bus_data:bus
        })
        navigate('/passengerinfo')
    }

    function handleSeatClick(seatId) {
        seatsData.forEach((seat) => {
            if (seat.id === seatId) {
                if (seat.status === 'available') {
                    seat.status = 'selected';
                } else if (seat.status === 'selected') {
                    seat.status = 'available';
                }
            }
        });
        setSeatsData([...seatsData]);
    }

    async function fetchSeats(){
        try{
            const response= await axios.get(`http://localhost:8000/api/bus/${busId}`);
            console.log("Seat data fetched:", response.data.seats);
            response.data.seats.map((seat)=>{
            seat.is_booked ? seat.status='booked' : seat.status='available'
            })
            setSeatsData(response.data.seats);
            setFare(response.data.min_price);
        }
        catch(error){
            console.error("Failed to fetch seat data:", error);
        }
    }

    useEffect(() => {
        let selected = [];
        seatsData.forEach((seat) => {
            if (seat.status === 'selected') {
                selected.push(seat);
                }
            }
        );
        setSelectedSeats(selected)
}, [seatsData]);

    useEffect(() => {   
        setTotalFare(selectedSeats.length * Fare);
    }
, [selectedSeats, Fare]);

    useEffect(() => {
        fetchSeats();
    }, []);

    return (
        <div className="w-full bg-white dark:bg-background-dark shadow-xl rounded-b-lg -mt-4">
            <div className="flex flex-col md:flex-row border-t border-slate-200 dark:border-slate-800">
                
                <div className="w-full md:w-2/3 p-6 flex flex-col space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex min-w-72 flex-col gap-1">
                            <h1 className="text-slate-900 dark:text-slate-50 text-2xl font-bold leading-tight">Select Your Seats</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">AC Seater (2+2)</p>
                        </div>
                    </div>

                    <div className="flex-grow p-4 border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center gap-4">
                        <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full max-w-[300px] mx-auto">
                            {
                                seatsData.map((seat) => (
                                    <Seat key={seat.id} seat={seat} onClick={handleSeatClick} />
                                ))
                            }
                        </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="flex flex-1 gap-2 items-center">
                            <div className="w-4 h-4 rounded border border-slate-400 dark:border-slate-500 bg-white dark:bg-slate-800"></div>
                            <h2 className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-tight">Available</h2>
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                            <div className="w-4 h-4 rounded border-2 border-primary bg-primary/20 dark:bg-primary/30"></div>
                            <h2 className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-tight">Selected</h2>
                        </div>
                        <div className="flex flex-1 gap-2 items-center">
                            <div className="w-4 h-4 rounded border border-slate-300 dark:border-slate-600 bg-slate-200 dark:bg-slate-700"></div>
                            <h2 className="text-slate-600 dark:text-slate-300 text-sm font-medium leading-tight">Booked</h2>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-900 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Selection Summary</h2>
                        <div className="flex flex-col p-4 bg-background-light dark:bg-background-dark rounded-lg">
                            <div className="flex justify-between items-center gap-x-6 py-3 border-b border-slate-200 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Selected Seats:</p>
                                <div className="flex flex-wrap justify-end gap-2">
                                    {selectedSeats.length> 0 ? (
                                        selectedSeats.map((seat) => (
                                            <span key={seat.id} className="bg-primary/20 dark:bg-primary/30 text-primary dark:text-sky-300 text-sm font-semibold px-2.5 py-1 rounded-md">{seat.number}</span>
                                        ))
                                    ) : (
                                        <span className="text-slate-500 dark:text-slate-400 text-sm font-medium">None</span>
                                    )}
                                </div>
                            </div>
                            <div className="flex justify-between items-center gap-x-6 py-3">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Total Fare:</p>
                                <p className="text-slate-900 dark:text-slate-50 text-lg font-bold leading-normal text-right">₹{totalFare}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 mt-6">
                        <button 
                            className="flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-5 bg-primary text-slate-50 text-base font-bold leading-normal tracking-[0.015em] hover:bg-primary/90 focus:ring-4 focus:ring-primary/30 dark:focus:ring-primary/50 disabled:bg-slate-400 disabled:cursor-not-allowed"
                            disabled={selectedSeats.length === 0} onClick={handleBookingButton}
                        >
                            <span className="truncate">Book Now! ({selectedSeats.length})</span>
                        </button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">You can review your selection before payment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}