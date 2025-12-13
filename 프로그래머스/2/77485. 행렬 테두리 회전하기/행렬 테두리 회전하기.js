// 최대 100 x 100 행렬
//  가장 넓게 탐색하는게 396 번, 약 400 번이라고 하면,
//  400x10000=4000000, 그냥 구현해도 시간초과 발생 안함
// 회전 구현하기
//  각 면마다 따로 루프를 돌림
//  다음 칸에 사용할 수를 미리 저장
//  그걸로 맵을 갱신하고 다음 칸에 사용할 수를 갱신하는 방식
//  맨 처음에 사용할 수는 미리 저장한 이전 수를 사용

function solution(rows, columns, queries) {
    const map = [];
    let num = 1;
    
    for (let i = 0; i < rows; i++) {
        const temp = [];
        for (let j = 0; j < columns; j++) {
            temp.push(num++);
        }
        map.push(temp);
    }
    
    const rotate = (q) => {
        let [x1, y1, x2, y2] = q;
        x1--;
        y1--;
        x2--;
        y2--;
        
        let num = map[x1][y1];
        
        let s = num;
        
        // 윗면
        for (let i = 1; i <= y2 - y1; i++) {
            const cur = num;
            num = map[x1][y1 + i];
            map[x1][y1 + i] = cur;
            
            s = Math.min(num, s);
        }
        
        // 오른쪽 면
        for (let i = 1; i <= x2 - x1; i++) {
            const cur = num;
            num = map[x1 + i][y2];
            map[x1 + i][y2] = cur;
            
            s = Math.min(num, s);
        }
        
        // 아랫면
        for (let i = 1; i <= y2 - y1; i++) {
            const cur = num;
            num = map[x2][y2 - i];
            map[x2][y2 - i] = cur;
            
            s = Math.min(num, s);
        }
        
        // 왼쪽 면
        for (let i = 1; i <= x2 - x1; i++) {
            const cur = num;
            num = map[x2 - i][y1];
            map[x2 - i][y1] = cur;
            
            s = Math.min(num, s);
        }
        
        return s;
    }
    
    const ans = [];
    for (const q of queries) {
        ans.push(rotate(q));
    }
    
    return ans;
}