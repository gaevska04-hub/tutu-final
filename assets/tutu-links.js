// Tutu location IDs resolved from its public city directory.
(function () {
  const cities = {"dushanbe":{"name":"Душанбе","avia_id":"234","railway_id":"6600001","bus_id":"1636685"},"khujand":{"name":"Худжанд","avia_id":"459","railway_id":"6600910","bus_id":"1636228"},"kulob":{"name":"Куляб","avia_id":"597","railway_id":"6600188","bus_id":"1636376"},"bokhtar":{"name":"Бохтар","avia_id":"596","railway_id":"6600185","bus_id":"1636391"},"khorugh":{"name":"Хорог","avia_id":null,"railway_id":null,"bus_id":"1635926"},"istaravshan":{"name":"Истаравшан","avia_id":null,"railway_id":null,"bus_id":"1636229"},"panjakent":{"name":"Пенджикент","avia_id":null,"railway_id":null,"bus_id":"1636236"},"tursunzoda":{"name":"Турсунзаде","avia_id":null,"railway_id":"6600871","bus_id":"1636688"},"hisor":{"name":"Гиссар","avia_id":null,"railway_id":"6600873","bus_id":"1636686"},"vakhdat":{"name":"Вахдат","avia_id":null,"railway_id":"6600220","bus_id":"1636687"},"tashkent":{"name":"Ташкент","avia_id":"424","railway_id":"2900000","bus_id":"1635924"},"samarkand":{"name":"Самарканд","avia_id":"393","railway_id":"2900700","bus_id":"1635232"},"bukhara":{"name":"Бухара","avia_id":"172","railway_id":null,"bus_id":"1633735"},"almaty":{"name":"Алматы","avia_id":"117","railway_id":"2700000","bus_id":"1644111"},"astana":{"name":"Астана","avia_id":"128","railway_id":"2708001","bus_id":"1644112"},"bishkek":{"name":"Бишкек","avia_id":"152","railway_id":"5900001","bus_id":"1614827"},"osh":{"name":"Ош","avia_id":"358","railway_id":null,"bus_id":"1616496"},"ashgabat":{"name":"Ашхабад","avia_id":"133","railway_id":null,"bus_id":"1659061"},"moscow":{"name":"Москва","avia_id":"491","railway_id":"2000000","bus_id":"1447874"},"petersburg":{"name":"Санкт-Петербург","avia_id":"75","railway_id":"2004000","bus_id":"1447624"},"yekaterinburg":{"name":"Екатеринбург","avia_id":"29","railway_id":"2030000","bus_id":"1322775"},"novosibirsk":{"name":"Новосибирск","avia_id":"58","railway_id":"2044000","bus_id":"1302713"},"kazan":{"name":"Казань","avia_id":"33","railway_id":"2060615","bus_id":"1330021"},"sochi":{"name":"Сочи","avia_id":"78","railway_id":"2064130","bus_id":"1447978"},"istanbul":{"name":"Стамбул","avia_id":"419","railway_id":null,"bus_id":"1602085"},"dubai":{"name":"Дубай","avia_id":"230","railway_id":null,"bus_id":"2098455"},"tehran":{"name":"Тегеран","avia_id":"426","railway_id":null,"bus_id":"2098387"},"delhi":{"name":"Дели","avia_id":"216","railway_id":null,"bus_id":"2098491"},"baku":{"name":"Баку","avia_id":"136","railway_id":"5700001","bus_id":"1677099"},"urumqi":{"name":"Урумчи","avia_id":"3908","railway_id":"3300039","bus_id":"2098517"},"beijing":{"name":"Пекин","avia_id":"3895","railway_id":"3300100","bus_id":"2098074"}};
  const keys = {air:'avia_id',train:'railway_id',bus:'bus_id'};
  function hasCity(mode,id) { return Boolean(cities[id] && cities[id][keys[mode]]); }
  function formatDate(iso,separator='.') {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(iso)) throw new Error('date');
    const [year,month,day]=iso.split('-');
    return [day,month,year].join(separator);
  }
  function buildSearchUrl({mode,from,to,dateOut,dateBack,roundTrip,adults=1,children=0}) {
    if (!hasCity(mode,from)||!hasCity(mode,to)) throw new Error('city');
    if (from===to) throw new Error('same');
    const a=cities[from],b=cities[to],params=new URLSearchParams();
    if (mode==='air') {
      params.set('class','Y');params.set('passengers',`${adults}${children}0`);
      params.append('route[]',`${a.avia_id}-${formatDate(dateOut,'')}-${b.avia_id}`);
      if(roundTrip) params.append('route[]',`${b.avia_id}-${formatDate(dateBack,'')}-${a.avia_id}`);
      return 'https://avia.tutu.ru/offers/?'+params;
    }
    params.set('date',formatDate(dateOut));
    if (mode==='train') {
      params.set('nnst1',a.railway_id);params.set('nnst2',b.railway_id);
      return 'https://www.tutu.ru/poezda/rasp_d.php?'+params;
    }
    params.set('amount',String(adults+children));params.set('from',a.bus_id);params.set('to',b.bus_id);
    return `https://bus.tutu.ru/raspisanie/gorod_${encodeURIComponent(a.name)}/gorod_${encodeURIComponent(b.name)}/?${params}`;
  }
  window.TutuLinks={hasCity,buildSearchUrl};
})();
