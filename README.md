# MealApp

MealApp – це веб-застосунок для пошуку, перегляду та збереження рецептів. Проєкт використовує TheMealDB API для отримання даних про рецепти, а також підтримує функціонал вибраних рецептів.

## Технології

- React
- TypeScript
- Redux Toolkit
- React Router
- Chakra UI
- Lodash (для debounce)

## Встановлення та запуск

### Клонуйте репозиторій

```sh
git clone https://github.com/romadzhavadov/meal-app.git
cd meal-app
```

### Встановіть залежності

```sh
npm install
```

### Запустіть локальний сервер

```sh
npm run dev
```

Застосунок буде доступний за адресою `http://localhost:5173/` (або іншим портом, якщо він змінений у Vite).

## Структура проєкту

```
meal-app/
src/
components/       # UI-компоненти
pages/            # Сторінки застосунку
redux/            # Стан застосунку (Redux)
api/              # Запити до API
App.tsx           # Головний компонент
main.tsx          # Точка входу
public/               # Статичні файли
package.json          # Список залежностей
vite.config.ts        # Конфігурація Vite
```

## Основні функції

- Пошук рецептів за назвою.
- Фільтрація рецептів за категоріями.
- Перегляд детальної інформації про рецепт.
- Додавання/видалення рецептів у вибрані.
- Перегляд списку вибраних рецептів разом із сумарним списком інгредієнтів.
- Пагінація для зручного перегляду результатів.

## Деплоймент

Застосунок може розгорнуто за допомогою GitHub Pages/

### Деплой на GitHub Pages

```sh
git checkout gh-pages
git merge main
git push origin gh-pages
```
