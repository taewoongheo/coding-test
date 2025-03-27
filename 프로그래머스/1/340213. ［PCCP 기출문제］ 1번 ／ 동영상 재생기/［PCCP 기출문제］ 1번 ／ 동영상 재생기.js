// 문제: 사용자의 입력이 모두 끝난 뒤 동영상의 위치를 구하기
// prev, next 는 각각 +- 10초
// 만약 오프닝 구간 내에 있다면 '자동으로' op_end 로 이동
// 시각을 모두 분단위로 바꾸고, 계산, 결과를 다시 시각으로 변환

function solution(video_len, pos, op_start, op_end, commands) {

    const vlen = timeToMinute(video_len);
    let cur = timeToMinute(pos);
    const op_s = timeToMinute(op_start);
    const op_e = timeToMinute(op_end);
    
    for (let i = 0; i < commands.length; i++) {
        const command = commands[i];
        
        if (cur >= op_s && cur <= op_e) {
            cur = op_e;
        }
        
        if (command === 'next') {
            cur += 10;
            if (cur > vlen) cur = vlen;
        } else if (command === 'prev') {
            cur -= 10;
            if (cur < 0) cur = 0;
        }
    }
    
    function timeToMinute(time) {
        const [mimute, second] = time.split(":").map(Number);
        
        const m = mimute * 60;
        const s = second;
        
        return m + s;
    }
    
    function minuteToTime(minute) {
        const m = String(Math.floor(minute / 60)).padStart(2, '0');
        const s = String(Math.floor(minute % 60)).padStart(2, '0');
        
        return `${m}:${s}`;
    }
    
    if (cur >= op_s && cur <= op_e) {
        cur = op_e;
    }
    
    return minuteToTime(cur);
}