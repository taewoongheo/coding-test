from sys import stdin as s

# input.txt file
#s = open('input.txt')

inputStr = s.readline().rstrip()
result = ""

for i in inputStr:
    inputOrd = ord(i)
    if (65 <= inputOrd) and (inputOrd <= 90):
        inputOrd += 13
        if inputOrd > 90:
            remain = inputOrd - 91
            inputOrd = 65 + remain
        result += chr(inputOrd)
    elif (97 <= inputOrd) and (inputOrd <= 122):
        inputOrd += 13
        if inputOrd > 122:
            remain = inputOrd - 123
            inputOrd = 97 + remain
        result += chr(inputOrd)
    else:
        result += i

print(result)
