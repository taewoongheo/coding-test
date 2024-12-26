const fs = require("fs");
const filePath = process.platform === "linux" ? "/dev/stdin" : "input.txt";
let input = fs.readFileSync(filePath).toString().trim().split("\n");

class minHeap {
  heapArray = [];
  constructor() {
    this.heapArray.push(null);
  }

  push(data) {
    if (this.heapArray === null) {
      this.heapArray = [];
      this.heapArray.push(null);
      this.heapArray.push(data);
    } else {
      this.heapArray.push(data);
      let inserted_idx = this.heapArray.length - 1;
      let parent_idx = parseInt(inserted_idx / 2);
      while (inserted_idx > 1) {
        if (this.heapArray[inserted_idx][1] < this.heapArray[parent_idx][1]) {
          const tmp = this.heapArray[inserted_idx];
          this.heapArray[inserted_idx] = this.heapArray[parent_idx];
          this.heapArray[parent_idx] = tmp;
          inserted_idx = parent_idx;
          parent_idx = parseInt(parent_idx / 2);
        } else {
          break;
        }
      }
    }
  }
  move_down(pop_idx) {
    const left_child = pop_idx * 2;
    const right_child = pop_idx * 2 + 1;

    if (left_child >= this.heapArray.length) {
      return false;
    } else if (right_child >= this.heapArray.length) {
      if (this.heapArray[pop_idx][1] > this.heapArray[left_child][1]) {
        return true;
      }
      return false;
    } else {
      if (this.heapArray[left_child][1] < this.heapArray[right_child][1]) {
        if (this.heapArray[pop_idx][1] > this.heapArray[left_child][1]) {
          return true;
        }
        return false;
      } else {
        if (this.heapArray[pop_idx][1] > this.heapArray[right_child][1]) {
          return true;
        }
        return false;
      }
    }
  }

  pop() {
    if (this.heapArray === null) {
      return null;
    } else {
      const return_data = this.heapArray[1];
      this.heapArray[1] = this.heapArray[this.heapArray.length - 1];
      this.heapArray.pop();
      let popped_idx = 1;
      while (this.move_down(popped_idx)) {
        const left_child = popped_idx * 2;
        const right_child = popped_idx * 2 + 1;
        if (right_child >= this.heapArray.length) {
          if (this.heapArray[popped_idx][1] > this.heapArray[left_child][1]) {
            const tmp = this.heapArray[popped_idx];
            this.heapArray[popped_idx] = this.heapArray[left_child];
            this.heapArray[left_child] = tmp;
            popped_idx = left_child;
          }
        } else {
          if (this.heapArray[left_child][1] < this.heapArray[right_child][1]) {
            if (this.heapArray[popped_idx][1] > this.heapArray[left_child][1]) {
              const tmp = this.heapArray[popped_idx];
              this.heapArray[popped_idx] = this.heapArray[left_child];
              this.heapArray[left_child] = tmp;
              popped_idx = left_child;
            }
          } else {
            if (
              this.heapArray[popped_idx][1] > this.heapArray[right_child][1]
            ) {
              const tmp = this.heapArray[popped_idx];
              this.heapArray[popped_idx] = this.heapArray[right_child];
              this.heapArray[right_child] = tmp;
              popped_idx = right_child;
            }
          }
        }
      }
      return return_data;
    }
  }
}

const [v, e] = input.shift().split(" ").map(Number);
const start = +input.shift();
const graph = Array.from({ length: v + 1 }, () => []);
const distance = Array.from({ length: v + 1 }, () => Infinity);
const visited = Array.from({ length: v + 1 }, () => false);
const pq = new minHeap();

input.forEach(i => {
  const [from, to, weight] = i.split(" ").map(Number);
  graph[from].push([to, weight]);
});

distance[start] = 0;
pq.push([start, 0]);

while (pq.heapArray.length > 1) {
  const [curNode, dist] = pq.pop();
  if (visited[curNode]) continue;
  
  visited[curNode] = true;
  for (let [nextNode, nextDistance] of graph[curNode]) {
    if (distance[nextNode] > distance[curNode] + nextDistance) {
      distance[nextNode] = nextDistance + distance[curNode];
      pq.push([nextNode, distance[nextNode]]);
    }
  }
}
console.log(
  distance
    .map(i => (i === Infinity ? "INF" : i))
    .slice(1)
    .join("\n")
);