import sys

#stdin = open("input.txt")

n = int(sys.stdin.readline().rstrip())
arr = list(map(int, sys.stdin.readline().split(" ")))

dp = [[0, 0] for _ in range(n)]

# 첫번째 인덱스: 중간 삭제 x
# 두번째 인덱스: 중간 삭제 o
dp[0] = [arr[0], arr[0]]
if n > 1:
    dp[1][0] = max(dp[0][0] + arr[1], arr[1])
    dp[1][1] = arr[1]

for i in range(2, n):
    dp[i][0] = max(dp[i-1][0] + arr[i], arr[i])
    dp[i][1] = max(dp[i-2][0], dp[i-1][1]) + arr[i]

maxValue = dp[0][0]
for i in range(n):
    if dp[i][0] > maxValue:
        maxValue = dp[i][0]
    if dp[i][1] > maxValue:
        maxValue = dp[i][1]

print(maxValue)
