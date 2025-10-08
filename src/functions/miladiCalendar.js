export function MiladiCalendar (time) {

    if (time.toString().length === 10) {
        time = time * 1000;  // تبدیل تایم استمپ 10 رقمی به 13 رقمی
    }
    
    
    const date = new Date(time)
    
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    
    return {
        year,
        month,
        day,
        hour,
        minute,
        second
    }
}