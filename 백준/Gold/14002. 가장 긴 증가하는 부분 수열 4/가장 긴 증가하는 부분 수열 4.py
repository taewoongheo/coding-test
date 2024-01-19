import sys

#stdin = open("input.txt")

n = int(sys.stdin.readline().rstrip())

arr = list(map(int, sys.stdin.readline().split(" ")))
dp = [1] * n

for i in range(1, n):
    for j in range(i-1, -1, -1):
        if (arr[i] > arr[j]) and (dp[i] <= dp[j]):
            dp[i] = dp[j] + 1

maxValue = max(dp)
print(maxValue)
maxIdx = dp.index(maxValue)
result = [arr[maxIdx]]

for i in range(maxIdx, -1, -1):
    if (maxValue-1) == dp[i]:
        result.append(arr[i])
        maxValue -= 1

result.reverse()
print(*result)
