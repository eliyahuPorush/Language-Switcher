const chars = {
    "a": "ש",
    'k': 'ל',
    'u': 'ו',
    'o': 'ם',
    'p': 'פ',
    'i': 'ן',
    'y': 'ט',
    't': 'א',
    'r': 'ר',
    'e': 'ק',
    'w': '\'',
    'q': '/',
    's': 'ד',
    'd': 'ג',
    'f': 'כ',
    'g': 'ע',
    'h': 'י',
    'j': 'ח',
    'l': 'ך',
    ';': 'ף',
    'z': 'ז',
    'x': 'ס',
    'c': 'ב',
    'v': 'ה',
    'b': 'נ',
    'n': 'מ',
    'm': 'צ',
    ',': 'ת',
    '.': 'ץ'
}
const spellCheckApi = 'https://api.languagetool.org/v2/check';
let inputs = document.querySelectorAll('input');
inputs.forEach(input => {
    input.addEventListener('input', ev => {
        if (input.value.split(' ').length >= 2 && input.value.endsWith(' ')) {
            axios({
                url: spellCheckApi,
                method: 'get',
                responseType: 'json',
                params: {
                    'language': 'en-US',
                    'text': ev.target.value
                }
            }).then(res => {
                const matches = res?.data?.matches.find(m => m?.shortMessage === 'Spelling mistake');
                if (matches?.length >= 2) {
                    convertText(ev.target.value, input);
                }
            })
        }

    })
})


function convertText(sourceText, input) {
    let converted = [];
    sourceText?.split('').forEach(char => {
        if (!char.match(/[ א-ת]/)) {
            converted.push(chars[char.toLowerCase()])
        } else {
            converted.push(char);
        }
    });
    input.value = converted.join('')
}
