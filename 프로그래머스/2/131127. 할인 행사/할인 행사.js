function solution(want, number, discount) {
    let answer = 0;
    
    let total = 0;
    const buy = want.reduce((obj, cur, idx) => {
        obj[cur] = idx;
        total += number[idx];
        return obj;
    }, {});
    
    const n = discount.length;
    for (let i = 0; i < n - total + 1; i++) {
        const cnt = [...number];
        for (let j = 0; j < total; j++) {
            const item = discount[i + j];
            const idx = buy[item];
            if (idx !== undefined) {
                cnt[idx]--;
            }
        }
        
        const zero = cnt.find((el) => el !== 0);
        if (!zero) {
            answer++;
        }
    }
    
    return answer;
}