

function solution(bridge_length, weight, truck_weights) {
    let bridge = [];
    
    truck_weights.reverse();
    
    let ans = 0;
    let bweight = 0;
    while (true) {
        if (!truck_weights.length && !bridge.length) break;
        
        const nextWeight = truck_weights.at(-1);
        if (bweight + nextWeight <= weight) {
            const w = truck_weights.pop();
            bweight += w;
            bridge.push({w, pos: 0});
        }
        
        bridge = bridge.reduce((acc, cur) => {
            let {w, pos} = cur;
            pos++;
            if (pos === bridge_length) {
                bweight -= w;
                return acc;
            }
            acc.push({w, pos});
            return acc;
        }, []);
        
        ans++;
    }
    
    return ans + 1;
}