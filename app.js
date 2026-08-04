const projects = {
  shop: {
    name: `الكوفي شوب`, start: 399000, property: 800000, income: 437675, remains: 22000,
    cash: -8661, net: -22289, returnWithout: 24.95, returnWith: 2.70,
    futureWithout: 304193, futureWith: -495807, score: 69.25, debtCover: 0.69, loanYears: 7,
    decision: `الأفضل حاليًا بشروط`, tone: `good`,
    trend: {
      revenue: [437675, 490196, 534314, 571716, 606019, 636319, 664954, 691552, 715756, 737229],
      ebitda: [22000, 48187, 68209, 83215, 95688, 104989, 112715, 118594, 122364, 123774],
      fcf: [-8661, 35398, 51920, 64328, 74492, 82173, 88454, 93280, 96439, 97731],
      net: [-22289, 4760, 22419, 36066, 47686, 56768, 64590, 70936, 73951, 75079]
    }
  },
  dress: {
    name: `تأجير فساتين الزفاف`, start: 130000, property: 370000, income: 148800, remains: 43908,
    cash: 22622, net: 10250, returnWithout: 51.46, returnWith: 10.91,
    futureWithout: 353746, futureWith: -16254, score: 64.90, debtCover: 4.57, loanYears: 7,
    decision: `واعد ويحتاج اختبار`, tone: `warn`,
    trend: {
      revenue: [148800, 163680, 176774, 189149, 200498, 210522, 218943, 227701, 234532, 241568],
      ebitda: [43908, 53414, 61361, 68620, 74935, 80060, 83759, 87622, 89787, 91999],
      fcf: [22622, 40941, 47442, 53306, 58440, 62646, 65734, 68797, 70683, 72436],
      net: [10250, 18323, 25149, 31424, 36944, 41512, 44939, 48498, 50230, 51999]
    }
  },
  house: {
    name: `الكوفي هاوس`, start: 735000, property: 800000, income: 711850, remains: -76115,
    cash: -103603, net: -157700, returnWithout: -6.12, returnWith: -14.34,
    futureWithout: -445995, futureWith: -1245995, score: 52.10, debtCover: -1.43, loanYears: 8,
    decision: `يحتاج تغيير الفكرة`, tone: `warn`,
    trend: {
      revenue: [711850, 797272, 869026, 929858, 985650, 1034932, 1081504, 1124764, 1164131, 1199055],
      ebitda: [-76115, -40133, -13757, 4771, 19247, 28686, 35527, 39348, 39738, 36307],
      fcf: [-103603, -37232, -15311, 167, 12050, 19992, 25627, 28883, 29429, 26950],
      net: [-157700, -118411, -88727, -66891, -49108, -36362, -26213, -19085, -15387, -18818]
    }
  },
  school: {
    name: `المدرسة الخاصة`, start: 2880000, property: 800000, income: 819350, remains: -283138,
    cash: -300252, net: -589858, returnWithout: -4.49, returnWith: -7.45,
    futureWithout: -1718803, futureWith: -2518803, score: 40.20, debtCover: -1.80, loanYears: 10,
    decision: `غير مناسب حاليًا`, tone: `bad`,
    trend: {
      revenue: [819350, 983220, 1140535, 1277399, 1379591, 1462367, 1535485, 1596905, 1652796, 1702380],
      ebitda: [-283138, -169275, -62781, 23510, 76463, 110061, 133227, 144024, 148073, 144591],
      fcf: [-300252, -150168, -64383, 6490, 51973, 80599, 100001, 109692, 113428, 111211],
      net: [-589858, -466923, -351357, -255994, -193969, -151299, -119061, -99192, -86071, -80481]
    }
  }
};

