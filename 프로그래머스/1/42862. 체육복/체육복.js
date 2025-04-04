function solution(n, lost, reserve) {
    reserve = reserve.sort((a, b) => a - b);
    
    const s = new Set([...lost]);
    reserve = reserve.reduce((reserve, cur) => {
        if (s.has(cur)) {
            s.delete(cur);
            return reserve;
        }
        return [...reserve, cur];
    }, []);
    
    for (const r of reserve) {
        if (s.has(r - 1)) {
            s.delete(r - 1);
        } else if (s.has(r + 1)) {
            s.delete(r + 1);
        }
    }
    
    return n - s.size;
}