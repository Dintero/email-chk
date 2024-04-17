import { checkTLD, getDomain, levenstein } from './utils';

/**
 * @typedef {string} EmailDomain
 * String representing an email domain (e.g. gmail.com)
 */
export type EmailDomain = string;
/**
 * @typedef {Object} EmailChkConfig
 * @property {EmailDomain[]} [domains] - List of email domains to check against
 * @property {string[]} [tlds] - List of top level domains to check against
 * @property {number} [levensteinThreshold] - Levenstein distance threshold for suggesting a typo
 * Configuration object for the EmailChk producer function
 */
export type EmailChkConfig = {
    domains?: EmailDomain[]
    levensteinThreshold?: number
    tlds?: string[]
}
/**
 * @typedef {Object} SuggestionMetric
 * @property {number} dist - Levenstein distance between the given domain and the suggested domain
 * @property {EmailDomain} suggestedDomain - Suggested domain
 */
export type SuggestionMetric = {
    dist: number
    suggestedDomain: EmailDomain | null
}
/**
 * @typedef {Object} CheckOptions
 * @property {string} [website] - Website to check against
 * @property {string[]} [checkMissingTLD] - List of TLDs to check against, enabled if defined
 * Options for the EmailChk consumer function
 */
export type CheckOptions = {
    website?: string
    checkMissingTLD?: string[]
}


const defaultConfig = {
    domains: [
        'gmail.com',
        'yahoo.com',
        'hotmail.com',
        'outlook.com',
        'protonmail.com',
        'icloud.com',
        'live.com',
        'online.no',
    ],
    levensteinThreshold: 3,
};

/**
 * Email domain checker
 * @param configuration - Configuration object for the EmailChk producer function
 * @returns EmailChk consumer function
 */
export const EmailChk = (configuration?: EmailChkConfig) => {
    const config = {
        ...defaultConfig,
        ...configuration,
    };
    return (email?: string, opt?: CheckOptions): EmailDomain => {
        if (!email) {
            return '';
        }
        const [username, domain] = email.split('@');
        const possibleDomains = [
            ...config.domains,
            ...(opt && opt.website ? [getDomain(opt.website)] : []),
        ].filter(d => d !== undefined) as EmailDomain[];
        if (!domain || possibleDomains.indexOf(domain) > -1) return '';
        const suggestion = possibleDomains.reduce<SuggestionMetric>((acc, suggestedDomain) => {
            const dist = levenstein(domain.split('.')[0], suggestedDomain.split('.')[0]);
            if (dist < acc.dist) {
                return {
                    dist,
                    suggestedDomain,
                };
            }
            return acc;
        }, {
            dist: Number.MAX_SAFE_INTEGER,
            suggestedDomain: null,
        });

        if (suggestion.suggestedDomain && (suggestion.dist < config.levensteinThreshold)) {
            return `${username}@${suggestion.suggestedDomain}`;
        }

        if (opt && opt.checkMissingTLD) {
            return checkTLD(email, opt.checkMissingTLD);
        }

        return '';
    };
};

export default EmailChk;
