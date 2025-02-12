// 문제요약: 트리를 두 서브트리로 나눌 때, 두 서브트리의 차가 가장 적은 경우를 구하기
// 입력: 
//  n: 송전탑의 개수
//  wires: 전선 정보
// 출력: 
//  두 서브트리의 차가 최소인 경우의 값
// 조건: 
//  2 <= n <= 100 
// 알고리즘 선택: 
//  모든 간선에 대해 한번씩 끊어보고, 각 간선의 시작점을 기준으로 부분트리의 개수 세기
//  차가 최소인 경우를 갱신
//  입력은 항상 트리 형태이기 때문에 순회하는 경우는 없음
// 부분문제 분할:
//  트리를 완성
//  시작점을 기준으로 트리의 노드 개수를 반환하는 함수를 각 간선별로 실행
//  간선을 끊는다 = 인접한 노드를 방문배열에 넣음

function treeCnt(tree, node, v, cnt) {
    childCnt = 1;
    
    for (const child of tree.get(node)) {
        if (!v.has(child)) {
            v.add(child);
            childCnt += treeCnt(tree, child, v, cnt + 1);
        }
    }
    
    return childCnt;
}

function solution(n, wires) {
    var answer = Infinity;
    
    const tree = new Map();
    for (let i = 0; i < wires.length; i++) {
        const [s, e] = wires[i];
        if (!tree.has(s)) tree.set(s, []);
        if (!tree.has(e)) tree.set(e, []);
        tree.get(s).push(e);
        tree.get(e).push(s);
    }
    
    for (let i = 0; i < wires.length; i++) {
        const [node1, node2] = wires[i];
        const v1 = new Set([node1, node2]);
        const v2 = new Set([node1, node2]);
        
        const subtree1Cnt = treeCnt(tree, node1, v1, 1);
        const subtree2Cnt = treeCnt(tree, node2, v2, 1);
        
        answer = Math.min(answer, Math.abs(subtree1Cnt - subtree2Cnt));
    }
    
    return answer;
}