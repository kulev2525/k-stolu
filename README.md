# К столу

[![Static checks](https://github.com/kulev2525/k-stolu/actions/workflows/quality.yml/badge.svg)](https://github.com/kulev2525/k-stolu/actions/workflows/quality.yml)

Веб-помощник для одновременного приготовления 2–3 блюд. Общий план должен учитывать занятость человека, конфорок, духовки и посуды и помогать подать блюда примерно одновременно.

## Состояние проекта

Подготовлены требования и архитектура. В сервере доступен пробный каталог из трёх рецептов с поиском по названию. Целевой срок MVP — 14 декабря 2026 года.

## Технологии

По архитектуре от 29 октября 2026 года:

- интерфейс: React, TypeScript, Vite;
- сервер: Python 3.12, FastAPI, SQLAlchemy;
- хранение: SQLite; рецепты в YAML;
- проверки: Ruff, ESLint, Prettier; далее pytest, Hypothesis, Vitest и Playwright.

## Структура

```text
backend/           Сервер и независимое ядро планировщика
frontend/          Будущий интерфейс
recipes/           Пробный каталог рецептов
docs/              Требования, архитектура и проверки качества
.github/           Автоматические проверки и шаблоны задач
```

## Команда

| Участник       | Роль                |
| -------------- | ------------------- |
| Кулев Андрей   | Главный тестировщик |
| Крюков Арсений | Продакт-менеджер    |
| Смирнов Максим | Архитектор ПО       |

## Документация

[Требования](docs/requirements.md) · [Архитектура](docs/architecture.md) · [Проверки качества](docs/quality.md)

## Запуск каталога

Выполните команды из корня репозитория с Python 3.12.

```sh
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app
```

Сервер читает `recipes/catalog.yaml` при запуске. Откройте [документацию API](http://127.0.0.1:8000/docs), чтобы проверить `GET /api/recipes` с параметром `q` или без него.

## Проверки репозитория

GitHub Actions проверяет оформление файлов через Prettier, ошибки пробелов Git и Python-файлы через Ruff. ESLint и проверка типов TypeScript подключаются вместе с интерфейсом.

```sh
python -m pip install -r backend/requirements-dev.txt
python -m ruff check backend
python -m ruff format --check backend
python -m pytest backend/tests
npx --yes prettier@3.6.2 --check .
```

Исходные интервью, личные данные, ключи и локальные базы в этот репозиторий не включаются.
