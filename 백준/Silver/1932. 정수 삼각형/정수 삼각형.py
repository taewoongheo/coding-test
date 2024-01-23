import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

arr = [[0] * T for _ in range(T+1)]
dp = [[0] * T for _ in range(T+1)]
root = int(sys.stdin.readline().rstrip())
arr[1][0] = root
dp[1][0] = root

size = 2
for i in range(2, T+1):
    arrList = list(map(int, sys.stdin.readline().split(" ")))
    for j in range(size):
        item = arrList[j]
        if j == 0:
            dp[i][j] = dp[i-1][j] + item
        else:
            dp[i][j] = max(dp[i-1][j] + item, dp[i-1][j-1] + item)
    size += 1

print(max(dp[T]))
