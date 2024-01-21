import sys

#stdin = open("input.txt")

T = int(sys.stdin.readline().rstrip())

for i in range(0, T):
    n = int(sys.stdin.readline().rstrip())
    dp = [[0] * 3 for _ in range(n)]
    arr1 = list(map(int, sys.stdin.readline().split(" ")))
    arr2 = list(map(int, sys.stdin.readline().split(" ")))
    for j in range(n):
        dp[j][0] = arr1[j]
        dp[j][1] = arr2[j]

    # 로직 시작
    for j in range(1, n):
        dp[j][0] = max(dp[j - 1][1] + dp[j][0], dp[j - 1][2] + dp[j][0])
        dp[j][1] = max(dp[j - 1][0] + dp[j][1], dp[j - 1][2] + dp[j][1])
        dp[j][2] = max(dp[j - 1][0] + dp[j][2], dp[j - 1][1] + dp[j][2])
    print(max(dp[n - 1]))
