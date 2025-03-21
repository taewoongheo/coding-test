function solution(storey) {
    var result = 0;
    
    while (storey) {
        const cur = storey % 10;
        const next = (storey / 10) % 10;
        
        console.log(storey);
        
        if (cur > 5) {
            result += 10 - cur;
            storey += 10;
        } else if (cur < 5) {
            result += cur;
        } else {
            result += cur;
            storey += next >= 5 ? 10 : 0;
        }
        
        storey = Math.floor(storey / 10);
    }
    
    return result;
}