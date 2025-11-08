function solution(land) {
    const rLen = land.length;
    
    const arr = Array.from({length: rLen}, () => 
                          Array.from({length: 4}, () => 0));
    for (let i = 0; i < 4; i++) {
        arr[0][i] = land[0][i];
    }
    
    for (let r = 0; r < rLen - 1; r++) {

        for (let ri = 0; ri < 4; ri++) {
            for (let nri = 0; nri < 4; nri++) {
                if (ri === nri) continue;
                
                arr[r + 1][nri] = Math.max(arr[r][ri] + land[r + 1][nri], arr[r + 1][nri]);
            }
        }
    }
    
    return Math.max(...arr[arr.length - 1])
}