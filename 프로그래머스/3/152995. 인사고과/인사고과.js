// 규칙: 
//  근무태도,동료평가. 어떤 사원이 특정 사원보다 두 점수 모두 낮다면 아예 제외
//  두 점수를 합한 값을 가지고 정렬
//  동석차 나오면, 그 만큼 다음 석차를 건너뜀
// 문제요약: 첫번째 직원의 석차 계산
// 알고리즘 선택: 
//  인센티브를 아예 받지 못하는 사람부터 걸러내야됨
//      자신보다 둘 다 적은값이 있는 사람이 있다면 그 사람을 걸러내야됨
//      O(n^2)이면 시간초과
//      한 명이 아니라 여러 명일 수도 있음
//      합이 가장 작은 애들이 인센티브를 못받을 가능성이 큼
//  애초에 완호가 몇 등인지 알아야되니까, 그 아래에 있는 애들은 상관없음
//  완호가 등수 아님 인센티브를 못받는 경우만 구하면 됨
//  합으로 내림차순 정렬, 완호보다 큰 애들나오면 answer++, 근데 둘 다 큰 애들 나오는 순간 -1

function solution(scores) {
    var answer = 0;
    
    const s = [scores[0][0], scores[0][1]];

    for (let i = 1; i < scores.length; i++) {
        const cur = scores[i];
        if (s[0] < cur[0] && s[1] < cur[1]) return -1;
    }
    
    scores = scores
        .filter(el => el[0] + el[1] > s[0] + s[1])
        .sort((a, b) => (a[0] + a[1]) - (b[0] + b[1]));
    
    let cnt = 0;
    for (let i = 0; i < scores.length; i++) {
        for (let j = i + 1; j < scores.length; j++) {
            if (scores[i][0] < scores[j][0] && scores[i][1] < scores[j][1]) {
                cnt++;
                break;
            }
        }
    }

    return scores.length + 1 - cnt;
}