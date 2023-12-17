from sys import stdin as s

# input.txt file
#s = open('input.txt')

for line in s:
    result = [0, 0, 0, 0]
    for i in line:
        input = ord(i)
        if (input >= 97) and (input <= 122):
            result[0] += 1
        elif (input >= 65) and (input <= 90):
            result[1] += 1
        elif (input >= 48) and (input <= 57): 
            result[2] += 1
        elif input == 32:
            result[3] += 1
    print(*result)
