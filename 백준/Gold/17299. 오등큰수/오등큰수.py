from sys import stdin as s

# input.txt file
#s = open('input.txt')

n = int(s.readline().rstrip())
arr = list(map(int, s.readline().split()))

count = [0] * 1000001
stack = []
result = [-1] * n

for i in arr:
    count[i] += 1

for i in range(0, n):
    while stack and count[arr[stack[-1]]] < count[arr[i]]:
        result[stack.pop()] = arr[i]
    stack.append(i)

print(*result)
