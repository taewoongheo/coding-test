import sys
#stdin = open("input.txt")

n = int(sys.stdin.readline().rstrip())

item = 1
result = []
stack = []
falseSwitch = False

for i in range(0, n):
    num = int(sys.stdin.readline().rstrip())
    if item <= num:
        for j in range(0, num-item+1):
            stack.append(item)
            result.append("+")
            item += 1
        stack.pop()
        result.append("-")
    elif item > num:
        if num in stack:
            while True:
                popItem = stack.pop()
                result.append("-")
                if popItem == num:
                    break
        else:
            falseSwitch = True

if (falseSwitch):
    print("NO")
else:
    for i in result:
        print(i)

