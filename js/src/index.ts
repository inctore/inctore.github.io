export function onContactLoad() {
  const button = document.getElementById("contactSendButton");
  button.addEventListener("click", contactSend, false);
}

function createNotificationList(messages: string[]): HTMLUListElement {
  const ret = document.createElement("ul");
  for (const message of messages) {
    const ch = document.createElement("li");
    ch.innerText = message;
    ret.appendChild(ch);
  }
  return ret;
}

async function contactSend(e: any) {
  e.preventDefault();
  const formEl = document.getElementById("contactForm") as HTMLFormElement;
  const data = new URLSearchParams();
  for (const pair of new FormData(formEl)) {
    data.append(pair[0], pair[1].toString());
  }
  const name = data.get("entry.93707027");
  const email = data.get("entry.325718895");

  const note = document.getElementById("contactNotfication");
  for (const ch of note.children) {
    note.removeChild(ch);
  }

  const notifications = [] as string[];
  if (name === "") {
    notifications.push("お名前を入力して下さい");
  }
  if (email === "") {
    notifications.push("メールアドレスを入力して下さい");
  }
  if (notifications.length > 0) {
    note.appendChild(createNotificationList(notifications));
    return;
  }

  const url =
    "https://docs.google.com/forms/d/e/1FAIpQLScRgUE_SNZhxSgkddiMjiU8biXClYXVoD0C85Hc8oTYjKsZSQ/formResponse";
  const ret = await fetch(url, {
    method: "post",
    body: data,
  });
  console.log("contactSend", ret.status);
  note.innerText = ret.status.toString();
}
