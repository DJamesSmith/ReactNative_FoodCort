import moment from "moment"

export const formatDate = (createdAt) => {
    const now = moment()
    const date = moment(createdAt)
    const diffInSeconds = now.diff(date, 'seconds')
    const diffInMinutes = now.diff(date, 'minutes')
    const diffInHours = now.diff(date, 'hours')

    if (diffInSeconds < 60) {
        return `Today, few seconds ago...`
    } else if (diffInMinutes < 60) {
        return `Today, ${diffInMinutes === 1 ? 'a minute' : `${diffInMinutes} minutes`} ago`
    } else if (diffInHours < 24) {
        return `Today, ${diffInHours === 1 ? 'an hour' : `${diffInHours} hours`} ago`
    } else if (now.isSame(date, 'day')) {
        return `Today, ${date.format('h:mm A')}`
    } else if (now.subtract(1, 'days').isSame(date, 'day')) {
        return `Yesterday, ${date.format('h:mm A')}`
    } else {
        return date.format(`DD MMM 'YY, h:mm A`)
    }
}