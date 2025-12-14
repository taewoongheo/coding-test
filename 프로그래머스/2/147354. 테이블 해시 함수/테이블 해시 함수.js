// 2500000000 => 시간초과?

function solution(data, col, row_begin, row_end) {
    col--;
    row_begin--;
    row_end--;
    
    data.sort((a, b) => {
        if (a[col] === b[col]) return b[0] - a[0];
        return a[col] - b[col];
    });
    
    const res = [];
    for (let i = row_begin; i <= row_end; i++) {
        let sum = 0;
        for (let j = 0; j < data[i].length; j++) {
            sum += data[i][j] % (i + 1);
        }
        res.push(sum);
    }
    
    return res.reduce((cur, acc) => cur ^ acc);
}
