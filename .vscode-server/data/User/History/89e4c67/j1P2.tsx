export function groupByKey<T, K extends keyof T>(array: T[], key: K) {
    // Range par groupes
    const sorted = array.reduce((groups, current) => ({
        ...groups,
        [String(current[key])]: [...(groups[String(current[key])] || []), current]
    }), 
    {} as Record<string, T[]>)

    return sorted;
}