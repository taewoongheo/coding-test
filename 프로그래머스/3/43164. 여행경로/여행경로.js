// 가능한 모든 경로를 저장한 뒤 알파벳 순으로 정렬

function solution(tickets) {
    const ans = [];
    
    dfs(tickets, 'ICN', ['ICN']);
    
    function dfs(t, cur, path) {
        if (!t.length) {
            ans.push(path);
            return;
        }
        
        for (let i in t) {
            if (t[i][0] === cur) {
                const tmp = [...t];
                tmp.splice(i, 1);
                const tmp2 = [...path];
                tmp2.push(t[i][1]);
                dfs(tmp, t[i][1], tmp2);
            }
        }
    }
    
    return ans.sort()[0];
}