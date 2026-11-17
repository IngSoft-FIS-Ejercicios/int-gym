
import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import type { Plan } from "../Member.ts";

describe("Member", () => {
  let member: Member;

  beforeEach(() => {
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("store name", () => {
    expect(member.name).toBe("Ana Pérez");
  });

  test("trim name", () => {
    member.name = "  Ana  ";
    expect(member.name).toBe("Ana");
  });

  test("store document id", () => {
    expect(member.documentId).toBe("12345678");
  });

  test("trim document id", () => {
    member.documentId = "  12345678  ";
    expect(member.documentId).toBe("12345678");
  });

  test("store plan", () => {
    expect(member.plan).toBe("full");
  });

  test("store monthly fee", () => {
    expect(member.monthlyFee).toBe(1500);
  });

  test("update monthly fee", () => {
    member.monthlyFee = 2200;
    expect(member.monthlyFee).toBe(2200);
  });

  test("reject an empty name", () => {
    expect(() => (member.name = "   ")).toThrow(
      "El nombre no puede estar vacío.",
    );
  });

  test("reject a document id with letters", () => {
    expect(() => (member.documentId = "12a45")).toThrow(
      "El documento debe contener solo dígitos.",
    );
  });

  test("reject an empty document id", () => {
    expect(() => (member.documentId = "  ")).toThrow(
      "El documento debe contener solo dígitos.",
    );
  });

  test("reject a monthly fee of zero", () => {
    expect(() => (member.monthlyFee = 0)).toThrow(
      "La cuota mensual debe ser mayor que 0.",
    );
  });

  test("reject a negative monthly fee", () => {
    expect(() => (member.monthlyFee = -10)).toThrow();
  });

  test("reject an invalid plan", () => {
    expect(() => (member.plan = "gold" as Plan)).toThrow(
      "Debe seleccionar un plan válido.",
    );
  });

  test("reject a monthly fee that is NaN", () => {
    expect(() => (member.monthlyFee = Number.NaN)).toThrow();
  });

  test("reject an infinite monthly fee", () => {
    expect(
      () => (member.monthlyFee = Number.POSITIVE_INFINITY),
    ).toThrow();
  });

  test("use discount zero by default", () => {
    expect(member.discount).toBe(0);
  });

  test("accept discount in constructor", () => {
    const discounted = new Member({
      name: "Bruno",
      documentId: "12345679",
      plan: "basic",
      monthlyFee: 1000,
      discount: 10,
    });
    expect(discounted.discount).toBe(10);
  });

  test("accept zero percent discount", () => {
    member.discount = 10;
    member.discount = 0;
    expect(member.discount).toBe(0);
  });

  test("accept full discount", () => {
    member.discount = 100;
    expect(member.discount).toBe(100);
  });

  test("reject negative discount", () => {
    expect(() => (member.discount = -1)).toThrow(
      "El descuento debe ser un entero entre 0 y 100.",
    );
    expect(member.discount).toBe(0);
  });

  test("reject discount greater than 100", () => {
    expect(() => (member.discount = 101)).toThrow();
  });

  test("reject fractional discount", () => {
    expect(() => (member.discount = 10.5)).toThrow();
  });

  test("reject NaN discount", () => {
    expect(() => (member.discount = Number.NaN)).toThrow();
  });

  test("reject infinite discount", () => {
    expect(
      () => (member.discount = Number.POSITIVE_INFINITY),
    ).toThrow();
  });

  test("reject invalid discount in constructor", () => {
    expect(
      () =>
        new Member({
          name: "Bruno",
          documentId: "12345679",
          plan: "basic",
          monthlyFee: 1000,
          discount: -5,
        }),
    ).toThrow("El descuento debe ser un entero entre 0 y 100.");
  });

  test("show member without discount as text", () => {
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500",
    );
  });

  test("show member with discount as text", () => {
    member.discount = 10;
    expect(member.toString()).toBe(
      "Ana Pérez (doc. 12345678) - Plan Completo - $1500 - Descuento: 10%",
    );
  });
});
