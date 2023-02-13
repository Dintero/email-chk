"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDomain = exports.levenstein = exports.validateEmail = exports.isEmail = exports.emailRegex = void 0;
exports.emailRegex = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'i');
const isEmail = (email) => {
    return exports.emailRegex.test(email);
};
exports.isEmail = isEmail;
const validateEmail = (email) => {
    if (!email) {
        return false;
    }
    return (0, exports.isEmail)(email);
};
exports.validateEmail = validateEmail;
const levenstein = (a, b) => {
    if (a.length === 0)
        return b.length;
    if (b.length === 0)
        return a.length;
    let tmp, i, j, prev, val;
    if (a.length > b.length) {
        tmp = a;
        a = b;
        b = tmp;
    }
    const row = Array(a.length + 1);
    for (i = 0; i <= a.length; i++) {
        row[i] = i;
    }
    for (i = 1; i <= b.length; i++) {
        prev = i;
        for (j = 1; j <= a.length; j++) {
            if (b[i - 1] === a[j - 1]) {
                val = row[j - 1];
            }
            else {
                val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }
    return row[a.length];
};
exports.levenstein = levenstein;
const getDomain = (website) => {
    if (!website) {
        return;
    }
    try {
        const host = new URL(website).hostname;
        const parts = host.split('.');
        const scnd = parts[parts.length - 2];
        const tld = parts[parts.length - 1].split(':')[0];
        return `${scnd}.${tld}`;
    }
    catch (error) {
        throw error;
    }
};
exports.getDomain = getDomain;
//# sourceMappingURL=utils.js.map