import pytest

from backend.domain.equipment_checker import EquipmentChecker
from backend.domain.kitchen import KitchenProfile

def test_valid_profile_to_equipment_counts():
    profile = KitchenProfile(burners=2, has_oven=True, pots=1, pans=0)
    assert profile.to_equipment_counts() == {
        "burner": 2,
        "oven": 1,
        "pot": 1,
        "pan": 0,
    }

def test_profile_without_oven():
    profile = KitchenProfile(burners=4, has_oven=False, pots=2, pans=3)
    assert profile.to_equipment_counts() == {
        "burner": 4,
        "oven": 0,
        "pot": 2,
        "pan": 3,
    }

@pytest.mark.parametrize("burners", [0, 7, -1])
def test_burners_out_of_range(burners):
    with pytest.raises(ValueError, match="burners"):
        KitchenProfile(burners=burners, has_oven=True, pots=1, pans=1)

def test_negative_pots():
    with pytest.raises(ValueError, match="pots"):
        KitchenProfile(burners=2, has_oven=True, pots=-1, pans=0)

def test_negative_pans():
    with pytest.raises(ValueError, match="pans"):
        KitchenProfile(burners=2, has_oven=True, pots=0, pans=-1)

def test_counts_work_with_equipment_checker():
    profile = KitchenProfile(burners=2, has_oven=True, pots=1, pans=0)
    available = profile.to_equipment_counts()
    checker = EquipmentChecker()

    # Пример запроса — подставь реальную сигнатуру check() из своего кода.
    result = checker.check(
        available=available,
        required={"burner": 2, "pot": 1},
    )
    assert result is True
