from backend.main import app
from fastapi.testclient import TestClient

client = TestClient(app)


def test_lists_all_three_recipes():
    response = client.get("/api/recipes")

    assert response.status_code == 200
    assert response.json() == [
        {"id": "buckwheat", "name": "Гречка с маслом"},
        {"id": "fried-zucchini", "name": "Жареные кабачки"},
        {"id": "roasted-potatoes", "name": "Запечённый картофель"},
    ]


def test_matches_part_of_name_regardless_of_case():
    response = client.get("/api/recipes", params={"q": "КаБаЧ"})

    assert response.status_code == 200
    assert response.json() == [{"id": "fried-zucchini", "name": "Жареные кабачки"}]


def test_returns_empty_list_when_no_names_match():
    response = client.get("/api/recipes", params={"q": "борщ"})

    assert response.status_code == 200
    assert response.json() == []
