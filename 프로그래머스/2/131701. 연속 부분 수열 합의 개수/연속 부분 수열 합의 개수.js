function solution(elements) {

    const n = elements.length;
    const arr = Array.from({length: n}, () => 
                          Array.from({length: n}, () => 0));
    
    // elements.sort((a, b) => a - b);

    const set = new Set();
    for(let i = 0; i < n; i++) {
        arr[i][i] = elements[i];
        set.add(arr[i][i]);
    }

    let len = 1;
    for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n; j++) {
            const prevIdx = (j + len - 1) % n;
            const nextIdx = (j + len) % n;

            // console.log('idx: ', prevIdx, ' ', nextIdx);
            arr[j][nextIdx] = arr[j][prevIdx] + elements[nextIdx];
            
            set.add(arr[j][nextIdx]);
        }
        len++;
        
        // console.log(arr);
        // console.log('set: ', set);
    }
    
    return set.size;
}