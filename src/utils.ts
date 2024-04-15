export const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    'i'
);

export const isEmail = (email: string): boolean => {
    return emailRegex.test(email);
};

export const validateEmail = (email: string | undefined): boolean => {
    if (!email) {
        return false;
    }
    return isEmail(email);
};

export const levenstein = (a: string, b: string): number => {
    if (a.length === 0) return b.length;
    if (b.length === 0) return a.length;

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
            } else {
                val = Math.min(
                    row[j - 1] + 1,
                    Math.min(
                        prev + 1,
                        row[j] + 1
                    )
                );
            }
            row[j - 1] = prev;
            prev = val;
        }
        row[a.length] = prev;
    }

    return row[a.length];
};

export const getDomain = (website?: string): string | undefined => {
    if (!website) {
        return;
    }
    try {
        const host = new URL(website).hostname;
        const parts = host.split('.');
        const scnd = parts[parts.length - 2];
        const tld = parts[parts.length - 1].split(':')[0];
        return `${scnd}.${tld}`;
    } catch (error) {
        throw error;
    }
};

export const getTLD = (domain?: string): string | undefined => {
    if (!domain) {
        return;
    }
    try {
        const parts = domain.split('.');
        return parts[parts.length - 1];
    } catch (error) {
        throw error;
    }
};

export const validateTLD = (tld: string, validTlds: string[]): boolean => {
    return validTlds.indexOf(tld) > -1;
};

export const closestMatchTLD = (tld: string, validTlds: string[]): string => {
    return validTlds.reduce<string>((acc, validTld) => {
        const dist = levenstein(tld, validTld);
        if (dist < levenstein(acc, tld)) {
            return validTld;
        }
        return acc;
    }, validTlds[0]);
};
