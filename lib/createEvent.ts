export const createOption = (parentId, text, state, setState, id?) => {
  const childText = document.createElement('div');
  const button = document.createElement('span');

  button.innerHTML = 'ㅡ';
  childText.innerHTML = text + ' ';
  childText.appendChild(button);
  childText.className = 'h6';
  if (id) childText.setAttribute('id', id);
  document.getElementById(`nav-${parentId}`).appendChild(childText);
  setState([...state, text]);

  button.onclick = () => {
    setState(list(parentId, text));
    console.log(button.parentElement.parentElement);
    button.parentElement.parentElement.removeChild(button.parentElement);
  };
};
const list = (parentId, text) => {
  let list = [];
  document
    .getElementById(`nav-${parentId}`)
    .childNodes.forEach(
      (element) =>
        element.childNodes[0].textContent.trim() != text &&
        list.push(element.childNodes[0].textContent.trim())
    );
  return list;
};
