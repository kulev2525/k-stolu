# К столу

[![Static checks](https://github.com/kulev2525/k-stolu/actions/workflows/quality.yml/badge.svg)](https://github.com/kulev2525/k-stolu/actions/workflows/quality.yml)

Веб-помощник для одновременного приготовления 2–3 блюд. Общий план должен учитывать занятость человека, конфорок, духовки и посуды и помогать подать блюда примерно одновременно.

## Состояние проекта

Пока в каталоге три блюда — гречка с маслом, жареные кабачки и запечённый картофель. Их можно искать по названию. Требования и архитектура описаны в `docs/`. MVP планируем на 14 декабря 2026 года.

## Технологии

Каталог работает на Python 3.12 и FastAPI. Рецепты лежат в файле YAML, тесты запускаются через pytest.

В архитектуре от 29 октября 2026 года для интерфейса запланированы React, TypeScript и Vite, а для базы — SQLite и SQLAlchemy. Дальше подключим Hypothesis, Vitest и Playwright.

## Структура

```text
backend/           Код API и тесты
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

## Как запустить каталог

Понадобится Python 3.12. Выполни команды из корня проекта.

```sh
python -m pip install -r backend/requirements.txt
python -m uvicorn backend.main:app
```

При запуске FastAPI читает `recipes/catalog.yaml`. Открой [страницу API](http://127.0.0.1:8000/docs) и выбери `GET /api/recipes`. Без `q` вернутся все три блюда. Если ввести в `q` слово `кабач`, в ответе будут только жареные кабачки.

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
