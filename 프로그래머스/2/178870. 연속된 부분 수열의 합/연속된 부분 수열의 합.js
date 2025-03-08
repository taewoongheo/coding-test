function solution(sequence, k) {
    let results = [];
    let rIdx = 0; 
    let lIdx = 0; 
    let sum = 0;
    
    while (rIdx < sequence.length) {
        if (sum < k) {
            sum += sequence[rIdx++];
        } else if (sum > k) {
            sum -= sequence[lIdx++];
        } else {
            results.push([lIdx, rIdx]);
            sum += sequence[rIdx++];
        }
    }
    
    console.log(results)
}