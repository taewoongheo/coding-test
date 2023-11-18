from sys import stdin as s

#input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())

stack = []
for i in range(0, n):
    command = list(map(str, s.readline().rstrip().split(" ")))
    if(command[0] == "push"):
        stack.append(command[1])
    elif(command[0] == "pop"):
        if(not len(stack)==0):
            print(stack.pop(-1))
        else:
            print(-1)
    elif(command[0] == "size"):
        print(len(stack))
    elif(command[0] == "top"):
        if(not len(stack)==0):
            print(stack[-1])
        else:
            print(-1)
    elif(command[0] == "empty"):
        if(len(stack) == 0):
            print(1)
        else:
            print(0)
