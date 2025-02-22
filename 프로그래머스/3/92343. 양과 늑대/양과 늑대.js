// 문제요약: 양의 개수를 늑대보다 많이 유지하면서 탐색할 경우, 양의 개수 최댓값 구하기
// 입력: 
//  info: 양 늑대 정보(=노드 개수), 2<=info<=17
//  edges: 간선 정보, edges = info - 1
// 출력: 양의 개수 최댓값
// 알고리즘 선택:
//  dfs가 가장 먼저 떠올랐다. 이때 탐색하는 상태를 고려해야 함
//      만약 2번 노드를 탐색한다고 했을 때, 1번 노드를 탐색했느냐 안했느냐에 따라 답이 달라지기 때문
//      따라서 상태를 기준으로 하는 dfs를 선택
// 부분문제 분해: 
//  dfs:
//      현재 상태에서 방문할 수 있는 노드들을 탐색
//      해당 노드에 대한 상태를 생성
//          생성된 상태가 sheep > wolf 인 경우에만 dfs 진행

class Status {
    constructor(info, edgesInfo, visited, sheep, wolf) {
        this.info = info;
        this.edgesInfo = edgesInfo;
        this.visited = visited;
        this.sheep = sheep;
        this.wolf = wolf;
    }
    
    visitable() {
        const res = [];
        
        this.visited.forEach((n) => {
            for (const node of this.edgesInfo.get(n)) {
                if (!this.visited.has(node)) {
                    res.push(node);
                }
            }
        });
        
        return res;
    }
    
    visit(node) {
        const copyVisited = new Set([...this.visited]);
        copyVisited.add(node);
        const sheep = this.sheep + (this.info[node] === 0 ? 1 : 0);
        const wolf = this.wolf + (this.info[node] === 1 ? 1 : 0);
        return new Status(this.info, this.edgesInfo, copyVisited, sheep, wolf);
    }
}

function dfs(status) {
    const visitable = status.visitable();
    let result = status.sheep;
    
    visitable.forEach((n) => {
        const newStatus = status.visit(n);
        if (newStatus.sheep > newStatus.wolf) result = Math.max(result, dfs(newStatus))
    });
    
    return result;
}

function solution(info, edges) {

    const edgesInfo = new Map();
    for (const edge of edges) {
        const [n1, n2] = edge;
        if (!edgesInfo.has(n1)) edgesInfo.set(n1, []);
        if (!edgesInfo.has(n2)) edgesInfo.set(n2, []);
        edgesInfo.get(n1).push(n2);
    }
    
    return dfs(new Status(info, edgesInfo, new Set([0]), 1, 0));
}
