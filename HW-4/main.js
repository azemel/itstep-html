window.addEventListener("load", async () => {

  if (!("character" in document.forms)) {
    console.error("Форма character не найдена!");
    return;
  }

  const form = document.forms["character"];

  let template = null;
  try {
    const request = await fetch("template.html");
    template = await request.text();
  } catch (e) {
    console.log("Не удается загрузить шаблон! Скорее всего страница открыта не в режиме сервера");
  }
  
  if (!("roll" in form.elements) || form.elements["roll"].tagName !== "BUTTON") {
    console.error("Кнопка roll не найдена!");    
  } else {
    const buttonRoll = form.elements["roll"];

    const stats = ["intelligence", "constitution", "charisma"];
  
    buttonRoll.addEventListener("click", () => {
      stats.forEach(stat => {
        if (!(stat in form.elements)) {
          console.error(`Поле ${stats} не найдено!`);
          return;
        }
  
        form.elements[stat].value = rollTheDice(4, 6, 3);
      })
    });  
  }

  form.addEventListener("submit", async ev => {
    ev.preventDefault();
  
    const data = {};
    Object.entries(document.forms["character"].elements)
      .filter(([k]) => isNaN(k))
      .forEach(([k,v]) => {
        const t = v.type;
        data[k] = t === "file" ? v.files : (t === "checkbox" ? v.checked : v.value);
      });
  
    const model = await character(data);  
    console.log(model);  

    let html
    if (template) {
      html = template.replace(/\{([^}]+)\}/g, (s, k) => model[k]);
    } else {
      html = `<pre>${JSON.stringify(model, (k, v) => k === "avatar" ? "ФАЙЛ" : v , 2)}</pre>`
    }
    document.body.innerHTML = html;
  });
});

const imageAsDataUrl = async file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onload = ev => resolve(ev.target.result);
  reader.onerror = ev => reject(reader.error);
  reader.readAsDataURL(file);
});

const character = async data => {
  let avatar = null;
  if (data.avatar && data.avatar[0] instanceof File) {
    avatar = await imageAsDataUrl(data.avatar[0]);
  }
  
  const inventory = Object
    .entries(data)
    .filter(([k, v]) => k.startsWith("inventory-") && v)
    .map(([k]) => k.slice(10))
    .join(", ");

  return {
    ...data,
    inventory,
    avatar,
  };
}

const rollTheDice = (n, sides, take = n) => {
  const rolls = Array(n)
    .fill(0)
    .map(() => Math.ceil(Math.random() * sides))
    .sort((a, b) => b - a)
    .slice(0, take)
    .reduce((sum, i) => sum + i, 0);

  return rolls;
}