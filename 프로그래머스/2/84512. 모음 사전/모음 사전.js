function solution(word) {
    let cnt = 0;
    let flag = false;
    
    const alpha = ['A', 'E', 'I', 'O', 'U'];
    
    const dfs = (len, str) => {
        if (!flag) cnt++;
        
        if (str === word) {
            flag = true;
            return;
        }
        
        if (len === 5) {
            return;
        }
        
        for (const char of alpha) {
            dfs(len + 1, str + char);
        }
    }
    
    dfs(0, '');
    
    return cnt - 1;
}