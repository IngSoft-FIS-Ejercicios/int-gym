
import { describe, expect, test, beforeEach } from "vitest";
import { Member } from "../Member.ts";
import { MemberList } from "../MemberList.ts";

describe("MemberList", () => {
  let list: MemberList;
  let member: Member;

  beforeEach(() => {
    list = new MemberList();
    member = new Member({
      name: "Ana Pérez",
      documentId: "12345678",
      plan: "full",
      monthlyFee: 1500,
    });
  });

  test("create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("return a copy of the member collection", () => {
    list.add(member);
    const items = list.getItems() as Member[];
    items.pop();
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    const duplicate = new Member({
      name: "Otra persona",
      documentId: "12345678",
      plan: "basic",
      monthlyFee: 1000,
    });
    expect(() => list.add(duplicate)).toThrow(
      "Ya existe un socio con ese documento.",
    );
  });

  test("total fees is zero for an empty list", () => {
    expect(list.totalFees()).toBe(0);
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted is zero for an empty list", () => {
    expect(list.totalDiscounted()).toBe(0);
  });

  test("total discounted with no discounts", () => {
    list.add(member);
    expect(list.totalDiscounted()).toBe(1500);
  });

  test("total discounted with two members", () => {
    const discounted = new Member({
      name: "Bruno",
      documentId: "98765432",
      plan: "basic",
      monthlyFee: 1000,
      discount: 10,
    });
    member.monthlyFee = 500;
    list.add(discounted);
    list.add(member);
    expect(list.totalDiscounted()).toBe(1400);
    expect(list.totalFees()).toBe(1500);
  });

  test("total discounted with full discount", () => {
    member.discount = 100;
    list.add(member);
    expect(list.totalDiscounted()).toBe(0);
  });

  test("update fee for an existing document", () => {
    list.add(member);
    list.updateFee("12345678", 2000);
    expect(member.monthlyFee).toBe(2000);
    expect(list.totalFees()).toBe(2000);
    expect(list.totalDiscounted()).toBe(2000);
  });

  test("update fee of the correct member", () => {
    const other = new Member({
      name: "Bruno",
      documentId: "98765432",
      plan: "basic",
      monthlyFee: 1000,
      discount: 20,
    });
    list.add(member);
    list.add(other);
    list.updateFee("98765432", 500);
    expect(member.monthlyFee).toBe(1500);
    expect(other.monthlyFee).toBe(500);
    expect(list.totalDiscounted()).toBe(1900);
  });

  test("reject an update for a missing document", () => {
    list.add(member);
    expect(() => list.updateFee("99999999", 2000)).toThrow(
      "No existe un socio con ese documento.",
    );
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject a zero fee through updateFee", () => {
    list.add(member);
    expect(() => list.updateFee("12345678", 0)).toThrow(
      "La cuota mensual debe ser mayor que 0.",
    );
    expect(member.monthlyFee).toBe(1500);
  });

  test("reject a NaN fee through updateFee", () => {
    list.add(member);
    expect(() =>
      list.updateFee("12345678", Number.NaN),
    ).toThrow();
    expect(member.monthlyFee).toBe(1500);
  });
});
