// 컨테이너에서 상자를 먼저 찾음
// 만약 컨테이너에 상자가 포함되어 있다면, 그걸 찾을 때까지 pop, pop 한 상자들은 보조컨테이너에 넣음
// 만약 컨테이너에 상자가 포함되어 있지 않다면, 보조컨테이너를 확인
//  보조컨테이너 pop 이 일치하지 않으면 pop

function solution(order) {
    let main = Array.from({length: order.length}, (_, i) => order.length - i);
    let sub = [];
    
    let ans = 0;

    for (const o of order) {
        if (main.at(-1) <= o) {
            while (true) {
                const item = main.pop();
                if (item === o) {
                    break;
                }
                sub.push(item);
            }
            ans++;
            continue;
        }
        
        if (sub.at(-1) === o) {
            sub.pop();
            ans++;
            continue;
        }
        
        break;
    }

    return ans;
}
