function solution(D) {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    
    // Initialize result object with all days
    const result = {};
    daysOfWeek.forEach(day => result[day] = 0);
    
    // Object to track which days have data
    const hasData = {};
    daysOfWeek.forEach(day => hasData[day] = false);
    
    // Process input data and sum values for each day
    for (const [dateStr, value] of Object.entries(D)) {
        const date = new Date(dateStr);
        const dayIndex = date.getDay(); // 0 = Sunday, 1 = Monday, etc.
        const dayName = daysOfWeek[dayIndex];
        
        result[dayName] += value;
        hasData[dayName] = true;
    }
    
    // Fill missing days with proper linear interpolation
    for (let i = 0; i < daysOfWeek.length; i++) {
        const currentDay = daysOfWeek[i];
        
        if (!hasData[currentDay]) {
            // Find previous available day
            let prevIndex = i - 1;
            while (prevIndex >= 0 && !hasData[daysOfWeek[prevIndex]]) {
                prevIndex--;
            }
            
            // Find next available day
            let nextIndex = i + 1;
            while (nextIndex < daysOfWeek.length && !hasData[daysOfWeek[nextIndex]]) {
                nextIndex++;
            }
            
            // If both neighbors found, interpolate linearly
            if (prevIndex >= 0 && nextIndex < daysOfWeek.length) {
                const prevDay = daysOfWeek[prevIndex];
                const nextDay = daysOfWeek[nextIndex];
                const prevValue = result[prevDay];
                const nextValue = result[nextDay];
                
                const gap = nextIndex - prevIndex;
                const step = (nextValue - prevValue) / gap;
                const position = i - prevIndex;
                
                result[currentDay] = Math.round(prevValue + (step * position));
            }
        }
    }
    
    return result;
}

module.exports = solution;