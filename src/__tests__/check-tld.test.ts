import { checkTLD } from '../utils';

describe(checkTLD, () => {
    it('should suggest a TLD at the end if it does not exist in the array', () => {
        const tlds = ['com', 'net', 'org'];
        expect(checkTLD('test@gmail.com', tlds)).toBe(''); // valid, no suggestion
        expect(checkTLD('test@gmail.co', tlds)).toBe('test@gmail.co.com');
        expect(checkTLD('test@gmail.nee', tlds)).toBe('test@gmail.nee.com');
        expect(checkTLD('test@gmail.net', tlds)).toBe(''); // valid, no suggestion
        expect(checkTLD('test@gmail.og', tlds)).toBe('test@gmail.og.com');
        expect(checkTLD('test@gmail.org', tlds)).toBe(''); // valid, no suggestion
        expect(checkTLD('test@skola.goteborg', tlds)).toBe('test@skola.goteborg.com');
        expect(checkTLD('test@oslo.kommune', tlds)).toBe('test@oslo.kommune.com');
    });
});
