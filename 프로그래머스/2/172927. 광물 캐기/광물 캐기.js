function solution(picks, minerals) {
    var answer = 0;
    
    let marr = [];
    const tired = [
        [1, 1, 1], 
        [5, 1, 1], 
        [25, 5, 1],
    ];
    
    const len = Math.ceil(minerals.length / 5);
    const maxLen = picks[0] + picks[1] + picks[2];
    
    for (let i = 0; i < len; i++) {
        if (i >= maxLen) break;
        
        const arr = [0, 0, 0];
        
        minerals.splice(0, 5).forEach(item => {
            switch(item) {
                case "diamond" : arr[0]++; break;
                case "iron" : arr[1]++; break;
                default : arr[2]++; break;
            }
        });
        
        marr.push(arr)
    }
    
    marr = marr.sort((a, b) => {
        if (a[0] !== b[0]) return b[0] - a[0];
        else if (a[1] !== b[1]) return b[1] - a[1];
        return b[0] - a[0];
    })

    marr.forEach(item => {
        const [d, i, s] = item;
        
        let idx = 0; 
        if (picks[0] !== 0) idx = 0;
        else if (picks[1] !== 0) idx = 1;
        else idx = 2;
        
        picks[idx]--;
        answer += (tired[idx][0] * d);
        answer += (tired[idx][1] * i);
        answer += (tired[idx][2] * s);
    })
    
    return answer;
}