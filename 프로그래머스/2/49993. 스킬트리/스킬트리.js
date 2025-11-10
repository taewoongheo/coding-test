function solution(skill, skill_trees) {
    const s = new Set(skill);
    
    const arr = skill.split('');
    
    let ans = 0;
    
    for (const str of skill_trees) {
        
        let cur = 0;
        let flag = true;
        for (const char of str) {
            if (!s.has(char)) continue;
            
            if (char === arr[cur]) {
                cur++;
                continue;
            }
            
            flag = false;
            break;
        }
        
        if (flag) ans++;
    }
    
    return ans++;
}