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

  updateFee(_documentId: string, _fee: number): void {
    const member = this.#items.find((value) => _documentId === value.documentId);
    if(member === undefined) {
      throw new Error(`no existe un miembro con el documento ${_documentId}`)
    }
    member.monthlyFee = _fee;
  }

  getItems(): readonly Member[] {
    return [...this.#items];
  }

  totalFees(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFee, 0);
  }

  totalDiscounted(): number {
    return this.#items.reduce((total, member) => total + member.monthlyFeeWithDiscount, 0);
  }
}
