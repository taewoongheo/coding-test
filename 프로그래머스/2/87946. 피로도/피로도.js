

function solution(k, dungeons) {
    let ans = 0;
    
    const dfs = (depth, fatigue, visit) => {
        if (fatigue < 0) {
            ans = Math.max(ans, depth - 1);
            return;
        }
        
        for (let i = 0; i < dungeons.length; i++) {
            if (!visit.has(i) && fatigue >= dungeons[i][0]) {
                visit.add(i);
                dfs(depth + 1, fatigue - dungeons[i][1], visit);
                visit.delete(i);
            }
        }
        
        ans = Math.max(ans, depth);
    }
    
    dfs(0, k, new Set());
     
    return ans;
}