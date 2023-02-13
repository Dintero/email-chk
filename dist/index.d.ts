/**
 * @typedef {string} EmailDomain
 * String representing an email domain (e.g. gmail.com)
 */
export type EmailDomain = string;
/**
 * @typedef {Object} EmailChkConfig
 * @property {EmailDomain[]} [domains] - List of email domains to check against
 * @property {number} [levensteinThreshold] - Levenstein distance threshold for suggesting a typo
 * Configuration object for the EmailChk producer function
 */
export type EmailChkConfig = {
    domains?: EmailDomain[];
    levensteinThreshold?: number;
};
/**
 * @typedef {Object} SuggestionMetric
 * @property {number} dist - Levenstein distance between the given domain and the suggested domain
 * @property {EmailDomain} suggestedDomain - Suggested domain
 */
export type SuggestionMetric = {
    dist: number;
    suggestedDomain: EmailDomain | null;
};
/**
 * @typedef {Object} CheckOptions
 * @property {string} [website] - Website to check against
 * Options for the EmailChk consumer function
 */
export type CheckOptions = {
    website?: string;
};
/**
 * Email domain checker
 * @param configuration - Configuration object for the EmailChk producer function
 * @returns EmailChk consumer function
 */
export declare const EmailChk: (configuration?: EmailChkConfig) => (email?: string, opt?: CheckOptions) => EmailDomain;
export default EmailChk;
