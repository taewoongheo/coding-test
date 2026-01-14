// 이모티콘 최대 개수 = 7, 각 이모티콘마다 4가지의 할인 = 4^7 = 16384
// 최대 유저 = 100
// 16384 x 100 = 1638400 x 4(계산 시 할인된 아이템 루프)

function solution(users, emoticons) {
    let ans = [0, 0];
    
    const discount = [10, 20, 30, 40];

    // emoticons 를 순서대로 탐색한다고 가정
    const cal = emoticons.map(el => {
        const obj = {};
        for (const rate of discount) {
            obj[rate] = el * ((100 - rate) / 100);
        }
        return obj;
    });
    
    // emoticons 를 순서대로 나열해야됨
    const res = [];
    
    const dfs = (depth, arr) => {
        
        if (depth === emoticons.length) {
            res.push([...arr]);
            return;
        }
        
        for (const rate of discount) {
            arr.push(rate);
            dfs(depth + 1, arr);
            arr.pop();
        }
    }
    
    dfs(0, []);
    
    for (const combi of res) {
        
        let cnt = 0;
        let amt = 0;
        
        for (const user of users) {
            const [minimum, threshold] = user;
            
            let p = 0;
            for (let i = 0; i < combi.length; i++) {
                if (minimum <= combi[i]) {
                    p += cal[i][combi[i].toString()];
                }
            }
            
            if (p >= threshold) {
                cnt++;
            } else {
                amt += p;
            }
        }
        
        if (ans[0] < cnt) {
            ans = [cnt, amt];
        } else if (ans[0] === cnt && ans[1] < amt) {
            ans = [cnt, amt];
        }
    }
    
    return ans;
}