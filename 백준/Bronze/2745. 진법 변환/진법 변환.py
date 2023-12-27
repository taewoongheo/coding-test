from sys import stdin as s

#s = open("input.txt")

N, B = list(s.readline().split(" "))

arr = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
result = 0

B = int(B)
idx = 0
while N != "":
    digit = 1
    for i in range(idx):
        digit *= B

    char = N[-1]
    num = arr.index(char)
    N = N[:-1]

    result += num*digit
    idx += 1

print(result)
