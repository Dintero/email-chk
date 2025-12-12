import * as assert from "node:assert/strict";
import { describe, test } from "node:test";
import { checkTLD } from "../src/utils";

describe(checkTLD.name, () => {
    test("should suggest a TLD at the end if it does not exist in the array", () => {
        const tlds = ["com", "net", "org"];
        assert.equal(checkTLD("test@gmail.com", tlds), ""); // valid, no suggestion
        assert.equal(checkTLD("test@gmail.co", tlds), "test@gmail.co.com");
        assert.equal(checkTLD("test@gmail.nee", tlds), "test@gmail.nee.com");
        assert.equal(checkTLD("test@gmail.net", tlds), ""); // valid, no suggestion
        assert.equal(checkTLD("test@gmail.og", tlds), "test@gmail.og.com");
        assert.equal(checkTLD("test@gmail.org", tlds), ""); // valid, no suggestion
        assert.equal(
            checkTLD("test@skola.goteborg", tlds),
            "test@skola.goteborg.com",
        );
        assert.equal(
            checkTLD("test@oslo.kommune", tlds),
            "test@oslo.kommune.com",
        );
    });
});
