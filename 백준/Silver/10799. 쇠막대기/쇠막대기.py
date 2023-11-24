from sys import stdin as s

# input.txt file
#s = open('input.txt')

arrangement = s.readline()
raser = []
raserSwitch = False
cnt = 0

for i in range(0, len(arrangement)):
     input = arrangement[i]
     if len(raser) == 0:
          raser.append(1)
          raserSwitch = True
     else:
          if input == "(":
               raser.append(1)
               raserSwitch = True
          else:
               if raserSwitch:
                    raser.pop()
                    for i in range(len(raser)):
                         raser[i] += 1
               else:
                    cnt += raser.pop()
               raserSwitch = False


print(cnt)