const checks = [
  [`التنظيم والترخيص`, `بحاجة إلى تأكيد رسمي قبل أي التزام مالي.`, `ضروري جدًا`, `bad`],
  [`المواقف وسهولة الدخول`, `يجب عدّ المواقف وفحص حركة السيارات في ساعات الذروة.`, `غير مؤكد`, `warn`],
  [`حجم الطلب والمنافسين`, `نحتاج أرقامًا ميدانية بدل الاعتماد على التوقعات فقط.`, `غير مؤكد`, `warn`],
  [`أسعار البناء والتجهيز`, `بعض الأسعار تقديرية وتحتاج عروض أسعار حديثة.`, `تأكيد جزئي`, `neutral`],
  [`شروط التمويل البنكي`, `الفائدة والقسط ونسبة التمويل تحتاج عرضًا فعليًا من البنك.`, `غير مؤكد`, `warn`],
  [`قيمة الأرض أو العقار`, `القيمة المستخدمة تحتاج تخمينًا معتمدًا أو مقارنة بيع حديثة.`, `تأكيد جزئي`, `neutral`],
  [`الضرائب والضمان الاجتماعي`, `يجب تثبيت الضرائب وكلفة الضمان حسب الشكل القانوني والرواتب الفعلية.`, `غير مؤكد`, `warn`],
  [`الخدمات والضوضاء`, `تُفحص قدرة الكهرباء والمياه والتهوية وأثر الضوضاء على الجوار.`, `غير مؤكد`, `warn`]
];

const format = new Intl.NumberFormat(`en-US`, { maximumFractionDigits: 0 });
const state = {
  project: localStorage.getItem(`easy_project`) || `all`,
  includeProperty: localStorage.getItem(`easy_property`) === `yes`,
  metric: localStorage.getItem(`easy_metric`) || `revenue`,
  years: Number(localStorage.getItem(`easy_years`) || 10)
};
const chartStore = {};
const colors = [`#099999`, `#5d6fb0`, `#a57943`, `#91383d`];
const gridColor = `rgba(103,119,122,.15)`;

const projectSelect = document.getElementById(`project`);
const metricSelect = document.getElementById(`metric`);
const yearsSelect = document.getElementById(`years`);
const excludeProperty = document.getElementById(`excludeProperty`);
const includeProperty = document.getElementById(`includeProperty`);
const salesGrowth = document.getElementById(`salesGrowth`);
const costGrowth = document.getElementById(`costGrowth`);
const startFactor = document.getElementById(`startFactor`);

const money = (value) => `${value < 0 ? `−` : ``}${format.format(Math.abs(value))}`;
const selectedEntries = () => state.project === `all` ? Object.entries(projects) : [[state.project, projects[state.project]]];
const selectedProject = () => state.project === `all` ? projects.shop : projects[state.project];
const totalStart = (project) => project.start + (state.includeProperty ? project.property : 0);
const futureValue = (project) => state.includeProperty ? project.futureWith : project.futureWithout;
const yearlyReturn = (project) => state.includeProperty ? project.returnWith : project.returnWithout;
const futureText = (value) => value >= 0 ? `يعوض المبلغ ويحقق أكثر من العائد المطلوب` : `لا يصل إلى العائد المطلوب بعد احتساب قيمة الوقت`;
const debtText = (value) => value >= 1.2 ? `نعم، بهامش أمان` : value >= 1 ? `نعم، لكن الهامش ضعيف` : `لا، الدخل لا يكفي حسب التقدير`;
const saveState = () => {
  localStorage.setItem(`easy_project`, state.project);
  localStorage.setItem(`easy_property`, state.includeProperty ? `yes` : `no`);
  localStorage.setItem(`easy_metric`, state.metric);
  localStorage.setItem(`easy_years`, `${state.years}`);
};

