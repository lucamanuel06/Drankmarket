import { Drink } from "@/models/drink"

export function getDrinksByCategory(drinks: Array<Drink>, categoryId: string): Array<Drink> {
    return drinks.filter((drink) => drink.categoryId === categoryId)
}

export function groupDrinksByCategory(drinks: Array<Drink>): Map<string, Array<Drink>> {
    let categories = new Set<string>(drinks.map((drink) => drink.categoryId))
    let map = new Map<string, Array<Drink>>()
    categories.forEach((category) => {
        map.set(category, getDrinksByCategory(drinks, category))
    })
    return map
}
