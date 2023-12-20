from sys import stdin as s

# input.txt file
#s = open('input.txt')

A, B = list(map(int, s.readline().split(" ")))

multiple = A * B

while True:
    b = B
    B = A % B
    A = b
    if B == 0:
        GCD = A
        break

LCM = multiple / GCD

print(GCD)
print(int(LCM))
