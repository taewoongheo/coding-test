import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

dp = [0] * (T+1)

if T > 1:
    dp[2] = 3

for i in range(3, T+1):
    dp[i] = dp[i-2] * 3 + 2
    for j in range(i-3, 0, -1):
        if j % 2 == 0:
            dp[i] += (dp[j] * 2)
    if i % 2 != 0:
        dp[i] = 0

print(dp[T])