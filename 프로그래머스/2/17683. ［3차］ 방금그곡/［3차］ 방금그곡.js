function solution(m, musicinfos) {
    const music = []; // { name, Set }
    
    let mSize = 0;
    for (let i = 0; i < m.length; i++) {
        if (m.charAt(i) === '#') continue;
        mSize++;
    }
    
    const timeToMin = (time) => {
        const [h, m] = time.split(":").map(Number);
        return h * 60 + m;
    }
    
    for (let i = 0; i < musicinfos.length; i++) {
        const [s, e, name, melody] = musicinfos[i].split(',');
        const diff = timeToMin(e) - timeToMin(s);
        
        let mArr = [];
        for (let j = 0; j < melody.length; j++) {
            if (melody.charAt(j) === '#') {
                const pop = mArr.pop();
                mArr.push(`${pop}#`);
                continue;
            }
            mArr.push(melody.charAt(j));
        }
        
        const set = new Set();
        for (let j = 0; j <= diff - mSize; j++) {
            let str = '';
            for (let k = 0; k < mSize; k++) {
                str += mArr[(j + k) % mArr.length];
            }
            set.add(str);
        }
        
        music.push({name, diff, melodies: set});
    }
    
    // TODO: 재생시간 길이 긴 음악 반환 추가
    let len = 0;
    let ret = null;
    for (let i = 0; i < music.length; i++) {
        const { name, diff, melodies } = music[i];
        
        const before = melodies.size;
        
        melodies.add(m);
        
        const after = melodies.size;
        
        if (before === after) {
            if (diff > len) {
                len = diff;
                ret = name;
            }
        }
    }
    
    if (len) return ret;
    
    return '(None)';
}