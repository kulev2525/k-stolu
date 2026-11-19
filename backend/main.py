from pathlib import Path

import yaml
from fastapi import FastAPI
from pydantic import BaseModel, TypeAdapter


class RecipeSummary(BaseModel):
    id: str
    name: str


CATALOG_PATH = Path(__file__).resolve().parents[1] / "recipes" / "catalog.yaml"
RECIPES = TypeAdapter(tuple[RecipeSummary, ...]).validate_python(
    yaml.safe_load(CATALOG_PATH.read_text(encoding="utf-8"))
)

app = FastAPI(title="К столу")


@app.get("/api/recipes")
def list_recipes(q: str = "") -> list[RecipeSummary]:
    query = q.casefold()
    return [recipe for recipe in RECIPES if query in recipe.name.casefold()]
