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

Компонент `GameBoard` с отслеживанием состояния будет инициализирован массивом `fields` содержащим девять элементов, по 
одному элементу для каждого блока доски. И логический указатель который поможет нам определить, какой игрок должен 
сделать ход следующим.

**Остальные этапы создания приложения будут добавляться по мере развития проекта*.
