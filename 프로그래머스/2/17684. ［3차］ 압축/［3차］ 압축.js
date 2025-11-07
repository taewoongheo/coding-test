function solution(msg) {
    
    const ans = [];
    
    const map = new Map();
    for (let i = 1; i <= 26; i++) {
        map.set(String.fromCharCode(i + 64), i);
    }
    let value = 27;
    
    for (let i = 0; i < msg.length; i++) {
        let str = msg[i];
        
        while (true) {
            if (i + 1 > msg.length) {
                // i--;
                ans.push(map.get(str));
                break;
            }
            
            const nextStr = str + msg[++i];
            if (map.get(nextStr)) {
                str = nextStr;

                continue;
            }
            
            i--;
            ans.push(map.get(str));
            map.set(nextStr, value++);
            break;
        }
    }
    
    return ans;
}