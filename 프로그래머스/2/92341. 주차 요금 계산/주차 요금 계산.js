function solution(fees, records) {
    const map = new Map();
    
    const timeToMin = (time) => {
        const [hour, minute] = time.split(':').map(Number);
        return hour * 60 + minute; 
    }
    
    for (const record of records) {
        const [time, number, status] = record.split(' ');
        if (!map.get(number)) map.set(number, []);
        const log = map.get(number);
        map.set(number, [...log, timeToMin(time)]);
    }
    
    for (const key of map.keys()) {
        if (map.get(key).length % 2 !== 0) {
            const arr = map.get(key);
            map.set(key, [...arr, timeToMin('23:59')]);
        }
    }
    
    const totalMap = new Map();
    
    for (const key of map.keys()) {
        const arr = map.get(key);
        
        let total = 0;
        for (let i = 0; i < arr.length; i += 2) {
            const inTime = arr[i];
            const outTime = arr[i + 1];
            total += outTime - inTime;
        }
        
        totalMap.set(key, total);
    }
    
    const ansMap = new Map();
    const keyArr = [];
    for (const key of totalMap.keys()) {
        const total = totalMap.get(key);
        keyArr.push(key);
        let add = 0;
        if (total - fees[0] > 0) {
            add = Math.ceil((total - fees[0]) / fees[2]) * fees[3];
        }
        ansMap.set(key, fees[1] + add);
    } 
    
    const ans = [];
    for (const key of keyArr.sort()) {
        ans.push(ansMap.get(key));
    }
    
    return ans;
}