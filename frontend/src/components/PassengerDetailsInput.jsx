import { useState,useEffect } from "react";
export default function PassengerInputRow ({ seat, index, passenger, onUpdate })  {
    const [selectedGender, setSelectedGender] = useState(passenger.gender || '');

    useEffect(() => {
        setSelectedGender(passenger.gender || '');
    }, [passenger.gender]);

    const handleGenderChange = (gender) => {
        setSelectedGender(gender);
        onUpdate(seat.id, 'gender', gender);
    };

    const isMaleSelected = selectedGender === 'Male';
    const isFemaleSelected = selectedGender === 'Female';

    return (
        <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1.5fr] gap-x-6 gap-y-4 items-center border-b pb-4 last:border-b-0 last:pb-0 border-gray-100 dark:border-gray-700">
            <div className="flex items-center gap-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-medium px-4 py-2.5 rounded-md">
                <span className="material-symbols-outlined">chair</span>
                <span>{seat.number}</span>
            </div>

            <input 
                className="w-full bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pb-2" 
                placeholder="Name" 
                type="text" 
                name="name"
                value={passenger.name}
                onChange={(e) => onUpdate(seat.id, 'name', e.target.value)}
            />

            {/* Age Input */}
            <input 
                className="w-full bg-transparent border-0 border-b border-gray-300 dark:border-gray-600 focus:ring-0 focus:border-primary text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 pb-2" 
                placeholder="Age" 
                type="number" 
                name="age"
                value={passenger.age}
                onChange={(e) => onUpdate(seat.id, 'age', e.target.value)}
            />

            {/* Gender Selection */}
            <div className="flex rounded-full border border-gray-300 dark:border-gray-600 p-1 text-sm text-gray-500 dark:text-gray-400">
                <button 
                    type="button"
                    className={`flex-1 py-1.5 px-4 rounded-full transition-colors ${
                        isMaleSelected ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200 font-medium shadow-sm' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleGenderChange('Male')}
                >
                    Male
                </button>
                <div className="border-l border-gray-300 dark:border-gray-600"></div>
                <button 
                    type="button"
                    className={`flex-1 py-1.5 px-4 rounded-full transition-colors ${
                        isFemaleSelected ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-200 font-medium shadow-sm' : 'hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                    onClick={() => handleGenderChange('Female')}
                >
                    Female
                </button>
            </div>
        </div>
    );
};
