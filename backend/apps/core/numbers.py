from decimal import Decimal

_ONES = [
    "", "бир", "икки", "уч", "тўрт", "беш", "олти", "етти", "саккиз", "тўққиз",
]
_TENS = {
    1: "ўн", 2: "йигирма", 3: "ўттиз", 4: "қирқ", 5: "эллик",
    6: "олтмиш", 7: "етмиш", 8: "саксон", 9: "тўқсон",
}
_SCALES = ["", "минг", "миллион", "миллиард", "триллион"]


def _three_digits_to_words(number: int) -> list[str]:
    words: list[str] = []
    hundreds = number // 100
    remainder = number % 100

    if hundreds > 0:
        words.append(_ONES[hundreds])
        words.append("юз")

    tens = remainder // 10
    ones = remainder % 10

    if tens > 0:
        words.append(_TENS[tens])

    if ones > 0:
        words.append(_ONES[ones])

    return words


def amount_to_words_uz(amount: Decimal) -> str:
    total = int(amount)

    if total == 0:
        return "нол сўм"

    groups: list[int] = []

    while total > 0:
        groups.append(total % 1000)
        total //= 1000

    words: list[str] = []

    for index in range(len(groups) - 1, -1, -1):
        group = groups[index]

        if group == 0:
            continue

        words.extend(_three_digits_to_words(group))

        if _SCALES[index]:
            words.append(_SCALES[index])

    return " ".join(words) + " сўм"
