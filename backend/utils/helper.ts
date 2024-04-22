function subtractDuration(startDate: string, duration: number) {
    // Convert start date string to a Date object
    const startDateObj = new Date(startDate);
    
    // Calculate milliseconds in duration
    const durationMs = duration * 24 * 60 * 60 * 1000;

    // Subtract duration from the start date
    const resultDateObj = new Date(startDateObj.getTime() - durationMs);

    // Format resulting date as "YYYY-MM-DD"
    const resultDateStr = resultDateObj.toISOString().split('T')[0];

    return resultDateStr;
}

module.exports = { subtractDuration }