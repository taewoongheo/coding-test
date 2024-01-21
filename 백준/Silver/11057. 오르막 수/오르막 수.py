import sys

#stdin = open("input.txt")

n = int(sys.stdin.readline().rstrip())

dp = [[0] * 10 for _ in range(n+1)]

dp[1] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1]

for i in range(2, n+1):
    dp[i][0] = 1
    for j in range(1, 10):
        sumValue = 0
        for k in range(j, -1, -1):
            sumValue += dp[i-1][k]
        dp[i][j] = sumValue

print(sum(dp[n]) % 10007)