function renderNumbers() {
  const project = selectedProject();
  const future = futureValue(project);
  const annualReturn = yearlyReturn(project);
  const projectName = state.project === `all` ? `أفضل مشروع حاليًا: ${project.name}` : project.name;
  document.getElementById(`summaryTitle`).textContent = projectName;
  const cards = [
    [`كم نحتاج في البداية؟`, money(totalStart(project)), state.includeProperty ? `يشمل تجهيز المشروع وقيمة الأرض أو العقار` : `لتجهيز وافتتاح المشروع فقط`, `start`],
    [`كم نتوقع أن نبيع في أول سنة؟`, money(project.income), `إجمالي ما يدفعه الزبائن قبل طرح أي مصروف`, `income`],
    [`كم يبقى بعد مصاريف التشغيل؟`, money(project.remains), `قبل قسط البنك والضريبة واستهلاك الأصول`, project.remains >= 0 ? `good` : `bad`],
    [`كم نقدًا يبقى متاحًا فعليًا؟`, money(project.cash), `بعد التشغيل والمبالغ اللازمة للمشروع؛ يمكن استخدامه للسداد أو التوزيع`, project.cash >= 0 ? `good` : `bad`],
    [`كم صافي الربح المتوقع؟`, money(project.net), `نتيجة السنة الأولى بعد المصاريف المحاسبية الموجودة في النموذج`, project.net >= 0 ? `good` : `bad`],
    [`بعد 10 سنوات: كم نزيد أو ننقص بقيمة اليوم؟`, money(future), futureText(future), future >= 0 ? `good` : `bad`],
    [`ما العائد السنوي المتوقع؟`, `${annualReturn.toFixed(2)}%`, `نقارنه بالعائد المطلوب 11.5%؛ الأعلى منه أفضل`, annualReturn >= 11.5 ? `good` : `bad`],
    [`ما قوة القرار من 100؟`, `${project.score.toFixed(2)} من 100`, `تجمع الربح والموقع والمخاطر وسهولة التنفيذ، وليست نسبة ربح`, project.tone],
    [`هل دخل المشروع يغطي قسط البنك؟`, `${project.debtCover.toFixed(2)} مرة`, debtText(project.debtCover), project.debtCover >= 1.2 ? `good` : `bad`],
    [`كم سنة لسداد القرض؟`, `${project.loanYears} سنوات`, `المدة المفترضة في النموذج لسداد التمويل`, `warn`]
  ];
  document.getElementById(`numbers`).innerHTML = cards.map(([title, value, help, tone], index) => `<article class="number-card ${tone}"><span class="number-index">${String(index + 1).padStart(2, `0`)}</span><h3>${title}</h3><b>${value}</b><p>${help}</p></article>`).join(``);
}

function renderProjects() {
  const sorted = Object.entries(projects).sort((first, second) => second[1].score - first[1].score);
  document.getElementById(`projectList`).innerHTML = sorted.map(([key, project], index) => `<button class="project-row ${state.project === key ? `selected` : ``}" type="button" data-project="${key}"><span class="place">${index + 1}</span><span class="project-name"><b>${project.name}</b><small>${project.decision}</small></span><span class="score-bar"><i style="width:${project.score}%"></i></span><strong>${project.score.toFixed(2)}<small> / 100</small></strong></button>`).join(``);
  document.querySelectorAll(`[data-project]`).forEach((button) => button.addEventListener(`click`, () => {
    state.project = button.dataset.project;
    projectSelect.value = state.project;
    saveState();
    render();
    document.getElementById(`summary`).scrollIntoView({ behavior: `smooth`, block: `start` });
  }));
}

function renderMoneyRows() {
  document.getElementById(`moneyRows`).innerHTML = selectedEntries().map(([, project]) => {
    const easyText = project.remains >= 0 ? `يبقى ${((project.remains / project.income) * 100).toFixed(1)}% من المبيعات بعد التشغيل` : `مصاريف التشغيل أعلى من المبيعات بـ ${money(Math.abs(project.remains))}`;
    return `<tr><th>${project.name}</th><td>${money(totalStart(project))}</td><td>${money(project.income)}</td><td class="${project.remains >= 0 ? `positive` : `negative`}">${money(project.remains)}</td><td class="${project.cash >= 0 ? `positive` : `negative`}">${money(project.cash)}</td><td class="${project.net >= 0 ? `positive` : `negative`}">${money(project.net)}</td><td class="${yearlyReturn(project) >= 11.5 ? `positive` : `negative`}">${yearlyReturn(project).toFixed(2)}%</td><td>${project.debtCover.toFixed(2)} مرة — ${debtText(project.debtCover)}</td><td>${project.loanYears} سنوات</td><td>${easyText}</td></tr>`;
  }).join(``);
}

function renderFuture() {
  document.getElementById(`futureGrid`).innerHTML = selectedEntries().map(([, project]) => {
    const value = futureValue(project);
    return `<article class="future-card ${value >= 0 ? `good` : `bad`}"><div><h3>${project.name}</h3><span>${state.includeProperty ? `بعد احتساب المشروع والعقار` : `بعد احتساب تكلفة المشروع فقط`}</span></div><b>${value >= 0 ? `زيادة متوقعة` : `نقص متوقع`} ${money(Math.abs(value))}</b><p>${futureText(value)} خلال فترة الدراسة.</p></article>`;
  }).join(``);
}

