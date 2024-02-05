import sys

#stdin = open("input.txt")

N = int(sys.stdin.readline().rstrip())
M = int(sys.stdin.readline().rstrip())
if M > 0:
    arr = list(map(int, sys.stdin.readline().split(" ")))
currentChanel = 100
click = 0

button = [True] * 10
for i in range(M):
    button[arr[i]] = False

def checkButton(num):
    numArr = list(map(int, str(num)))
    for i in range(len(numArr)):
        if not button[numArr[i]]:
            return False
    return True

allFalse = True
for i in range(10):
    if button[i] == True:
        allFalse = False

if N == currentChanel:
    allFalse = True

plusNearNum = currentChanel
minusNearNum = currentChanel
plusNum = N
minusNum = N

onlyZero = True
if M > 0:
    for i in range(1, 10):
        if button[i]:
            onlyZero = False
            break

while (not allFalse) and (not onlyZero):
    if checkButton(plusNum):
        plusNearNum = plusNum
        break
    plusNum += 1

while not allFalse:
    if checkButton(minusNum):
        minusNearNum = minusNum
        break
    minusNum -= 1
    if minusNum <= -1:
        break

plusNearNumSize = len(str(plusNearNum))
minusNearNumSize = len(str(minusNearNum))

result = plusNearNumSize + abs(plusNearNum-N)
if result > (abs(minusNearNum-N) + minusNearNumSize):
    result = abs(minusNearNum-N) + minusNearNumSize
if result > abs(currentChanel-N):
    result = abs(currentChanel-N)

print(result)
