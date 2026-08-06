from django.core.management.base import BaseCommand
from django.utils.text import slugify

from apps.catalog.models import Category, Product

CATEGORY_RU = {
    "Structural Pipes & Profiles": "Трубы и профили",
    "Metal Clips, Clamps & Fasteners": "Металлические зажимы, хомуты и крепёж",
    "Compression Fittings — Queen Line": "Компрессионные фитинги — Queen",
    "Valves & Filtration": "Краны и фильтрация",
    "Plastic Clips & Saddle Fittings": "Пластиковые зажимы и сёдла",
    "Greenhouse Hardware": "Тепличная фурнитура",
    "Climate Equipment": "Климатическое оборудование",
    "Irrigation Tape & Materials": "Поливная лента и материалы",
    "Bulk Materials": "Крупногабаритные материалы",
}

PRODUCT_RU = {
    "FMT-01": "Металлическая труба / соединитель",
    "FMT-02": "Металлическая труба / соединитель",
    "FMT-03": "Металлическая труба / соединитель",
    "FMT-04": "Кронштейн с подшипником",
    "FMT-05": "Металлический диск / фланец",
    "FMT-15": "Восьмигранная фланцевая крышка",
    "FMT-06": "Зажим для трубы",
    "FMT-07": "Зажим для трубы, изогнутый",
    "FMT-08": "Z-образный металлический крепёж",
    "FMT-09": "Зажим для трубы",
    "FMT-10": "Металлический хомут, изогнутый",
    "FMT-11": "Металлический седельный зажим",
    "FMT-12": "Металлический седельный зажим",
    "FMT-13": "Металлический седельный зажим",
    "FMT-16": "Зажим для трубы",
    "FMT-14": "Металлический зажим, двузубый",
    "FMT-61": "Металлический зажим, красный / белый",
    "FMT-72": "Металлический зажим / кронштейн, тёмный",
    "FMT-51": "Седельный хомут с болтами",
    "FMT-52": "Седельный хомут с болтами",
    "FMT-53": "Комплект хомутов с болтами и гайками",
    "FMT-62": "Зажим-талреп с рым-болтом",
    "FMT-63": "Крюк-зажим с рым-болтом",
    "FMT-64": "U-образный болт (крепёж)",
    "FMT-65": "Фланцевая гайка, набор",
    "FMT-73": "Роликовый крюк",
    "FMT-31": "Муфта Queen",
    "FMT-33": "Муфта Queen",
    "FMT-29": "Муфта Queen",
    "FMT-32": "Муфта Queen",
    "FMT-39": "Муфта Queen",
    "FMT-27": "Муфта Queen",
    "FMT-44": "Угол Queen, наружная резьба",
    "FMT-46": "Угол Queen, наружная резьба",
    "FMT-19": "Угол Queen",
    "FMT-38": "Угол Queen",
    "FMT-35": "Угол Queen",
    "FMT-30": "Угол Queen, резьбовой",
    "FMT-42": "Тройник Queen",
    "FMT-43": "Тройник Queen",
    "FMT-36": "Тройник Queen",
    "FMT-26": "Тройник Queen",
    "FMT-45": "Тройник Queen",
    "FMT-37": "Тройник Queen",
    "FMT-25": "Переходник Queen",
    "FMT-28": "Угол-переходник Queen",
    "FMT-41": "Адаптер Queen",
    "FMT-40": "Адаптер Queen, наружная резьба",
    "FMT-17": "Тройник-фитинг, чёрный",
    "FMT-18": "Шаровой кран",
    "FMT-20": "Шаровой кран",
    "FMT-21": "Шаровой кран",
    "FMT-23": "Шаровой кран",
    "FMT-22": "Шаровой кран",
    "FMT-50": "Шаровой кран",
    "FMT-68": "Шаровой кран PVC Union, A-SUNG",
    "FMT-24": "Фильтр / кран, AMIAD",
    "FMT-49": "Пластиковый зажим",
    "FMT-58": "Пластиковый зажим",
    "FMT-48": "Пластиковый зажим",
    "FMT-47": "Пластиковый диск / фланец, лепестковый",
    "FMT-59": "Пластиковый седельный хомут со штуцером",
    "FMT-60": "Пластиковый Y-образный хомут",
    "FMT-54": "Пластиковый ролик / шкив с кронштейном",
    "FMT-55": "Литой блок шкива",
    "FMT-56": "Держатель крюка с болтом, прямой",
    "FMT-57": "Держатель крюка, изогнутый стержень",
    "FMT-66": "Электрический тепловентилятор",
    "FMT-67": "Фанкойл, Elh WS — обогрев / охлаждение",
    "FMT-69": "Капельная лента, Elephant-Drip — рулон",
    "FMT-70": "Лента, бирюзовая — рулон",
    "FMT-71": "Тканая крепёжная лента",
    "FMT-74": "Тепличная плёнка — коробка",
    "FMT-75": "Набор различных лент",
}


class Command(BaseCommand):
    help = "Mahsulot va kategoriya nomlarini to'g'ri rus tiliga yangilaydi (faqat name_ru)."

    def handle(self, *args: object, **options: object) -> None:
        categories = self._update_categories()
        products = self._update_products()

        self.stdout.write(f"Kategoriya yangilandi: {categories}")
        self.stdout.write(f"Mahsulot yangilandi: {products}")

    def _update_categories(self) -> int:
        updated = 0

        for name_en, name_ru in CATEGORY_RU.items():
            updated += Category.objects.filter(slug=slugify(name_en)).update(name_ru=name_ru)

        return updated

    def _update_products(self) -> int:
        updated = 0

        for sku, name_ru in PRODUCT_RU.items():
            updated += Product.objects.filter(sku=sku).update(name_ru=name_ru)

        return updated
