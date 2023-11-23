from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = list(s.readline().rstrip().split(" "))

result = ""
reverse = True #스위치

for i in range(len(input)):
    sub = ""
    reverseSub = ""
    for char in input[i]:
        if char == "<":
            reverse = False
        elif char == ">":
            reverse = True
            sub += ">"
            continue

        if reverse:
            reverseSub += char
        else:
            sub += reverseSub[::-1]
            reverseSub = ""
            sub += char
    sub += reverseSub[::-1]
    result += sub+" "

print(result)
