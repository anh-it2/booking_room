
export type Time = {
    years: number,
    months: number,
    days: number,
    hours: number,
    minutes: number
}
export const formatTimeRange = (start?: Time, end?: Time): string => {
    if (!start || !end) return ""

    const toDate = (t: Time) => {
        const date = new Date()
        date.setFullYear(t.years)
        date.setMonth(t.months - 1)
        date.setDate(t.days)
        date.setHours(t.hours, t.minutes, 0, 0)
        return date
    }

    const startDate = toDate(start)
    const endDate = toDate(end)

    const sameDay =
        startDate.getFullYear() === endDate.getFullYear() &&
        startDate.getMonth() === endDate.getMonth() &&
        startDate.getDate() === endDate.getDate()

    if (sameDay) {
        // Hiển thị ngày 1 lần ở đầu
        const dateStr = startDate.toLocaleDateString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        })
        const startStr = startDate.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        })
        const endStr = endDate.toLocaleTimeString("vi-VN", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        })
        return `${dateStr}, ${startStr} → ${endStr}`
    } else {
        // Nếu khác ngày thì hiển thị đầy đủ cả 2
        const startStr = startDate.toLocaleString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        })
        const endStr = endDate.toLocaleString("vi-VN", {
        weekday: "long",
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
        })
        return `${startStr} → ${endStr}`
    }
}