// 각 행의 시작점은 정해져있음. 1, 2, 3, 4, 5, ...
// 끝 점은 2n-1, 2n, 2n + 1, 2n + 2 ...

// 삼각형을 명시적으로 채우기
// 1, 3, 5, ... 홀수마다 삼각형을 시작함
// 끝이 되는 행을 결정함, n-1-(반복횟수) 번째 행까지
// 원소를 넣을 패딩을 결정. (반복횟수)만큼 패딩을 넣으면 됨
// 0번째 행이라면, 0~n-1 행까지
// 0번째 행부터 시작
//  패딩=0
//  각 행[패딩]에 1씩 증가하면서 채움
//  n-1(끝 행)을 만났다면 1씩 증가하면서 전부 채움
//  n-1 이 끝났다면 [길이-1-패딩] 인덱스 1씩 증가하면서 채움
// 다음 시작점은 3
//  3~n-2 행 까지
//  패딩=1

function solution(n) {
    
    const arr = [];
    for (let i = 0; i < n; i++) {
        arr.push(Array.from({length: i + 1}, () => 0));
    }
    
    let num = 1;
    let iter = 0;
    
    let startRow = 0;
    let endRow = n - 1;

    while (startRow <= endRow) {
        endRow = n - 1 - iter;
        const padding = iter;
        
        // 왼쪽
        for (let i = startRow; i <= endRow; i++) {
            arr[i][padding] = num++;
        }
        
        // 맨 아래
        for (let i = 1 + padding; i < arr[endRow].length - padding; i++) {
            arr[endRow][i] = num++;
        }
        
        // 오른쪽
        for (let i = endRow - 1; i > startRow; i--) {
            arr[i][arr[i].length - 1 - padding] = num++;
        }
        
        iter++;
        startRow += 2;
    }
    
    return arr.flat();
}