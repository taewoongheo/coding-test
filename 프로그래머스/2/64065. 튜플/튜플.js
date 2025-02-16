function solution(s) {
    
    s = s.substring(2, s.length - 2);
    s = s.replace(/{/g,'');
    let sarr = s.split('},').map((el) => el.split(',').map(Number));
    sarr = sarr.sort((a, b) => a.length - b.length);
    
    const answer = Array.from({length: sarr[sarr.length - 1].length}, () => 0);

    answer[0] = sarr[0][0];
    let idx = 1;
    for (let i = 1; i < sarr.length; i++) {
        const size = sarr[i].length;
        for (let j = 0; j < size; j++) {
            if (!answer.includes(sarr[i][j])) answer[idx++] = sarr[i][j];
        }    
    }
    
    // console.log(answer);
    
    return answer;
}