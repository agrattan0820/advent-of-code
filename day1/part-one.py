with open('input.txt') as f:
    contents = f.read()

    elves = contents.split("\n\n")

    max_elf = 0
    for elf in elves:
        snacks = map(int, elf.split("\n"))
        calorie_count = sum(snacks)
        max_elf = max(calorie_count, max_elf)

    print(max_elf)
