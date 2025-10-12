export function flipToCapital(text : string){
    if(text ==="") return ""
    const flippedText = text.charAt(0).toUpperCase() + text.slice(1)
    return flippedText
}