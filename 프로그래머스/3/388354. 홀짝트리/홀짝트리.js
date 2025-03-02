function solution(nodes, edges) {
    var answer = [];
    
    const n = nodes.length;
    
    const idxOf = new Map();
    nodes.forEach((v, i) => {
        idxOf.set(v, i);
    });
    
    const adj = Array.from({length: n}, () => []);
    const deg = Array(n).fill(0);
    
    for (const [a, b] of edges) {
        const ai = idxOf.get(a);
        const bi = idxOf.get(b);
        adj[ai].push(bi);
        adj[bi].push(ai);
        deg[ai]++;
        deg[bi]++;
    }
    
    const v = Array(n).fill(false);
    const components = [];
    
    for (let i = 0; i < n; i++) {
        if (!v[i]) {
            const comp = [];
            const stack = [i];
            v[i] = true;
            
            while (stack.length > 0) {
                const curr = stack.pop();
                comp.push(curr);
                
                for (const nxt of adj[curr]) {
                    if (!v[nxt]) {
                        v[nxt] = true;
                        stack.push(nxt);
                    }
                }
            }
            components.push(comp);
        }
    }
    
    let oe = 0;
    let roe = 0; 
    
    for (const comp of components) {
        let c0 = 0; 
        const size = comp.length;
        
        for (const v of comp) {
            const nodeVal = nodes[v];
            const parity = (nodeVal % 2 + 2) % 2;
            const degP = deg[v] % 2;
            
            const lhs = parity ^ degP;
            if (lhs === 0) c0++;
        }
        
        const c1 = size - c0;
        
        if (c0 === 1) oe++;
        if (c1 === 1) roe++;
    }
    
    return [oe, roe];
}