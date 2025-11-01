function solution(s) {
    return (JSON.parse(s.replaceAll(/{/g, '[').replaceAll(/}/g, ']')))
        .sort((a, b) => a.length - b.length)
        .reduce((acc, cur, idx) => {
            return acc.concat(cur.filter(el => !acc.includes(el)));
        })
}