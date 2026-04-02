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

    test("should correctly handle multi-part TLDs", () => {
        const tlds = ["co.uk", "com.au", "org.uk", "com"];

        // Valid multi-part TLD → no suggestion
        assert.equal(checkTLD("test@bbc.co.uk", tlds), "");
        assert.equal(checkTLD("test@example.com.au", tlds), "");
        assert.equal(checkTLD("test@example.org.uk", tlds), "");

        // Valid single-part TLD in the same list → no suggestion
        assert.equal(checkTLD("test@gmail.com", tlds), "");

        // Partial leading segment → replace with full multi-part TLD
        assert.equal(
            checkTLD("test@person.co", ["co.uk"]),
            "test@person.co.uk",
        );
        assert.equal(
            checkTLD("test@example.com", ["com.au"]),
            "test@example.com.au",
        );
        assert.equal(
            checkTLD("test@example.org", ["org.uk"]),
            "test@example.org.uk",
        );

        // Known provider with partial segment → use known domain, not co.uk
        assert.equal(
            checkTLD("test@gmail.co", ["co.uk"], ["gmail.com", "yahoo.com"]),
            "test@gmail.com",
        );
        assert.equal(
            checkTLD("test@yahoo.co", ["co.uk"], ["gmail.com", "yahoo.com"]),
            "test@yahoo.com",
        );

        // No partial match → fall back to appending tlds[0]
        assert.equal(
            checkTLD("test@example.xyz", ["co.uk", "com"]),
            "test@example.xyz.co.uk",
        );

        // No TLD at all with a multi-part TLD list
        assert.equal(checkTLD("test@example", ["co.uk"]), "test@example.co.uk");
    });
});
