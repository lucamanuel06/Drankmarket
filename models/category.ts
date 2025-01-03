export type Category = {
    id: string
    name: string
    barId: string
    color: string
}

export const mapResponseToCategory = (response: any): Category => {
    return {
        id: response["id"],
        name: response["name"],
        barId: response["bar_id"],
        color: response["color"],
    }
}
