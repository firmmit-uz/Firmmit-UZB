from django.core.management.base import BaseCommand
from django.db import transaction
from django.utils.text import slugify

from apps.catalog.models import Category, Product, UnitType

# Kategoriyalar: (kod, inglizcha nom, o'zbekcha nom (kirill), tartib)
CATEGORIES = [
    ("01", "Structural Pipes & Profiles", "Қувурлар ва профиллар", 1),
    ("02", "Metal Clips, Clamps & Fasteners", "Металл қисқич ва маҳкамлагичлар", 2),
    ("03", "Compression Fittings — Queen Line", "Компрессион фитинглар — Queen", 3),
    ("04", "Valves & Filtration", "Кранлар ва фильтрлар", 4),
    ("05", "Plastic Clips & Saddle Fittings", "Пластик қисқич ва фитинглар", 5),
    ("06", "Greenhouse Hardware", "Иссиқхона жиҳозлари", 6),
    ("07", "Climate Equipment", "Иқлим жиҳозлари", 7),
    ("08", "Irrigation Tape & Materials", "Суғориш тасмаси ва материаллар", 8),
    ("09", "Bulk Materials", "Йирик ҳажмли материаллар", 9),
]

# Mahsulotlar: (SKU, kategoriya kodi, inglizcha nom, o'zbekcha nom (kirill), o'lcham)
PRODUCTS = [
    ("FMT-01", "01", "Metal Pipe / Connector", "Металл қувур / уловчи", "Ø 48 mm"),
    ("FMT-02", "01", "Metal Pipe / Connector", "Металл қувур / уловчи", "Ø 22 mm"),
    ("FMT-03", "01", "Metal Pipe / Connector", "Металл қувур / уловчи", "Ø 32 mm"),
    ("FMT-04", "01", "Bracket with Bearing", "Подшипникли кронштейн", "Ø 48 mm"),
    ("FMT-05", "01", "Metal Disc / Flange", "Металл диск / фланец", "Ø 25 mm"),
    ("FMT-15", "01", "Octagonal Flange Cap", "Саккиз қиррали фланец-қопқоқ", "Ø 32 mm"),
    ("FMT-06", "02", "Pipe Clip Fastener", "Қувур қисқичи", ""),
    ("FMT-07", "02", "Pipe Clip Fastener, Curved", "Қувур қисқичи, эгри", ""),
    ("FMT-08", "02", "Z-Shaped Metal Fastener", "Z-симон металл маҳкамлагич", ""),
    ("FMT-09", "02", "Pipe Clip Fastener", "Қувур қисқичи", "Ø 48 mm"),
    ("FMT-10", "02", "Metal Clamp, Curved", "Металл хомут, эгри", ""),
    ("FMT-11", "02", "Metal Saddle Clip", "Металл эгар қисқич", "Ø 48–50 mm"),
    ("FMT-12", "02", "Metal Saddle Clip", "Металл эгар қисқич", "Ø 25 mm"),
    ("FMT-13", "02", "Metal Saddle Clip", "Металл эгар қисқич", "Ø 32 mm"),
    ("FMT-16", "02", "Pipe Clip Fastener", "Қувур қисқичи", "Ø 32 mm"),
    ("FMT-14", "02", "Metal Clip, Double-Prong", "Икки тишли металл қисқич", "Ø 22 mm"),
    ("FMT-61", "02", "Metal Clip, Red / White", "Металл қисқич, қизил / оқ", "Ø 25 mm"),
    ("FMT-72", "02", "Metal Clip / Bracket, Dark", "Металл қисқич / кронштейн, қора", "Ø 32 mm"),
    ("FMT-51", "02", "Saddle Clamp with Bolts", "Болтли эгар хомут", "50 × 20"),
    ("FMT-52", "02", "Saddle Clamp with Bolts", "Болтли эгар хомут", "Ø 48 mm"),
    ("FMT-53", "02", "Pipe Clamp Set with Bolts & Nuts", "Болт ва гайкали хомут тўплами", ""),
    ("FMT-62", "02", "Eye-Bolt Turnbuckle Clip", "Кўзли болт-талреп қисқичи", "Ø 22 mm"),
    ("FMT-63", "02", "Hook Clip with Eye Bolt", "Кўзли болтли илгак қисқич", "Ø 48 mm"),
    ("FMT-64", "02", "U-Bolt Fastener", "U-симон болт маҳкамлагич", ""),
    ("FMT-65", "02", "Flange Nut, Bulk Pack", "Фланецли гайка, тўплам", ""),
    ("FMT-73", "02", "Roller Hook", "Роликли илгак", ""),
    ("FMT-31", "03", "Queen Coupling", "Queen муфта", "Ø 20 mm"),
    ("FMT-33", "03", "Queen Coupling", "Queen муфта", "Ø 20 mm"),
    ("FMT-29", "03", "Queen Coupling", "Queen муфта", "Ø 25 mm"),
    ("FMT-32", "03", "Queen Coupling", "Queen муфта", "Ø 30 mm"),
    ("FMT-39", "03", "Queen Coupling", "Queen муфта", "Ø 40 mm"),
    ("FMT-27", "03", "Queen Coupling", "Queen муфта", "Ø 50 mm"),
    ("FMT-44", "03", "Queen Elbow, Male Thread", "Queen бурчак, ташқи резьба", "Ø 20 mm"),
    ("FMT-46", "03", "Queen Elbow, Male Thread", "Queen бурчак, ташқи резьба", "Ø 25 mm"),
    ("FMT-19", "03", "Queen Elbow", "Queen бурчак", "Ø 30 mm"),
    ("FMT-38", "03", "Queen Elbow", "Queen бурчак", "Ø 30 mm"),
    ("FMT-35", "03", "Queen Elbow", "Queen бурчак", "Ø 40 mm"),
    ("FMT-30", "03", "Queen Elbow, Threaded", "Queen бурчак, резьбали", "Ø 50 mm"),
    ("FMT-42", "03", "Queen Tee", "Queen тройник", "Ø 25 mm"),
    ("FMT-43", "03", "Queen Tee", "Queen тройник", "Ø 30 mm"),
    ("FMT-36", "03", "Queen Tee", "Queen тройник", "Ø 50 mm"),
    ("FMT-26", "03", "Queen Tee", "Queen тройник", "30 × 20"),
    ("FMT-45", "03", "Queen Tee", "Queen тройник", "40 × 40"),
    ("FMT-37", "03", "Queen Tee", "Queen тройник", "50 × 20"),
    ("FMT-25", "03", "Queen Reducer", "Queen ўтказгич", "40 × 25"),
    ("FMT-28", "03", "Queen Reducer Elbow", "Queen ўтказгич-бурчак", "50 × 20"),
    ("FMT-41", "03", "Queen Adapter", "Queen адаптер", "Ø 25 mm"),
    ("FMT-40", "03", "Queen Adapter, Male Thread", "Queen адаптер, ташқи резьба", "Ø 25 mm"),
    ("FMT-17", "03", "Tee Fitting, Black", "Тройник фитинг, қора", ""),
    ("FMT-18", "04", "Ball Valve", "Шарли кран", "Ø 20 mm"),
    ("FMT-20", "04", "Ball Valve", "Шарли кран", "Ø 20 mm × 3/4\""),
    ("FMT-21", "04", "Ball Valve", "Шарли кран", "Ø 25 mm"),
    ("FMT-23", "04", "Ball Valve", "Шарли кран", "Ø 30 mm × 1¼\""),
    ("FMT-22", "04", "Ball Valve", "Шарли кран", "Ø 50 mm (2\")"),
    ("FMT-50", "04", "Ball Valve", "Шарли кран", "Ø 50 mm"),
    ("FMT-68", "04", "PVC Union Ball Valve, A-SUNG", "PVC Union шарли кран, A-SUNG", ""),
    ("FMT-24", "04", "Filter / Valve, AMIAD", "Фильтр / кран, AMIAD", ""),
    ("FMT-49", "05", "Plastic Clip", "Пластик қисқич", "Ø 25 mm"),
    ("FMT-58", "05", "Plastic Clip", "Пластик қисқич", "Ø 32 mm"),
    ("FMT-48", "05", "Plastic Clip", "Пластик қисқич", "Ø 48 mm"),
    ("FMT-47", "05", "Plastic Disc / Flange, Petal", "Пластик диск / фланец, гулбаргсимон", "Ø 25 mm"),
    ("FMT-59", "05", "Plastic Saddle Clamp with Barb", "Штуцерли пластик эгар хомут", "Ø 48 mm"),
    ("FMT-60", "05", "Plastic Y-Branch Clamp", "Пластик Y-тармоқли хомут", "Ø 48 mm"),
    ("FMT-54", "06", "Plastic Roller / Pulley with Bracket", "Кронштейнли пластик ролик / шкив", ""),
    ("FMT-55", "06", "Cast Pulley Block", "Қуйма шкив блоки", ""),
    ("FMT-56", "06", "Hook Holder with Bolt, Straight", "Болтли илгак ушлагич, тўғри", ""),
    ("FMT-57", "06", "Hook Holder, Bent Rod", "Илгак ушлагич, эгик стержень", ""),
    ("FMT-66", "07", "Electric Space Heater", "Электр ҳаво иситгичи", ""),
    ("FMT-67", "07", "Fan Coil Unit, Elh WS — Heating / Cooling", "Фанкойл, Elh WS — иситиш / совитиш", ""),
    ("FMT-69", "08", "Drip Tape, Elephant-Drip — Roll", "Томчилатиб суғориш тасмаси, Elephant-Drip — рулон", ""),
    ("FMT-70", "08", "Tape, Turquoise — Roll", "Тасма, феруза рангли — рулон", ""),
    ("FMT-71", "08", "Woven Fastening Strap", "Тўқилган боғич тасма", "20 mm × 500 m"),
    ("FMT-74", "09", "Greenhouse Film — Carton", "Иссиқхона плёнкаси — қути", ""),
    ("FMT-75", "09", "Assorted Tape Bundle", "Аралаш тасмалар тўплами", ""),
]

