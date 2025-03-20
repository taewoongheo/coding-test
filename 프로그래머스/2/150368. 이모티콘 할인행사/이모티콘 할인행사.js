function solution(users, emoticons) {
    var answer = [0, 0];
    
    const sales = [];
    const discount = [10, 20, 30, 40];
    
    const arr = Array.from({length: emoticons.length}, () => 0);
    dfs(arr, 0);
    
    for (let i = 0; i < sales.length; i++) {
        const sale = sales[i];
        const candi = [0, 0];
        for (let j = 0; j < users.length; j++) {
            const [r, p] = users[j];
            
            let amount = 0;
            for (let k = 0; k < sale.length; k++) {
                if (r <= sale[k]) {
                    amount += emoticons[k] * (100 - sale[k]) / 100;
                }
            }
            if (amount >= p) {
                candi[0]++;
            } else {
                candi[1] += amount;
            }
        }
        
        
        if (candi[0] >= answer[0]) {
            if (candi[0] > answer[0]) {
                answer = candi;
            } else {
                if (candi[1] > answer[1]) {
                    answer = candi;
                }
            }
        }
    }
    
    function dfs(ar, idx) {
        if (idx === emoticons.length) {
            sales.push([...ar]);
            return;
        }
        
        for (let i = 0; i < 4; i++) {
            ar[idx] = discount[i];
            dfs(ar, idx + 1);
            ar[idx] = 0;
        }
    }
    
    return answer;
}