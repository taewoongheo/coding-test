function solution(m, musicinfos) {
    
    const timeToMin = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }
    
    let melodies = musicinfos.map(el => {
        const [s, e, name, melody] = el.split(",");
        const diff = timeToMin(e) - timeToMin(s);
        let nm = melody.replace(/[A-Z]#/g, m => m[0].toLowerCase());
        nm = nm.repeat(Math.ceil(diff / nm.length)).substr(0, diff);
        return `${diff},${name},${nm}`;
    });
    
    melodies = melodies.sort((a, b) => b.split(',')[0] - a.split(',')[0]);
    
    const nnm = m.replace(/[A-Z]#/g, m => m[0].toLowerCase());
    const ans = melodies.filter(el => el.split(',')[2].indexOf(nnm) != -1);
    
    console.log(ans);
    
    return ans.length === 0 ? '(None)' : ans[0].split(',')[1];
}