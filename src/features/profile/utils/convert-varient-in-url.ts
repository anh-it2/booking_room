export function convertVarientInUrl(text: string | null){
    if(text === null) return
    return text.replaceAll('%20',' ')
}