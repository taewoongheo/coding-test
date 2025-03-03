// 문제요약: 트리에서 정점 하나를 택한 뒤, 그 정점에서 뻗어나가는 도넛, 막대, 8자 그래프 개수 구하기
// 알고리즘 선택: 
//  도넛: 모든 정점에서 in, out 간선이 존재, 정점개수=간선개수
//  막대: 첫번째, 마지막 정점을 제외한 모든 정점이 in, out 간선이 존재, 정점개수=간선개수-1
//  8자: 모든 정점이 in, out 간선이 존재, 정점개수=간선개수+1
//  각 그래프를 정점개수, 간선 개수로 구분가능
//  그럼 시작정점을 어떻게 결정?
//      시작정점은 in 간선 없이 오로지 out 간선만 존재
//          막대에서 마지막 정점 또한 in 이 존재하지만, out 이 없음
//  in 간선 없이 out 간선만 존재하는 노드를 선택,
//  해당 노드를 기준으로 연결된 정점들부터 탐색 시작
//  탐색을 하면서 정점개수, 간선개수를 카운트
//  결과로 그래프 구분
//  참고로 도넛, 8자는 모두 순회하기 때문에 상관없는데, 막대는 그렇지 않음
//      그렇다고 해서 시작정점이 막대의 중간부터 가리켜도 상관없음. 왜냐면 정점개수=간선개수-1 은 동일하기 때문
//  막대의 시작이랑 시작정점이랑 특성이 똑같음. 어케 구분하지?
//      막대의 시작은 항상 간선이 1, 반면 시작정점은 간선이 1개 이상임
//      만약 시작정점의 간선이 1개라면, 그것은 막대의 시작이라고 봐도 됨. 왜냐하면 다른 그래프가 없다는 뜻이기 때문
// 부분문제분해: 
//  tree[i]: {children: []}: i번째 정점
//  시작정점 구하기
//      방문배열 v 생성
//      각 정점들의 children을 탐색하면서 v에 true로 기록
//      마지막까지 false인 정점들 중, children이 0개 이상인 정점이 시작정점
//  for 시작정점 children: 
//      방문 set v 생성
//      const result = [nodeCnt, edgeCnt]
//      dfs(node, result): 배열의 참조를 전달해서 카운트 시킴
//          result[0]++
//          for node chilren
//              reulst[1]++ => 나가는 간선 카운트, 이때 자기자신과 연결된 경우도 있으므로 방문 여부와 상관없이 카운트 해야 됨
//              !v[child] -> 
//                  v.add(child)
//  만약 result[0] - result[1] === 0 => 도넛
//      result[0] - result[1] === 1 => 막대
//      result[0] - result[1] === -1 => 8자

function solution(edges) {
    var answer = [0, 0, 0, 0];
    
    const tree = edges.reduce((tree, link, i) => {
        const [s, e] = link;
        if (!tree.get(s)) tree.set(s, []);
        if (!tree.get(e)) tree.set(e, []);
        tree.get(s).push(e);
        return tree;
    }, new Map());
        
    const v = new Set();
    for (const node of tree) {
        for (const child of tree.get(node[0])) {
            v.add(child);
        }
    }
    
    let roots = [];
    for (const node of tree) {
        if (!v.has(node[0]) && tree.get(node[0]).length > 0) roots.push(node[0]);
    }
    
    let root = roots[0];
    for (let i = 1; i < roots.length; i++) {
        const n1 = tree.get(root);
        const n2 = tree.get(roots[i]);
        if (n1.length < n2.length) {
            root = roots[i];
        }
    }
    
    answer[0] = root;
    for (const child of tree.get(root)) {
        const result = [0, 0];
        dfs(child, new Set([child]), result);
        if (result[0] - result[1] === 0) answer[1]++;
        else if (result[0] > result[1]) answer[2]++;
        else answer[3]++;
    }
    
    function dfs(root, v, result) {
        const stack = [root];
        
        while (stack.length) {
            const node = stack.pop();
            result[0]++;
            
            for (const child of tree.get(node)) {
                result[1]++;
                if (!v.has(child)) {
                    v.add(child);
                    stack.push(child);
                }
            }
        }
    }
    
    return answer;
}