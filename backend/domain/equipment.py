"""Проверка оборудования кухни перед построением плана готовки (требование F5)."""

from collections.abc import Mapping


class EquipmentChecker:
    """Сравнивает требования рецепта с профилем кухни."""

    @staticmethod
    def check(
        required: Mapping[str, int],
        available: Mapping[str, int],
    ) -> dict[str, int]:
        """Вернуть, какого оборудования и в каком количестве не хватает.

        ``required`` — сколько единиц каждого типа нужно, ``available`` — сколько есть
        на кухне. Тип, которого нет в ``available``, считается отсутствующим (0 единиц).
        В результат попадают только типы с нехваткой: значение — разница между нужным
        и доступным количеством. Если всего хватает, возвращается пустой словарь.
        Входные словари не изменяются.
        """
        missing: dict[str, int] = {}
        for kind, needed in required.items():
            shortage = needed - available.get(kind, 0)
            if shortage > 0:
                missing[kind] = shortage
        return missing
