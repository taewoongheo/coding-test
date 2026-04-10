// 어떤 장르가 가장 많이 재생되었는지 구하고
// 해당 장르에서 가장 많이 재생된 2곡을 뽑기(하나만 있으면 하나만)

function solution(genres, plays) {
    const maps = genres.reduce((obj, cur, idx) => {
        if (!obj[cur]) obj[cur] = {
            genre: cur,
            count: 0,
            musics: []
        };
        obj[cur].musics.push({
            music: idx,
            play: plays[idx]
        });
        obj[cur].count += plays[idx];
        return obj;
    }, {});
    
    const arr = Object.values(maps).sort((a, b) => b.count - a.count);
    const ans = [];
    for (const { genre, count, musics } of arr) {
        const sorted = musics.sort((a, b) => b.play - a.play);
        ans.push(sorted.shift().music);
        if (sorted.length) ans.push(sorted.shift().music);
    }
    
    return ans;
}