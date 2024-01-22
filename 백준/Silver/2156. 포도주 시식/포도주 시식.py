import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

dp = [[0] * 3 for _ in range(T+1)]

for i in range(1, T+1):
    dp[i][0] = int(sys.stdin.readline().rstrip())

dp[1][1] = dp[1][0]
dp[1][2] = dp[1][0]

for i in range(2, T+1):
    dp[i][2] = dp[i-1][1] + dp[i][0]
    max = dp[i-2][1]
    for j in range(i-2, -1, -1):
        if max < dp[j][2]:
            max = dp[j][2]
    dp[i][1] = max + dp[i][0]

max = 0
for i in range(1, T+1):
    if max < dp[i][1]:
        max = dp[i][1]
    if max < dp[i][2]:
        max = dp[i][2]

print(max)
