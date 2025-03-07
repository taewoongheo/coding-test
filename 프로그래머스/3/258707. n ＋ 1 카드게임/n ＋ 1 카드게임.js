// 게임 룰
//  1~n 카드뭉치
//  n/3장 가지고 시작
//  카드 두 장 뽑음, 코인으로 교환가능, 아니면 버려야됨
//  가진 카드 중 n+1 을 만들어서 내야됨. 못내면 끝
// 문제요약: 도달 가능한 최대 라운드 수 구하기
// 알고리즘 선택: 
//  x,y가 n+1을 만족하여 카드를 낼 수 있다고 해보자
//  이때 반드시 n+1이라는 정확한 수가 되어야 하기 때문에 x는 무조건 y랑만 짝을 이룸
//  따라서 현재 갖고 있는 카드에서 n+1이 만족한다면 이후에도 똑같이 계속 낼 수 있는 상태가 됨
//      만약 뽑은 카드와 사용할 수 있다고 해도, 그건 y와 항상 동일한 수임
//  그렇기 때문에 코인을 최대한 아끼고 현재 갖고 있는 카드로만 낼 수 있는지 우선적으로 확인
//  이때 주의할 점은, 뽑은 카드 중 당장은 필요없더라도 추후 다른 카드와 함께 사용할 수 있는 경우가 있음
//  따라서 이전에 뽑은 카드들까지 함께 고려해야 함
//      그리고 이것을 '범위'로 구현
// 부분문제 분해:
//  removed_cards: 제출한 카드
//  for i in cards: i+2씩 늘어남
//      i~cards 중 removed_cards 에 포함된 카드는 제외
//      카드 중 만들 수 있는 조합을 모두 생성
//      조합 중 n+1을 만족하는 조합만 걸러냄
//      그 조합들 중 코인을 가장 적게 사용하는 조합을 찾음
//      그 조합을 removed_cards에 넣고 반복

function solution(coin, cards) {
    let round = 1;
    const n = cards.length; 
    const target = n + 1;
    const init = Math.floor(n / 3);
    const removed_cards = [];
    
    for (let i = init + 2; i <= n + 1; i+= 2) {
        const current_cards = cards.slice(0, i)
            .filter(el => !removed_cards.includes(el));
        
        const combinations = getCombinations(current_cards, 2);
        
        const possible_combinations = getPossibleCombinations(combinations, target);
        if (possible_combinations.length < 0) break;
        
        let c = Infinity;
        let selectedCombi = null;
        for (const combi of possible_combinations) {
            const need = getCoin(combi, cards, init);
            
            if (need < c) {
                c = need;
                selectedCombi = combi;
            }
        }
        
        coin -= c;
        if (coin < 0) break;
        
        removed_cards.push(...selectedCombi);
        round++;
    }
    
    function getCombinations(cards, cnt) {
        const results = [];
        
        if (cnt === 1) return cards.map(el => [el]);
        
        cards.forEach((card, idx, arr) => {
            const rest = arr.slice(idx + 1);
            const combinations = getCombinations(rest, cnt - 1);
            const attached = combinations.map(combi => [card, ...combi]);
            results.push(...attached);
        });
        
        return results;
    }
    
    function getPossibleCombinations(combinations, target) {
        const results = [];
        
        for (const combi of combinations) {
            if (combi[0] + combi[1] === target) results.push([combi[0], combi[1]]);
        }
        
        return results;
    }
    
    function getCoin(combi, origin, init) {
        let cnt = 0; 
        
        const needCoinCards = origin.slice(init);
        if (needCoinCards.includes(combi[0])) cnt++;
        if (needCoinCards.includes(combi[1])) cnt++;
        
        return cnt;
    }
    
    return round; 
}
