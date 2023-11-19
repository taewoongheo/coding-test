from sys import stdin as s

#input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())


for i in range(0, n):
    stack = []
    input = s.readline().rstrip()
    size = len(input)
    vps = True
    for j in range(0, size):
        if(input[j] == "("):
            stack.append("(")
        else:
            if(len(stack)==0):
                vps = False
            else:
                stack.pop()
    if(len(stack) != 0):
        vps = False
    if(vps):
        print("YES")
    else:
        print("NO")

