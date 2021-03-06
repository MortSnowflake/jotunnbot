/*
--фазы--

Вся игра состоит в основном из следующих фаз.

**1. Используем сцену**. Для начала повествования найди канал из категории **СЦЕНЫ** или создай свою сцену отправив `.сцена сюда вставь название сцены` Сцена обычно описывает одну локацию и после ее завершения все повествование попадает в канал Хроника без игровых деталей (результатов бросков кубиков и т.д.). Подробные инструкции по сцене и описанию локации можно найти в сообщении закрепленном к любой сцене. Повторяем пункты 2-4 пока не завершим все наши дела в локации. Завершаем сцену командой `.конец`  Продвигаем прогресс клятв. Подробнее #1-используем-сцену 

**2. Описываем действия персонажа** или как-то иначе раскрываем персонажа. Для комментариев другим игрокам используй сообщение написанное *курсивом*. Такие сообщения не попадают в хронику. Для описания диалогов используй "имя персонажа: " или "я: " в начале сообщения. Подробнее #2-описываем-действия-персонажа 

**3. Делаем ход**. На основе описания действий персонажа выбираем подходящий ход из **ХОДЫ** слева в меню и отправляем команду из подходящего хода. Что бы быстро посмотреть команды всех ходов отправь `.ходы` Подробнее #3-делаем-ход 

**4. Мир реагирует**. На основе результата броска опиши реакцию мира, мастер сцены или другие игроки могут помочь тебе. Спроси **Оракула** (отправь `.оракул`) когда у тебя есть вопросы в соло или ко-оп игре, или для вдохновения Мастера в направляемой игре. Подробнее #4-мир-реагирует 

Фазы подробнее описаны в других каналах, но начинать играть можно и без этих деталей. Пример игры есть в канале #пример-игры

<Svodka_pravil.pdf>

----

**КОМАНДЫ БОТА**
Что бы вывести список всех команд отправьте ` .помощь ` или  ` .? `
Для того что бы получить подробную информацию о команде отправьте 
` <команда> помощь `
 или 
` <команда> ? `  

Пример: `.нрав ?`
Варианты вызова: ` .помощь `  ` .?  `  ` .help `



:stub:


---------
--1-используем-сцену--

**1. Используем сцену**. Для начала повествования найди канал из категории **СЦЕНЫ** или создай свою сцену отправив `.сцена сюда вставь название сцены` Сцена обычно описывает одну локацию и после ее завершения все повествование попадает в канал Хроника без игровых деталей (результатов бросков кубиков и т.д.). Подробные инструкции по сцене и описанию локации можно найти в сообщении закрепленном к любой сцене. Повторяем пункты 2-4 пока не завершим все наши дела в локации. Завершаем сцену командой `.конец`  Продвигаем прогресс клятв. Подробнее #1-используем-сцену 


:stub:

-----

**СЦЕНЫ**
Сцена это канал для игры, обычно ограничивается одной локацией или несколькими небольшими локациями рядом. После завершения сцены информация из нее перемещается в #хроника   таким образом можно играть несколько сцен параллельно, сцены будут записаны по очереди что бы не было мешанины. После завершения сцены стоит продвинуть прогрессы клятв замешанных в сцене.

В начале сцены появляется счетчик жетонов рока. Трать жетоны рока (в закрепе) на проблемы союзникам или всей партии, но не твоему персонажу лично. Трата жетона рока увеличивает очки лояльности.  К концу сцены нужно потратить все жетоны рока (3 штуки) иначе они сработают разом в конце сцены.

**Советы, что бы не надоело играть:**
- Лучше писать одно большое сообщение чем много маленьких
- Лучше писать по одному сообщению каждый день чем 7 предложений в воскресенье
- После каждого сообщения в идеале должен последовать ход или вопрос к оракулам. После этого необходимо интерпретировать сообщение от бота и описать его литературно. Потому что все сообщения от бота удалятся в хронике.
- На :hit::hit: игрок сам все описывает, на :hit::miss: или :miss::miss: остальные игроки накидывают ему веселья.
- Когда игрок мастерит, его персонаж находится в пассивном режиме, т.е. не принимает активного участия, дерется на фоне, может помогать другим персонажам.

**Команды**
```Начало сцены. Параметр <имя>
Пример ".сцена Охота на медведя"
Варианты вызова: .сцена   .scene```
```Завершение сцены. Параметр <имя>. Можно переназвать сцену в конце если так лучше для хроники
Пример ".сцена Охота на Бьёрна"
Варианты вызова: .конец   .стоп   .снято   .end ```


:stub:

-----


**КЛЯТВЫ**
Клятвы делятся на типы (1 - Трудная, 2 - Опасная, 3 - Грозная, 4 - Смертельная, 5 - Эпичная) в зависимости насколько быстро можно их исполнить и сколько опыта получит персонаж за исполнение клятвы. В конце сцены если ты достиг прогресса в клятве продвинь прогресс нажав на символ :ptadd:  на счетчике клятвы. Что бы исполнить клятву нажми :rolloracle:, подробнее в #ходы-судьбы 


**Команды**
```Добавить клятву. Параметры: уровень (1 - Трудно, 2 - Опасно, 3 - Грозно, 4 - Смертельно, 5 - Эпично), описание.
Пример: .клятва 4 Спасти принцессу

Варианты вызова: .клятва   .кл   .vow 

```

```Добавить <грозную> клятву 
Пример: .грозная Спасти принцессу

Варианты вызова: .грозная   .гк   .formidible 
Следующие команды вызываются по аналогии: .трудная, .опасная, .смертельная, .эпичная
```


:stub:


-------------

**ДАНЖ**
Когда заходишь на опасную и неизвестную территорию *Войди в данж* (отправь `.данж`) .  В данже автоматически и в ручную используются ходы из #ходы-данжа 

**Команды**
```Войти в данж 
Шаблон: ".данж <ранг> <тема> <домен>"
Пример: ".данж 2 крепость с древностями"
Варианты вызова: .да   .дн   .днж   .данж   .delve ```


:stub:


-----------

--2-описываем-действия-персонажа--
**2. Описываем действия персонажа** или как-то иначе раскрываем персонажа. Для комментариев другим игрокам используй сообщение написанное *курсивом*. Такие сообщения не попадают в хронику. Для описания диалогов используй "имя персонажа: " или "я: " в начале сообщения.

---------------
--3-делаем-ход--

**3. Делаем ход**. На основе описания действий персонажа выбираем подходящий ход из **ХОДЫ** слева в меню и отправляем команду из подходящего хода. Что бы быстро посмотреть команды всех ходов отправь `.ходы`

**ХОДЫ**
Когда ты что-то делаешь или сталкиваешься с ситуацией в рамках хода, обратитесь к ходу и следуй его инструкциям, чтобы узнать, что произойдет. Когда название хода указано в правилах или описании другого хода, оно будет написано курсивом.

**КОЗЫРИ**
*СЖЕЧЬ КОЗЫРИ*
Ты можешь отменить любую кость вызова, которая меньше, чем значение твоих козырей. После того сбрось козыри.

*СБРОСИТЬ КОЗЫРИ*
• По умолчаню сбрось козыри до +2.
• При одной отмеченной слабости = сбрось козыри до +1.
• Если отмечено больше одной слабости = сбрось козыри до 0.

*ПОСЛЕДСТВИЯ ОТРИЦАТЕЛЬНЫХ КОЗЫРЕЙ*
Когда твои козыри меньше 0 и совпадают с результатом кости
действия, ты отменяешь кость действия и не используешь её.
Когда ты должен отметить -козырь, а козыри уже -6, вместо этого сделай ход Встреть проблемы.


:stub:

------------

**НАНЕСЕНИЕ УРОНА**
• Если ты вооружен смертельным оружием (меч, топор, копье или
лук), ты наносишь 2 урона.
• Если ты безоружен, вооружен простым или импровизированным
оружием (щит, палка, камень, посох, дубинка), ты наносишь 1 урон

:stub:

-------------

**БРОСОК ДЕЙСТВИЯ**
Когда делаются ХОДЫ или совершаются проверки ХАРАКТЕРИСТИК, бот делает бросок действия. Результат выглядит примерно так:
> **4** (**2**+2) vs. **1** & **3**
> @Торган :hit::hit: Успех!

Где **4** это рейтинг действия: результат броска кости действия (d6 = **2**) + модификаторы из буклетов(+2), а 1 и 3 результаты бросков костей вызова (2d10). 

Результат высчитывается так:
• Успех! = рейтинг действия выше каждой кости вызова
• Частичный успех = рейтинг действия выше одной кости вызова
• Провал = рейтинг действия не больше любой кости вызова

Когда у тебя выпадает **дубль** на костях вызова (пример **3** & **3**):
• Полный успех: неожиданный поворот истории, что-то интересное или новая возможность.
• Провал: последствия еще хуже, осложнение или новая опасность. Если не уверен, что должно произойти Спроси Оракула.

:stub:

---------------------


**СВОЙ ХОД**
Если не знаешь какой ход сделать, придумай свой и брось более подходящую ХАРАКТЕРИСТИКУ (например `.ум`).
**Холод**: быстрота, ловкость, мастерство в обращении с дальнобойным оружием.
**Нрав**: смелость, сила воли, эмпатия, верность, способность к общению.
**Сталь**: физическая сила и выносливость, агрессивность, мастерство в ближнем бою.
**Тень**: скрытность, хитрость, обман.
**Ум**: опыт, знания, экспертность, наблюдательность.

---------------------

**СПУТНИКИ**
При результате 1 на кости действии, если ты использовал способность
спутника, любые негативные последствия хода касаются и его.
Когда спутник получает физический урон, сделай ход Спутник
получает урон.


---------------------
--4-мир-реагирует--
**4. Мир реагирует**. На основе результата броска опиши реакцию мира, мастер сцены или другие игроки могут помочь тебе. Спроси **Оракула** (отправь `.оракул`) когда у тебя есть вопросы в соло или ко-оп игре, или для вдохновения Мастера в направляемой игре.


**ОРАКУЛЫ**
Спроси Оракула когда у тебя есть вопросы в соло или ко-оп игре,
или для вдохновения Мастера в направляемой игре. Когда ты не знаешь как должна развиваться история спроси у оракулов. Оракулы доступны в разделе "ОРАКУЛЫ" и через команды бота.

**Команды**
```Оракулы. Параметр <имя таблицы>. Если отправить без параметра, то выведет список всех таблиц.
Пример ".о локация"
Варианты вызова: .о   .оракул   .o   .oracle ```

```Добавить свой оракул Первый параметр <канал оракула>. Остальные параметры: пункты оракула. Пункты разделяются через пробел или ";"
Пример .но существа классы файтер клирик маг вор
Варианты вызова: .новыйоракул   .но   .добавитьоракул   .до   .newo ```

```Бросок из списка параметров Помогает выбрать рандомный пункт из таблицы без добавления нового параметра. Пункты разделяются через пробел или ";"
Пример .тбл файтер клирик маг вор
Варианты вызова: .таблица   .тбл   .табл   .t   .tbl ```

```Бросок из списка по убыванию вероятности Скорее выпадет первый элемент таблицы чем последний. Пункты разделяются через пробел или ";"
Пример .тбл файтер клирик маг вор
Варианты вызова: .таблица-по-убыванию   .тблуб   .таблуб   .tlog   .tbllog 
```

------------

**СЧЕТЧИКИ ПРОГРЕССА**
Похожи на клятвы только не дают опыт за их выполнение. Нужны чаще всего что бы учесть здоровье врага, прогресс путешествия или какой-то длительный процесс. 

**Ходы прогресса:** При нажатии на иконку d10 на счетчике бот бросит кости вызова (2d10) и сравнит со значением прогресса.
Ты не можешь использовать потенциал когда делаешь ход прогресса.

**Команды**
```Добавить счетчик Параметры: уровень (1 - Трудно, 2 - Опасно, 3 - Грозно, 4 - Смертельно, 5 - Эпично), описание.
Пример: .счетчик 2 Злая стая волков

Варианты вызова: .счетчик   .сч   .tracker ```
```Добавить <грозный> счетчик 
Пример: .грозный Злая стая волков

Варианты вызова: .грозный   .гс   .formidibletr 
Следующие команды вызываются по аналогии: .трудный, .опасный, .смертельный, .эпичный
```



:stub:


-------------------

**БРОСКОВЫЙ ЧАТ**
В бросковом чате можно выбирать рандомное сообщение из чата, удобно таким образом выбирать произвольно из вариантов нескольких игрков. Можно использовать ||спойлеры|| для эффекта неожиданности


**Команды**
```Создать бросковый чат 
Пример .брчат тактика врага
Варианты вызова: .брчат   .бч   .бросковый-чат ```

```Очистить бросковый чат 
Пример .очистить
Варианты вызова: .очистить   .очисть ```

```Выбрать пункт произвольное сообщение из чата
Пример: .брось
Варианты вызова: .брось   .бр``` 


```Выбрать обитателя (для чата Обитатели данжа)
Пример: .обитатель
Варианты вызова: .об   .обитатель   .denizen```




---легенды---
Здесь мастера могут выкладывать заявки на квесты в виде досок объявления в поселениях или в виде легенд передающихся из уст в уста (говорят та гора это бывшая кузня бога Тульдра, а его легендарный молот до сих пор где-то там).





 */
