// 룰
//  카드 n/3장 뽑아 시작
//  라운드 시작 시 2장 뽑고, 뽑은 카드를 코인을 써서 교환가능
//  n+1이 되도록 카드 두 장을 낼 수 있으면 다음 라운드로 진행
// 문제요약: 도달가능한 최대 라운드 구하기
// 알고리즘 선택: 
//  카드 두 장을 뽑아서 내야됨. 이때 최대로 도달하기 위해선 코인을 최대한 아껴야 됨
//      x+y=n+1 이라고 했을 때, 둘 다 갖고 있다고 해보자
//      만약 뽑은 카드가 z라고 했을 때, x+z=n+1을 만족한다면, z=y임
//      즉, n+1을 만들기 위해 특정 카드가 가질 수 있는 조합의 숫자는 정해져 있으므로 코인으로 뽑던 가진 카드를 사용하던 똑같음
//      그래서 코인을 최대한 아껴야 나중에 필요할 때 쓸 수 있음
//  주의할 점은, 지금 당장 필요없더라도 코인을 사용해 미리 교환해놓을 수 있다는 것
//  따라서 범위로 카드를 고려하고, 매 라운드 마다 범위 내에서 코인을 써서 교환할 수 있도록 함
//  이렇게 되면 이미 지나쳤던 카드도 필요해지면 다시 뽑을 수 있음
// 부분문제 분해: 
//  뽑은카드들=[]: 이미 제출한 카드
//  for cards in i+=2:
//      cards.filter(뽑은카드들)
//      현재 카드들 중 가능한 조합 구하기
//      가능한 조합 중 n+1을 만족하는 조합 구하기
//      해당 조합 중 코인을 가장 적게 사용하는 조합 구하기
//      그만큼 코인 제외, 라운드 증가

function solution(coin, cards) {
    let round = 1; 
    const removedCards = [];
    const n = cards.length;
    const init = n / 3;
    const after = cards.slice(init);
    
    for (let i = init + 2; i <= n + 1; i += 2) {
        const currentCards = cards.slice(0, i).filter(el => !removedCards.includes(el));
        
        const combinations = getCombinations(currentCards, 2);
        
        const possibleCombinations = getPossibleCombinations(combinations);
        if (possibleCombinations.length < 1) break;
        
        let v = Infinity;
        let selectedCombi = null;
        for (const combi of possibleCombinations) {
            const need = getCoin(combi);
            
            if (need < v) {
                v = need;
                selectedCombi = combi;
            }
        }
        coin -= v;
        if (coin < 0) break;
        
        round++;
        removedCards.push(...selectedCombi);
    }
    
    function getCombinations(cards, cnt) {
        const results = [];
        
        if (cnt === 1) return cards.map(el => [el]);
        cards.forEach((card, idx, arr) => {
            const rest = arr.slice(idx + 1);
            const attached = getCombinations(rest, cnt - 1);
            const arrs = attached.map(combi => [card, ...combi]);
            results.push(...arrs);
        });
        
        return results;
    }
    
    function getPossibleCombinations(combinations) {
        const results = [];
        
        for (const combi of combinations) {
            if (combi[0] + combi[1] === n + 1) results.push(combi);
        }
        
        return results;
    }
    
    function getCoin(combi) {
        let need = 0; 
        
        if (after.includes(combi[0])) need++;
        if (after.includes(combi[1])) need++;
        
        return need;
    }
    
    return round;
}