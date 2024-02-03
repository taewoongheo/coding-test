import sys

#stdin = open("input.txt")

N = int(sys.stdin.readline().rstrip())

board = [[0] * N for _ in range(N)]

for i in range(N):
    inputArr = list(map(str, sys.stdin.readline().rstrip()))
    for j in range(N):
        board[i][j] = inputArr[j]

result = 0
for i in range(N):
    lastColor = board[i][0]
    count = 1
    for k in range(1, N):
        inputColor = board[i][k]
        if lastColor == inputColor:
            count += 1
            if count > result:
                result = count
        else:
            count = 1
        lastColor = inputColor

for j in range(N):
    lastColor = board[0][j]
    count = 1
    for k in range(1, N):
        inputColor = board[k][j]
        if lastColor == inputColor:
            count += 1
            if count > result:
                result = count
        else:
            count = 1
        lastColor = inputColor


for i in range(1, N):
    for j in range(N):
        color = board[i][j]

        #top
        topColor = board[i-1][j]
        board[i][j] = topColor
        board[i-1][j] = color

        #top - i-1 행 검사
        lastColor = board[i-1][0]
        count = 1
        for k in range(1, N):
            inputColor = board[i-1][k]
            if lastColor == inputColor:
                count += 1
                if count > result:
                    result = count
            else:
                count = 1
            lastColor = inputColor

        #top - i행 검사
        lastColor = board[i][0]
        count = 1
        for k in range(1, N):
            inputColor = board[i][k]
            if lastColor == inputColor:
                count += 1
                if count > result:
                    result = count
            else:
                count = 1
            lastColor = inputColor

        #top - j열 검사
        lastColor = board[0][j]
        count = 1
        for k in range(1, N):
            inputColor = board[k][j]
            if lastColor == inputColor:
                count += 1
                if count > result:
                    result = count
            else:
                count = 1
            lastColor = inputColor

        #top 위치 복구
        board[i-1][j] = board[i][j]
        board[i][j] = color

        #left
        if j != 0:
            leftColor = board[i][j-1]
            board[i][j] = leftColor
            board[i][j-1] = color

            #left - j-1 열 검사
            lastColor = board[0][j-1]
            count = 1
            for k in range(1, N):
                inputColor = board[k][j-1]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            #left - j열 검사
            lastColor = board[0][j]
            count = 1
            for k in range(1, N):
                inputColor = board[k][j]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            #left - i행 검사
            lastColor = board[i][0]
            count = 1
            for k in range(1, N):
                inputColor = board[i][k]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            #left 값 복구
            board[i][j-1] = board[i][j]
            board[i][j] = color

        #right
        if j != N-1:
            rightColor = board[i][j + 1]
            board[i][j] = rightColor
            board[i][j+1] = color

            # right - j 열 검사
            lastColor = board[0][j]
            count = 1
            for k in range(1, N):
                inputColor = board[k][j]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            # right - j+1 열 검사
            lastColor = board[0][j+1]
            count = 1
            for k in range(1, N):
                inputColor = board[k][j+1]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            # right - i행 검사
            lastColor = board[i][0]
            count = 1
            for k in range(1, N):
                inputColor = board[i][k]
                if lastColor == inputColor:
                    count += 1
                    if count > result:
                        result = count
                else:
                    count = 1
                lastColor = inputColor

            # left 값 복구
            board[i][j + 1] = board[i][j]
            board[i][j] = color

print(result)
