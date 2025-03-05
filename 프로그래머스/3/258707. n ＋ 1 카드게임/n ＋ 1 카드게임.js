// 게임 룰
//  1~n 카드와 coin을 가지고 시작
//  n/3장을 뽑아 모두 가짐
//  라운드 시작
//      라운드는 갖고 있는 카드 중 두 장을 소비해 n+1을 맞춰 내면 통과, 못내면 거기서 끝
//      카드 두 장을 소비하기 전, 카드뭉치에서 카드 두 장을 뽑아 coin과 교환가능
// 문제요약: 게임에서 도달가능한 최대 라운드 수 구하기
// 알고리즘 선택: 
//  가장 먼저 떠오른 풀이는 greedy
//      coin을 최대한 소비하지 않도록 하는 것이 목표
//      따라서 현재 카드 뭉치 중 n+1이 완성되면 바로 내고, 
//      완성되지 않으면 coin을 소비해서 교환
//      문제는 당장은 필요없더라도 추후 사용될 카드를 coin과 미리 교환할 수 있다는 점
//  따라서 라운드가 진행될 수록 사용가능한 카드를 하나의 범위로 봐야함
//      왜냐하면 순차적으로 두 개씩 검사할 경우, 이미 지나간 카드는 검사할 수 없기 때문
// 부분문제 분해: 
//  removed_cards=[]: 이미 사용된 카드
//  for i in n/3+1 ~ n까지:
//      current_cards=[0~i까지 카드 중 removed_cards 제외]
//      combinations = getCombinations(current_cards): 현재 카드 조합 중 n+1을 만들 수 있는 카드 조합을 모두 리턴
//      for combi of combinations: 
//          coin = getCoin(combi): 해당 조합이 코인을 얼마나 사용하는지 체크
//      selectedCombi: 코인을 가장 적게 사용하는 조합 선택
//      removed_cards(selectedCombi): 제거된 카드 목록에 선택된 카드 조합 추가
//      round++
//      반복

function solution(coin, cards) {
    let round = 1; 
    const removed_cards = [];
    const n = cards.length / 3;
    const original_cards = cards.slice(0, n);
    const target = cards.length + 1;
    
    for (let i = n + 2; i <= cards.length + 1; i += 2) {
        const current_cards = cards.slice(0, i).filter(el => !removed_cards.includes(el));
        const combinations = getCombinations(current_cards, 2);
        const possible_combinations = getPossibleCombinations(combinations, target);
        
        if (possible_combinations.length === 0) return round;
        
        let c = Infinity;
        let selectedCombi = null;
        for (const combi of possible_combinations) {
            const needCoin = getCoin(original_cards, combi);
            
            if (needCoin < c) {
                c = needCoin;
                selectedCombi = combi;
            }
        }
        if (c > coin) break;
        
        removed_cards.push(...selectedCombi);
        coin -= c;
        round++;
    }
    
    function getCombinations(cards, cnt) {
        const results = [];
        
        if (cnt === 1) return cards.map((el) => [el]);
        
        cards.forEach((card, idx, origin) => {
            const rest = origin.slice(idx + 1);
            const combinations = getCombinations(rest, cnt - 1);
            const attached = combinations.map((combi) => [card, ...combi]);
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
    
    function getCoin(arr, combi) {
        let needCoin = 0; 
        for (let i = 0; i < combi.length; i++) {
            if (!arr.includes(combi[i])) needCoin++;
        }
        
        return needCoin;
    }
    
    return round;
}