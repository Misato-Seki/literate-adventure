export const DateFormat = ({ date }: { date: string }) => {
    const formatedDate = new Date(date).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })

    return formatedDate
}