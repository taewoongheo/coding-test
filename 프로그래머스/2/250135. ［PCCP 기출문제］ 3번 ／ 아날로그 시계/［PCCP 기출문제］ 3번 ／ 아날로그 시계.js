function solution(h1, m1, s1, h2, m2, s2) {
    const sec_angle = 360/60;
    const minute_angle = 360/60/60;
    const hour_angle = 360/60/60/12;
    
    let start_time = h1*3600+m1*60+s1;
    const end_time = h2*3600+m2*60+s2;
    
    const start_sec_angle = (start_time * sec_angle) % 360;
    const start_minute_angle = (start_time * minute_angle) % 360;
    const start_hour_angle = (start_time * hour_angle) % 360;
    
    let cnt = 0;

    //시작 시간에 초침과 시침이 겹쳐있으면 카운트
    if (start_sec_angle === start_hour_angle) cnt++;
    //시작 시간에 초침과 분침이 겹쳐있으면 카운트
    if (start_sec_angle === start_minute_angle) cnt++;
    //시작 시간에 시침, 분침, 초침 3가지가 겹쳐있는 경우 -1
    if (start_sec_angle === start_hour_angle && start_sec_angle === start_minute_angle)
        cnt--;
    
    while (start_time < end_time) {
        const current_sec_angle = (start_time * sec_angle) % 360;
        const current_minute_angle = (start_time * minute_angle) % 360;
        const current_hour_angle = (start_time * hour_angle) % 360;
        
        const next_time = start_time + 1;
        
        const next_sec_angle = (next_time * sec_angle) % 360 || 360;
        const next_minute_angle = (next_time * minute_angle) % 360 || 360;
        const next_hour_angle = (next_time * hour_angle) % 360 || 360;
        
        if (current_sec_angle < current_hour_angle && next_sec_angle >= next_hour_angle)
            cnt++;
        //초침이 분침 뒤에 있었는데 1초 뒤에 분침 앞으로 가면 카운트+1
        if (current_sec_angle < current_minute_angle && next_sec_angle >= next_minute_angle)
            cnt++;
        //1초 뒤에 시침 분침 초침 3개가 겹치면 -1(0시, 12시)
        if (next_sec_angle === next_hour_angle && next_sec_angle === next_minute_angle)
            cnt--;
            
        start_time = next_time;
    }
    
    return cnt;
}