from dataclasses import dataclass

@dataclass
class KitchenProfile:
    burners: int
    has_oven: bool
    pots: int
    pans: int

    def __post_init__(self) -> None:
        if isinstance(self.burners, bool) or not isinstance(self.burners, int):
            raise ValueError("burners должен быть целым числом")
        if not (1 <= self.burners <= 6):
            raise ValueError(
                f"burners должен быть от 1 до 6, получено: {self.burners}"
            )

        if not isinstance(self.has_oven, bool):
            raise ValueError("has_oven должен быть True или False")

        if isinstance(self.pots, bool) or not isinstance(self.pots, int):
            raise ValueError("pots должен быть целым числом")
        if self.pots < 0:
            raise ValueError(
                f"pots не может быть отрицательным, получено: {self.pots}"
            )

        if isinstance(self.pans, bool) or not isinstance(self.pans, int):
            raise ValueError("pans должен быть целым числом")
        if self.pans < 0:
            raise ValueError(
                f"pans не может быть отрицательным, получено: {self.pans}"
            )

    def to_equipment_counts(self) -> dict[str, int]:
        return {
            "burner": self.burners,
            "oven": 1 if self.has_oven else 0,
            "pot": self.pots,
            "pan": self.pans,
        }
