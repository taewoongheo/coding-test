function solution(user_id, banned_id) {
    
    const map = new Map();
    for (const bid of banned_id) {
        map.set(bid, []);
        for (const uid of user_id) {
            if (uid.length !== bid.length) continue;
            
            let possible = true;
            for (let i = 0; i < uid.length; i++) {
                const bchar = bid.charAt(i);
                const uchar = uid.charAt(i);
                if (bchar !== '*' && bchar !== uchar) possible = false;
            }
            
            if (possible) {
                const arr = map.get(bid);
                arr.push(uid);
            }
        }
    }
    
    let set = new Set();
    const dfs = (depth, visit = new Set()) => {
        if (depth === banned_id.length) {
            set.add([...visit].sort().join(' '));
            return;
        }
        
        const arr = map.get(banned_id[depth]);
        for (const uid of arr) {
            if (visit.has(uid)) continue;
            
            visit.add(uid);
            dfs(depth + 1, visit);
            visit.delete(uid);
        }
    }
    
    dfs(0);
    
    return set.size;
}