class Node {
  constructor(value) {
    this.value = value;
    this.prev = null;
    this.next = null;
  }
}

class LinkedList {
  constructor(k) {
    this.k = k;
    this.tail = null;
    this.head = null;
    this.length = 0;
  }

  // head(MRU) 에 삽입
  push(node) {
    // k=0 이면 아무것도 추가하지 않음
    if (this.k === 0) return;

    // 1. 노드를 리스트에 먼저 연결합니다.
    if (!this.head) {
      this.head = node;
      this.tail = node;
      this.length = 1;
    } else {
      const oldHead = this.head;
      oldHead.next = node;
      node.prev = oldHead;
      this.head = node;
      this.length++;
    }

    // 2. 연결 후 길이를 확인하고 k를 초과하면 pop 합니다.
    if (this.length > this.k) {
      this.pop();
    }
  }

  // tail(LRU) 에서 꺼냄
  pop() {
    if (!this.tail) return;

    const tailValue = this.tail.value; // 반환할 값 저장

    if (this.tail === this.head) {
      // 리스트에 항목이 하나일 때
      this.tail = null; // ✅ 수정: 할당 연산자
      this.head = null; // ✅ 수정: 할당 연산자
    } else {
      // 리스트에 항목이 둘 이상일 때
      this.tail = this.tail.next;
      this.tail.prev = null;
    }

    this.length--;
    return tailValue; // 제거된 값 반환
  }

  // LRU: 값을 찾아 head 로 이동
  cache(value) {
    let node = this.tail; // tail(LRU) 부터 head(MRU) 까지 검색

    while (node !== null) {
      if (node.value === value) {
        // --- 캐시 히트 ---

        // 1. 이미 head(MRU)이면 아무것도 할 필요 없음
        if (node === this.head) {
          return node.value;
        }

        // 2. 노드 연결 끊기
        if (node === this.tail) {
          // 2a. tail을 히트한 경우
          this.tail = node.next;
          // this.tail.prev = null; // node.next가 새 tail이 되므로 prev는 null이어야 함 (아래에서 null이 됨)
          // ✅ 수정: 새 tail의 prev를 null로 설정
          if (this.tail) {
            // 리스트가 비지 않았다면
            this.tail.prev = null;
          }
        } else {
          // 2b. 중간 노드를 히트한 경우
          node.prev.next = node.next;
          node.next.prev = node.prev;
        }

        // 3. 노드를 head(MRU)로 이동
        const oldHead = this.head;
        oldHead.next = node;
        node.prev = oldHead;
        node.next = null; // 새 head의 next는 null
        this.head = node;

        return node.value;
      }
      node = node.next;
    }

    // --- 캐시 미스 ---
    return null;
  }
}

function solution(cacheSize, cities) {
  let ans = 0;

  const LRUCache = new LinkedList(cacheSize);

  for (const city of cities) {
    const parsedCity = city.toLowerCase();
    if (LRUCache.cache(parsedCity)) {
      ans += 1;
      continue;
    }

    ans += 5;
    LRUCache.push(new Node(parsedCity));
    // if (LRUCache.length > cacheSize) {
    //   LRUCache.pop();
    // }
  }

  return ans;
}

