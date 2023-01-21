with open('input.txt') as f:
    contents = f.read()
    elves = contents.split("\n\n")

    top_three_elves = [0, 0, 0]

    for elf in elves:
        snacks = map(int, elf.split("\n"))
        calorie_count = sum(snacks)

        if calorie_count < top_three_elves[1]:
            if calorie_count > top_three_elves[2]:
                top_three_elves.pop()
                top_three_elves.append(calorie_count)
        else:
            if calorie_count < top_three_elves[0]:
                top_three_elves.pop()
                top_three_elves.insert(1, calorie_count)
            else:
                top_three_elves.pop()
                top_three_elves.insert(0, calorie_count)

    print(sum(top_three_elves))
