function solution(dirs) {
    let ans = 0;
    
    const v = Array.from({length: 11}, () => 
                        Array.from({length: 11}, () => []));

    const check = (r, c) => {
        return r >= 0 && r < 11 && c >= 0 && c < 11;
    }

    let [r, c] = [5, 5];
    for (const dir of dirs.split('')) {

        let nr = r;
        let nc = c;
        
        if (dir === 'U') {
            if (check(r - 1, c)) {
                nr--;
            }
        } else if (dir === 'D') {
            if (check(r + 1, c)) {
                nr++;
            }
        } else if (dir === 'L') {
            if (check(r, c - 1)) {
                nc--;
            }
        } else {
            if (check(r, c + 1)) {
                nc++;
            }
        }
        
        
        let dCheck = false;
        if (r === nr && c === nc) {
            dCheck = true;
        }
        
        for (let i = 0; i < v[nr][nc].length; i++) {
            const [or, oc] = v[nr][nc][i];
            if (or === r && oc === c) {
                dCheck = true;
                break;
            }
        }
        
        if (!dCheck) {
            v[nr][nc].push([r, c]);
            v[r][c].push([nr, nc]);
            ans++;
        }
        
        r = nr;
        c = nc;
    }
    
    return ans;
}