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

  test("Create an empty member list", () => {
    expect(list.getItems()).toEqual([]);
  });

  test("add a member", () => {
    list.add(member);
    expect(list.getItems()).toEqual([member]);
  });

  test("reject a duplicated document id", () => {
    list.add(member);
    expect(() => list.add(member)).toThrow();
  });

  test("total fees", () => {
    list.add(member);
    expect(list.totalFees()).toBe(1500);
  });

  test("update the fee of a member", () => {
  list.add(member);
  list.updateFee("12345678", 2000);
  expect(member.monthlyFee).toBe(2000);
});

test("reject updating the fee of an unknown document id", () => {
  list.add(member);
  expect(() => list.updateFee("99999999", 2000)).toThrow();
});

test("total fees with discount", () => {
  member.discount = 20;
  list.add(member);
  expect(list.totalDiscounted()).toBe(1200);
});

test("total fees of an empty list is zero", () => {
  expect(list.totalFees()).toBe(0);
  expect(list.totalDiscounted()).toBe(0);
});
});
