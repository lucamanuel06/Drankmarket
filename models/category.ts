export type Category = {
    id: string
    name: string
    barId: string
}

export const mapResponseToCategory = (response: any): Category => {
    return {
        id: response["id"],
        name: response["name"],
        barId: response["bar_id"],
    }
}
