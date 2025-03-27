// 주말제외
//  6, 7 로 나누어 떨어지면 그건 주말임

function solution(schedules, timelogs, startday) {
    var answer = 0;
    
    function getScheduleTime(num) {
        const hour = Math.floor(num / 100);
        const minute = Math.floor(num % 100);
        
        let total = (hour * 60) + minute + 10;
        
        const nhour = Math.floor(total / 60);
        const nminute = Math.floor(total % 60);
        
        return nhour * 100 + nminute;
    }
    
    const w = [6, 7, 13, 14];
    for (let i = 0; i < schedules.length; i++) {
        const s = getScheduleTime(schedules[i]);
        
        let d = startday - 1;
        let flag = true;
        for (let j = 0; j < 7; j++) {
            d++;
            if (w.includes(d)) continue;
            if (s < timelogs[i][j]) {
                flag = false;
                break;
            }
        }
        
        if (flag) answer++;
    }
    
    return answer;
}