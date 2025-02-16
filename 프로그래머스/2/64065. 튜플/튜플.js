function solution(s) {
    
    s = s.substring(2, s.length - 2);
    s = s.replace(/{/g,'');
    let sarr = s.split('},').map((el) => el.split(',').map(Number));
    sarr = sarr.sort((a, b) => a.length - b.length);
    
    const v = Array.from({length: 100001}, () => false);
    const answer = Array.from({length: sarr[sarr.length - 1].length}, () => 0);

    answer[0] = sarr[0][0];
    v[sarr[0][0]] = true;
    let idx = 1;
    for (let i = 1; i < sarr.length; i++) {
        const size = sarr[i].length;
        for (let j = 0; j < size; j++) {
            if (!v[sarr[i][j]]) {
                v[sarr[i][j]] = true;
                answer[idx++] = sarr[i][j];
            }
        }    
    }
    
    // console.log(answer);
    
    return answer;
}