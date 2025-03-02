function solution(storage, requests) {
    // 1. 컨테이너 개수 카운트 (초기 컨테이너 수)
    let answer = 0;
    for (let i = 0; i < storage.length; i++) {
        for (let j = 0; j < storage[i].length; j++) {
            answer++;
        }
    }
    
    // 2. 주변에 패딩을 추가한 배열 생성
    const rows = storage.length;
    const cols = storage[0].length;
    const paddedRows = rows + 2;
    const paddedCols = cols + 2;
    
    // 컨테이너 종류 저장 배열
    const containers = Array.from({length: paddedRows}, () => 
        Array.from({length: paddedCols}, () => '0')
    );
    
    // 컨테이너 존재 여부 배열
    const exist = Array.from({length: paddedRows}, (_, i) => 
        Array.from({length: paddedCols}, (_, j) => 
            i === 0 || i === paddedRows-1 || j === 0 || j === paddedCols-1 ? false : true
        )
    );
    
    // 실제 데이터 채우기
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            containers[i+1][j+1] = storage[i][j];
        }
    }
    
    // 방향 벡터
    const dr = [-1, 1, 0, 0];
    const dc = [0, 0, -1, 1];
    
    // 3. 요청 처리
    for (const req of requests) {
        const removed = []; // 제거할 컨테이너 위치
        
        if (req.length === 1) {
            // 지게차 사용 (외부에서 접근 가능한 컨테이너만)
            const queue = [];
            const visited = Array.from({length: paddedRows}, () => 
                Array.from({length: paddedCols}, () => false)
            );
            
            // 시작점 (외부 지점)
            queue.push([0, 0]);
            visited[0][0] = true;
            
            while (queue.length > 0) {
                const [r, c] = queue.shift();
                
                for (let i = 0; i < 4; i++) {
                    const nr = r + dr[i];
                    const nc = c + dc[i];
                    
                    if (nr < 0 || nr >= paddedRows || nc < 0 || nc >= paddedCols) continue;
                    if (visited[nr][nc]) continue;
                    
                    visited[nr][nc] = true;
                    
                    if (exist[nr][nc] && containers[nr][nc] === req) {
                        // 요청된 컨테이너 종류와 일치하면 제거 목록에 추가
                        removed.push([nr, nc]);
                    } else if (!exist[nr][nc]) {
                        // 컨테이너가 없는 공간은 계속 탐색
                        queue.push([nr, nc]);
                    }
                }
            }
        } else {
            // 크레인 사용 (모든 해당 종류 컨테이너)
            const type = req[0]; // 두 글자인 경우 첫 글자가 컨테이너 종류
            
            for (let r = 1; r < paddedRows - 1; r++) {
                for (let c = 1; c < paddedCols - 1; c++) {
                    if (exist[r][c] && containers[r][c] === type) {
                        removed.push([r, c]);
                    }
                }
            }
        }
        
        // 컨테이너 제거 및 상태 업데이트
        for (const [r, c] of removed) {
            exist[r][c] = false;
            answer--;
        }
    }
    
    return answer;
}