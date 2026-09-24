from apps.payments.models import PaymentProviderType
from apps.payments.providers.atmos import AtmosProvider
from apps.payments.providers.bank_transfer import BankTransferProvider
from apps.payments.providers.base import PaymentProvider
from apps.payments.providers.cash import CashProvider
from apps.payments.providers.click import ClickProvider
from apps.payments.providers.payme import PaymeProvider

_PROVIDERS: dict[str, type[PaymentProvider]] = {
    PaymentProviderType.BANK_TRANSFER: BankTransferProvider,
    PaymentProviderType.CASH: CashProvider,
    PaymentProviderType.CLICK: ClickProvider,
    PaymentProviderType.PAYME: PaymeProvider,
    PaymentProviderType.ATMOS: AtmosProvider,
}


def get_provider(code: str) -> PaymentProvider:
    return _PROVIDERS[code]()
