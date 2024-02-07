import sys

#stdin = open("input.txt")

N, M = list(map(int, sys.stdin.readline().split(" ")))

paper = [[0 for _ in range(M)] for _ in range(N)]


def fiveTetromion(i, j):
    result = 0

    #작대기
    if (M - j) >= 4:
        if result < (paper[i][j] + paper[i][j + 1] + paper[i][j + 2] + paper[i][j + 3]):
            result = paper[i][j] + paper[i][j + 1] + paper[i][j + 2] + paper[i][j + 3]
    if (N - i) >= 4:
        if result < (paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+3][j]):
            result = paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+3][j]
    if j >= 3:
        if result < (paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i][j-3]):
            result = paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i][j-3]
    if i >= 3:
        if result < (paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-3][j]):
            result = paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-3][j]

    #사각형
    if ((M-j) >= 2) and ((N-i) >= 2):
        if result < (paper[i][j] + paper[i][j+1] + paper[i+1][j] + paper[i+1][j+1]):
            result = paper[i][j] + paper[i][j+1] + paper[i+1][j] + paper[i+1][j+1]
    if (j >= 1) and ((N-i) >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i+1][j] + paper[i+1][j-1]):
            result = paper[i][j] + paper[i][j-1] + paper[i+1][j] + paper[i+1][j-1]
    if (j >= 1) and (i >= 1):
        if result < (paper[i][j] + paper[i][j-1] + paper[i-1][j] + paper[i-1][j-1]):
            result = paper[i][j] + paper[i][j-1] + paper[i-1][j] + paper[i-1][j-1]
    if ((M-j) >= 2) and (i >= 1):
        if result < (paper[i][j] + paper[i][j+1] + paper[i-1][j] + paper[i-1][j+1]):
            result = paper[i][j] + paper[i][j+1] + paper[i-1][j] + paper[i-1][j+1]

    # ㄴ
    if ((N-i) >= 3) and (j < M-1):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+2][j+1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+2][j+1]
    if ((N-i) >= 3) and (j >= 1):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+2][j-1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+2][j-1]

    if (i >= 1) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i-1][j+2]):
            result = paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i-1][j+2]
    if ((N-i) >= 2) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i+1][j+2]):
            result = paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i+1][j+2]

    if (i >= 2) and (j >= 1):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-2][j-1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-2][j-1]
    if (i >= 2) and ((M-j) >= 2):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-2][j+1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-2][j+1]

    if ((N-i) >= 2) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i+1][j-2]):
            result = paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i+1][j-2]
    if (i >= 1) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i-1][j-2]):
            result = paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i-1][j-2]

    #꽈배기
    if ((N-i) >= 3) and ((M-j) >= 2):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+1][j+1] + paper[i+2][j+1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+1][j+1] + paper[i+2][j+1]
    if ((N-i) >= 3) and (j >= 1):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+1][j-1] + paper[i+2][j-1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+1][j-1] + paper[i+2][j-1]

    if (i >= 1) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i-1][j+1] + paper[i-1][j+2]):
            result = paper[i][j] + paper[i][j+1] + paper[i-1][j+1] + paper[i-1][j+2]
    if ((N-i) >= 2) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i+1][j+1] + paper[i+1][j+2]):
            result = paper[i][j] + paper[i][j+1] + paper[i+1][j+1] + paper[i+1][j+2]

    if (i >= 2) and ((M-j) >= 2):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-1][j+1] + paper[i-2][j+1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-1][j+1] + paper[i-2][j+1]
    if (i >= 2) and (j >= 1):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-1][j-1] + paper[i-2][j-1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-1][j-1] + paper[i-2][j-1]

    if ((N-i) >= 2) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i+1][j-1] + paper[i+1][j-2]):
            result = paper[i][j] + paper[i][j-1] + paper[i+1][j-1] + paper[i+1][j-2]
    if (i >= 1) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i-1][j-1] + paper[i-1][j-2]):
            result = paper[i][j] + paper[i][j-1] + paper[i-1][j-1] + paper[i-1][j-2]

    # ㅜ
    if ((N-i) >= 2) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i+1][j+1]):
            result = paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i+1][j+1]
    if (i >= 1) and ((M-j) >= 3):
        if result < (paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i-1][j+1]):
            result = paper[i][j] + paper[i][j+1] + paper[i][j+2] + paper[i-1][j+1]

    if (i >= 2) and ((M-j) >= 2):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-1][j+1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-1][j+1]
    if (i >= 2) and (j >= 1):
        if result < (paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-1][j-1]):
            result = paper[i][j] + paper[i-1][j] + paper[i-2][j] + paper[i-1][j-1]

    if (i >= 1) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i-1][j-1]):
            result = paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i-1][j-1]
    if ((N-i) >= 2) and (j >= 2):
        if result < (paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i+1][j-1]):
            result = paper[i][j] + paper[i][j-1] + paper[i][j-2] + paper[i+1][j-1]

    if ((N-i) >= 3) and (j >= 1):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+1][j-1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+1][j-1]
    if ((N-i) >= 3) and ((M-j) >= 2):
        if result < (paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+1][j+1]):
            result = paper[i][j] + paper[i+1][j] + paper[i+2][j] + paper[i+1][j+1]

    return result


for i in range(N):
    arr = list(map(int, sys.stdin.readline().split(" ")))
    for j in range(M):
        paper[i][j] = arr[j]

maxValue = 0
for i in range(N):
    for j in range(M):
        resultValue = fiveTetromion(i, j)
        if maxValue < resultValue:
            maxValue = resultValue

print(maxValue)
