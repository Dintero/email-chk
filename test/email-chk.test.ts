import * as assert from "node:assert/strict";
import { describe, test } from "node:test";

import EmailChk from "../src/index";

describe(EmailChk.name, () => {
    test("should return empty string if email is undefined", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk(), "");
    });

    test("should return empty string if email is empty string", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk(""), "");
    });

    test("should return empty string if email is valid", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@test.com"), "");
    });

    test("should suggest gmail when any gmail typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@gman.com"), "test@gmail.com");
        assert.equal(emailChk("test@gmain.com"), "test@gmail.com");
        assert.equal(emailChk("test@gmaal.com"), "test@gmail.com");
        assert.equal(emailChk("test@gmael.com"), "test@gmail.com");
        assert.equal(emailChk("test@gmaild.com"), "test@gmail.com");
        assert.equal(emailChk("test@ggmail.com"), "test@gmail.com");
        assert.equal(emailChk("something@gmail.comk"), "something@gmail.com");
        assert.equal(emailChk("something@gamil.com"), "something@gmail.com");
    });

    test("should suggest hotmail when any hotmail typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@hotman.com"), "test@hotmail.com");
        assert.equal(emailChk("test@hotmeal.com"), "test@hotmail.com");
        assert.equal(emailChk("test@hotwhail.com"), "test@hotmail.com");
        assert.equal(emailChk("test@homail.com"), "test@hotmail.com");
        assert.equal(emailChk("test@hotmal.com"), "test@hotmail.com");
        assert.equal(emailChk("test@hotmain.com"), "test@hotmail.com");
    });

    test("should suggest yahoo when any yahoo typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@yaho.com"), "test@yahoo.com");
        assert.equal(emailChk("test@yaahoo.com"), "test@yahoo.com");
        assert.equal(emailChk("test@jahoo.com"), "test@yahoo.com");
        assert.equal(emailChk("test@yahod.com"), "test@yahoo.com");
        assert.equal(emailChk("test@yehoo.com"), "test@yahoo.com");
        assert.equal(emailChk("test@yihjo.com"), "test@yahoo.com");
    });

    test("should suggest outlook when any outlook typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@outloon.com"), "test@outlook.com");
        assert.equal(emailChk("test@outmsook.com"), "test@outlook.com");
        assert.equal(emailChk("test@outlok.com"), "test@outlook.com");
        assert.equal(emailChk("test@auslook.com"), "test@outlook.com");
        assert.equal(emailChk("test@outlo0k.com"), "test@outlook.com");
        assert.equal(emailChk("test@outlck.com"), "test@outlook.com");
        assert.equal(emailChk("test@oulook.com"), "test@outlook.com");
        assert.equal(emailChk("test@ouulcok.com"), "test@outlook.com");
    });

    test("should suggest protonmail when any protonmail typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@protnomail.com"), "test@protonmail.com");
        assert.equal(emailChk("test@protonman.com"), "test@protonmail.com");
        assert.equal(emailChk("test@protonmal.com"), "test@protonmail.com");
        assert.equal(emailChk("test@protnmail.com"), "test@protonmail.com");
        assert.equal(emailChk("test@protomail.com"), "test@protonmail.com");
    });

    test("should suggest icloud when any icloud typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@iclown.com"), "test@icloud.com");
        assert.equal(emailChk("test@iclodd.com"), "test@icloud.com");
        assert.equal(emailChk("test@ucloud.com"), "test@icloud.com");
        assert.equal(emailChk("test@iclou.com"), "test@icloud.com");
        assert.equal(emailChk("test@iclond.com"), "test@icloud.com");
    });

    test("should suggest live when any live typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@liv.com"), "test@live.com");
        assert.equal(emailChk("test@liev.com"), "test@live.com");
        assert.equal(emailChk("test@lie.com"), "test@live.com");
        assert.equal(emailChk("test@liie.com"), "test@live.com");
    });

    test("should suggest online when any online typo is inputted", () => {
        const emailChk = EmailChk();
        assert.equal(emailChk("test@online.com"), "test@online.no");
        assert.equal(emailChk("test@onlin.no"), "test@online.no");
        assert.equal(emailChk("test@onlive.nm"), "test@online.no");
        assert.equal(emailChk("test@onlien.nio"), "test@online.no");
        assert.equal(emailChk("test@onlie.no"), "test@online.no");
    });

    test("should make use of only set config", () => {
        let emailChk = EmailChk({
            domains: ["test.com"],
        });
        assert.equal(emailChk("test@gmail.com"), "");
        assert.equal(emailChk("test@dintero.com"), "");
        assert.equal(emailChk("test@tet.com"), "test@test.com");
        emailChk = EmailChk({
            domains: ["dintero.com"],
        });
        assert.equal(emailChk("test@dinero.com"), "test@dintero.com");
        assert.equal(emailChk("test@dinttro.com"), "test@dintero.com");
    });

    test("should use website as additional domain", () => {
        const emailChk = EmailChk();
        assert.equal(
            emailChk("test@diner.com", {
                website: "https://www.dintero.com",
            }),
            "test@dintero.com",
        );
    });

    test("should run the checkTLD call when tld list is defined in consumer", () => {
        const emailChk = EmailChk();
        assert.equal(
            emailChk("test@arbitrary.long.domain", {
                checkMissingTLD: ["com"],
            }),
            "test@arbitrary.long.domain.com",
        );
        assert.equal(
            emailChk("test@oslo.kommune", {
                checkMissingTLD: ["no"],
            }),
            "test@oslo.kommune.no",
        );
    });
});
