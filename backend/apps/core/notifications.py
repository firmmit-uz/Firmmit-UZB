import logging

logger = logging.getLogger(__name__)


def notify_telegram(message: str) -> None:
    """Telegram xabari.

    Hozircha logga yozadi. Kelajakda .env dagi TELEGRAM_BOT_TOKEN va
    SiteSetting.telegram_chat_id orqali haqiqiy yuborish qo'shiladi
    (mavjud kodni o'zgartirmasdan).
    """
    logger.info("TELEGRAM: %s", message)
