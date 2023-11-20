from sys import stdin as s

# input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())

item = 1
stack = []
result = []

for i in range(0, n):
    input = int(s.readline().rstrip())

    if input in stack: #stack이 무조건 하나 이상 있음
        stackTop = stack[-1]
        while stackTop != input:
            stack.pop()
            result.append("-")
            stackTop = stack[-1]
        stack.pop()
        result.append("-")
    else: #input이 스택에 없음
        if item > input:
            print("NO")
            break
        else: #item <= input 이므로 추가하면 됨
            differ = input-item
            for i in range(0, differ+1):
                stack.append(item)
                item += 1
                result.append("+")
            stack.pop()
            result.append("-")
else:
    for i in result:
        print(i)