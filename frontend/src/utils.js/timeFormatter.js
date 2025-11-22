export function formatTimeRangeWithDuration(start,end) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffMs = endDate.getTime() - startDate.getTime();
    
    if (isNaN(diffMs) || diffMs < 0) {
        return 'Invalid Time Range';
    }

    const totalMinutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    const durationStr = `(${hours}h ${minutes}m)`;
    const timeFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });

    const startTimeStr = timeFormatter.format(startDate);
    const endTimeStr = timeFormatter.format(endDate);
    return `${startTimeStr} → ${endTimeStr} ${durationStr}`;
}

export default function formatIsoToCustomDate(isoString) {
    const date = new Date(isoString);

    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${day} ${months[monthIndex]} ${year}, ${hours}:${minutes}`;
}