export default function moyenne(arr : number[]) {
    if(arr.length === 0){
        return 0
    }
    return Math.round(
        arr.reduce((acc, sum) => acc + sum) 
        / arr.length
    );
}