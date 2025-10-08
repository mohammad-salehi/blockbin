import moment from "jalali-moment"
export function JalaliCalendar (time) {

    if (time.toString().length === 10) {
        time = time * 1000;  // تبدیل تایم استمپ 10 رقمی به 13 رقمی
    }
    
    
    const date = new Date(time)
    
    const year = moment(time).locale('fa').format('YYYY')
    let month = moment(time).locale('fa').format('MM')
    let day = moment(time).locale('fa').format('DD')
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    if (month < 1) {
        month = 1
    } else if (month > 12) {
        month = 12
    }

    if (day < 1) {
        day = 1
    } else if (day > 31) {
        day = 31
    }

    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}