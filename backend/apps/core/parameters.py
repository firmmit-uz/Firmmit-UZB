from typing import Any

from django.conf import settings


class ParameterGetter:
    """Sozlamalar va parametrlarga tiplangan yagona kirish nuqtasi.

    Kodda `os.environ` to'g'ridan-to'g'ri o'qilmaydi — hamma narsa shu klass
    orqali olinadi. Keyingi bosqichlarda `site_setting` jadvalidan o'qish ham
    shu yerga qo'shiladi.
    """

    def get(self, name: str, default: Any = None) -> Any:
        return getattr(settings, name, default)

    def get_str(self, name: str, default: str = "") -> str:
        return str(self.get(name, default))

    def get_bool(self, name: str, default: bool = False) -> bool:
        return bool(self.get(name, default))


parameters = ParameterGetter()
