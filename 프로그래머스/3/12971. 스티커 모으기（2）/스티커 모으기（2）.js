// 최대가 되려면 어차피 "현재 노드를 선택했을 때 i+2, i+3 에 대해서만 체크하면 됨"
//  즉, 각 칸마다 루프
//      해당 칸에서 i+2, i+3 칸을 갱신. 현재 칸 + 해당 칸 숫자 => 더 크면 갱신
//      가장 큰 수가 나오면 됨

function solution(sticker) { 
    const dp = new Array(sticker.length).fill(0);
    
    dp[0] = sticker[0];
    let eMax = sticker[0];
    
    // 0 시작 루프 = 마지막 선택 x 
    for (let i = 0; i < sticker.length; i++) {
        if (dp[i] === 0) continue;
        if (i + 2 < sticker.length && i + 2 !== sticker.length - 1) {
            dp[i + 2] = Math.max(dp[i] + sticker[i + 2], dp[i + 2]);
            eMax = Math.max(dp[i + 2], eMax);
        }
        if (i + 3 < sticker.length && i + 3 !== sticker.length - 1) {
            dp[i + 3] = Math.max(dp[i] + sticker[i + 3], dp[i + 3]);
            eMax = Math.max(dp[i + 3], eMax);
        }
    }

    if (sticker.length === 1) return eMax;
    
    const ndp = new Array(sticker.length).fill(0);

    ndp[1] = sticker[1];
    let oMax = ndp[1];
    if (ndp.length > 2) {
        ndp[2] = sticker[2];
        oMax = ndp[2] > ndp[1] ? ndp[2] : ndp[1];
    }
    
    // 1 시작 루프 = 마지막 선택 o
    for (let i = 1; i < sticker.length; i++) {
        if (ndp[i] === 0) continue;
        if (i + 2 < sticker.length) {
            ndp[i + 2] = Math.max(ndp[i] + sticker[i + 2], ndp[i + 2]);
            oMax = Math.max(ndp[i + 2], oMax);
        }
        if (i + 3 < sticker.length) {
            ndp[i + 3] = Math.max(ndp[i] + sticker[i + 3], ndp[i + 3]);
            oMax = Math.max(ndp[i + 3], oMax);
        }
    }
    
    return eMax > oMax ? eMax : oMax
}
