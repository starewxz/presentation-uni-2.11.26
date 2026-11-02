import { A, Photo, Tag, Meander } from './ui.jsx'

export const AUTHOR = 'Десятник Тетяна'

/* ───────────── 1. Титул ───────────── */
function Title() {
  return (
    <div className="slide s-title">
      <div className="s-title__text">
        <A i={0}><Tag>За матеріалами Археологічного музею ЛНУ</Tag></A>
        <A i={1}>
          <h1 className="display display--xl">
            Антична <br />
            <em>цивілізація</em>
          </h1>
        </A>
        <A i={2}><p className="lead lead--lg">Грецькі міста-поліси Північного Причорномор’я</p></A>
        <A i={3} className="s-title__meander"><Meander height={26} /></A>
        <A i={4} className="s-title__meta">
          <div><small>Виконала</small><b>{AUTHOR}</b></div>
          <div><small>Формат</small><b>Семінар · вітрина №11</b></div>
        </A>
      </div>
      <div className="s-title__visual">
        <Photo name="showcase" alt="Вітрина №11 «Антична цивілізація»" position="50% 40%" i={1} className="s-title__photo" />
        <A i={5} className="s-title__badge">
          <span>вітрина</span>
          <b>11</b>
        </A>
      </div>
    </div>
  )
}

/* ───────────── 2. Музей ───────────── */
function Museum() {
  return (
    <div className="slide s-museum">
      <div className="s-museum__text">
        <A i={0}><Tag>Джерело матеріалів</Tag></A>
        <A i={1}><h2 className="display">Археологічний музей&nbsp;ЛНУ</h2></A>
        <A i={2}>
          <p className="body">
            Усі експонати в цій презентації — з вітрини №11 музею ЛНУ. Це справжні речі, які
            греки виготовляли й використовували на наших землях.
          </p>
        </A>
        <div className="stats">
          <A i={3} className="stat"><b>109</b><span>експонатів</span></A>
          <A i={4} className="stat"><b>1000</b><span>років історії</span></A>
          <A i={5} className="stat"><b>2</b><span>міста: Тіра і Пантикапей</span></A>
        </div>
      </div>
      <div className="s-museum__photos">
        <Photo name="label" alt="Етикетаж вітрини" caption="Перелік експонатів" position="50% 30%" i={2} className="s-museum__label" />
        <Photo name="bowls" alt="Посуд на подіумах" caption="Посуд із Тіри та Пантикапея" i={4} className="s-museum__bowls" />
      </div>
    </div>
  )
}

/* ───────────── 3. Колонізація ───────────── */
const timeline = [
  { when: 'VII ст. до н.е.', what: 'Борисфен на о. Березань — перше поселення' },
  { when: 'VI ст. до н.е.', what: 'Ольвія, Тіра, Пантикапей, Феодосія' },
  { when: 'V ст. до н.е.', what: 'Виникає Боспорське царство' },
  { when: '422/421 до н.е.', what: 'Засновано Херсонес' },
  { when: 'I–III ст. н.е.', what: 'Римський час' },
]

function Colonization() {
  return (
    <div className="slide s-colon">
      <div className="s-colon__left">
        <A i={0}><Tag>Велика грецька колонізація</Tag></A>
        <A i={1}><h2 className="display">Чому греки прийшли до&nbsp;Чорного&nbsp;моря?</h2></A>
        <A i={2}>
          <p className="body">
            Море спершу звали <em>Понт Аксінський</em> — «негостинне». Коли тут виросли міста,
            воно стало <em>Евксінським</em> — «гостинним».
          </p>
        </A>
        <div className="reasons">
          <A i={3} className="reason"><span>01</span><b>Земля</b><p>вдома її бракувало</p></A>
          <A i={4} className="reason"><span>02</span><b>Торгівля</b><p>зерно, риба, сіль</p></A>
          <A i={5} className="reason"><span>03</span><b>Свобода</b><p>втеча від чвар</p></A>
        </div>
      </div>
      <div className="s-colon__right">
        <ol className="timeline">
          {timeline.map((t, k) => (
            <A as="li" i={2 + k} key={t.when}>
              <span className="timeline__dot" />
              <b>{t.when}</b>
              <p>{t.what}</p>
            </A>
          ))}
        </ol>
      </div>
    </div>
  )
}

