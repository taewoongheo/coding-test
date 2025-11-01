function solution(s) {
    let ans = [];
    
    const strArr = s.split(',');
    const arr = [];
    let stack = [];
    for (let i = 0; i < strArr.length; i++) {
        const char = strArr[i];
        const p1 = char.replaceAll(/{/g, '');
        
        if (p1.includes('}')) {
            const p2 = p1.replaceAll(/}/g, '');
            arr.push([...stack, p2]);
            stack = [];
            continue;
        }
        
        stack.push(p1);
    }
    
    arr.sort((a, b) => a.length - b.length);
    
    const set = new Set();
    for (let i = 0; i < arr.length; i++) {
        const str = arr[i];
        
        for (let j = 0; j < str.length; j++) {
            if (!set.has(str[j])) {
                set.add(str[j]);
                ans.push(Number(str[j]));
            }
        }
    }
    
    return ans;
}