from sys import stdin as s

# input.txt file
#s = open('input.txt')

num = int(s.readline().rstrip())

result = ""
if num == 0:
    print(0)
    exit()

while num != 0:
    if num % -2:
        num = num // -2 + 1
        result = "1" + result
    else:
        num = num // -2
        result = "0" + result

print(result)
