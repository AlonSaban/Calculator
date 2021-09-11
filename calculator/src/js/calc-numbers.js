function getNumberElement(number) {
    const element = document.createElement('button');
    element.innerText = number;
    return element;
}

function getNumberComponent(number, onSelected) {
    const element = getNumberElement(number);
    element.addEventListener('click', onSelected)
    return {
        element,
    }
}


export function getNumbersListComponent(wrapper, onSelected) {
    const listComponent = { element: wrapper, currentNumber: undefined }
    const signs = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
    signs
        .map((sign) => getNumberComponent(sign, () => {
            listComponent.currentNumber = sign;
            onSelected(sign)
        }))
        .map((component) => wrapper.appendChild(component.element))
    return listComponent;
}