// 2차원 배열에 노드 간 거리를 기록, arr[s][e]=s노드와 e노드 간 거리
// 방문할 수 있는 노드가 있을 때까지 bfs
// 특정 노드를 처음방문하면 k 보다 작은지 검사하고 카운트 갱신
// 최악의 경우 50개의 노드, 2000개의 간선
//  50개의 노드에서 2000개의 간선을 전부 검사해야하므로 50x2000=100000 시간초과x
//  근데 이러면 문제가, 첫 시도에 불가능한 경로로 처리해버리면 이후에 가능한 경로가 나와도 이미 방문처리된 노드이기 때문에 올바른 경우를 찾을 수 없음

// 1부터 거리를 나타내는 배열에 각 노드별 길이를 기록
//  이때 특정 노드의 길이가 갱신되면 다시 큐에 넣는 방식
//  만약 갱신된다면 이전에 이미 출발한 노드가 의미가 없어지는 문제 => 중복

// 거리가 가까운 노드부터 우선적으로 계산, 우선순위 큐 사용, 이전에 방문한 노드는 재방문하지 않음
//  이렇게 되면 현재 방문하고자 하는 노드가 가장 최단거리임이 보장되므로 방문처리를 해도 문제가 되지 않음
//  예외, A->C, B->C 두 경로가 있을 때, A가 먼저 방문하더라도 A->C 까지 길이가 1->B->C 보다 클 수 있음

function solution(N, road, K) {
  const map = Array.from({ length: N + 1 }, () =>
    Array.from({ length: N + 1 }, () => Infinity)
  );
  for (const r of road) {
    const [s, e, d] = r;
    const nd = map[s][e] !== Infinity ? Math.min(map[s][e], d) : d;
    map[s][e] = nd;
    map[e][s] = nd;
    map[s][s] = 0;
    map[e][e] = 0;
  }

  const arr = Array.from({ length: N + 1 }, () => Infinity);
  const q = [{node: 1, dist: 0}]

  while (q.length) {
    const { node, dist } = q.shift();
    const nodes = map[node];
    for (let i = 1; i < nodes.length; i++) {
        const d = map[node][i];
        
        const newDist = dist + d;
        if (newDist < arr[i]) {
            q.push({node: i, dist: newDist});
            arr[i] = newDist;
        }
    }
  }

  return arr.reduce((cnt, cur) => {
      if (cur <= K) {
        cnt++;
      }
      return cnt;
    }, 0);
}