/* ───────────── 4. Поліси ───────────── */
const cities = [
  { name: 'Тіра', now: 'Білгород-Дністровський', note: 'звідси більшість речей вітрини', inShowcase: true },
  { name: 'Ольвія', now: 'Миколаївщина', note: '«щаслива» — сусідка скіфів' },
  { name: 'Херсонес', now: 'Севастополь', note: 'демократія і присяга громадян' },
  { name: 'Пантикапей', now: 'Керч', note: 'столиця Боспору, звідси статуетка', inShowcase: true },
  { name: 'Феодосія', now: 'Феодосія', note: 'порт для вивозу зерна' },
]

function Cities() {
  return (
    <div className="slide s-cities">
      <div className="s-cities__head">
        <A i={0}><Tag>Карта античного Причорномор’я</Tag></A>
        <A i={1}><h2 className="display">Головні міста-поліси</h2></A>
        <A i={2}>
          <p className="body">Поліс — це місто-держава: власні закони, монета, військо й народні збори.</p>
        </A>
      </div>
      <div className="cities">
        {cities.map((c, k) => (
          <A i={3 + k} key={c.name} className={`city ${c.inShowcase ? 'city--hl' : ''}`}>
            <span className="city__idx">{String(k + 1).padStart(2, '0')}</span>
            <h3>{c.name}</h3>
            <span className="city__now">{c.now}</span>
            <p>{c.note}</p>
            {c.inShowcase && <span className="city__flag">є у вітрині</span>}
          </A>
        ))}
      </div>
    </div>
  )
}

/* ───────────── 5. Життя поліса ───────────── */
function Life() {
  return (
    <div className="slide s-life">
      <Photo name="amphora-104" alt="Амфора №104" nums="104" position="40% 60%" i={0} className="s-life__photo" />
      <div className="s-life__text">
        <A i={1}><Tag light>Життя поліса</Tag></A>
        <A i={2}><h2 className="display light">Житниця <em>Еллади</em></h2></A>
        <div className="s-life__rows">
          <A i={3} className="row">
            <b>Торгівля</b>
            <p>Вивозили зерно, рибу й сіль. Ввозили вино, олію та розписний посуд.</p>
          </A>
          <A i={4} className="row">
            <b>Влада</b>
            <p>Більшістю полісів керували народні збори й рада. Боспор був монархією.</p>
          </A>
          <A i={5} className="row">
            <b>Скіфи</b>
            <p>Сусіди й партнери. Грецькі майстри робили для скіфської знаті золоті прикраси.</p>
          </A>
        </div>
      </div>
    </div>
  )
}

/* ───────────── 6. Кераміка ───────────── */
const ceramics = [
  { name: 'painted', nums: '1–29', title: 'Розписна кераміка', text: 'VII–VI ст. до н.е. Найдавніші уламки — смуги, хвилі, кола.' },
  { name: 'lacquer', nums: '36–86', title: 'Чорнолаковий посуд', text: 'Блиск дає не лак, а тонка глина після складного випалу.' },
  { name: 'megarian', nums: '30–35', title: 'Мегарські чаші', text: 'Рельєфні чаші з форм, що наслідували металевий посуд.' },
]

