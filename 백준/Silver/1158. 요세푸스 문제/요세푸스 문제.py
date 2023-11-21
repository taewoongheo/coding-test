from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = s.readline().split()
K = int(input[0])
N = int(input[1])

list = []
for i in range(0, K):
    list.append(i+1)

result = "<"
idx = 0

while(len(list) != 0):
    idx += N-1
    if idx >= len(list) - 1:
        idx = idx % len(list)
    if(len(list) == 1):
        result += str(list.pop(idx))+">"
    else:
        result += str(list.pop(idx))+", "

print(result)
