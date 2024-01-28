import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())
arr = list(map(int, sys.stdin.readline().split(" ")))

dp = [[0] * 2 for _ in range(T)]
dp[0][0] = arr[0]
dp[0][1] = arr[0]
if T > 1:
    dp[1][0] = max(dp[0][0] + arr[1], arr[1])
    dp[1][1] = arr[1]

# 0번 인덱스 - 특정 원소 제거 x
# 1번 인덱스 - 특정 원소 제거 o
for i in range(2, T):
    dp[i][0] = max(arr[i], dp[i-1][0] + arr[i])
    dp[i][1] = max(dp[i-1][1], dp[i-2][0]) + arr[i]

result = dp[0][0]
for i in range(T):
    if result < dp[i][0]:
        result = dp[i][0]
    if result < dp[i][1]:
        result = dp[i][1]

print(result)