function Ceramics() {
  return (
    <div className="slide s-cer">
      <div className="s-cer__head">
        <A i={0}><Tag>Експонати вітрини</Tag></A>
        <A i={1}><h2 className="display">Історія в уламках</h2></A>
      </div>
      <div className="s-cer__grid">
        {ceramics.map((c, k) => (
          <div className="s-cer__item" key={c.name}>
            <Photo name={c.name} alt={c.title} nums={c.nums} i={2 + k} className="s-cer__photo" />
            <A i={3 + k}>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </A>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ───────────── 7. Кілік ───────────── */
function Kylix() {
  return (
    <div className="slide s-hero">
      <div className="s-hero__text">
        <A i={0}><Tag>Експонат вітрини</Tag></A>
        <A i={1} className="exhibit-no">№ 95</A>
        <A i={2}><h2 className="display">Кілік із&nbsp;<em>діонісійськими</em> мотивами</h2></A>
        <A i={3}>
          <p className="body">
            Чаша для вина з рельєфними масками Діоніса — бога вина й театру. З таких пили
            на симпосіях, дружніх бенкетах греків.
          </p>
        </A>
        <A i={4} className="facts">
          <div><small>Тип</small><b>чаша для вина</b></div>
          <div><small>Декор</small><b>рельєфні маски</b></div>
          <div><small>Стан</small><b>реставрована</b></div>
        </A>
      </div>
      <Photo name="kylix-dionysus" alt="Кілік із діонісійськими мотивами" nums="95" i={1} className="s-hero__photo" position="50% 45%" />
    </div>
  )
}

/* ───────────── 8. Червонофігурна + статуетка ───────────── */
function RedFigure() {
  return (
    <div className="slide s-red">
      <Photo name="statuette" alt="Червонофігурна кераміка і теракотова статуетка" nums="96–97" i={0} className="s-red__photo" position="50% 40%" />
      <div className="s-red__text">
        <A i={1}><h2 className="display light">Мистецтво в&nbsp;глині</h2></A>
        <A i={2} className="s-red__item">
          <span className="exhibit-no exhibit-no--light">№ 96</span>
          <h3>Червонофігурна кераміка</h3>
          <p>Афінська техніка з 530 р. до н.е.: тло чорне, фігури кольору глини.</p>
        </A>
        <A i={3} className="s-red__item">
          <span className="exhibit-no exhibit-no--light">№ 97</span>
          <h3>«Хлопчик із гусаком»</h3>
          <p>Теракотова статуетка з Пантикапея — улюблений сюжет еллінізму.</p>
        </A>
      </div>
    </div>
  )
}

/* ───────────── 9. Амфори ───────────── */
function Amphorae() {
  return (
    <div className="slide s-amph">
      <Photo name="amphora-103" alt="Амфора №103" nums="103" i={0} className="s-amph__tall" position="50% 40%" />
      <div className="s-amph__text">
        <A i={1}><Tag>№ 90–109</Tag></A>
        <A i={2}><h2 className="display">Амфора — «контейнер» античності</h2></A>
        <A i={3}>
          <p className="body">
            У ній возили вино й олію. Гостре дно тримало амфору в піску чи в трюмі корабля.
          </p>
        </A>
        <div className="s-amph__grid">
          <A i={4} className="mini"><b>Клейма</b><p>за ними визначають дату й місто</p></A>
          <A i={5} className="mini"><b>Менде</b><p>амфора зі славетного винного міста</p></A>
          <A i={6} className="mini"><b>Черепиця</b><p>кераміда й каліптер з клеймом</p></A>
        </div>
      </div>
      <Photo name="amphora-104" alt="Амфора №104, кераміда №105, світильник №106" nums="104–106" i={3} className="s-amph__wide" position="55% 50%" />
    </div>
  )
}

/* ───────────── 10. Спадщина ───────────── */
const legacy = [
  { t: 'Перші міста', p: 'Поліси стали першими містами на території сучасної України.' },
  { t: 'Міст культур', p: 'Через них степ познайомився з грецьким письмом, монетою та мистецтвом.' },
  { t: 'Самоврядування', p: 'Народні збори й присяга Херсонеса — ранній досвід демократії.' },
  { t: 'Пам’ятки', p: 'Ольвію та Херсонес досліджують досі, а Херсонес внесено до списку ЮНЕСКО.' },
]

function Legacy() {
  return (
    <div className="slide s-legacy">
      <div className="s-legacy__head">
        <A i={0}><Tag light>Підсумок</Tag></A>
        <A i={1}><h2 className="display light">Спадщина <em>античних полісів</em></h2></A>
        <A i={2} className="s-legacy__meander"><Meander height={20} /></A>
        <A i={6}><p className="s-legacy__thanks">Дякую за увагу!</p></A>
      </div>
      <ol className="s-legacy__list">
        {legacy.map((l, k) => (
          <A as="li" i={2 + k} key={l.t}>
            <span>{String(k + 1).padStart(2, '0')}</span>
            <div><b>{l.t}</b><p>{l.p}</p></div>
          </A>
        ))}
      </ol>
    </div>
  )
}

export const slides = [
  { id: 'title', el: <Title /> },
  { id: 'museum', el: <Museum /> },
  { id: 'colonization', el: <Colonization /> },
  { id: 'cities', el: <Cities /> },
  { id: 'life', el: <Life />, dark: true },
  { id: 'ceramics', el: <Ceramics /> },
  { id: 'kylix', el: <Kylix /> },
  { id: 'redfigure', el: <RedFigure />, dark: true },
  { id: 'amphorae', el: <Amphorae /> },
  { id: 'legacy', el: <Legacy />, dark: true },
]
