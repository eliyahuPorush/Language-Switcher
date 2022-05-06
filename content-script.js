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
let inputs = Array.prototype.slice.call(document.querySelectorAll('input')).map(i => {
    return {
        element: i,
        rollbackIcon: false,
        originalText: ''
    }
});
let inputsOptions = [];
inputsOptions.length = inputs.length;


inputs.forEach(input => {
    input.element.addEventListener('input', ev => {
        if (input.element.value.split(' ').length >= 2 && input.element.value.endsWith(' ')) {
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
                    input.originalText = ev.target.value;
                    convertText(ev.target.value, input);
                }
            })
        }

    })
})


function convertText(sourceText, input) {
    const element = input.element;
    let converted = [];
    sourceText?.split('').forEach(char => {
        if (!char.match(/[ א-ת]/)) {
            converted.push(chars[char.toLowerCase()])
        } else {
            converted.push(char);
        }
    });
    element.value = converted.join('');
    addRollbackIcon(input);
}

function addRollbackIcon(input) {
    let icon;
    const id = 'language-switcher-icon-id';
    if (!input.rollbackIcon) {
        icon = document.createElement('i');
        icon.className = 'fa fa-refresh';
        icon.id = id;
        input.element.parentNode.append(icon);
        input.rollbackIcon = true;
    } else {
        icon = document.querySelector('#' + id);
    }
    icon.addEventListener('click', () => {
        input.element.value = input.originalText;
    });
}
