from sys import stdin as s
#s = open("input.txt")

N = int(s.readline().rstrip())

dp = [[0, 0] for _ in range(N+1)]

dp[1] = [1, 1]

for i in range(2, N+1):
    dp[i][0] = dp[i-1][0] + dp[i-2][0]
    dp[i][1] = dp[i-1][1] + dp[i-2][1]

print(dp[N][1])
