// (c) Mikhail K., 2022

function russianDate(raw) {
    return new Date(raw.split('.').join('-')).toLocaleDateString();
}

function padTo2Digits(num) {
    return num.toString().padStart(2, '0');
}

function formatDate(date) {
    return [
        date.getFullYear(),
        padTo2Digits(date.getMonth() + 1),
        padTo2Digits(date.getDate())
    ].join('.');
}

let dateBegin = formatDate(new Date());
let dateEnd = formatDate(new Date(Date.now() + 6.048E+8));

function showCalendarPrompt() {
    document.getElementById('modal-group-picker').style.display = 'none';
    document.getElementById('modal-date-picker').style.display = 'block';
    document.getElementById('modal').style.display = 'block';

    document.getElementById('beginDate').valueAsNumber = Date.now();
    document.getElementById('endDate').valueAsNumber = Date.now() + 6.048E+8;
}

function handleCalendarSelection() {
    dateBegin = formatDate(new Date(document.getElementById('beginDate').valueAsNumber));
    dateEnd = formatDate(new Date(document.getElementById('endDate').valueAsNumber));
    dismissModal();
    reinitialize();
}

function dismissModal() {
    document.getElementById('modal').style.display = 'none';
}

function cors(host) {
    return 'https://unn-sched-cors.herokuapp.com/' + host;
}

const API_ENDPOINTS = {
    groupSearch: cors('https://portal.unn.ru/ruzapi/search?term={label}&type=group'),
    schedule: cors('https://portal.unn.ru/ruzapi/schedule/group/{groupId}?start={start}&finish={end}&lng=1')
}

const KIND_COLORS = {
    262: '#B3E185',
    263: '#78D2FF',
    264: '#FFC26B'
}

function loadSchedule(groupId, begin, end, consumer) {
    fetch(API_ENDPOINTS.schedule.replace('{groupId}', groupId).replace('{start}', begin).replace('{end}', end))
        .then(res => res.json())
        .then(data => consumer(data))
        .catch(err => consumer('Ошибка при загрузке расписания: ' + err));
}

function findGroups(label, consumer) {
    fetch(API_ENDPOINTS.groupSearch.replace('{label}', label))
        .then(res => res.json())
        .then(data => consumer(data))
        .catch(err => consumer('Ошибка при поиске группы: ' + err));
}

function handleGroupSelection(element) {
    localStorage.setItem('first_run', false);
    localStorage.setItem('group_id', element.dataset.id);
    localStorage.setItem('group_label', element.dataset.label);
    dismissModal();
    reinitialize(true);
}

function showGroupPrompt() {
    document.getElementById('modal-date-picker').style.display = 'none';
    document.getElementById('modal-group-picker').style.display = 'block';
    document.getElementById('modal').style.display = 'block';
    const input = document.getElementById('groupLabelInput');
    if (input.dataset.handled) return;
    const suggestions = document.getElementById('groupSuggestions');
    input.addEventListener('input', e => {
        if (e.target.value.length < 7) return;
        findGroups(e.target.value, (res) => {
            if (!Array.isArray(res)) {
                alert('Ошибка при получении списка групп: ' + res);
            } else {
                suggestions.innerHTML = '';
                for (let group of res) {
                    suggestions.innerHTML += `
                        <div
                            class="groupSuggestion selectable"
                            data-id="${group.id}"
                            data-label="${group.label}"
                            onclick="handleGroupSelection(this)">
                                <b>${group.label}</b><br>
                                ${group.description}
                        </div>`
                }
            }
        })
    });
}

function reinitialize(useId = false) {
    if (localStorage.getItem('first_run') == null) {
        showGroupPrompt();
        return;
    }

    const schedule = document.getElementById('schedule');
    const handler = (groupId) => {
        loadSchedule(groupId, dateBegin, dateEnd, res => {
            if (!Array.isArray(res)) {
                alert('Ошибка при загрузке расписания: ' + res);
                return;
            }
            const days = {};
            for (let entry of res) {
                if (!(entry.date in days)) {
                    days[entry.date] = [];
                }
                const lessons = days[entry.date];
                lessons.push(entry);
            }
            schedule.innerHTML = '';

            for (let date in days) {
                schedule.innerHTML += `<div class="date-header">${russianDate(date)}</div>`;
                let scheduleGroup = '';
                for (let lesson of days[date]) {
                    scheduleGroup += `
                        <div class="schedule-entry">
                            <div class="lesson-timing">
                                <div class="lesson-block" style="background: ${KIND_COLORS[lesson.kindOfWorkOid]}">
                                    ${lesson.lessonNumberStart}
                                </div>
                                ${lesson.beginLesson}<br>
                                ${lesson.endLesson}
                            </div>
                            <div class="lesson-details">
                                <div class="lesson-title">${lesson.discipline}</div>
                                <div class="lesson-kind">${lesson.kindOfWork}</div>
                                <div class="lesson-auditorium"><span class="material-icons">location_on</span> ${lesson.auditorium} (${lesson.building})</div>
                                <div class="lesson-stream"><span class="material-icons">directions_walk</span> ${lesson.stream}</div>
                                <div class="lesson-lecturer"><span class="material-icons">person</span> ${lesson.lecturer.replace('!', '')} (${lesson.lecturer_rank.toLowerCase().replace('!', '')})</div>
                            </div>
                        </div>`
                    ;
                }
                schedule.innerHTML += `<div class="schedule-group">${scheduleGroup}</div>`;
            }
            document.getElementById('header-title').innerText = localStorage.getItem('group_label');
        });
    };

    if (useId) {
        handler(localStorage.getItem('group_id'));
    } else {
        findGroups(localStorage.getItem('group_label'), groups => {
            if (groups.length === 0) {
                alert('Группа не найдена');
                return;
            }
            if (groups.length !== 1) {
                alert('Поиск группы завершился неоднозначно');
                return;
            }
            handler(groups[0].id);
        });
    }
}

window.addEventListener('load', () => {
    reinitialize();
    document.addEventListener('click', (e) => {
        if (e.target.id === 'modal' && localStorage.getItem('first_run') != null) {
            dismissModal();
        } else if (e.target.parentElement.className === 'lesson-details') {
            alert(e.target.innerText.includes(' ') ? e.target.innerText.substring(e.target.innerText.indexOf(' ') + 1) : e.target.innerText);
        }
    }, false);
});