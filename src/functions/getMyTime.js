export const GetMyTime = (index) => {

    const date = new Date(index * 1000)
    let month
    let day
    let hour
    let minute

    if (String(Number(date.getMonth()) + 1).length === 1) {
      month = `0${date.getMonth() + 1}`
    } else {
      month = date.getMonth() + 1
    }

    if (String(date.getDate()).length === 1) {
      day = `0${date.getDate()}`
    } else {
      day = date.getDate()
    }

    if (String(date.getHours()).length === 1) {
      hour = `0${date.getHours()}`
    } else {
      hour = date.getHours()
    }

    if (String(date.getMinutes()).length === 1) {
      minute = `0${date.getMinutes()}`
    } else {
      minute = date.getMinutes()
    }

    return ({
      year: date.getFullYear(),
      month,
      day,
      hour,
      minute
    })
  }