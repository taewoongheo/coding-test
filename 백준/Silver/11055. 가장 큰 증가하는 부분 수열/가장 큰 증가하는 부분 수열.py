import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

arr = [0] + list(map(int, sys.stdin.readline().split(" ")))
dp = [0] * (T+1)

dp[1] = arr[1]

for i in range(2, T+1):
    item = arr[i]
    maxValue = 0
    for j in range(i-1, 0, -1):
        if (item > arr[j]) and (maxValue < dp[j]):
            maxValue = dp[j]
    dp[i] = maxValue + item

print(max(dp))


