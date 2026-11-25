const list = document.querySelector('#contacts');
const form = document.querySelector('#contact-form');
const count = document.querySelector('#count');
const message = document.querySelector('#message');

async function loadContacts() {
  list.innerHTML = '<p class="empty">Загружаем контакты…</p>';
  try {
    const response = await fetch('/api/contacts');
    if (!response.ok) throw new Error('API error');
    const contacts = await response.json();
    count.textContent = contacts.length;
    if (!contacts.length) {
      list.innerHTML = '<p class="empty">Пока нет контактов. Добавьте первого клиента выше.</p>';
      return;
    }
    list.innerHTML = '';
    contacts.forEach(contact => {
      const card = document.createElement('article');
      card.className = 'contact';
      const info = document.createElement('div');
      const name = document.createElement('h3');
      name.textContent = contact.name;
      const details = document.createElement('p');
      details.textContent = [contact.company, contact.email].filter(Boolean).join(' · ') || 'Дополнительная информация не указана';
      info.append(name, details);
      const remove = document.createElement('button');
      remove.className = 'delete';
      remove.textContent = 'Удалить';
      remove.addEventListener('click', () => deleteContact(contact.id));
      card.append(info, remove);
      list.append(card);
    });
  } catch {
    list.innerHTML = '<p class="empty">Не удалось загрузить контакты. Проверьте, запущены ли контейнеры.</p>';
  }
}

async function deleteContact(id) {
  const response = await fetch(`/api/contacts/${id}`, { method: 'DELETE' });
  if (response.ok) loadContacts();
  else message.textContent = 'Не удалось удалить контакт.';
}

form.addEventListener('submit', async event => {
  event.preventDefault();
  message.textContent = '';
  const data = Object.fromEntries(new FormData(form));
  try {
    const response = await fetch('/api/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error || 'Ошибка');
    form.reset();
    message.textContent = 'Контакт успешно добавлен.';
    loadContacts();
  } catch (error) {
    message.textContent = error.message || 'Не удалось добавить контакт.';
  }
});

document.querySelector('#refresh').addEventListener('click', loadContacts);
loadContacts();
