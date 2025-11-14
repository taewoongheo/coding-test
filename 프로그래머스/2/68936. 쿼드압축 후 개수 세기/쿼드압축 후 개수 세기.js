// 1024x1024=1000000 x 10(10제곱이므로 10번 반복)=10000000

// dfs
// 시작좌표, 크기
// 시작좌표부터 크기까지 정사각형 루프, 만약 모두 동일하다면 return
//  모두 동일하지 않다면, 시작좌표부터 size/2 해서 dfs 재귀

function solution(arr) {
    
    const ans = [0, 0];

    const dfs = (sr, sc, size) => {
        if (size === 1) {
            ans[0] += arr[sr][sc] === 0 ? 1 : 0;
            ans[1] += arr[sr][sc] === 1 ? 1 : 0;
            return;
        }
        
        let flag = true;
        const s = arr[sr][sc];
        for (let i = sr; i < sr + size; i++) {
            for (let j = sc; j < sc + size; j++) {
                if (arr[i][j] !== s) {
                    flag = false;
                    break;
                }
            }
            if (!flag) break;
        }
        
        if (flag) {
            ans[0] += s === 0 ? 1 : 0;
            ans[1] += s === 1 ? 1 : 0;
            return;
        }
        
        const nSize = Math.floor(size / 2);
        for (let i = sr; i < sr + size; i += nSize) {
            for (let j = sc; j < sc + size; j += nSize) {
                dfs(i, j, nSize);
            }
        }
    }
    
    dfs(0, 0, arr.length);
    
    return ans;
}