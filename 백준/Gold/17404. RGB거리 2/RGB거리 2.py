import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

dp1 = [[0] * 3 for _ in range(T)]
dp2 = [[0] * 3 for _ in range(T)]
dp3 = [[0] * 3 for _ in range(T)]
maxValue = sys.maxsize
arr = list(map(int, sys.stdin.readline().split(" ")))
dp1[0] = [arr[0], maxValue, maxValue]
dp2[0] = [maxValue, arr[1], maxValue]
dp3[0] = [maxValue, maxValue, arr[2]]

for i in range(1, T):
    arr = list(map(int, sys.stdin.readline().split(" ")))
    dp1[i][0] = min(dp1[i - 1][1] + arr[0], dp1[i - 1][2] + arr[0])
    dp1[i][1] = min(dp1[i - 1][0] + arr[1], dp1[i - 1][2] + arr[1])
    dp1[i][2] = min(dp1[i - 1][0] + arr[2], dp1[i - 1][1] + arr[2])

    dp2[i][0] = min(dp2[i-1][1] + arr[0], dp2[i-1][2] + arr[0])
    dp2[i][1] = min(dp2[i-1][0] + arr[1], dp2[i-1][2] + arr[1])
    dp2[i][2] = min(dp2[i-1][0] + arr[2], dp2[i-1][1] + arr[2])

    dp3[i][0] = min(dp3[i - 1][1] + arr[0], dp3[i - 1][2] + arr[0])
    dp3[i][1] = min(dp3[i - 1][0] + arr[1], dp3[i - 1][2] + arr[1])
    dp3[i][2] = min(dp3[i - 1][0] + arr[2], dp3[i - 1][1] + arr[2])

result = min(dp1[T-1][1], dp1[T-1][2])
if result > min(dp2[T-1][0], dp2[T-1][2]):
    result = min(dp2[T-1][0], dp2[T-1][2])
if result > min(dp3[T-1][0], dp3[T-1][1]):
    result = min(dp3[T-1][0], dp3[T-1][1])

print(result)
