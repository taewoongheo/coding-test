

function solution(n, t, m, timetable) {
    const toMin = (time) => {
        const [hour, minute] = time.split(":");
        return +hour * 60 + +minute;
    }
    
    const toTime = (min) => {
        const hour = Math.floor(min / 60);
        const minute = min % 60;

        return String(hour).padStart(2, '0') + ':' +
               String(minute).padStart(2, '0');
    };
    
    let time = toMin("09:00");
    
    const rt = timetable.sort((a, b) => toMin(b) - toMin(a));
    
    for (let i = 0; i < n; i++) {
        
        if (!rt.length) break;

        let nm = m;
        while (rt.at(-1) && toMin(rt.at(-1)) <= time && nm > 0) {
            if (i === n - 1 && nm === 1) break;
            rt.pop();
            nm--;
        }
        
        if (i === n - 1) break;
        time += t;
    }
    
    // rt 가 비어있으면 = 전부 탑승하고 한 자리 남음
    if (!rt.length) {
        return toTime(time);
    }
    
    if (toMin(rt.at(-1)) > time) return toTime(time);
    
    return toTime(toMin(rt.at(-1)) - 1);
    
}