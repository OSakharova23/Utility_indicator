export function FindPrefix(words, str) {
    let count = 0;
    let i = 0;
    while (i < words.length) {
        const word = words[i];
        if (str.startsWith(word)) {
            count++;
        }
        i++;
    }
    return count;
}

export function isPalindrome1(stroka) {
    const str = String(stroka).replace(/\s/g, "").toLowerCase();
    const s = str;
    let left = 0;
    let right = s.length - 1;
    let isPalindrome = true;
    do {
        if (s[left] !== s[right]) {
            isPalindrome = false;
            break;
        }
        left++;
        right--;
    } while (left < right);
    return isPalindrome;
}

export function isPalindrom2(stroka) {
    const s = String(stroka).replace(/\s/g, "").toLowerCase();
    const charMap = {};
    const length = s.length;
    for (let i = 0; i < Math.floor(length / 2); i++) {
        charMap[i] = {
            left: s[i],
            right: s[length - 1 - i]
        };
    }
    const bad_smbl = new Set();
    for (let key in charMap) {
        if (charMap[key].left !== charMap[key].right) {
            bad_smbl.add(key);
        }
    }
    return bad_smbl.size === 0;
}