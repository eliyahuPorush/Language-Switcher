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
    '.': 'ץ',

    "ש": "a",
    "ל": "k",
    "ו": "u",
    "ם": "o",
    "פ": "p",
    "ן": "i",
    "ט": "y",
    "א": "t",
    "ר": "r",
    "ק": "e",
    "'": "w",
    "/": "q",
    "ד": "s",
    "ג": "d",
    "כ": "f",
    "ע": "g",
    "י": "h",
    "ח": "j",
    "ך": "l",
    "ף": ";",
    "ז": "z",
    "ס": "x",
    "ב": "c",
    "ה": "v",
    "נ": "b",
    "מ": "n",
    "צ": "m",
    "ת": ",",
    "ץ": "."
}
let inputs = Array.prototype.slice.call(document.querySelectorAll('input'));

inputs.forEach(input => {
    input.addEventListener('select', ev => {
        if(ev.value !== '') {
            const iconId = "language-switcher-id-606060";
            let icon = document.querySelector(`#${iconId}`);
            if (!icon) {
                icon = createSwitcherIcon(input);
                icon.id = iconId;
                // Add click event to remove the icon
                icon.addEventListener('click', function() {
                    const selectedText = window.getSelection().toString();
                    input.value = flipLetters(selectedText);
                    icon.parentNode.removeChild(icon);
                });

                // Append the icon to the input element
                input.parentNode.appendChild(icon);
            }
        }
    })
})

function flipLetters(text) {
    return text.split('').map(c => chars[c] ?? c).join('');
}

function createSwitcherIcon(input) {
    const icon = document.createElement('img');

    // Calculate position of the icon
    const selection = window.getSelection().getRangeAt(0).getBoundingClientRect();
    const inputRect = input.getBoundingClientRect();
    const offsetX = selection.left - inputRect.left + selection.width;
    const offsetY = selection.top - inputRect.top;

    // Set the position of the icon
    icon.style.top = offsetY + 'px';
    icon.style.left = offsetX + 'px';
    icon.src = chrome.runtime.getURL('images/switch-icon.png');
    icon.style.width = '20px';
    icon.style.height = '20px';

    return icon;
}
