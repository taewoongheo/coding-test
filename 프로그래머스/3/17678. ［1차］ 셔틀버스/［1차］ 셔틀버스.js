// 특정 버스가 도착했을 때 탈 수 있는 사람들 다 태움
//  마지막 버스라면 탈수 있는 사람들 다 태우고 마지막에 자리 하나만 남김
//      sTimetable 에 사람이 있다면
//          버스 도착 시각 기준으로 그 사람과 비교해서 그 사람이 먼저 도착하면 그 사람보다 1분 빠르게
//          버스 도착 시각 기준으로 해도 그 사람보다 일찍 오면 그대로 탑승
//      sTimetable 에 사람이 없다면 버스 시각에 맞춰 탑승

function solution(n, t, m, timetable) {
    const timetomin = (time) => {
        const [hour, minute] = time.split(":");
        return +hour * 60 + +minute;
    }
    
    const mintotime = (min) => {
        return String(Math.floor(min / 60)).padStart(2, '0') + ':' + String(min % 60).padStart(2, '0');
    }
    
    const sTimetable = timetable.map(el => timetomin(el)).sort((a, b) => b - a);
    
    let time = timetomin("09:00"); // 오전 9시 출발
    
    let ans = null;
    
    for (let i = 0; i < n; i++) {
        
        // 탑승 가능한 인원들 전부 탑승
        let tm = m;
        while (tm > 0 && sTimetable.length && sTimetable.at(-1) <= time) {
            if (i === n - 1 && tm === 1) {
                // 마지막 셔틀의 마지막 자리
                break;
            }
            sTimetable.pop();
            tm--;
        }
        
        // 마지막 셔틀
        if (i === n - 1) {
            // 셔틀 도착시각에 맞춤
            ans = mintotime(time);
                
            // 근데 먼저 온 사람 
            if (sTimetable.length && time >= sTimetable.at(-1)) {
                ans = mintotime(sTimetable.pop() - 1);
            }
        }
        
        time += t;
    }
    
    return ans;
}
