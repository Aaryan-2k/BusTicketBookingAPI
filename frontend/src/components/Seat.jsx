const getSeatClasses = (status, number) => {
  let baseClasses = 'seat flex items-center justify-center p-2 rounded-md transition-colors';
  let statusClasses = '';
  let textClass = '';
  let cursorClass = status === 'available' || status === 'selected' ? 'cursor-pointer' : 'cursor-not-allowed';
  let colClass ='col-start-';


  if (number ==3 || number==7 || number==11 || number==15 || number==19 || number==23 || number==27 || number==31){
    colClass =colClass+'4';}



  switch (status) {
    case 'available':
      statusClasses = 'available hover:border-primary';
      textClass = 'text-xs font-medium text-slate-700 dark:text-slate-300';
      break;
    case 'selected':
      statusClasses = 'selected cursor-pointer dark:bg-primary/30';
      textClass = 'text-xs font-medium text-slate-700 dark:text-slate-300';
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

export const Seat = ({seat, onClick }) => {
    const { id, status, number } = seat;
    const { containerClass, textClass } = getSeatClasses(status, seat.number);
    

    const handleClick = () => {
        if (status === 'available' || status === 'selected') {
            onClick(id);
        }
    };
  
    return (
        <div className={containerClass} onClick={handleClick}>
            <span className={textClass}>{number}</span>
        </div>
    );

};