// 최종 닉네임을 먼저 구함
// Enter, Change 에서 이름을 업데이트

function solution(record) {
    
    const nMap = new Map();
    
    for (const col of record) {
        const [state, id, name] = col.split(' ');
        
        if (state === 'Enter' || state === 'Change') {
            nMap.set(id, name);
        }
    }
    
    const res = [];
    for (const col of record) {
        const [state, id, name] = col.split(' ');
        
        if (state === 'Change') continue;
        
        res.push(`${nMap.get(id)}님이 ${state === 'Enter' ? '들어왔습니다.' : '나갔습니다.'}`)
    }
    
    return res;
}