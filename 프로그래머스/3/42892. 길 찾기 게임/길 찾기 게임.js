// 문제요약: 주어진 노드들의 위치를 바탕으로 트리를 만들고, 전위순회, 후위순회 결과를 리턴
// 알고리즘 선택: 
//  트리의 y가 높을수록 루트에 가까움
//  y순으로 정렬 후, 루트부터 결정
//  이후, x값을 기준으로 왼쪽 자식 또는 오른쪽 자식을 선택하여 트리를 완성하면 된다. 
//      부모보다 x값이 작다면 왼쪽자식, x값이 크다면 오른쪽 자식

class Node {
    constructor(id, x, y) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.left = null;
        this.right = null;
    }
}

function solution(nodeinfo) {
    var answer = [[]];
    
    const nodes = nodeinfo.map(([x, y], idx) => [x, y, idx + 1]);
    nodes.sort(([, y1], [, y2]) => y2 - y1);

    const root = nodes.shift();
    const rootNode = new Node(root[2], root[0], root[1]);
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        makeTree(rootNode, new Node(node[2], node[0], node[1]));
    }
    
    console.log(rootNode);
    
    const preorder = [];
    const postorder = [];
    
    getPreorder(rootNode);
    getPostorder(rootNode);

    function makeTree(parent, child) {
        const side = child.x < parent.x ? 'left' : 'right';
        
        if (!parent[side]) {
            parent[side] = child;
        } else {
            makeTree(parent[side], child);
        }
    }
    
    function getPreorder(node) {
        preorder.push(node.id);
        if (node.left) getPreorder(node.left);
        if (node.right) getPreorder(node.right);
    }
    
    function getPostorder(node) {
        if (node.left) getPostorder(node.left);
        if (node.right) getPostorder(node.right);
        postorder.push(node.id);
    }
    
    return [preorder, postorder];
}