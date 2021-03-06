# Приоритет селекторов
Селекторы в следующей таблице идут в порядке возрастания важности. Правила заданные более важному селектору, перезапишут правила менее важных селекторов.
Селектор | Что найдет?
---|---
div | `<div></div>`
div div | `<div> ... <div></div> ... </div>`
div > div | `<div><div></div></div>`
.class1 | `<element class="class1"></element>`
div.class1 | `<div class="class1"></div>`
.class1.class2 | `<element class="class1 class2"></element>`
#id1 | `<element id="#id"></element>`

Всех возможных комбинаций бесконечно много, поэтому нужно помнить два основных принципа:
1. #id > .class > tag
2. Чем сильнее селектор сужает поиск - тем он приоритетнее. 

# Box модель

Каждый элемент генерирует три вложенные в друг друга коробки (box):
1. content-box - коробка с содержимым элемента
2. padding-box - коробка внутренних отступов 
2. border-box - коробка границ 

Когда мы указываем ширину или высоту элемента, значения применяются к одной из этих коробок. 
Мы управляем выбором с помощью свойства `box-sizing`. По умолчанию значение - `content-box`, мы можем указать `border-box`.

Пример
| | content-box | border-boc
---|---|---
значение `width` | 200px | 200px
`padding` | 20px | 20px
`border` | 5px | 5px
реальная ширина контента | **200px** | 150px
реальная внешная ширина элемента | 250px | **200px**

# Display

Свойство `display` задает общую модель поведения элемента на старинце

Значение | Описание | Особенности
---|---|---
`none` | Элемент не отображается на странице
`block` | Блочные элементы идут на странице в вертикально сверху вниз. Каждый блок занимает отдельную строку и по умолчанию растягивается на всю ширину | Можно задавать высоту и ширину. Окружающие пробелы игнорируются
`inline` | Строчные элементы идут на стрницк горизонтально слева направо, при необходимости браузер переносит строчные элементы на следующую строку. Можно думать о строчных элементах как о словах. | Нельязя задавать высоту и ширину. Окружающие пробелы выводятся на страницу.
`flex` | Внешне ведет себя как блочный элемент, внутри - позволяет распологать дочерние элементы в строки или колонки и гибко управлять их размерами и выравниванием
`grid` | Внешне ведет себя как блочный элемент, внутри - позволяет распологать дочерние элементы по предзаданной сетке
`inline-*` | Элементы с `display` `inline-block`, `inline-flex` и `inline-grid` с точки зрения себя и содержимого, ведут себя как обычно, но для внешнего контекста являются строчными, т.е. являются "словами" в строке | Можно задавать размеры, но окружающие пробелы выводятся на страницу.

# Размеры

Свойства `width` и `height` задают ширину и высоту элемента
1. Значение по умолчанию `auto`. Для ширины - это все доступное пространство, для высоты - это высота содержимого.
1. Если значение абсолютная величина, например пиксели `px` - элемент получит указанный размер
2. Если значение задано в процентах, то оно будет вычислено относительно высоты и ширины родительского элемента соответственно. 
   2.1 Если у родителя задан или вычислим абсолютный размер (в пикселях), то размер дочернего элемента вычисляется относительного этого значения.
   2.2 Иначе размер дочернего элемента становится `auto`

Свойства `min-width`, `max-width` и `min-height`, `max-height` ограничивают максимальный и минимальный размер элемента. Каждое свойство может быть задано как в пикселях так и в процентах. При вычислении итового значения приоритет следующий `max-width`, `min-width`, `width`. Т.е. если у элемента `max-width: 400px; width: 800px`, то и элемент получит ширину `400px`.

# Padding, Border, Margin

`padding` задает внутренние отступы элемента. Значения в процентах высчитываются от ширины родительского элемента для любого направления, вертикального и горизонтального.

`border` задает ширину стиль и цвет границы. Процентные значения недопустимы.

`margin` задает размер внешних отступов. 
1. Процентные значения высчитываются от ширины родительского элемента для любого направления, вертикального и горизонтального. 
2. Особое значение `auto` заданное для отступов слева и\или справа распределяет свободно пространство на эти отступы. Так можно разместить блок поцентру или прижать вправо
3. Отрицательные значения отсчитываются от границ родителя вовне и позволяют элементу "вывалиться" за пределы родителя.
4. Иногда марджины схлопываются. [Подробнее](https://developer.mozilla.org/ru/docs/Web/CSS/CSS_Box_Model/Mastering_margin_collapsing)

# Position

`static` - значение по умолчанию. Элемент ведет себя как положено
`relative` - Элемент ведет себя положено, но если задать положение `top`, `left`, `bottom`, `right` сдвинется относительно своего нормаьного положения на указанные значения, при этом окружающие элементы сделают вид, что не заметили его сдвига.
`absolute` - Элемент вырывается из контекста - т.е. все его соседи делают вид, что его не существует. Сам элемент позиционируется относительно ближайшего не-`static` родителя с помощью значений  `top`, `left`, `bottom`, `right`. Если у элемента нет не-`static` родителя, то этим родителем становится окно.
`fixed` - То же, что и `absolute`, но элемент всегда позиционируется относительно окна, и останоется на этом месте при прокрутке содержимого окна

Важно! Для элементов `absolute` и `fixed` их не-`static` родитель становится точкой отсчета не только для координат, но и для процентных значений высоты, ширины и отступов.

С помощью свойства `z-index` можно контролировать наложение элементов: чем выше значение тем выше элемент будет лежать в "стопке"



