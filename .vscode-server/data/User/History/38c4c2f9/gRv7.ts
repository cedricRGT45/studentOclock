export default function moyenne(arr : number[]) {
    return Math.round(
        arr.reduce((acc, sum) => acc + sum ) / arr.length
    )
}