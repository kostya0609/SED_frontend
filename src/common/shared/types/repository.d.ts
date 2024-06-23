export interface FilterDTO {
    count: number
    page: number
    filter: {
        [key: string]: object
    },
    sort: {
        name: string,
        order: string
    },
}