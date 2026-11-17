
import type { Member } from "./Member.ts";

export class MemberList {
  #items: Member[] = [];

  add(item: Member): void {
    const exists = this.#items.some(
      (member) => member.documentId === item.documentId,
    );
    if (exists) {
      throw new Error("Ya existe un socio con ese documento.");
    }
    this.#items.push(item);
  }

  updateFee(documentId: string, fee: number): void {
    const member = this.#items.find(
      (item) => item.documentId === documentId,
    );

    if (!member) {
      throw new Error("No existe un socio con ese documento.");
    }

    member.monthlyFee = fee;
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce(
      (total, member) => total + member.monthlyFee,
      0,
    );
  }

  totalDiscounted(): number {
    return this.#items.reduce(
      (total, member) =>
        total + member.monthlyFee * (1 - member.discount / 100),
      0,
    );
  }
}
