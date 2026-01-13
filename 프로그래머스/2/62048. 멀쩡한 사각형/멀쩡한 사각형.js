function solution(w, h) {
    const a = h / w;
    
    let cnt = 0;
    for (let x = 1; x <= w; x++) {
        cnt += Math.ceil(a * x);
    }
    
    return (w * h - cnt) * 2;
}