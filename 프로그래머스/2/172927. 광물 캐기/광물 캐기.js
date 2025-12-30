// 바로 앞 광물만 보고 캐면 뒤에 나올 광물을 모르기 때문에 최적으로 구할 수 없음
//  바로 앞 5개의 광물만 보고 캐는 경우에도 마찬가지
// 하나의 곡괭이를 5번씩 쓸 수 있으므로 광물 5개를 하나의 그룹으로 묶음
//  dia, iron, stone 별 점수를 부여해 각 그룹당 점수를 계산
//  점수가 높은 그룹부터 정렬한 뒤, 다이아곡괭이부터 사용하면 됨

// 곡괭이 개수 x 5 < 광물 개수인 경우 마지막 남는 광물들은 포함하면 안됨

function solution(picks, minerals) {
    let total = picks.reduce((acc, cur) => acc + cur * 5, 0);
    
    if (total < minerals.length) minerals = minerals.slice(0, total);
    
    const group = [];
    while (minerals.length >= 5) {
        group.push(minerals.splice(0, 5));
    }
    group.push(minerals);
    
    group.sort((a, b) => getScore(b) - getScore(a));
    
    function getScore(arr) {
        return arr.reduce((acc, cur) => {
            if (cur === 'diamond') acc += 25;
            else if (cur === 'iron') acc += 5;
            else acc += 1;
            return acc;
        }, 0);
    }
    
    return group.reduce((acc, cur) => {
        if (picks[0]) {
            picks[0]--;
            acc += cur.length;
        } else if (picks[1]) {
            picks[1]--;
            for (const el of cur) {
                if (el === 'diamond') {
                    acc += 5;
                } else {
                    acc += 1;
                }
            }
        } else if (picks[2]) {
            picks[2]--;
            for (const el of cur) {
                if (el === 'diamond') {
                    acc += 25;
                } else if (el === 'iron') {
                    acc += 5;
                } else {
                    acc += 1;
                }
            }
        }
        
        return acc;
    }, 0);
}