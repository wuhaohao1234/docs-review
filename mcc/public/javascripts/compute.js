
function nowTime() {
    let times = new Date().toLocaleString('en-US', { hour12: false }).split(" ")
    let time = times[1]
    let mdy = times[0]
    mdy = mdy.split('/')
    // console.log(mdy)
    let month = `0${mdy[0]}`;
    let day = `0${mdy[1]}`
    let year = parseInt(mdy[2])
    month = month.slice(month.length - 2, month.length)
    day = day.slice(day.length - 2, day.length)
    // console.log(month, day)
    return year + '-' + month + '-' + day + ' ' + time
}
module.exports = { nowTime }
