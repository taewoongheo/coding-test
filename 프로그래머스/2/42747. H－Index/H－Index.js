function solution(citations) {
    let answer = 0;
    
    citations.sort((a, b) => a - b);
    const len = citations.length;
    
    // const bs = (s, e, num, arr) => {
    //     const middle = Math.floor((s + e) / 2);
    //     const cur = arr[middle];
    //     const next = arr[middle + 1];
    //     if (num >= cur && num < next) return middle;
    //     else if (num < cur) return bs(s, middle - 1, num, arr);
    //     else return bs(middle + 1, e, num, arr);
    // }
    
    const bs = (s, e, num, arr) => {
        let idx = 0;
        
        while (s <= e) {
            const middle = Math.floor((s + e) / 2);
            const cur = arr[middle];
            const next = arr[middle + 1];
            
            if (num >= cur && num < next) {
                idx = middle;
                break;
            } else if (num < cur) {
                e = middle - 1;
            } else {
                s = middle + 1;
            }
        }
        
        return idx;
    }
    
    for (let h = citations[len - 1] - 1; h >= 0; h--) {
        const idx = bs(0, len - 1, h, citations);
        
        const num = citations[idx];
        let m = 0;
        if (num < h) {
            m = len - (idx + 1);
        } else {
            m = len - idx;
        }
        
        if (h <= m) {
            answer = h;
            break;
        }
    }
    
    return answer;
}