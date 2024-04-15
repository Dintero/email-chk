import EmailChk from '..';

describe(EmailChk, () => {
    it('should return empty string if email is undefined', () => {
        const emailChk = EmailChk();
        expect(emailChk()).toBe('');
    });

    it('should return empty string if email is empty string', () => {
        const emailChk = EmailChk();
        expect(emailChk('')).toBe('');
    });

    it('should return empty string if email is valid', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@test.com')).toBe('');
    });

    it('should suggest gmail when any gmail typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@gman.com')).toBe('test@gmail.com');
        expect(emailChk('test@gmain.com')).toBe('test@gmail.com');
        expect(emailChk('test@gmaal.com')).toBe('test@gmail.com');
        expect(emailChk('test@gmael.com')).toBe('test@gmail.com');
        expect(emailChk('test@gmaild.com')).toBe('test@gmail.com');
        expect(emailChk('test@ggmail.com')).toBe('test@gmail.com');
        expect(emailChk('something@gmail.comk')).toBe('something@gmail.com');
        expect(emailChk('something@gamil.com')).toBe('something@gmail.com');
    });

    it('should suggest hotmail when any hotmail typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@hotman.com')).toBe('test@hotmail.com');
        expect(emailChk('test@hotmeal.com')).toBe('test@hotmail.com');
        expect(emailChk('test@hotwhail.com')).toBe('test@hotmail.com');
        expect(emailChk('test@homail.com')).toBe('test@hotmail.com');
        expect(emailChk('test@hotmal.com')).toBe('test@hotmail.com');
        expect(emailChk('test@hotmain.com')).toBe('test@hotmail.com');
    });

    it('should suggest yahoo when any yahoo typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@yaho.com')).toBe('test@yahoo.com');
        expect(emailChk('test@yaahoo.com')).toBe('test@yahoo.com');
        expect(emailChk('test@jahoo.com')).toBe('test@yahoo.com');
        expect(emailChk('test@yahod.com')).toBe('test@yahoo.com');
        expect(emailChk('test@yehoo.com')).toBe('test@yahoo.com');
        expect(emailChk('test@yihjo.com')).toBe('test@yahoo.com');
    });

    it('should suggest outlook when any outlook typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@outloon.com')).toBe('test@outlook.com');
        expect(emailChk('test@outmsook.com')).toBe('test@outlook.com');
        expect(emailChk('test@outlok.com')).toBe('test@outlook.com');
        expect(emailChk('test@auslook.com')).toBe('test@outlook.com');
        expect(emailChk('test@outlo0k.com')).toBe('test@outlook.com');
        expect(emailChk('test@outlck.com')).toBe('test@outlook.com');
        expect(emailChk('test@oulook.com')).toBe('test@outlook.com');
        expect(emailChk('test@ouulcok.com')).toBe('test@outlook.com');
    });

    it('should suggest protonmail when any protonmail typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@protnomail.com')).toBe('test@protonmail.com');
        expect(emailChk('test@protonman.com')).toBe('test@protonmail.com');
        expect(emailChk('test@protonmal.com')).toBe('test@protonmail.com');
        expect(emailChk('test@protnmail.com')).toBe('test@protonmail.com');
        expect(emailChk('test@protomail.com')).toBe('test@protonmail.com');
    });

    it('should suggest icloud when any icloud typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@iclown.com')).toBe('test@icloud.com');
        expect(emailChk('test@iclodd.com')).toBe('test@icloud.com');
        expect(emailChk('test@ucloud.com')).toBe('test@icloud.com');
        expect(emailChk('test@iclou.com')).toBe('test@icloud.com');
        expect(emailChk('test@iclond.com')).toBe('test@icloud.com');
    });

    it('should suggest live when any live typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@liv.com')).toBe('test@live.com');
        expect(emailChk('test@liev.com')).toBe('test@live.com');
        expect(emailChk('test@lie.com')).toBe('test@live.com');
        expect(emailChk('test@liie.com')).toBe('test@live.com');
    });

    it('should suggest online when any online typo is inputted', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@online.com')).toBe('test@online.no');
        expect(emailChk('test@onlin.no')).toBe('test@online.no');
        expect(emailChk('test@onlive.nm')).toBe('test@online.no');
        expect(emailChk('test@onlien.nio')).toBe('test@online.no');
        expect(emailChk('test@onlie.no')).toBe('test@online.no');
    });

    it('should make use of only set config', () => {
        let emailChk = EmailChk({
            domains: ['test.com'],
        });
        expect(emailChk('test@gmail.com')).toBe('');
        expect(emailChk('test@dintero.com')).toBe('');
        expect(emailChk('test@tet.com')).toBe('test@test.com');
        emailChk = EmailChk({
            domains: ['dintero.com'],
        });
        expect(emailChk('test@dinero.com')).toBe('test@dintero.com');
        expect(emailChk('test@dinttro.com')).toBe('test@dintero.com');
    });

    it('should use website as additional domain', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@diner.com', {
            website: 'https://www.dintero.com',
        })).toBe('test@dintero.com');
    });

    it('should use tlds when validating email', () => {
        const emailChk = EmailChk();
        expect(emailChk('test@skola.goteborg')).toBe('test@skola.com');
        expect(emailChk('test@skola.se')).toBe('');
        expect(emailChk('test@gmail.se')).toBe('test@gmail.com');
        expect(emailChk('test@dintero.co.uk')).toBe('test@dintero.dk');
        expect(emailChk('test@netto.finland')).toBe('test@netto.fi');
        expect(emailChk('test@checkout.dintero')).toBe('test@checkout.no');
    });
});
