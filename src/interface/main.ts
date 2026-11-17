
import { Member, PLAN_LABELS } from "../domain/Member.ts";
import type { MemberData, Plan } from "../domain/Member.ts";
import { MemberList } from "../domain/MemberList.ts";
import mockMembers from "../data/members.json";

const memberList = new MemberList();

const inpName = document.getElementById("inp-name") as HTMLInputElement | null;
const inpDocument = document.getElementById(
  "inp-document",
) as HTMLInputElement | null;
const selPlan = document.getElementById("sel-plan") as HTMLSelectElement | null;
const inpFee = document.getElementById("inp-fee") as HTMLInputElement | null;
const inpDiscount = document.getElementById(
  "inp-discount",
) as HTMLInputElement | null;
const btnAdd = document.getElementById("btn-add") as HTMLButtonElement | null;
const errorContainer = document.getElementById(
  "error-container",
) as HTMLDivElement | null;
const errorMsg = document.getElementById(
  "error-msg",
) as HTMLParagraphElement | null;
const membersList = document.getElementById(
  "members-list",
) as HTMLDivElement | null;
const membersEmptyMsg = document.getElementById(
  "members-empty-msg",
) as HTMLParagraphElement | null;
const membersCount = document.getElementById(
  "members-count",
) as HTMLSpanElement | null;
const inpTotalMembers = document.getElementById(
  "inp-total-members",
) as HTMLInputElement | null;
const inpTotalFees = document.getElementById(
  "inp-total-fees",
) as HTMLInputElement | null;
const inpTotalDiscounted = document.getElementById(
  "inp-total-discounted",
) as HTMLInputElement | null;

function clearInputs(): void {
  if (inpName && inpDocument && inpFee && inpDiscount) {
    inpName.value = "";
    inpDocument.value = "";
    inpFee.value = "";
    inpDiscount.value = "";
  }
}

function showError(message: string): void {
  if (errorContainer && errorMsg) {
    errorMsg.textContent = message;
    errorContainer.classList.remove("d-none");
  }
}

function hideError(): void {
  errorContainer?.classList.add("d-none");
}

function createText(text: string): HTMLParagraphElement {
  const paragraph = document.createElement("p");
  paragraph.className = "card-text mb-1";
  paragraph.textContent = text;
  return paragraph;
}

function createFeeEditor(member: Member): HTMLDivElement {
  const group = document.createElement("div");
  group.className = "input-group input-group-sm";
  const input = document.createElement("input");
  input.className = "form-control";
  input.type = "number";
  input.value = String(member.monthlyFee);
  input.setAttribute("aria-label", `Nueva cuota de ${member.name}`);

  const button = document.createElement("button");
  button.type = "button";
  button.className = "btn btn-outline-secondary";
  button.textContent = "Guardar cuota";

  button.addEventListener("click", () => {
    try {
      memberList.updateFee(member.documentId, Number(input.value));
      updateList();
      updateTotals();
    } catch {
      input.classList.add("is-invalid");
    }
  });

  input.addEventListener("input", () =>
    input.classList.remove("is-invalid"),
  );

  group.append(input, button);
  return group;
}

function createCard(member: Member): HTMLDivElement {
  const column = document.createElement("div");
  column.className = "col";

  const card = document.createElement("div");
  card.className = "card h-100";

  const body = document.createElement("div");
  body.className = "card-body";

  const title = document.createElement("h5");
  title.className = "card-title";
  title.textContent = member.name;

  const planBadge = document.createElement("span");
  planBadge.className = "badge text-bg-secondary mb-2";
  planBadge.textContent = PLAN_LABELS[member.plan];

  const lines = [
    `Documento: ${member.documentId}`,
    `Cuota mensual: $${member.monthlyFee}`,
  ];

  if (member.discount > 0) {
    lines.push(`Descuento: ${member.discount}%`);
  }

  body.append(title, planBadge, ...lines.map(createText));

  const footer = document.createElement("div");
  footer.className = "card-footer bg-transparent";
  footer.append(createFeeEditor(member));

  card.append(body, footer);
  column.append(card);
  return column;
}

function updateList(): void {
  if (membersList && membersEmptyMsg && membersCount) {
    const members = memberList.getItems();
    membersCount.textContent = String(members.length);
    membersEmptyMsg.classList.toggle("d-none", members.length > 0);
    membersList.replaceChildren(...members.map(createCard));
  }
}

function updateTotals(): void {
  if (inpTotalMembers && inpTotalFees && inpTotalDiscounted) {
    inpTotalMembers.value = String(memberList.getItems().length);
    inpTotalFees.value = String(memberList.totalFees());
    inpTotalDiscounted.value = String(memberList.totalDiscounted());
  }
}

function loadMockData(): void {
  for (const data of mockMembers as MemberData[]) {
    memberList.add(new Member(data));
  }
}

loadMockData();
updateList();
updateTotals();

if (btnAdd && inpName && inpDocument && selPlan && inpFee && inpDiscount) {
  btnAdd.addEventListener("click", () => {
    try {
      const member = new Member({
        name: inpName.value,
        documentId: inpDocument.value,
        plan: selPlan.value as Plan,
        monthlyFee: Number(inpFee.value),
        discount: inpDiscount.value === "" ? 0 : Number(inpDiscount.value),
      });

      memberList.add(member);
      hideError();
      clearInputs();
      updateList();
      updateTotals();
    } catch (error) {
      showError(error instanceof Error ? error.message : String(error));
    }
  });
}
