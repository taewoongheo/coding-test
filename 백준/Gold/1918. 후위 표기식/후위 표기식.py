from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = list(s.readline().rstrip())

result = ""
stack = []


for item in input:
    if 65 <= ord(item) <= 90:
        result += item
    elif item == "(":
        stack.append(item)
    elif item == ")":
        while stack:
            top = stack[-1]
            if top == "(":
                stack.pop()
                break
            result += stack.pop()
    if item in "*/":
        while stack:
            top = stack[-1]
            if top == "(":
                break
            if top in "+-":
                break
            result += stack.pop()
        stack.append(item)
    if item in "+-":
        while stack:
            top = stack[-1]
            if top == "(":
                break
            result += stack.pop()
        stack.append(item)

while stack:
    result += stack.pop()

for i in result:
    print(i, end="")
