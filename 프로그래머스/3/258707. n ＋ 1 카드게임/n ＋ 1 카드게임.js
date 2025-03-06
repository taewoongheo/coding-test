// 게임 룰
//  n/3 장 가지고 시작
//  두 장 뽑음
//  뽑은 카드는 코인으로 교환가능
//  가진 카드 중 n+1을 만들어서 낼 수 있으면 다음 라운드
// 문제요약: 도달 가능한 최대 라운드 수 구하기
// 알고리즘 선택: 
//  일단 최대한 코인을 아껴놔야 함. 즉, 기존에 갖고 있던 카드로 먼저 사용하고, 사용불가하면 코인을 써서 교환
//  이때 고려해야 할 것은 현재 당장 필요없는 카드더라도 미리 바꿨다가 나중에 사용가능하다는 것
//  그래서 범위로 사용가능한 카드를 고려할 것임
// 부분문제 분해:
//  removed_cards = []: 선택된 카드들
//  for i in +2: 두 장씩 뽑기 때문에 검사할 카드 범위가 넓어짐
//      current_cards = removed_cards에 없는 카드들만 선택가능
//      combinations = getCombinations: 나올 수 있는 조합들
//      possible_combinations = getPossibleCombinations: 조건에 만족하는 조합들
//      for combi of possible_combinations: 가능한 조합 중 코인을 가장 적게 사용하는 조합 고르기
//          need = getCoin(combi): 해당 조합이 몇 개의 코인을 소모하는지
//      coin -= need
//      if (coin < 0) break: 사용할 코인이 없음
//      라운드 증가

function solution(coin, cards) {
    let round = 1; 
    const n = cards.length;
    const target = n + 1;
    const init = Math.floor(n / 3);
    const original_cards = [...cards];
    const removed_cards = [];

    for (let i = init + 2; i <= n + 1; i += 2) {
        const current_cards = cards.slice(0, i).filter(el => !removed_cards.includes(el));
        const combinations = getCombinations(current_cards, 2);
        
        const possible_combinations = getPossibleCombinations(combinations, target);
        if (possible_combinations.length <= 0) break;

        let c = Infinity; 
        let cb = null;
        for (const combi of possible_combinations) {
            const need = getCoin(combi, original_cards, init);
            
            if (need < c) {
                c = need;
                cb = combi;
            }
        }
        
        coin -= c;
        if (coin < 0) break;
        
        round++;
        removed_cards.push(...cb);
    }
    
    function getCombinations(cards, cnt) {
        const results = [];
        
        if (cnt === 1) return cards.map(el => [el]);
        
        cards.forEach((card, idx, arr) => {
            const rest = arr.slice(idx + 1);
            const combinations = getCombinations(rest, cnt - 1);
            const attached = combinations.map((combi) => [card, ...combi]);
            results.push(...attached);
        });
        
        return results;
    }
    
    function getPossibleCombinations(cards, target) {
        const res = [];
        
        for (const card of cards) {
            if (card[0] + card[1] === target) res.push([card[0], card[1]]);
        }
        
        return res;
    }
    
    function getCoin(combi, origin, init) {
        let cnt = 0;
        
        const later = origin.slice(init);
        if (later.includes(combi[0])) cnt++;
        if (later.includes(combi[1])) cnt++;
        
        return cnt;
    }
    
    return round;
}
