// 문제: 여벌의 옷을 빌려줄 때 체육복을 가지는 최대 학생 수
// 여분이 있는 학생은 바로 앞 뒤로 한번만 빌려줄 수 있음
// 체육복이 없는 학생들은 set 에 넣고, 여분의 체육복이 있는 학생들은 자신의 앞 학생부터 검사
// 만약 자신의 앞이 체육복이 없는 학생이라면 그 학생을 set에서 없애고 다음으로 넘어감
// 뒤도 검사
// 앞에서부터 채우기

function solution(n, lost, reserve) {
    
    reserve = reserve.sort((a, b) => a - b);
    const s = new Set([...lost]);

    for (let i = 0; i < reserve.length; i++) {
        if (s.has(reserve[i])) { 
            s.delete(reserve[i])
            reserve.splice(i, 1);
            i--; 
        }
    }
    
    console.log(reserve);
    
    for (const r of reserve) {
        if (s.has(r - 1)) {
            s.delete(r - 1);
        } else if (s.has(r + 1)) {
            s.delete(r + 1);
        }
    }
    
    return n - s.size;
}