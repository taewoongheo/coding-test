function solution(cacheSize, cities) {
    let ans = 0; 
    
    // 캐시를 검사
    // hit 시, 순위를 올리고 ans += 1
    //  순위올리기=기존 요소 없애고 재추가
    // miss 시, 캐시에 추가하고 ans += 5
    // 캐시 크기를 검사해서 초과 시 삭제
    
    const cache = new Map();
    
    cities.forEach(city => {
        const paresdCity = city.toLowerCase();
        if (cache.has(paresdCity)) {
            ans += 1;
            cache.delete(paresdCity);
            cache.set(paresdCity, paresdCity);
        } else {
            ans += 5;
            cache.set(paresdCity, paresdCity);
        }
        
        if (cache.size > cacheSize) {
            cache.delete(cache.keys().next().value);
        }
    });
    
    return ans;
}