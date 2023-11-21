from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = s.readline().rstrip()
n = int(s.readline().rstrip())

rightStack = [0] * len(input)
leftStack = []
for i in range(0, len(input)):
    rightStack[i] = input[i]

#입력 처리
for i in range(0, n):
    command = s.readline().rstrip()
    if command[0] == "L":
        if rightStack:
            leftStack.append(rightStack.pop())
    elif command[0] == "D":
        if leftStack:
            rightStack.append(leftStack.pop())
    elif command[0] == "B":
        if rightStack:
            rightStack.pop()
    elif command[0] == "P":
        rightStack.append(command[2])

leftStack.reverse()
resultList = rightStack + leftStack
print(''.join(resultList))
