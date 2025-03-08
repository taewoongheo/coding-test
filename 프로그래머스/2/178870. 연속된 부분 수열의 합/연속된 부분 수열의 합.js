function solution(sequence, k) {
    let results = [];
    let rIdx = 0; 
    let lIdx = 0; 
    let sum = sequence[0];
    
    while (rIdx < sequence.length) {
        if (sum < k) {
            sum += sequence[++rIdx];
        } else if (sum > k) {
            sum -= sequence[lIdx++];
        } else {
            results.push([lIdx, rIdx]);
            sum += sequence[++rIdx];
        }
    }
    
    return results.sort((a, b) => {
        if ((a[1]-a[0]) === b[1]-b[0]) return a[0] - b[0];
        return (a[1]-a[0]) - (b[1]-b[0]);
    })[0];
}