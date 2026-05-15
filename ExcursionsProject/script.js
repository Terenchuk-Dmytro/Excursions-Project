function dialogWithUser() {
    const userName = prompt('Як вас звати?', 'Гість');
    const name = userName ? userName.trim() : 'Гість';
    const wantsTour = confirm(`Привіт, ${name}! Бажаєте отримати інформацію про екскурсії?`);

    if (!wantsTour) {
        alert(`Добре, ${name}. Ви можете пізніше повернутися до нашої сторінки.`);
        return;
    }

    const daysInput = prompt('Скільки днів ви плануєте екскурсію?', '3');
    let days = parseInt(daysInput, 10);
    if (Number.isNaN(days) || days < 1) {
        days = 1;
    }

    let itinerary = `План на ${days} днів:\n`;
    for (let i = 1; i <= days; i += 1) {
        itinerary += `День ${i}: відвідання привабливих місць\n`;
    }

    alert(itinerary);
}

function showDeveloperInfo(lastName, firstName, position = 'Розробник') {
    alert(`Розробник: ${lastName} ${firstName}\nПосада: ${position}`);
}

function compareStrings(str1, str2) {
    if (str1 === null || str2 === null) {
        alert('Порівняння відмінено.');
        return;
    }

    let bigger;
    if (str1.length > str2.length) {
        bigger = str1;
    } else if (str2.length > str1.length) {
        bigger = str2;
    } else {
        bigger = str1 >= str2 ? str1 : str2;
    }

    alert(`Більший рядок: ${bigger}`);
}

function changeBackgroundTemporary(color, durationSeconds) {
    const body = document.body;
    const originalInlineColor = body.style.backgroundColor;
    const originalComputedColor = window.getComputedStyle(body).backgroundColor;
    body.style.backgroundColor = color;
    setTimeout(() => {
        body.style.backgroundColor = originalInlineColor || originalComputedColor;
    }, durationSeconds * 1000);
}

function redirectToPage(url) {
    location.href = url;
}

function demoDomManipulation() {
    const output = document.getElementById('js-output');
    output.innerHTML = '';

    const title = document.getElementById('main-title');
    title.innerHTML = 'Екскурсії Україною - JS оновлено';
    title.classList.add('highlight');

    const links = document.querySelectorAll('.nav-link');
    if (links.length > 0) {
        links[0].outerHTML = '<a class="nav-link highlight" href="kyiv.html">Екскурсія Києвом (оновлено)</a>';
    }

    const textNode = document.createTextNode('Це текстовий вузол для nodeValue.');
    textNode.nodeValue = 'Текст змінено через nodeValue.';

    const newParagraph = document.createElement('p');
    newParagraph.textContent = 'Цей параграф додано через createElement і textContent.';
    newParagraph.classList.add('highlight');
    newParagraph.append(textNode);
    output.append(newParagraph);

    const demoTarget = document.getElementById('dom-demo-target');
    const firstChildParagraph = document.createElement('p');
    firstChildParagraph.textContent = 'Цей елемент додано методом prepend.';
    firstChildParagraph.classList.add('highlight');
    demoTarget.prepend(firstChildParagraph);

    const afterParagraph = document.createElement('p');
    afterParagraph.textContent = 'Цей елемент додано методом after.';
    afterParagraph.classList.add('highlight');
    demoTarget.after(afterParagraph);

    const replacementParagraph = document.createElement('p');
    replacementParagraph.textContent = 'Цей елемент замінює перший створений блок.';
    replacementParagraph.classList.add('highlight');
    if (demoTarget.firstChild) {
        demoTarget.firstChild.replaceWith(replacementParagraph);
    }

    const removedElement = document.createElement('p');
    removedElement.textContent = 'Цей елемент буде видалений через remove().' ;
    removedElement.classList.add('highlight');
    demoTarget.append(removedElement);
    removedElement.remove();

    const note = document.createElement('p');
    note.textContent = `Знайдено ${links.length} посилань на сторінці за допомогою querySelectorAll.`;
    note.classList.add('highlight');
    output.append(note);
}

window.addEventListener('DOMContentLoaded', () => {
    const buttonDialog = document.getElementById('btn-dialog');
    const buttonDevInfo = document.getElementById('btn-dev-info');
    const buttonCompare = document.getElementById('btn-compare');
    const buttonBg = document.getElementById('btn-bg');
    const buttonRedirect = document.getElementById('btn-redirect');
    const buttonDomDemo = document.getElementById('btn-dom-demo');

    if (buttonDialog) {
        buttonDialog.addEventListener('click', dialogWithUser);
    }

    if (buttonDevInfo) {
        buttonDevInfo.addEventListener('click', () => {
            showDeveloperInfo('Теренчук', 'Дмитро');
        });
    }

    if (buttonCompare) {
        buttonCompare.addEventListener('click', () => {
            const firstString = prompt('Введіть перший рядок:', 'Україна');
            const secondString = prompt('Введіть другий рядок:', 'Київ');
            compareStrings(firstString, secondString);
        });
    }

    if (buttonBg) {
        buttonBg.addEventListener('click', () => {
            changeBackgroundTemporary('#fff2cc', 30);
        });
    }

    if (buttonRedirect) {
        buttonRedirect.addEventListener('click', () => {
            redirectToPage('kyiv.html');
        });
    }

    if (buttonDomDemo) {
        buttonDomDemo.addEventListener('click', demoDomManipulation);
    }
});