function renderChecks() {
  document.getElementById(`checks`).innerHTML = checks.map(([title, text, label, tone]) => `<article class="check-card"><span class="check-status ${tone}">${label}</span><h3>${title}</h3><p>${text}</p></article>`).join(``);
}

function renderPropertyState() {
  excludeProperty.classList.toggle(`active`, !state.includeProperty);
  includeProperty.classList.toggle(`active`, state.includeProperty);
  document.getElementById(`propertyNote`).innerHTML = state.includeProperty
    ? `<b>مهم:</b> الأرقام الآن تشمل قيمة الأرض أو العقار، لذلك تعكس كامل المبلغ المطلوب للشراء والتشغيل.`
    : `<b>مهم:</b> الأرقام الآن لا تشمل قيمة الأرض أو العقار. هذا يوضح قوة المشروع نفسه بعيدًا عن قيمة الأصل.`;
}

function destroyChart(name) {
  if (chartStore[name]) chartStore[name].destroy();
}

function chartAxes(yTitle) {
  return {
    x: { grid: { display: false }, ticks: { font: { family: `IBM Plex Sans Arabic` } } },
    y: { title: { display: true, text: yTitle }, grid: { color: gridColor }, ticks: { callback: (value) => format.format(value) } }
  };
}

function renderCharts() {
  if (typeof Chart === `undefined`) return;
  if (typeof ChartDataLabels !== `undefined`) Chart.register(ChartDataLabels);
  const entries = selectedEntries();
  const metricNames = {
    revenue: [`إجمالي المبيعات عبر السنوات`, `يعرض مجموع ما يدفعه الزبائن قبل طرح المصاريف.`],
    ebitda: [`المتبقي بعد مصاريف التشغيل عبر السنوات`, `قبل أقساط البنك والضرائب واستهلاك الأصول.`],
    fcf: [`النقد المتاح فعليًا عبر السنوات`, `النقد المتبقي بعد التشغيل والمبالغ اللازمة للمشروع.`],
    net: [`صافي الربح المتوقع عبر السنوات`, `الربح المحاسبي المتوقع حسب المصاريف الموجودة في النموذج.`]
  };
  document.getElementById(`trendTitle`).textContent = metricNames[state.metric][0];
  document.getElementById(`trendHelp`).textContent = `${metricNames[state.metric][1]} يمكنك تغيير نوع الرقم وعدد السنوات من الخيارات أعلاه.`;

  destroyChart(`trend`);
  chartStore.trend = new Chart(document.getElementById(`trendChart`), {
    type: `line`,
    data: {
      labels: Array.from({ length: state.years }, (_, index) => `السنة ${index + 1}`),
      datasets: entries.map(([, project], index) => ({ label: project.name, data: project.trend[state.metric].slice(0, state.years), borderColor: colors[index], backgroundColor: colors[index], tension: 0.3, borderWidth: 3, pointRadius: 3 }))
    },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: `bottom`, rtl: true }, datalabels: { display: (context) => context.dataIndex === 0 || context.dataIndex === context.dataset.data.length - 1, align: `top`, formatter: money, font: { size: 9, weight: `600` } } }, scales: chartAxes(`دينار أردني`) }
  });

  destroyChart(`compare`);
  chartStore.compare = new Chart(document.getElementById(`compareChart`), {
    type: `bar`,
    data: { labels: entries.map(([, project]) => project.name), datasets: [
      { label: `المبلغ المطلوب بالبداية`, data: entries.map(([, project]) => totalStart(project)), backgroundColor: `#073b3a`, borderRadius: 7 },
      { label: `مبيعات أول سنة`, data: entries.map(([, project]) => project.income), backgroundColor: `#099999`, borderRadius: 7 }
    ] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: `bottom`, rtl: true }, datalabels: { anchor: `end`, align: `top`, formatter: money, font: { size: 9, weight: `600` } } }, scales: chartAxes(`دينار أردني`) }
  });

  destroyChart(`future`);
  const futureData = entries.map(([, project]) => futureValue(project));
  chartStore.future = new Chart(document.getElementById(`futureChart`), {
    type: `bar`,
    data: { labels: entries.map(([, project]) => project.name), datasets: [{ data: futureData, backgroundColor: futureData.map((value) => value >= 0 ? `#16725d` : `#a54248`), borderRadius: 7 }] },
    options: { indexAxis: `y`, responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false }, datalabels: { anchor: `end`, align: (context) => context.dataset.data[context.dataIndex] >= 0 ? `right` : `left`, formatter: money, font: { size: 9, weight: `700` } } }, scales: { x: { grid: { color: gridColor }, ticks: { callback: (value) => format.format(value) } }, y: { grid: { display: false } } } }
  });
}

