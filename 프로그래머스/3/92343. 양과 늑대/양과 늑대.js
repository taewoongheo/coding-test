// 문제요약: 이진트리에서 최대한 양을 많이 모으는 문제
// 입력: 
//  info: 노드 별 양, 늑대 정보
//  edges: 노드 별 연결정보
// 출력: 
//  양의 개수 최댓값
// 알고리즘 선택: dfs
//  가장 먼저 떠오른 건 dfs. 왜냐하면 이진트리를 깊이 우선으로 탐색해야 하기 때문. 
//  하지만 유의할 점은 탐색 도중 갈 곳이 없다면 루트를 넘어 다시 돌아갈 수 있다는 것. 
//  또한 만약 2번 노드에 방문했다고 했을 때, 다른 노드의 방문 여부에 따라 답이 완전히 달라짐
//  따라서 상태를 기준으로 dfs를 돌려야 됨. 
// 부분문제 분할: 
//  dfs:
//      방문가능한 노드들을 탐색
//          현재 상태에서 방문하지 않았고, 인접한 노드들을 선택
//      해당 노드 중 하나를 방문
//          방문여부배열에 노드를 넣고, 양과 늑대의 개수를 계산
//          만약 방문결과, 상태에서 늑대 >= 양 이라면 양의 개수를 0으로 초기화
//      방문 결과의 양의 개수를 비교해서 갱신

class Status {
    constructor(info, tree, visited, sheep, wolf) {
        this.info = info;
        this.tree = tree;
        this.visited = visited;
        this.sheep = sheep;
        this.wolf = wolf;
    }
    
    visitable() {
        // 방문한 노드들 중, 인접하고 방문하지 않은 노드들을 선택
        const res = new Set();
        this.visited.forEach((s) => {
            for (const node of this.tree.get(s)) {
                if (!this.visited.has(node)) {
                    res.add(node);
                }
            };
        });
        return res;
    }
    
    visit(s) {
        const newVisited = new Set(this.visited);
        newVisited.add(s);
        let newSheep = this.sheep + ((this.info[s] === 0) ? 1 : 0);
        const newWolf = this.wolf + ((this.info[s] === 1) ? 1 : 0);
        if (newWolf >= newSheep) newSheep = 0;
        return new Status(this.info, this.tree, newVisited, newSheep, newWolf);
    }
}

function dfs(status) {
    const visitable = status.visitable();
    let sheepValue = status.sheep;
    
    visitable.forEach((s) => {
        const newStatus = status.visit(s);
        // 늑대에게 모두 먹히지 않는 이상, 양의 개수만 비교하면 됨
        //  늑대에게 모두 먹힌 경우, sheep이 0으로 설정(고려제외)
        let nextVal = 0;
        if (newStatus.sheep > newStatus.wolf) nextVal = dfs(newStatus);
        
        sheepValue = Math.max(sheepValue, nextVal);
    })
    
    return sheepValue;
}

function solution(info, edges) {
    var answer = 0;
    
    const tree = new Map();
    for (let i = 0; i < edges.length; i++) {
        const [s, e] = edges[i];
        if (!tree.has(s)) tree.set(s, []);
        if (!tree.has(e)) tree.set(e, []);
        tree.get(s).push(e);
    }
    
    // 루트 노드는 항상 양
    answer = dfs(new Status(info, tree, new Set([0]), 1, 0));
    
    return answer;
}