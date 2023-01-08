const LOCAL_ENV=!1;function russianDate(e){const t=e.split(".");return`${["понедельник","вторник","среда","четверг","пятница","суббота","воскресенье"][new Date(e.split(".").join("-")).getDay()-1]}, ${parseInt(t[2])} ${["января","февраля","марта","апреля","мая","июня","июля","августа","сентября","октября","ноября","декабря"][parseInt(t[1])-1]}`}function padTo2Digits(e){return e.toString().padStart(2,"0")}function formatDate(e){return[e.getFullYear(),padTo2Digits(e.getMonth()+1),padTo2Digits(e.getDate())].join(".")}let dateBegin=formatDate(new Date),dateEnd=formatDate(new Date(Date.now()+6048e5));function showCalendarPrompt(){showModal("date-picker"),document.getElementById("beginDate").valueAsNumber=Date.now(),document.getElementById("endDate").valueAsNumber=Date.now()+6048e5}function handleCalendarSelection(){dateBegin=formatDate(new Date(document.getElementById("beginDate").valueAsNumber)),dateEnd=formatDate(new Date(document.getElementById("endDate").valueAsNumber)),dismissModal(),reinitialize()}function dismissModal(){document.getElementById("modal").style.display="none"}function showModal(e){const t="modal-"+e;for(let e of document.getElementById("modal-content").children)e.style.display=e.id===t?"block":"none";document.getElementById("modal").style.display="block"}function cors(e){return"https://njs-unn-cors-6ob1.vercel.app/api?endpoint="+encodeURI(e)}const API_ENDPOINTS={groupSearch:"https://portal.unn.ru/ruzapi/search?term={label}&type=group",schedule:"https://portal.unn.ru/ruzapi/schedule/group/{groupId}?start={start}&finish={end}&lng=1"},KIND_COLORS={262:"#B3E185",263:"#78D2FF",264:"#FFC26B",268:"#FF80C7",271:"#AE8FE9",266:"#FF8080"};function loadSchedule(e,t,n,a){fetch(cors(API_ENDPOINTS.schedule.replace("{groupId}",e).replace("{start}",t).replace("{end}",n))).then((e=>e.json())).then((e=>a(e))).catch((e=>a("Ошибка при загрузке расписания: "+e)))}function findGroups(e,t){fetch(cors(API_ENDPOINTS.groupSearch.replace("{label}",e))).then((e=>e.json())).then((e=>t(e))).catch((e=>t("Ошибка при поиске группы: "+e)))}function handleGroupSelection(e){localStorage.setItem("first_run",!1),localStorage.setItem("group_id",e.dataset.id),localStorage.setItem("group_label",e.dataset.label),dismissModal(),reinitialize(!0)}function showGroupPrompt(){showModal("group-picker");const e=document.getElementById("groupLabelInput");if(e.dataset.handled)return;const t=document.getElementById("groupSuggestions");e.addEventListener("input",(e=>{e.target.value.length<7||findGroups(e.target.value,(e=>{if(Array.isArray(e)){t.innerHTML="";for(let n of e)t.innerHTML+=`<div class="groupSuggestion selectable" data-id="${n.id}" data-label="${n.label}" onclick="handleGroupSelection(this)"><b>${n.label}</b><br>${n.description}</div>`}else alert("Ошибка при получении списка групп: "+e)}))}))}function reinitialize(e=!1){if(null==localStorage.getItem("first_run"))return void showGroupPrompt();const t=document.getElementById("schedule");t.innerHTML='<br><center style="margin: 8px 16px">Загрузка, пожалуйста, подождите...</center>';const n=e=>{document.getElementById("internal-group-id").innerText=e,loadSchedule(e,dateBegin,dateEnd,(e=>{if(!Array.isArray(e))return void alert("Ошибка при загрузке расписания: "+e);const n={};for(let t of e){t.date in n||(n[t.date]=[]);n[t.date].push(t)}t.innerHTML="";for(let e in n){t.innerHTML+=`<div class="date-header">${russianDate(e)}</div>`;let a="";for(let t of n[e])a+=`<div class="schedule-entry"><div class="lesson-timing"><div class="lesson-block" style="background: ${KIND_COLORS[t.kindOfWorkOid]}">${t.lessonNumberStart}</div>${t.beginLesson}<br>${t.endLesson}</div><div class="lesson-details"><div class="lesson-title">${t.discipline}</div><div class="lesson-kind">${t.kindOfWork}</div><div class="lesson-info"><div class="lesson-auditorium"><span class="material-icons">location_on</span> ${t.auditorium} (${t.building})</div><div class="lesson-stream"><span class="material-icons">directions_walk</span> ${t.stream}</div><div class="lesson-lecturer"><span class="material-icons">person</span> ${t.lecturer.replace("!","")} (${t.lecturer_rank.toLowerCase().replace("!","")})</div></div></div></div>`;t.innerHTML+=`<div class="schedule-group">${a}</div>`}document.getElementById("header-title").innerText=localStorage.getItem("group_label")}))};e?n(localStorage.getItem("group_id")):findGroups(localStorage.getItem("group_label"),(e=>{0!==e.length?1===e.length?n(e[0].id):alert("Поиск группы завершился неоднозначно"):alert("Группа не найдена")}))}window.addEventListener("load",(()=>{reinitialize(),document.addEventListener("click",(e=>{"modal"===e.target.id&&null!=localStorage.getItem("first_run")?dismissModal():"lesson-info"===e.target.parentElement.className&&alert(e.target.innerText.substring(e.target.innerText.indexOf(" ")+1))}),!1)}));
