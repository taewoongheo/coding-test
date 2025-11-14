class Item {
    constructor(value) {
        this.value = value;
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
        if (this.length === 0) {
            this.head = item;
            this.tail = item;
        } else {
            this.tail.next = item;
            this.tail = item;
        }
        
        this.length++;
    }
    
    pop() {
        if (this.length === 0) return null;
        
        const ret = this.head;
        this.head = this.head.next;
        this.length--;
        return ret.value;
    }
}

function solution(queue1, queue2) {
    
    const q1 = new Queue();
    const q2 = new Queue();
    
    let q1s = queue1.reduce((acc, cur) => {
        q1.push(new Item(cur));
        return acc + cur;
    }, 0);
    let q2s = queue2.reduce((acc, cur) => {
        q2.push(new Item(cur));
        return acc + cur;
    }, 0);
    
    const sum = Math.floor((q1s + q2s) / 2);
    
    for (let i = 0; i < queue1.length; i++) {
        if (queue1[i] > sum || queue2[i] > sum) return -1;
    }
    
    let q1pc = 0; // queue1 pop cnt
    let q2pc = 0;
    const q1len = queue1.length;
    const q2len = queue2.length;
    
    while (true) {
        if (q1s === sum && q2s === sum) {
            break;
        }
        
        if (q1pc > q1len && q2pc > q2len) return -1;
        
        if (q1s > sum) {
            const item = q1.pop();
            q1s -= item;
            q1pc++;
            q2.push(new Item(item));
            q2s += item;
        } else if (q2s > sum) {
            const item = q2.pop();
            q2s -= item;
            q2pc++;
            q1.push(new Item(item));
            q1s += item;
        } 
    
    }
    
    return q1pc + q2pc;
}