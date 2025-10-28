function solution(arr1, arr2) {
    
    const rc = arr1.length;
    const cc = arr2[0].length;
    
    const ans = Array.from({length: rc}, () => 
                             Array.from({length: cc}, () => 0));
    
    for (let r = 0; r < rc; r++) {
        for (let c = 0; c < arr2[0].length; c++) {
            let num = 0;
            
            for (let i = 0; i < arr1[r].length; i++) {
                num += arr1[r][i] * arr2[i][c];
            }
            
            ans[r][c] = num;
        }
    }
    
    return ans;
}