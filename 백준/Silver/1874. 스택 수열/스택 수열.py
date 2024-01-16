from sys import stdin as s

# input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())

item = 1
stack = []
result = []

for i in range(0, n):
    input = int(s.readline().rstrip())

    while item <= input:
        stack.append(item)
        item += 1
        result.append("+")

    if stack[-1] == input:
        stack.pop()
        result.append("-")
    else:
        print("NO")
        break
else:
    for i in result:
        print(i)