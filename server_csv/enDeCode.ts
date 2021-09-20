
export const encodeComma = (word: string) => {
    let returnedWord = word.replace(/\,/g, "⍪")
    // debug
    console.log('encode: '+ returnedWord)
    return returnedWord
}

export const decodeComma = (word: string) => {
    let returnedWord = word.replace(/\⍪/g, ",")
    // debug
    console.log('encode: '+ returnedWord)
    return returnedWord
}