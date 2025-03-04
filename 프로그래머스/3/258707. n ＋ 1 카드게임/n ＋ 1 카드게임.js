function solution(coin, cards) {
    let round = 1;
    const n = cards.length / 3;
    const target = cards.length + 1;
    const removed_cards = [];
    const origin_cards = cards.slice(0, n);
    
    for (let i = n + 2; i <= cards.length + 1; i+= 2) {
        const cur_cards = cards.slice(0, i).filter(el => 
            !removed_cards.includes(el));
        
        const combinations = getCombination(cur_cards, 2);
        const possible_combs = sumTarget(combinations, target);
        
        if (possible_combs.length === 0) return round;
        
        let min = Infinity;
        let select_combs = [];
        for (const candi of possible_combs) {
            let coin_cnt = checkCoin(origin_cards, i, candi);
            
            if (coin_cnt < min) {
                min = coin_cnt;
                select_combs = candi;
            }
        }
        
        if (min > coin) return round;
        
        round++;
        coin -= min;
        removed_cards.push(...select_combs);
    }
    
    function checkCoin(arr, n, card) {
        let cnt = 0; 
        for (let i = 0; i < card.length; i++) {
            if (!arr.includes(card[i])) cnt++;
        }

        return cnt;
    }
    
    function sumTarget(combinations, target) {
        const res = [];
        for (const combi of combinations) {
            const sum = combi.reduce((acc, cur) => acc + cur, 0);
            if (sum === target) res.push(combi);
        }
        
        return res;
    }
    
    function getCombination(arr, selectedNum) {
        let results = [];
        
        if (selectedNum === 1) return arr.map(el => [el]);
        
        arr.forEach((fixed, idx, origin) => {
            const rest = origin.slice(idx + 1);
            const combinations = getCombination(rest, selectedNum - 1);
            const attached = combinations.map((combi) => [fixed, ...combi]);
            results.push(...attached);
        });
        
        return results;
    }
    
    return round;
}