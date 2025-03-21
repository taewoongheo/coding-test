// 문제: 명령에 대한 실행결과를 출력(print)
// 50x50크기의 셀에서 각 명령들을 어떻게 구현할까?
// "UPDATE r c value"
//      cell[r][c]=value 로 바로 업데이트
// "UPDATE value1 value2"
//      50x50루프를 돌면서 cell[r][c]=value2 로 변경
// "MERGE r1 c1 r2 c2"
//      병합 시 서로의 값을 공유, 둘 다 값을 갖고 있으면 (r1, c1) 값으로 저장
//      둘이 값을 공유, update 시 동시에 변함
//      그럼 각 셀마다 label을 붙임.
//      map<label, [(r, c)] >
//      특정 셀에 접근 시 label !== null 이라면 map에 접근해서 나머지 병합된 셀들도 업데이트
// "UNMERGE r c"
//      label을 키로 map에 접근하여, 포함된 셀들의 label=null로 만듦
//      cell[r][c]=value

class Cell {
    constructor(value, r, c) {
        this.value = String(value);
        this.r = r;
        this.c = c;
        this.label = null;
    }
}

function solution(commands) {
    var answer = [];
    
    const cells = Array.from({length: 51}, (_, r) => 
                            Array.from({length: 51}, (_, c) => new Cell('', r, c)));
    const map = new Map();
    let labelIdx = 0;

    for (const command of commands) {
        const comm = command.split(' ');
        if (comm[0] === 'UPDATE') {
            if (comm.length === 4) {
                // "UPDATE r c value"
                const r = parseInt(comm[1]);
                const c = parseInt(comm[2]);
                const value = String(comm[3]);
                
                const cell = cells[r][c];
                cell.value = value;
                if (cell.label !== null) {
                    for (const lcell of map.get(cell.label)) {
                        lcell.value = value;
                    }
                }
            } else if (comm.length === 3) {
                // "UPDATE value1 value2"
                const value1 = String(comm[1]);
                const value2 = String(comm[2]);
                for (let i = 1; i <= 50; i++) {
                    for (let j = 1; j <= 50; j++) {
                        const cell = cells[i][j];
                        if (cell.value === value1) {
                            cell.value = value2;
                            
                            if (cell.label !== null) {
                                for (const lcell of map.get(cell.label)) {
                                    lcell.value = value2;
                                }
                            }
                        }
                    }
                }
            }
        } else if (comm[0] === 'MERGE') {
            // "MERGE r1 c1 r2 c2"
            const r1 = parseInt(comm[1]);
            const c1 = parseInt(comm[2]);
            const r2 = parseInt(comm[3]);
            const c2 = parseInt(comm[4]);
            const cell1 = cells[r1][c1];
            const cell2 = cells[r2][c2];
            
            const memoCell1Label = cell1.label;
            const memoCell2Label = cell2.label;
            
            if (cell1.label === cell2.label) continue;
            if ((r1 === r2) && (c1 === c2)) continue;
                
            cell1.label = labelIdx;
            cell2.label = labelIdx;
            map.set(labelIdx, [cell1, cell2]);

            if (memoCell1Label !== null) {
                const lcells = map.get(memoCell1Label);
                for (const lcell of lcells) {
                    lcell.label = labelIdx;
                    map.get(labelIdx).push(lcell);
                }
            }
            if (memoCell2Label !== null) {
                const lcells = map.get(memoCell2Label);
                for (const lcell of lcells) {
                    lcell.label = labelIdx;
                    map.get(labelIdx).push(lcell);
                }
            }

            if (cell1.value !== '') {
                for (const lcell of map.get(cell1.label)) {
                    lcell.value = cell1.value;
                }
            } else if (cell2.value !== '') {
                for (const lcell of map.get(cell2.label)) {
                    lcell.value = cell2.value;
                }
            }

            labelIdx++;
        } else if (comm[0] === 'UNMERGE') {
            // "UNMERGE r c"
            const r = parseInt(comm[1]);
            const c = parseInt(comm[2]);
            const cell = cells[r][c];
            const value = cell.value;
            
            for (const lcell of map.get(cell.label)) {
                lcell.label = null;
                lcell.value = '';
            }
            cell.value = value;
        } else if (comm[0] === 'PRINT') {
            // "PRINT r c"
            const r = parseInt(comm[1]);
            const c = parseInt(comm[2]);
            const cell = cells[r][c];
            
            if (cell.value !== '') {
                answer.push(cell.value);
            } else {
                answer.push('EMPTY');
            }
        }
    };
    
    return answer;
}