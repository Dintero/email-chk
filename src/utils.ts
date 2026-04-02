export const emailRegex = new RegExp(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    "i",
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

    let tmp: string;
    let i: number;
    let j: number;
    let prev: number;
    let val: number;

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
                val = Math.min(row[j - 1] + 1, Math.min(prev + 1, row[j] + 1));
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
    const host = new URL(website).hostname;
    const parts = host.split(".");
    const scnd = parts[parts.length - 2];
    const tld = parts[parts.length - 1].split(":")[0];
    return `${scnd}.${tld}`;
};

export const getTLD = (domain?: string): string | undefined => {
    if (!domain) {
        return;
    }
    const parts = domain.split(".");
    return [...parts].slice(1).join(".");
};

export const validateTLD = (tld: string, validTlds: string[]): boolean => {
    return validTlds.indexOf(tld) > -1;
};

/**
 * Check if the last part of the domain is missing a TLD
 * @param email Email address
 * @param tlds List of TLDs to check against
 * @param knownDomains Optional list of known email domains (e.g. ["gmail.com"]) used to
 *   avoid incorrect multi-part TLD completions for well-known providers
 * @returns Suggested email address with valid TLD if there's missing a TLD
 */
export const checkTLD = (
    email: string,
    tlds: string[],
    knownDomains: string[] = [],
): string => {
    const [username, domain] = email.split("@");
    const tld = getTLD(domain);
    const domainBase = domain.split(".")[0];

    if (!tld) {
        return `${username}@${domainBase}.${tlds[0]}`;
    }

    if (validateTLD(tld, tlds)) {
        return "";
    }

    // If the base name matches a known provider, suggest that known domain rather than
    // a multi-part TLD completion (e.g. gmail.co → gmail.com, not gmail.co.uk).
    const knownDomain = knownDomains.find(
        (d) => d.split(".")[0] === domainBase,
    );
    if (knownDomain) {
        return `${username}@${knownDomain}`;
    }

    // If the current TLD is a leading segment of a valid multi-part TLD, replace it.
    // e.g. tld="co" with tlds=["co.uk"] → strip "co", prepend "co.uk".
    const partialMatch = tlds.find((t) => t.startsWith(`${tld}.`));
    if (partialMatch) {
        const base = domain.slice(0, domain.length - tld.length - 1);
        return `${username}@${base}.${partialMatch}`;
    }

    return `${username}@${domain}.${tlds[0]}`;
};
