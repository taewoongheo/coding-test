// 문제: 검사자의 성격 유형 검사 결과를 지표번호 순서대로 리턴
// 각 유형 별 맵을 만들고, 점수를 계산해 맵에 더함
// 지표의 순서는 정해져있으므로, 이 순서에 맞게 반환하면 된다

function solution(survey, choices) {
    var answer = '';
    
    const k = ['R', 'T', 'C', 'F', 'J', 'M', 'A', 'N'];
    const map = k.reduce((map, key) => {
        map[key] = {
            score: 0,
        };
        return map;
    }, {});
    
    for (let i = 0; i < survey.length; i++) {
        const [c1, c2] = survey[i].split('');
        const s = choices[i];
        
        if (s <= 3) {
            map[c1].score += (4 - s);
        } else if (s >= 5) {
            map[c2].score += (s - 4);
        }
    }
    
    const pair = [
        ['R', 'T'],
        ['C', 'F'],
        ['J', 'M'],
        ['A', 'N'],
    ];
    
    for (let i = 0; i < pair.length; i++) {
        const [k1, k2] = pair[i];
        const s1 = map[k1].score;
        const s2 = map[k2].score;
        
        if (s1 < s2) answer += k2;
        else answer += k1;
    }
    
    return answer;
}