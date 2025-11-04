// 문자열 길이 2 <= str <= 1000
// 공백, 숫자, 특수문자가 들어있는 쌍은 버림
// 대소문자 구분 x

function solution(str1, str2) {
    
    // 개수 구하기
    const set1 = new Map();
    const str1Arr = str1.split('');
    for (let i = 0; i < str1Arr.length - 1; i++) {
        const el = (str1Arr[i] + str1Arr[i + 1]).toLowerCase();
        
        if (!el.match(/^[a-z]*$/g)) continue;
        
        const cnt = set1.get(el);
        if (!cnt) {
            set1.set(el, 1);
            continue;
        } 
        set1.set(el, cnt + 1);
    }
    
    const set2 = new Map(); 
    const str2Arr = str2.split('');
    for (let i = 0; i < str2Arr.length - 1; i++) {
        const el = (str2Arr[i] + str2Arr[i + 1]).toLowerCase();
        
        if (!el.match(/^[a-z]*$/g)) continue;
        
        const cnt = set2.get(el);
        if (!cnt) {
            set2.set(el, 1);
            continue;
        } 
        set2.set(el, cnt + 1);
    }
    
    // 교집합 구하기
    const intersection = new Map();
    for (const key of set2.keys()) {
        const set1Cnt = set1.get(key);
        const set2Cnt = set2.get(key);
        
        if (!set1Cnt) continue;
        
        const intersect = Math.min(set1Cnt, set2Cnt);
        
        const interCnt = intersection.get(key);
        if (!interCnt) {
            intersection.set(key, intersect);
            continue;
        }
        
        intersection.set(key, interCnt + intersect);
    }
    
    // set2 에서 교집합 제거
    for (const key of intersection.keys()) {
        const interCnt = intersection.get(key);
        const set2Cnt = set2.get(key);
        
        const remain = set2Cnt - interCnt;
        
        if (!remain) {
            set2.delete(key);
            continue;
        }
        
        set2.set(key, remain);
    }
    
    // set1 에 (set2-교집합) 추가
    for (const key of set2.keys()) {
        const set1Cnt = set1.get(key);
        const set2Cnt = set2.get(key);
        
        if (!set1Cnt) {
            set1.set(key, set2Cnt);
            continue;
        }
        
        set1.set(key, set1Cnt + set2Cnt);
    }
    
    // 합 구하기
    let den = 0;
    for (const key of set1.keys()) {
        den += set1.get(key);
    }
    
    let num = 0;
    for (const key of intersection.keys()) {
        num += intersection.get(key);
    }
    
    let value = num / den;
    if (!den && !num) {
        value = 1
    }

    return Math.trunc(value * 65536);
}