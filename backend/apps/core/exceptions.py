from typing import Any

from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc: Exception, context: dict[str, Any]) -> Response | None:
    response = exception_handler(exc, context)

    if response is None:
        return None

    response.data = _build_error_body(response)

    return response


def _build_error_body(response: Response) -> dict[str, Any]:
    detail: Any = response.data

    if isinstance(response.data, dict) and "detail" in response.data:
        detail = response.data["detail"]

    return {
        "detail": detail,
        "code": _resolve_code(response),
    }


def _resolve_code(response: Response) -> str:
    status_text = getattr(response, "status_text", "") or ""

    return status_text.lower().replace(" ", "_")
