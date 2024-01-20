import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

dp = [[0] * 3 for _ in range(T)]

dp[0] = list(map(int, sys.stdin.readline().split(" ")))

for i in range(1, T):
    arr = list(map(int, sys.stdin.readline().split(" ")))
    dp[i][0] = min(dp[i-1][1] + arr[0], dp[i-1][2] + arr[0])
    dp[i][1] = min(dp[i-1][0] + arr[1], dp[i-1][2] + arr[1])
    dp[i][2] = min(dp[i-1][0] + arr[2], dp[i-1][1] + arr[2])

print(min(dp[T-1]))
