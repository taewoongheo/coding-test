import sys

#stdin = open("input.txt")

arr = []
max = 0
while True:
    num = int(sys.stdin.readline().rstrip())
    if num == 0:
        break
    if max < num:
        max = num
    arr.append(num)

n = max
primeArr = [True] * max
primeArr[0] = primeArr[1] = False

def is_prime_number(n):
    end = int(n ** (1 / 2))
    for i in range(2, end + 1):
        if n % i == 0:
            return False
    return True

for i in range(2, n):
    primeArr[i] = is_prime_number(i)

for i in range(len(arr)):
    j = 2
    while True:
        if primeArr[j]:
            if primeArr[arr[i] - j]:
                print("{0} = {1} + {2}".format(arr[i], j, arr[i] - j))
                break
        j += 1