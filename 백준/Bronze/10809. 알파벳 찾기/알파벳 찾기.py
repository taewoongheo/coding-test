from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = list(s.readline().rstrip())

result = []

for i in range(26):
    result.append(-1)

for i in range(len(input)):
    if result[ord(input[i])-97] == -1:
        result[ord(input[i])-97] = i

for i in range(26):
    print(result[i], end=" ")
