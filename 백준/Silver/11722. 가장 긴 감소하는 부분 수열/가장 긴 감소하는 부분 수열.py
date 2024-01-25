import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

arr = [0] + list(map(int, sys.stdin.readline().split(" ")))
dp = [0] * (T+1)
dp[1] = 1

for i in range(2, T+1):
    item = arr[i]
    maxValue = 1
    for j in range(i-1, 0, -1):
        if (arr[j] > item) and (maxValue <= dp[j]):
            maxValue = dp[j] + 1
    dp[i] = maxValue

print(max(dp))
