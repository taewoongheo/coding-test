// 문제요약: 1번 노드로부터 가장 멀리 떨어진(간선이 가장 많은) 노드의 개수 구하기
// 입력: 
//  n: 노드 개수, 2<=n<=20000
//  vertex: 간선 정보, 1<=n<=50000
// 출력:
//  노드 개수
// 알고리즘 선택: 
//  dfs로 풀게 되면 특정 노드에 도달하는 거리가 순서에 따라 다르게 나올 수 있음
//  따라서 bfs로 풀어야 함

class Node {
    constructor(num) {
        this.num = num;
        this.next = [];
        this.dist = 0;
        this.nxt = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(node) {
        if (this.head === null) {
            this.head = node;
        } else {
            this.tail.nxt = node;
        }
        this.tail = node;
        this.length += 1;
    }
    
    pop() {
        if (this.length === 0) return null;
        const ret = this.head;
        this.head = this.head.nxt;
        this.length -= 1;
        return ret;
    }
}

function solution(n, edge) {
    var answer = 0;
    
    const nodes = [0];
    for (let i = 1; i <= n; i++) {
        nodes.push(new Node(i));
    }
    for (let i = 0; i < edge.length; i++) {
        const [n1, n2] = edge[i];
        nodes[n1].next.push(n2);
        nodes[n2].next.push(n1);
    }
    
    let maxDist = 0;
    
    const v = new Set([1]);
    const q = new Queue();
    q.push(nodes[1]);
    while (q.length !== 0) {
        const {num, next, dist} = q.pop();
        maxDist = Math.max(maxDist, dist);
        for (const n of next) {
            if (!v.has(n)) {
                v.add(n);
                const nnodes = nodes[n];
                nnodes.dist = dist + 1;
                q.push(nnodes);
            }
        }
    }
    
    answer = nodes.filter((el) => el.dist === maxDist).length;
    
    return answer;
}
