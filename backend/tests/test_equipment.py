from backend.domain.equipment import EquipmentChecker


def test_no_shortage_when_equipment_is_sufficient():
    required = {"burner": 1, "pot": 1}
    available = {"burner": 2, "pot": 1}

    assert EquipmentChecker.check(required, available) == {}


def test_reports_equipment_missing_from_kitchen():
    required = {"oven": 1, "pan": 1}
    available = {"pan": 2}

    assert EquipmentChecker.check(required, available) == {"oven": 1}


def test_reports_only_the_missing_quantity():
    required = {"pot": 3}
    available = {"pot": 1}

    assert EquipmentChecker.check(required, available) == {"pot": 2}
