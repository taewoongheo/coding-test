function solution(n, words) {
    var answer = [];
    
    const pw = words.reduce((obj, word, idx) => {
        const p = idx % n;
        if (!obj[p]) {
            obj[p] = [];
        }
        obj[p].push(word);
        
        return obj;
    }, {});

    let lword = pw[0][0].substring(0, 1);
    const dup = [];
    console.log(lword);
    for (let i = 0; i < words.length / n; i++) {
        
        for (let j = 0; j < n; j++) {
            const w = pw[j][i];
            
            console.log('현재 단어: ', w);
            console.log('마지막 단어: ', lword);
            
            if (w.substring(0, 1) === lword.substring(lword.length - 1) && !dup.includes(w)) {
                lword = w;
                dup.push(w);
                continue;
            }
            
            return [j + 1, i + 1];
        }
    }

    return [0, 0];
}