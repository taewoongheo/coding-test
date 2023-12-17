from sys import stdin as s

# input.txt file
#s = open('input.txt')

input = list(s.readline().rstrip())

result = []

for i in range(26):
    result.append(0)

for i in input:
    result[ord(i)-97] += 1

for i in range(26):
    print(result[i], end=" ")
