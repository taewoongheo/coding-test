function solution(cacheSize, cities) {
    const cache = new Map();
    
    let ans = 0;
    for (const city of cities) {
        const pCity = city.toUpperCase();
        
        if (cache.get(pCity)) {
            // cache hit
            ans += 1;
            cache.delete(pCity);
            cache.set(pCity, pCity);
            continue;
        } 
        
        // cache miss
        ans += 5;
        cache.set(pCity, pCity);

        if (cache.size > cacheSize) cache.delete(cache.keys().next().value);
    }
    
    return ans;
}