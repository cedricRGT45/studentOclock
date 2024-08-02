export default function moyenne(arr : number[]) {
    return Math.round(
        arr[0] + arr[1] + arr[2].reduce((acc, sum) => acc +sum )
    )
}