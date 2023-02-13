"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailChk = void 0;
const utils_1 = require("./utils");
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
const EmailChk = (configuration) => {
    const config = {
        ...defaultConfig,
        ...configuration,
    };
    return (email, opt) => {
        if (!email) {
            return '';
        }
        const [username, domain] = email.split('@');
        const possibleDomains = [
            ...config.domains,
            ...(opt && opt.website ? [(0, utils_1.getDomain)(opt.website)] : []),
        ].filter(d => d !== undefined);
        if (!domain || possibleDomains.indexOf(domain) > -1)
            return '';
        const suggestion = possibleDomains.reduce((acc, suggestedDomain) => {
            const dist = (0, utils_1.levenstein)(domain.split('.')[0], suggestedDomain.split('.')[0]);
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
        return '';
    };
};
exports.EmailChk = EmailChk;
exports.default = exports.EmailChk;
//# sourceMappingURL=index.js.map