function scenarioOutputs() {
  document.getElementById(`salesGrowthOutput`).textContent = `${Number(salesGrowth.value).toFixed(1)}%`;
  document.getElementById(`costGrowthOutput`).textContent = `${Number(costGrowth.value).toFixed(1)}%`;
  document.getElementById(`startFactorOutput`).textContent = `${startFactor.value}%`;
}

function renderScenario() {
  if (typeof Chart === `undefined`) return;
  const project = selectedProject();
  const salesRate = Number(salesGrowth.value) / 100;
  const costRate = Number(costGrowth.value) / 100;
  const openingFactor = Number(startFactor.value) / 100;
  const revenue = [];
  const operatingRemainder = [];
  document.getElementById(`scenarioTitle`).textContent = `أثر الاحتمال على ${project.name}`;
  for (let year = 0; year < 10; year += 1) {
    const yearRevenue = project.income * Math.pow(1 + salesRate, year);
    const operatingCosts = (project.income - project.remains) * Math.pow(1 + costRate, year);
    revenue.push(yearRevenue);
    operatingRemainder.push(yearRevenue - operatingCosts - (year === 0 ? project.start * (openingFactor - 1) : 0));
  }
  destroyChart(`scenario`);
  chartStore.scenario = new Chart(document.getElementById(`scenarioChart`), {
    type: `line`,
    data: { labels: Array.from({ length: 10 }, (_, index) => `السنة ${index + 1}`), datasets: [
      { label: `إجمالي المبيعات`, data: revenue, borderColor: `#099999`, backgroundColor: `#099999`, borderWidth: 3, tension: 0.3 },
      { label: `المتبقي بعد مصاريف التشغيل`, data: operatingRemainder, borderColor: `#a57943`, backgroundColor: `#a57943`, borderWidth: 3, tension: 0.3 }
    ] },
    options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: `bottom`, rtl: true }, datalabels: { display: (context) => context.dataIndex === 0 || context.dataIndex === 9, align: `top`, formatter: money, font: { size: 9, weight: `600` } } }, scales: chartAxes(`دينار أردني`) }
  });
}

function render() {
  renderPropertyState();
  renderNumbers();
  renderProjects();
  renderMoneyRows();
  renderFuture();
  renderCharts();
  renderScenario();
}

function applyPreset(name) {
  const presets = { conservative: [-1, 6, 115], base: [5, 3, 100], optimistic: [8, 2, 95] };
  const values = presets[name];
  salesGrowth.value = `${values[0]}`;
  costGrowth.value = `${values[1]}`;
  startFactor.value = `${values[2]}`;
  document.querySelectorAll(`[data-preset]`).forEach((button) => button.classList.toggle(`active`, button.dataset.preset === name));
  scenarioOutputs();
  renderScenario();
}

projectSelect.addEventListener(`change`, (event) => { state.project = event.target.value; saveState(); render(); });
metricSelect.addEventListener(`change`, (event) => { state.metric = event.target.value; saveState(); renderCharts(); });
yearsSelect.addEventListener(`change`, (event) => { state.years = Number(event.target.value); saveState(); renderCharts(); });
excludeProperty.addEventListener(`click`, () => { state.includeProperty = false; saveState(); render(); });
includeProperty.addEventListener(`click`, () => { state.includeProperty = true; saveState(); render(); });
document.querySelectorAll(`[data-preset]`).forEach((button) => button.addEventListener(`click`, () => applyPreset(button.dataset.preset)));
[salesGrowth, costGrowth, startFactor].forEach((input) => input.addEventListener(`input`, () => { scenarioOutputs(); renderScenario(); }));

projectSelect.value = state.project;
metricSelect.value = state.metric;
yearsSelect.value = `${state.years}`;
scenarioOutputs();
renderChecks();
render();
