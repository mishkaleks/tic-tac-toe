# Tic Tac Toe

Tic Tac Toe — игра в крестики-нолики. Tic Tac Toe реализована с помощью JavaScript и React. Болле того, используется 
localStorage для хранения истории игры.

## Основные этапы создания приложения

- Инициализировать React приложение.

`$ npx create-react-app tic-tac-toe`

- Создать базовую структуру проекта.

- Инициализировать Material Design и React Favicon (для управления favicon'ом из приложения).

`$ npm install react-favicon`

- Инициализировать игроков.

- Добавить игровую доску и отрисовать ходы игроков.

- Добавить обработчик кликов по ячейкам игрового поля. С каждым щелчком он будет проверять, содержит ли доска выигрышную
комбинацию.

- Добавить проверку на завершение игры если все ячейки заполнены.

Компонент `GameBoard` с отслеживанием состояния будет инициализирован массивом `fields` содержащим девять элементов, по 
одному элементу для каждого блока доски. И логический указатель `isNextMove` который поможет нам определить, какой 
игрок должен сделать ход следующим.

- Добавить информационные панели на игровой экран.

- Создать и подключить localStorage.

Созданый экземпляр объекта нужен для хранения и обновления данных в localStorage. При инициализации он будет проверять
есть какие-либо данные из предыдущих игр. Если нет, он создаст новый элемент в локальном хранилище:

```javascript
// store.js

// create new item for our Tic Tac Toe game
localStorage.setItem(storageName, initialValue)
```

Создать экземпляр обькта:

```javascript
// myComponent.js

// create instance of storage object
const storage = new Storage()
```

Загрузить данные из предыдущих игр из localStorage:

```javascript
// myComponent.js

const data = storage.getData()
```

```javascript
// store.js

getData() {
  return JSON.parse(localStorage.getItem(this.storageName))
}
```

**`JSON.parse()` берет строку JSON и трансформирует ее в объект JavaScript*.

Обновить данные в localStorage:

```javascript
// myComponent.js

const newData = { ...data, secondName: value }
storage.update(newData)
```

```javascript
// store.js

update(data) {
  localStorage.setItem(this.storageName, JSON.stringify(data))
}
```

**`JSON.stringify()` берет объект JavaScript и трансформирует его в строку JSON*.

- Инициализировать React Router DOM.

`$ npm i react-router-dom`

Интерфейс приложения будет синхронизирован с URL на браузере. Будет два маршрута `/` и `/leaderboard`.

```javascript
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function App() {
  return (
    <Router>
      <Link to="/">Home</Link>
      <Link to="/leaderboard">Leaderboard</Link>

      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}
```

- Добавить страницу Leaderboard.

На странице показать лучшие результаты игроков, которые буду подгружаться из предыдущих игр из localStorage. Создать 
систему для подсчета балов. 

- Инициализировать lodash.

`$ npm i lodash`

- Добавить возможность повторного входа в игру.

- Улучшить дизайн.

- Развернуть приложение на Github Pages.

Добавить пакет зависимостей GitHub Pages. Для этого установите пакет `gh-pages`, используя команду:

`$ npm install gh-pages — save-dev`

Добавить свойство домашней страницы в файл package.json:

`"homepage": "https://korovai.github.io/tic-tac-toe"`

Добавить сценарии развертывания в файл package.json:

```markdown
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

**Команда `predeploy` используется для связывания реагирующего приложения, а команда `deploy` помогает развернуть 
связанный файл*.

Разворачиваем приложение на страницах GitHub. Запустите команду `npm run deploy`, чтобы развернуть ваше реагирующее 
приложение на GitHub Pages.

Чтобы получить опубликованный URL. Перейдите в свой репозиторий GitHub. Нажмите меню "Настройки". Перейдите в раздел 
"Страницы". Вы можете увидеть сообщение "Ваш сайт опубликован". Выберите ветку на "gh-pages" и нажмите на кнопку 
"Сохранить". Теперь вы можете получить доступ к развернутому сайту, используя опубликованный URL-адрес! Фиксируем и 
отправляем изменения кода в репозиторий GitHub. Это необязательно. Но для поддержания базы кода мы можем сделать этот 
шаг.

```markdown
$ git add .
$ git commit -m "commit message"
$ git push origin master
```
