// 문제요약: 콘이 셔틀을 타고 도착하는 가장 늦은 시각 구하기
// 입력: 
//  n: 셔틀 운행 횟수, 0<n<=10
//  t: 셔틀 운행 간격, 0<t<=60
//  m: 셔틀 최대 인원 수, 0<m<=45
//  timetable: 크루가 대기열에 도착하는 시각 배열: 1<=timetable<=2000
// 알고리즘 선택: 
//  가장 늦게 도착하려면 마지막 셔틀에 탑승하면 된다
//  마지막 셔틀이 도착할 때, 남은 크루들이 탑승한다. 이때 탑승 인원이 한 자리가 남았을 때 콘이 타면 된다
//  단순 구현 문제
// 부분문제 분해: 
//  timetable에 있는 시각을 분 단위로 변경
//      ex) "08:00" => 8*60 + 0
//  timetable값을 내림차순으로 정렬
//  time(셔틀시각): "09:00" => 9 * 60 = 540에서 시작
//  while n !== 1: 마지막 셔틀까지
//      while m !== 0: 모든 인원이 탈 때까지
//          last = timetable.pop
//          if (time < last): 이후에 나오는 사람들 모두 못탐 => break 다음 셔틀
//          else:
//              m--
//      time += t
//  마지막 셔틀만 남음
//      콘이 도착할 시간 = time
//      이때 콘 보다 먼저 온 사람들이 있으면, 그 사람부터 태움
//      while (대기인원)
//          if (m === 1) break: 여기 콘이 타야됨
//          만약 대기 인원이 탈 수 있으면 m--
//          못타면 이후로도 못타는 인원들이기 때문에 바로 break;
//  만약 timetable의 마지막 사람이 time 보다 작다면, 콘이 도착하는 시간은 그 사람보다 1분 빠르게

function solution(n, t, m, timetable) {
    var answer = '';
    
    const times = timetable.map((el) => {
        const [hour, minute] = el.split(':');
        return Number(hour) * 60 + Number(minute);
    });
    times.sort((a, b) => b - a);
    
    // 셔틀 운행 시작 시간
    let time = 540;
    
    // 마지막 셔틀만 남을 때까지
    while (n !== 1) {
        let max = m;
        
        // 탑승 가능한 모든 인원이 탈 때까지
        while (max !== 0) {
            if (times[times.length - 1] <= time) {
                max--;
                times.pop();
            } else break;
        }
        
        time += t;
        n--;
    }
    
    answer = time;
    // 마지막 셔틀, 남은 사람들이 탈 수 있는지 체크
    while (times.length > 0) {
        if (m === 1) break;
        if (times[times.length - 1] <= time) {
            m--;
            times.pop();
        } else break;
    }
    
    // 탑승 가능한 인원이 남았고, 그 인원이 원래 탈 수 있었던 사람이라면 그 사람보다 1분 작게 만들어야 함
    if (times.length > 0 && times[times.length - 1] <= time) { 
        answer = times[times.length - 1] - 1;
    }

    const hour = Math.floor(answer / 60);
    const minute = answer % 60;
    
    return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`;
}