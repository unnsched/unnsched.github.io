// naive locale-independent implementation

const daysOfWeek = [
    'понедельник',
    'вторник',
    'среда',
    'четверг',
    'пятница',
    'суббота',
    'воскресенье'
]

const months = [
    'января',
    'февраля',
    'марта',
    'апреля',
    'мая',
    'июня',
    'июля',
    'августа',
    'сентября',
    'октября',
    'ноября',
    'декабря'
]

export default function formatDate(date: Date) {
    return `${daysOfWeek[date.getDay() - 1]}, ${date.getDate()} ${months[date.getMonth()]}`
}