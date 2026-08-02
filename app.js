const projects = {
  shop: { name: `الكوفي شوب`, start: 399000, property: 800000, income: 437675, remains: 22000, returnWithout: 24.95, returnWith: 2.70, futureWithout: 304193, futureWith: -495807, score: 69.25, decision: `الأفضل حاليًا بشروط`, tone: `good` },
  dress: { name: `تأجير فساتين الزفاف`, start: 130000, property: 370000, income: 148800, remains: 43908, returnWithout: 51.46, returnWith: 10.91, futureWithout: 353746, futureWith: -16254, score: 64.90, decision: `واعد ويحتاج اختبار`, tone: `warn` },
  house: { name: `الكوفي هاوس`, start: 735000, property: 800000, income: 711850, remains: -76115, returnWithout: -6.12, returnWith: -14.34, futureWithout: -445995, futureWith: -1245995, score: 52.10, decision: `يحتاج تغيير الفكرة`, tone: `warn` },
  school: { name: `المدرسة الخاصة`, start: 2880000, property: 800000, income: 819350, remains: -283138, returnWithout: -4.49, returnWith: -7.45, futureWithout: -1718803, futureWith: -2518803, score: 40.20, decision: `غير مناسب حاليًا`, tone: `bad` }
};

const checks = [
  [`التنظيم والترخيص`, `بحاجة إلى تأكيد رسمي قبل أي التزام مالي.`, `ضروري جدًا`, `bad`],
  [`المواقف وسهولة الدخول`, `يجب عدّ المواقف وفحص حركة السيارات في ساعات الذروة.`, `غير مؤكد`, `warn`],
  [`حجم الطلب والمنافسين`, `نحتاج أرقامًا ميدانية بدل الاعتماد على التوقعات فقط.`, `غير مؤكد`, `warn`],
  [`أسعار البناء والتجهيز`, `بعض الأسعار تقديرية وتحتاج عروض أسعار حديثة.`, `تأكيد جزئي`, `neutral`],
  [`شروط التمويل البنكي`, `الفائدة والقسط ونسبة التمويل تحتاج عرضًا فعليًا من البنك.`, `غير مؤكد`, `warn`],
  [`قيمة الأرض أو العقار`, `القيمة المستخدمة تحتاج تخمينًا معتمدًا أو مقارنة بيع حديثة.`, `تأكيد جزئي`, `neutral`]
];

const format = new Intl.NumberFormat(`en-US`, { maximumFractionDigits: 0 });
const state = { project: `all`, includeProperty: false };
const projectSelect = document.getElementById(`project`);
const excludeProperty = document.getElementById(`excludeProperty`);
const includeProperty = document.getElementById(`includeProperty`);

const money = (value) => `${value < 0 ? `−` : ``}${format.format(Math.abs(value))}`;
const selectedEntries = () => state.project === `all` ? Object.entries(projects) : [[state.project, projects[state.project]]];
const totalStart = (project) => project.start + (state.includeProperty ? project.property : 0);
const futureValue = (project) => state.includeProperty ? project.futureWith : project.futureWithout;
const yearlyReturn = (project) => state.includeProperty ? project.returnWith : project.returnWithout;
const returnText = (value) => value > 15 ? `قوي` : value >= 8 ? `مقبول` : value >= 0 ? `ضعيف` : `خاسر`;
const futureText = (value) => value >= 0 ? `يعوض المبلغ ويضيف قيمة متوقعة` : `لا يعوض المبلغ المطلوب بالكامل`;

function renderNumbers() {
  const project = state.project === `all` ? projects.shop : projects[state.project];
  const start = totalStart(project);
  const future = futureValue(project);
  const projectName = state.project === `all` ? `أفضل مشروع حاليًا: ${project.name}` : project.name;
  document.getElementById(`summaryTitle`).textContent = projectName;
  const cards = [
    [`كم سندفع بالبداية؟`, money(start), state.includeProperty ? `يشمل المشروع والأرض أو العقار` : `لتجهيز وتشغيل المشروع فقط`, `start`],
    [`كم سيدخل بأول سنة؟`, money(project.income), `مجموع المبيعات المتوقعة، وليس الربح`, `income`],
    [`كم يبقى بعد مصاريف التشغيل؟`, money(project.remains), project.remains >= 0 ? `قبل أقساط البنك والضريبة` : `المصاريف أعلى من الدخل`, project.remains >= 0 ? `good` : `bad`],
    [`كم يحقق كل 100 دينار سنويًا؟`, `${yearlyReturn(project).toFixed(2)} دينار`, `تقدير للعائد السنوي على المبلغ المدفوع`, yearlyReturn(project) >= 8 ? `good` : `bad`],
    [`هل يعوض ما دفعناه خلال 10 سنوات؟`, future >= 0 ? `نعم` : `لا`, futureText(future), future >= 0 ? `good` : `bad`],
    [`ما قوة القرار؟`, `${project.score.toFixed(2)} من 100`, project.decision, project.tone]
  ];
  document.getElementById(`numbers`).innerHTML = cards.map(([title, value, help, tone], index) => `<article class="number-card ${tone}"><span class="number-index">${String(index + 1).padStart(2, `0`)}</span><h3>${title}</h3><b>${value}</b><p>${help}</p></article>`).join(``);
}

