const createServiceElement = (service) => {
    let template = document.createElement('template');
    template.innerHTML = `<div class="price">
        <span>${service.name}</span>
        <div>
            ${service.range === true ? '<span>starts at ' : ''}
            <span class="amt">${service.price}</span>
            ${service.range === true ? '</span>' : ''}
            <a class="book" href="/book.html?id=${service.id}">Book</a>
        </div>
    </div>`;

    return template.content.firstChild;
};

const getById = (id) => {
    return document.getElementById(id);
};

document.addEventListener('DOMContentLoaded', async() => {
    const URL = 'https://l5h09ej4ek.execute-api.ap-southeast-2.amazonaws.com/default/getServices';

    let resp = await fetch(URL);
    let result = await resp.json();
    console.log(result);

    let serviceGrid = getById('service-grid');
    console.log('serviceGrid', serviceGrid);

    result.forEach(r => {
        let divCategory = document.createElement('div');
        divCategory.setAttribute('class', 'service');

        let divHeader = document.createElement('h1');
        divHeader.innerText = r.name;
        divCategory.appendChild(divHeader);

        r.services.forEach(s => divCategory.appendChild(createServiceElement(s)));
        
        serviceGrid.appendChild(divCategory);
    });
});