_TRANSLIT = {
    "а": "a", "б": "b", "в": "v", "г": "g", "д": "d", "е": "e", "ё": "yo",
    "ж": "j", "з": "z", "и": "i", "й": "y", "к": "k", "л": "l", "м": "m",
    "н": "n", "о": "o", "п": "p", "р": "r", "с": "s", "т": "t", "у": "u",
    "ф": "f", "х": "x", "ц": "ts", "ч": "ch", "ш": "sh", "ъ": "ʼ", "ь": "",
    "ы": "i", "э": "e", "ю": "yu", "я": "ya", "ў": "oʻ", "қ": "q", "ғ": "gʻ",
    "ҳ": "h",
}


def transliterate(text: str) -> str:
    result = []

    for char in text:
        mapped = _TRANSLIT.get(char.lower())

        if mapped is None:
            result.append(char)
            continue

        if char.isupper():
            mapped = mapped.capitalize()

        result.append(mapped)

    return "".join(result)


class Command(BaseCommand):
    help = "PDF katalogdagi mahsulotlarni bazaga qo'shadi (narx 0 qoldiriladi)."

    @transaction.atomic
    def handle(self, *args: object, **options: object) -> None:
        categories = self._create_categories()
        created, skipped = self._create_products(categories)

        self.stdout.write(f"Kategoriyalar tayyor: {len(categories)}")
        self.stdout.write(f"Mahsulot yaratildi: {created}, mavjud (o'tkazildi): {skipped}")

    def _create_categories(self) -> dict[str, Category]:
        result: dict[str, Category] = {}

        for code, name_en, name_uz_cyr, sort_order in CATEGORIES:
            category, _ = Category.objects.get_or_create(
                slug=slugify(name_en),
                defaults={
                    "name_en": name_en,
                    "name_uz": transliterate(name_uz_cyr),
                    "name_ru": name_uz_cyr,
                    "sort_order": sort_order,
                },
            )
            result[code] = category

        return result

    def _create_products(self, categories: dict[str, Category]) -> tuple[int, int]:
        created = 0
        skipped = 0

        for sku, cat_code, name_en, name_uz_cyr, size in PRODUCTS:
            _, is_new = Product.objects.get_or_create(
                sku=sku,
                defaults=self._build_defaults(sku, categories[cat_code], name_en, name_uz_cyr, size),
            )

            if is_new:
                created += 1
            else:
                skipped += 1

        return created, skipped

    def _build_defaults(
        self,
        sku: str,
        category: Category,
        name_en: str,
        name_uz_cyr: str,
        size: str,
    ) -> dict[str, object]:
        return {
            "category": category,
            "name_en": name_en,
            "name_uz": transliterate(name_uz_cyr),
            "name_ru": name_uz_cyr,
            "slug": slugify(f"{name_en}-{sku}"),
            "short_description_uz": size,
            "short_description_ru": size,
            "short_description_en": size,
            "unit": UnitType.PIECE,
            "price_uzs": 0,
        }
