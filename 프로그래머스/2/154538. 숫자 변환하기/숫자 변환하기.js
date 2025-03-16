// 문제요약: x를 y로 만들 수 있는 최소 연산 횟수 구하기
// 알고리즘 선택: 
//  최단거리 bfs

class Item {
    constructor(num, cnt) {
        this.num = num;
        this.cnt = cnt;
        this.next = null;
    }
}

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }
    
    push(item) {
        if (this.head === null) {
            this.head = item;
        } else {
            this.tail.next = item;
        }
        this.tail = item;
        this.length++;
    }
    
    pop() {
        if (this.head === null) return null;
        const ret = this.head;
        this.head = this.head.next;
        this.length--;
        return ret;
    }
}

function solution(x, y, n) {
    var answer = -1;
    
    const max = 1000001;
    const v = Array.from({length: max}, () => false);
    const q = new Queue();
    q.push(new Item(x, 0));
    v[x] = true;
    
    while (q.length) {
        const {num, cnt} = q.pop();
        
        if (num === y) {
            answer = cnt;
            break;
        }
        
        if (num + n <= y && !v[num + n]) {
            q.push(new Item(num + n, cnt + 1));
            v[num + n] = true;
        }
        
        if (num * 2 <= y && !v[num * 2]) {
            q.push(new Item(num * 2 , cnt + 1));
            v[num * 2] = true;
        }
        
        if (num * 3 <= y && !v[num * 3]) {
            q.push(new Item(num * 3, cnt + 1));
            v[num * 3] = true;
        }
    }
    
    return answer;
}