function renderProjects() {
  const sorted = Object.entries(projects).sort((first, second) => second[1].score - first[1].score);
  document.getElementById(`projectList`).innerHTML = sorted.map(([key, project], index) => `<button class="project-row ${state.project === key ? `selected` : ``}" type="button" data-project="${key}"><span class="place">${index + 1}</span><span class="project-name"><b>${project.name}</b><small>${project.decision}</small></span><span class="score-bar"><i style="width:${project.score}%"></i></span><strong>${project.score.toFixed(2)}<small> / 100</small></strong></button>`).join(``);
  document.querySelectorAll(`[data-project]`).forEach((button) => button.addEventListener(`click`, () => {
    state.project = button.dataset.project;
    projectSelect.value = state.project;
    render();
    document.getElementById(`summary`).scrollIntoView({ behavior: `smooth`, block: `start` });
  }));
}

function renderMoneyRows() {
  document.getElementById(`moneyRows`).innerHTML = selectedEntries().map(([, project]) => {
    const remainsTone = project.remains >= 0 ? `positive` : `negative`;
    const easyText = project.remains >= 0 ? `يبقى من الدخل ${((project.remains / project.income) * 100).toFixed(1)}% بعد مصاريف التشغيل` : `مصاريف التشغيل أعلى من الدخل بـ ${money(Math.abs(project.remains))}`;
    return `<tr><th>${project.name}</th><td>${money(totalStart(project))}</td><td>${money(project.income)}</td><td class="${remainsTone}">${money(project.remains)}</td><td>${easyText}</td></tr>`;
  }).join(``);
}

function renderFuture() {
  document.getElementById(`futureGrid`).innerHTML = selectedEntries().map(([, project]) => {
    const value = futureValue(project);
    return `<article class="future-card ${value >= 0 ? `good` : `bad`}"><div><h3>${project.name}</h3><span>${state.includeProperty ? `بعد احتساب المشروع والعقار` : `بعد احتساب تكلفة المشروع فقط`}</span></div><b>${value >= 0 ? `فائض متوقع` : `نقص متوقع`} ${money(Math.abs(value))}</b><p>${futureText(value)} خلال فترة الدراسة.</p></article>`;
  }).join(``);
}

function renderChecks() {
  document.getElementById(`checks`).innerHTML = checks.map(([title, text, label, tone]) => `<article class="check-card"><span class="check-status ${tone}">${label}</span><h3>${title}</h3><p>${text}</p></article>`).join(``);
}

function renderPropertyState() {
  excludeProperty.classList.toggle(`active`, !state.includeProperty);
  includeProperty.classList.toggle(`active`, state.includeProperty);
  const note = document.getElementById(`propertyNote`);
  note.innerHTML = state.includeProperty
    ? `<b>مهم:</b> الأرقام الآن تشمل قيمة الأرض أو العقار، لذلك تعكس كامل المبلغ المطلوب للشراء والتشغيل.`
    : `<b>مهم:</b> الأرقام الآن لا تشمل قيمة الأرض أو العقار. هذا يوضح قوة المشروع نفسه بعيدًا عن قيمة الأصل.`;
}

function render() {
  renderPropertyState();
  renderNumbers();
  renderProjects();
  renderMoneyRows();
  renderFuture();
}

projectSelect.addEventListener(`change`, (event) => {
  state.project = event.target.value;
  render();
});
excludeProperty.addEventListener(`click`, () => {
  state.includeProperty = false;
  render();
});
includeProperty.addEventListener(`click`, () => {
  state.includeProperty = true;
  render();
});

renderChecks();
render();
