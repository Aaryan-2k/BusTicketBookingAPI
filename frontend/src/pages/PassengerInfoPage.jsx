import NavBar from "../components/Nav"
import { useState,useEffect } from "react"
import { useNavigate } from 'react-router-dom'
import PassengerInputRow from "../components/PassengerDetailsInput";
import axios from 'axios'
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import formatIsoToCustomDate from "../utils.js/timeFormatter"

export default function PassengerInfoPage() {
  const {bookingDetails,setBookingDetails} = useContext(AppContext)
  const navigate = useNavigate();
  const [formData,setFormData]=useState({phone_number:'',email:''})
  const [formErrors, setFormErrors] = useState({phone_number: '', email: ''});
  const [passengerData, setPassengerData] = useState([]);
  const [passengerErrors, setPassengerErrors] = useState([]);
  const [bookingStatus, setBookingStatus] = useState(null); // 'loading', 'success', 'error'
  const [bookingMessage, setBookingMessage] = useState('');

  function FormChangeHandler(event){
    const {name,value}=event.target
    setFormData(prev=>({...prev,[name]:value}))
    setFormErrors(prev => ({...prev, [name]: ''}));
  }

  // Helper validation functions
  function validateContact(formData) {
    let errors = {};
    if (!formData.phone_number.trim()) {
      errors.phone_number = 'Required';
    } else if (!/^\d{6,}$/.test(formData.phone_number)) {
      errors.phone_number = 'Enter valid phone number';
    }
    if (!formData.email.trim()) {
      errors.email = 'Required';
    } else if (!formData.email.includes('@')) {
      errors.email = 'Enter valid email id';
    }
    return errors;
  }

  function validatePassengers(passengerData) {
    return passengerData.map(p => {
      let err = { name: '', age: '', gender: '' };
      if (!p.name.trim()) err.name = 'Required';
      if (!p.age || isNaN(Number(p.age)) || Number(p.age) <= 0) err.age = p.age === '' ? 'Required' : 'Invalid';
      if (!p.gender) err.gender = 'Required';
      return err;
    });
  }

  async function handleBookNow(event) {
    event.preventDefault();
    const contactErrors = validateContact(formData);
    setFormErrors(contactErrors);
    const passengerErrs = validatePassengers(passengerData);
    setPassengerErrors(passengerErrs);
    const hasContactError = Object.values(contactErrors).some(e => e);
    const hasPassengerError = passengerErrs.some(err => Object.values(err).some(e => e));
    if (hasContactError || hasPassengerError) {
      return;
    }
    
    if (!bookingDetails || !bookingDetails.bus) {
      setBookingStatus('error');
      setBookingMessage('Booking details not loaded. Please go back and select a bus.');
      return;
    }

    setBookingStatus('loading');
    const finalBookingData = {
        contact: formData,
        passengers: passengerData,
        bus_id: bookingDetails.bus,
    };
    
    try{
        const response = await axios.post('http://localhost:8000/api/booking/', finalBookingData);
        setBookingStatus('success');
        setBookingMessage(`Booking successful! Booking ID: ${response.data.booking_id}`);
        console.log('Booking response:', response.data);
        }
    catch(error){
        setBookingStatus('error');
        setBookingMessage(error.response?.data?.detail || 'Booking failed. Please try again.');
        console.log('Booking error:', error);
    }
  }
    
  useEffect(() => {
    // If booking details or selected seats are missing, redirect user back to home
    if (!bookingDetails || !bookingDetails.selectedSeats || bookingDetails.selectedSeats.length === 0) {
      navigate('/', { replace: true });
      return;
    }

    const initialPassengers = bookingDetails.selectedSeats.map(seat => ({
      seat_id: seat.id,
      seat_number: seat.number,
      name: '',
      age: '',
      gender: '',
      fare: seat.fare
    }));
    setPassengerData(initialPassengers);
    setPassengerErrors(initialPassengers.map(() => ({ name: '', age: '', gender: '' })));
  }, [bookingDetails, navigate]); 

function handlePassengerUpdate(seatId, field, value) {
    setPassengerData(prevPassengers => 
      prevPassengers.map(p => 
        p.seat_id === seatId ? { ...p, [field]: value } : p
      )
    );
    setPassengerErrors(prevErrors =>
      prevErrors.map((err, idx) =>
        passengerData[idx].seat_id === seatId
          ? { ...err, [field]: '' }
          : err
      )
    );
  }



return (
<div className="font-display bg-background-light dark:bg-background-dark text-gray-800 dark:text-gray-200">
<NavBar></NavBar>
<div className="container mx-auto p-4 md:p-8">
  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
    <div className="lg:col-span-2 space-y-6">

      {/* 1. Trip Details Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <span className="material-symbols-outlined text-green-500 text-2xl">check_circle</span>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white">Trip Details</h2>
          </div>
          <span className="material-symbols-outlined text-gray-500 dark:text-gray-400 cursor-pointer">expand_less</span>
        </div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="font-bold text-lg text-gray-900 dark:text-white">Roorkee</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatIsoToCustomDate(bookingDetails.bus_data.start_time)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Roorkee Bypass - New Golden Dhaba</p>
          </div>
          <div className="flex-grow flex flex-col items-center mx-4">
            <div className="flex items-center w-full">
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
              <div className="flex-grow border-t border-dashed border-gray-300 dark:border-gray-600"></div>
              <div className="text-xs text-gray-500 dark:text-gray-400 border border-gray-300 dark:border-gray-600 rounded-full px-3 py-1 bg-background-light dark:bg-gray-700">05h.35m</div>
              <div className="flex-grow border-t border-dashed border-gray-300 dark:border-gray-600"></div>
              <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></div>
            </div>
          </div>
          <div className="text-right">
            <p className="font-bold text-lg text-gray-900 dark:text-white">Gurgaon</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{formatIsoToCustomDate(bookingDetails.bus_data.reach_time)}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">Iffco chowk</p>
          </div>
        </div>
        <div className="bg-blue-50 dark:bg-blue-900/50 p-4 rounded-lg flex justify-between items-center">
          <div>
            <p className="font-semibold text-blue-800 dark:text-blue-200">{bookingDetails.bus_name}</p>
            <p className="text-sm text-blue-600 dark:text-blue-300">AC Seater(2 + 2)</p>
          </div>
          <div className="flex items-center gap-2 bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-200 text-sm px-3 py-1.5 rounded-full">
            <span className="material-symbols-outlined text-base">directions_bus</span>
            <span>Brand New</span>
          </div>
        </div>
      </div>

      {/* 2. Contact Details Card */}

      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-2xl">check_circle</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Contact Details</h2>
        </div>
        <p className="ml-9 mb-6 text-sm text-gray-500 dark:text-gray-400">Your Ticket and Bus info will be sent here.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">phone</span>
            <input 
                onChange={FormChangeHandler}
                className={`w-full pl-10 bg-transparent border-0 border-b pb-2 ${formErrors.phone_number ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary'}`}
                placeholder="Mobile Number" type="text" name='phone_number' value={formData.phone_number} />
            {formErrors.phone_number && <p className="text-red-500 text-xs mt-1 absolute left-0">{formErrors.phone_number}</p>}
          </div>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500">mail</span>
            <input 
                onChange={FormChangeHandler}
                name='email' value={formData.email}
                className={`w-full pl-10 bg-transparent border-0 border-b pb-2 ${formErrors.email ? 'border-red-500 focus:border-red-500' : 'border-gray-300 dark:border-gray-600 focus:border-primary'}`}
                placeholder="Email ID" type="email" />
            {formErrors.email && <p className="text-red-500 text-xs mt-1 absolute left-0">{formErrors.email}</p>}
          </div>
        </div>
      </div>

      {/* 3. Passenger Details Card */}
    
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-3 mb-2">
          <span className="material-symbols-outlined text-gray-400 dark:text-gray-500 text-2xl">check_circle</span>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Passenger Details</h2>
        </div>
        <p className="ml-9 mb-6 text-sm text-gray-500 dark:text-gray-400">Fill passenger details corresponding to the seats</p>
        <div className="space-y-6">
          {/* Passenger Row 1 */}
          {passengerData.map((passenger, index) => (
            <div key={passenger.seat_id} className="relative">
              <PassengerInputRow 
                  seat={bookingDetails.selectedSeats.find(s => s.id === passenger.seat_id)}
                  index={index}
                  passenger={passenger}
                  onUpdate={handlePassengerUpdate}
              />
              {/* Error messages for passenger fields */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr_1fr_1.5fr] gap-x-6 gap-y-1 mt-1">
                <div></div>
                <div>{passengerErrors[index]?.name && <p className="text-red-500 text-xs">{passengerErrors[index].name}</p>}</div>
                <div>{passengerErrors[index]?.age && <p className="text-red-500 text-xs">{passengerErrors[index].age}</p>}</div>
                <div>{passengerErrors[index]?.gender && <p className="text-red-500 text-xs">{passengerErrors[index].gender}</p>}</div>
              </div>
            </div>
          ))}
          
        </div>
      </div>
    </div>

    {/* Right Column: Fare Summary and Payment Button */}
    <div className="lg:col-span-1">
      <div className="sticky top-8 space-y-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Fare Details</h2>
          <div className="flex justify-between items-center text-gray-500 dark:text-gray-400">
            <span>Total Fare (inclusive)</span>
            <div className="flex items-center gap-2">
              <span>₹ {bookingDetails.totalFare}</span>
              <span className="material-symbols-outlined text-sm text-primary">expand_more</span>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700"></div>
          <div className="flex justify-between items-center">
            <span className="font-bold text-lg text-gray-900 dark:text-white">Total Amount To Be Paid</span>
            <span className="font-bold text-lg text-gray-900 dark:text-white">₹ {bookingDetails.totalFare}</span>
          </div>
        </div>
        <div className="text-center text-xs text-gray-500 dark:text-gray-400"> By proceeding, I agree to the <a className="text-blue-500 dark:text-blue-400 font-medium" href="#">T&amp;Cs</a>
        </div>
        {bookingStatus === 'success' && (
          <div className="bg-green-100 dark:bg-green-900/50 border border-green-500 text-green-700 dark:text-green-300 px-4 py-3 rounded-lg">
            <p className="font-bold">✓ {bookingMessage}</p>
          </div>
        )}
        {bookingStatus === 'error' && (
          <div className="bg-red-100 dark:bg-red-900/50 border border-red-500 text-red-700 dark:text-red-300 px-4 py-3 rounded-lg">
            <p className="font-bold">✗ {bookingMessage}</p>
          </div>
        )}
        <button 
          disabled={bookingStatus === 'loading'} 
          className="w-full bg-primary text-white font-bold py-4 px-6 rounded-lg shadow-lg hover:bg-opacity-90 transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          onClick={handleBookNow}>
          <span>{bookingStatus === 'loading' ? 'Processing...' : `Book Now! ${bookingDetails.totalFare}₹`}</span>
          {bookingStatus !== 'loading' && <span className="material-symbols-outlined">double_arrow</span>}
        </button>
      </div>
    </div>
  </div>
</div>
</div>
    )
}