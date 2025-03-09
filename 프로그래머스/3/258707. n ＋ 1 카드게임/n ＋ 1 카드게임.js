// 게임 룰
//  1~n 카드뭉치와 coin이 있음
//  n/3개의 카드를 가지고 시작
//  라운드마다 카드 두 장 뽑음, 코인 써서 교환가능
//  카드의 합이 n+1 이 되도록 못내면 거기서 끝
// 문제요약: 도달가능한 최대 라운드 수 구하기
// 알고리즘 선택: 
//  x+y=n+1이라면, 카드 x는 항상 카드 y랑만 낼 수 있음
//  현재 가진 카드 x와 y가 있다고 했을 때, 뽑은 카드와 x를 함께 낼 수 있다면 뽑은 카드는 항상 y와 같은 수임
//  즉, 코인을 최대한 아끼고 카드를 내는게 유리함. 어차피 낼 수 있다면 수는 같기 때문
//  이때 한 가지 고려해야 될 점은, 뽑은 카드를 당장 쓰지 않더라도 코인을 써서 교환 후 나중에 쓸 수 있다는 것임
//      한번 버리면 끝나기 때문
//  즉, 이전에 버린 카드들까지 함께 고려해야 한다. 따라서 범위를 기준으로 카드를 뽑도록 함
//  이미 사용한 카드들을 제외하고 2씩 범위가 늘어남. 이 범위 안에서 카드 두 장을 뽑도록 하면 됨
// 부분문제 분해: 
//  removed_cards=[]: 선택된 카드
//  for n/3~n까지 i+=2:
//      현재 사용가능한 카드=cards에서 removed_cards 제외
//      나올 수 있는 조합 구하기
//      조합 중 n+1을 만족하는 조합만 구하기
//      n+1을 만족하는 조합 중 코인을 가장 적게 사용하는 조합 구하기
//      해당 조합을 removed_cards에 push

function solution(coin, cards) {
    let round = 1; 
    
    const n = cards.length;
    const target = n + 1;
    const init = Math.floor(n / 3);
    const removed_cards = [];
    
    for (let i = init + 1; i < n; i += 2) {
        const current_cards = cards.slice(0, i + 1).filter(el => !removed_cards.includes(el));
        const combinations = getCombinations(current_cards, 2);
        
        const possible_combinations = getPossibleCombinations(combinations, target);
        if (possible_combinations.length <= 0) break;
        
        let c = Infinity; 
        let selectedCombi = [];
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
        let results = [];
        
        combinations.forEach((combi) => {
            if (combi[0] + combi[1] === target) results.push([combi[0], combi[1]]);
        });
        
        return results;
    }
    
    function getCoin(combi, cards, init) {
        let cnt = 0; 
        
        const pull_cards = cards.slice(init);
        
        if (pull_cards.includes(combi[0])) cnt++;
        if (pull_cards.includes(combi[1])) cnt++;
        
        return cnt;
    }
    
    return round;
}