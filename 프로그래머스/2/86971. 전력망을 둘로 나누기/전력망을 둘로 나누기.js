// 끊을 와이어 하나를 정하고 매번 전부 세는 방법
//  100개의 송전탑이면, 99개의 와이어가 존재
//  와이어 하나를 끊고 송전탑 개수를 전부 센다고 하면, 99x100=9900, 시간초과 안남. 가능

function solution(n, wires) {
    const tree = new Map();
    for (const wire of wires) {
        const [n1, n2] = wire;

        if (!tree.get(n1)) tree.set(n1, []);
        if (!tree.get(n2)) tree.set(n2, []);
        
        const arr1 = tree.get(n1);
        const arr2 = tree.get(n2);
        
        tree.set(n1, [...arr1, n2]);
        tree.set(n2, [...arr2, n1]);
    }
    
    const cnt = (node, visit) => {
        const arr = tree.get(node);
        
        let total = 1;
        
        for (const n of arr) {
            if (!visit.has(n)) {
                visit.add(n);
                total += cnt(n, visit);
            }
        }
        
        return total;
    }
    
    let ans = Infinity;
    
    for (const wire of wires) {
        const [n1, n2] = wire;
        const cnt1 = cnt(n1, new Set([n1, n2]));
        const cnt2 = cnt(n2, new Set([n1, n2]));
        
        ans = Math.min(Math.abs(cnt1 - cnt2), ans);
    }
    
    return ans;
}