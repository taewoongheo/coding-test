function solution(dice) {
    var answer = [];
    let answerCnt = 0;
    
    const dices = [];
    const n = dice.length;
    for (let i = 0; i < dice.length; i++) {
        // Set을 사용하지 않고 원래 배열 그대로 사용
        dices.push(dice[i]);
    }
    
    const cal = (s) => {
        let res = [];
        const calDfs = (idx, p) => {
            if (idx === s.length) {
                const sum = p.reduce((acc, cur) => acc + cur, 0);
                res.push(sum);
                return;
            }
            
            // 선택된 주사위의 인덱스를 가져와서 해당 주사위의 모든 면에 대해 계산
            const diceIdx = s[idx];
            for (const num of dices[diceIdx]) {
                p.push(num);
                calDfs(idx + 1, p);
                p.pop();
            }
        }
        
        calDfs(0, []);

        return res;
    }
    
    const dfs = (cnt, start, selected) => {
        if (cnt === Math.ceil(n / 2)) {
            // A
            let a = cal(selected);
            // B
            const v = Array.from({length: n}, () => false);
            for (let i = 0; i < selected.length; i++) {
                v[selected[i]] = true;
            }

            let b = [];
            for (let i = 0; i < v.length; i++) {
                if (!v[i]) b.push(i);
            }
            b = cal(b);
            
            let cnt = 0;
            a = a.sort((a, b) => a - b);
            b = b.sort((a, b) => a - b);
            for (let i = 0; i < a.length; i++) {
                for (let j = 0; j < b.length; j++) {
                    if (a[i] <= b[j]) break;
                    cnt++;
                }
            }
            
            if (cnt > answerCnt) {
                answerCnt = cnt;
                answer = [...selected];
                answer = answer.map((el) => el + 1);
                answer = answer.sort((a, b) => a - b);
            }
            
            return;
        }
        
        for (let i = start + 1; i < n; i++) {
            selected.push(i);
            dfs(cnt + 1, i, selected);
            selected.pop();
        }
    }
    
    dfs(0, -1, []);
    
    return answer;
}