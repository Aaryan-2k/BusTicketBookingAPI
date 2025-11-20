import React, { useState, useMemo } from 'react'

const initialBusConfig = [
  { row: 'A', seats: [{ id: 'A1', status: 'available' }, { id: 'A2', status: 'available' }, { id: 'A3', status: 'booked', colStart: 4 }, { id: 'A4', status: 'booked' }]},
  { row: 'B', seats: [{ id: 'B1', status: 'available' }, { id: 'B2', status: 'available' }, { id: 'B3', status: 'available', colStart: 4 }, { id: 'B4', status: 'available' }]},
  { row: 'C', seats: [{ id: 'C1', status: 'selected' }, { id: 'C2', status: 'selected' }, { id: 'C3', status: 'available', colStart: 4 }, { id: 'C4', status: 'available' }]},
  { row: 'D', seats: [{ id: 'D1', status: 'available' }, { id: 'D2', status: 'available' }, { id: 'D3', status: 'available', colStart: 4 }, { id: 'D4', status: 'booked' }]},
  { row: 'E', seats: [{ id: 'E1', status: 'available' }, { id: 'E2', status: 'available' }, { id: 'E3', status: 'available', colStart: 4 }, { id: 'E4', status: 'available' }]},
  { row: 'F', seats: [{ id: 'F1', status: 'booked' }, { id: 'F2', status: 'available' }, { id: 'F3', status: 'available', colStart: 4 }, { id: 'F4', status: 'available' }]},
  { row: 'G', seats: [{ id: 'G1', status: 'available' }, { id: 'G2', status: 'available' }, { id: 'G3', status: 'available', colStart: 4 }, { id: 'G4', status: 'available' }]},
  { row: 'H', seats: [{ id: 'H1', status: 'available' }, { id: 'H2', status: 'available' }, { id: 'H3', status: 'available', colStart: 4 }, { id: 'H4', status: 'booked' }]},
  { row: 'I', seats: [{ id: 'I1', status: 'available' }, { id: 'I2', status: 'available' }, { id: 'I3', status: 'available' }, { id: 'I4', status: 'available' }, { id: 'I5', status: 'available' }]},
];

const getSeatClasses = (status, colStart) => {
  let baseClasses = 'seat flex items-center justify-center p-2 rounded-md transition-colors';
  let statusClasses = '';
  let colClass = colStart ? `col-start-${colStart}` : '';
  let textClass = '';
  let cursorClass = status === 'available' || status === 'selected' ? 'cursor-pointer' : 'cursor-not-allowed';

  switch (status) {
    case 'available':
      statusClasses = 'available hover:border-primary';
      textClass = 'text-xs font-medium text-slate-700 dark:text-slate-300';
      break;
    case 'selected':
      statusClasses = 'selected cursor-pointer dark:bg-primary/30';
      textClass = 'text-xs font-bold text-primary dark:text-sky-300';
      break;
    case 'booked':
      statusClasses = 'booked dark:bg-slate-700';
      textClass = 'text-xs font-medium text-slate-400 dark:text-slate-500';
      break;
    default:
      statusClasses = 'dark:border-slate-600 bg-white dark:bg-slate-800';
      textClass = 'text-xs font-medium text-slate-700 dark:text-slate-300';
  }

  return { containerClass: `${baseClasses} ${statusClasses} ${colClass} ${cursorClass}`, textClass };
};

const Seat = ({ seat, onClick }) => {
    const { id, status } = seat;
    const { containerClass, textClass } = getSeatClasses(status, seat.colStart);
    
    const handleClick = () => {
        if (status === 'available' || status === 'selected') {
            onClick(id);
        }
    };

    return (
        <div className={containerClass} onClick={handleClick}>
            <span className={textClass}>{id}</span>
        </div>
    );
};
// --- END MOCK DATA AND HELPER LOGIC ---


export default function BusSeats({ busId, onClose }) {
    const [config, setConfig] = useState(initialBusConfig);
    const [fare] = useState(600); // Mock fare per seat

    const handleSeatClick = (seatId) => {
        const newConfig = config.map(row => ({
            ...row,
            seats: row.seats.map(seat => {
                if (seat.id === seatId) {
                    if (seat.status === 'available') {
                        return { ...seat, status: 'selected' };
                    } else if (seat.status === 'selected') {
                        return { ...seat, status: 'available' };
                    }
                }
                return seat;
            })
        }));
        setConfig(newConfig);
    };

    const selectedSeats = useMemo(() => {
        return config.flatMap(row => row.seats)
            .filter(seat => seat.status === 'selected')
            .map(seat => seat.id);
    }, [config]);

    const totalFare = useMemo(() => {
        return selectedSeats.length * fare;
    }, [selectedSeats, fare]);


    return (
        <div className="w-full bg-white dark:bg-background-dark shadow-xl rounded-b-lg -mt-4">
            <div className="flex flex-col md:flex-row border-t border-slate-200 dark:border-slate-800">
                
                {/* Left Section: Seat Map, Title, and Legend (w-full md:w-2/3) */}
                <div className="w-full md:w-2/3 p-6 flex flex-col space-y-6">
                    <div className="flex justify-between items-start">
                        <div className="flex min-w-72 flex-col gap-1">
                            <h1 className="text-slate-900 dark:text-slate-50 text-2xl font-bold leading-tight">Select Your Seats</h1>
                            <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">AC Seater (2+2)</p>
                        </div>
                        {/* Assuming onClose prop handles hiding this section */}
                    </div>

                    {/* Bus Layout Area */}
                    <div className="flex-grow p-4 border-slate-200 dark:border-slate-700 rounded-lg flex justify-between items-center gap-4">
                        <div className="grid grid-cols-5 gap-x-2 gap-y-2 w-full max-w-[300px] mx-auto">
                            {config.flatMap((row) => (
                                row.seats.map(seat => (
                                    <Seat key={seat.id} seat={seat} onClick={handleSeatClick} />
                                ))
                            ))}
                        </div>
                    </div>

                    {/* Legend */}
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

                {/* Right Section: Selection Summary (w-full md:w-1/3) */}
                <div className="w-full md:w-1/3 bg-slate-100 dark:bg-slate-900 p-6 flex flex-col justify-between">
                    <div className="space-y-4">
                        <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100">Selection Summary</h2>
                        <div className="flex flex-col p-4 bg-background-light dark:bg-background-dark rounded-lg">
                            <div className="flex justify-between items-center gap-x-6 py-3 border-b border-slate-200 dark:border-slate-700">
                                <p className="text-slate-500 dark:text-slate-400 text-sm font-normal leading-normal">Selected Seats:</p>
                                <div className="flex flex-wrap justify-end gap-2">
                                    {selectedSeats.length > 0 ? (
                                        selectedSeats.map(seatId => (
                                            <span key={seatId} className="bg-primary/20 dark:bg-primary/30 text-primary dark:text-sky-300 text-sm font-semibold px-2.5 py-1 rounded-md">{seatId}</span>
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
                            disabled={selectedSeats.length === 0}
                        >
                            <span className="truncate">Confirm Selection ({selectedSeats.length})</span>
                        </button>
                        <p className="text-xs text-slate-500 dark:text-slate-400 text-center">You can review your selection before payment.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}