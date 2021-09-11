function getOperatorElement(operator) {
    const element = document.createElement('button');
    element.innerText = operator;
    return element;
}

function getOperatorComponent(operator, onSelected) {
    const element = getOperatorElement(operator);
    element.addEventListener('click', onSelected)
    return {
        element,
    }
}

export function getOperatorsListComponent(wrapper, onSelected) {
    const listComponent = { element: wrapper, currentOperator: undefined }
    const signs = ["+", "-", "/", "*", "=", "AC"];
    signs
        .map((sign) => getOperatorComponent(sign, () => {
            listComponent.currentOperator = sign;
            onSelected(sign)
        }))
        .map((component) => wrapper.appendChild(component.element))
    return listComponent;
}