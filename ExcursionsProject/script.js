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

let dragState = {
    active: false,
    element: null,
    offsetX: 0,
    offsetY: 0,
    originalParent: null,
    originalNextSibling: null
};

function mouseHandlerAttr(event) {
    alert('Обробник через атрибут (onclick) спрацював на: ' + event.currentTarget.id);
}

function mouseHandlerProp(event) {
    alert('Обробник через властивість (element.onclick) спрацював на: ' + event.currentTarget.id);
}

function onHoverChange(event) {
    const hoverItem = event.target.closest('.hover-item');
    if (!hoverItem) return;
    const hoverNote = document.getElementById('hover-note');
    if (event.type === 'mouseover') {
        hoverItem.classList.add('hovered');
        
    } else if (event.type === 'mouseout') {
        hoverItem.classList.remove('hovered');
        
    }
}

function startDrag(event) {
    const target = event.target.closest('#drag-source');
    if (!target) return;
    event.preventDefault();
    dragState.active = true;
    dragState.element = target;
    dragState.originalParent = target.parentNode;
    dragState.originalNextSibling = target.nextSibling;
    const rect = target.getBoundingClientRect();
    dragState.offsetX = event.clientX - rect.left;
    dragState.offsetY = event.clientY - rect.top;
    target.classList.add('dragging');
    target.style.position = 'fixed';
    target.style.left = `${rect.left}px`;
    target.style.top = `${rect.top}px`;
    target.style.zIndex = 1000;
    document.body.appendChild(target);
}

function moveDrag(event) {
    if (!dragState.active || !dragState.element) return;
    event.preventDefault();
    const element = dragState.element;
    element.style.left = `${event.clientX - dragState.offsetX}px`;
    element.style.top = `${event.clientY - dragState.offsetY}px`;
}

function stopDrag(event) {
    if (!dragState.active || !dragState.element) return;
    const element = dragState.element;
    const dropTarget = document.getElementById('drop-target');
    const oldPointerEvents = element.style.pointerEvents;
    element.style.pointerEvents = 'none';
    const under = document.elementFromPoint(event.clientX, event.clientY);
    element.style.pointerEvents = oldPointerEvents;
    const dropSuccess = dropTarget.contains(under);

    element.classList.remove('dragging');
    element.style.position = 'static';
    element.style.left = '';
    element.style.top = '';
    element.style.zIndex = '';

    dropTarget.classList.remove('drop-success', 'drop-fail');
    if (dropSuccess) {
        dropTarget.appendChild(element);
        dropTarget.classList.add('drop-success');
        document.getElementById('drag-note').textContent = 'Елемент успішно перетягнуто до зони.';
    } else {
        if (dragState.originalNextSibling) {
            dragState.originalParent.insertBefore(element, dragState.originalNextSibling);
        } else {
            dragState.originalParent.appendChild(element);
        }
        dropTarget.classList.add('drop-fail');
        document.getElementById('drag-note').textContent = 'Скиньте елемент у зону, щоб завершити перетягування.';
    }

    dragState.active = false;
    dragState.element = null;
}

function multiHandlerA(event) {
<<<<<<< HEAD
    console.log('multiHandlerA currentTarget:', event.currentTarget);
=======
>>>>>>> 728302c (Bug fixes)
    const element = event.currentTarget;
    element.style.backgroundColor = '#ff0000';
    setTimeout(() => { element.style.backgroundColor = ''; }, 30);
}

function multiHandlerB(event) {
    alert('multiHandlerB: другий обробник під час однієї події');
}

const objectEventHandler = {
    handleEvent(event) {
<<<<<<< HEAD
        alert('objectEventHandler.handleEvent: подія ' + event.type + ' на ' + event.currentTarget.id);
        console.log('objectEventHandler currentTarget:', event.currentTarget);
=======
        alert('Подія "' + event.type + '" на сторінці екскурсій (' + event.currentTarget.id + ')');
>>>>>>> 728302c (Bug fixes)
    }
};

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

    const btnProp = document.getElementById('btn-prop');
    const btnMulti = document.getElementById('btn-multi');
    const btnHandleObj = document.getElementById('btn-handle-obj');
    const btnRemoveHandleObj = document.getElementById('btn-remove-handle-obj');
    const highlightList = document.getElementById('highlight-list');
    const menu = document.getElementById('menu');

    if (btnProp) {
        btnProp.onclick = mouseHandlerProp;
    }

    if (btnMulti) {
        btnMulti.addEventListener('click', multiHandlerA);
        btnMulti.addEventListener('click', multiHandlerB);
    }

    if (btnHandleObj) {
        btnHandleObj.addEventListener('click', objectEventHandler);
    }

    if (btnRemoveHandleObj && btnHandleObj) {
        btnRemoveHandleObj.addEventListener('click', () => {
            btnHandleObj.removeEventListener('click', objectEventHandler);
            alert('Обробник-об\'єкт було видалено з кнопки.');
        });
    }

    if (highlightList) {
        highlightList.onclick = function (event) {
            const li = event.target.closest('li');
            if (!li || !highlightList.contains(li)) return;
            const previous = highlightList.querySelector('.highlight');
            if (previous) previous.classList.remove('highlight');
            li.classList.add('highlight');
<<<<<<< HEAD
            console.log('event.target:', event.target, 'event.currentTarget:', event.currentTarget);
=======
>>>>>>> 728302c (Bug fixes)
        };
    }

    if (menu) {
        menu.addEventListener('click', (event) => {
            const button = event.target.closest('button');
            if (!button || !menu.contains(button)) return;
            const action = button.dataset.action;
<<<<<<< HEAD
            if (action === 'dialog') {
                dialogWithUser();
            } else if (action === 'dev') {
                showDeveloperInfo('Теренчук', 'Дмитро');
            } else if (action === 'bg') {
                const color = button.dataset.color || '#fff2cc';
                changeBackgroundTemporary(color, 5);
=======
            if (action === 'kyiv') {
                alert('Київ: Софійський собор, Поділ, Хрещатик');
            } else if (action === 'lviv') {
                alert('Львів: Площа Ринок, Опера, Високий Замок');
            } else if (action === 'odesa') {
                alert('Одеса: Дерибасівська, Приморський бульвар, Оперний театр');
>>>>>>> 728302c (Bug fixes)
            }
        });

        const behavioralElements = menu.querySelectorAll('[data-behavior]');
        behavioralElements.forEach((element) => {
            if (element.dataset.behavior === 'tooltip') {
                element.addEventListener('mouseenter', () => {
                    element.dataset.origTitle = element.title || '';
                    element.title = 'Натисніть, щоб виконати дію';
                });
                element.addEventListener('mouseleave', () => {
                    element.title = element.dataset.origTitle || '';
                });
            }
        });
    }

    const hoverArea = document.getElementById('hover-area');
    const dragSource = document.getElementById('drag-source');
    const dropTarget = document.getElementById('drop-target');

    if (hoverArea) {
        hoverArea.addEventListener('mouseover', onHoverChange);
        hoverArea.addEventListener('mouseout', onHoverChange);
    }

    if (dragSource) {
        dragSource.addEventListener('mousedown', startDrag);
        document.addEventListener('mousemove', moveDrag);
        document.addEventListener('mouseup', stopDrag);
    }
});