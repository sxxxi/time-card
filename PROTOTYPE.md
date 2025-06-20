[Link](https://developer.mozilla.org/en-US/play?id=%2BpVpA%2FnOyyRoTfR%2F%2BbJg7TBDIzEwg0mRGj4vnFUkvCy3xwHOrsRg1R3x6w6dfY7D7lHkYueq%2FVWLyG3e)
```html
<div id="app">
  <div id="item-outlet"></div>
  <button type="button" id="item-add">Add</button>
</div>

<template id="item-template">
  <div class="item">
    <div class="item-content">This is an item.</div>
  </div>
</template>

```

```css
:root {
  --accent: indigo;
  --secondary: mediumpurple;
  --on-accent: lavender;
  --border-radius: 0.3rem;
}

#app {
  display: flex;
  flex-direction: column;
  background-color: lavender;
  height: 100%;
  gap: 8px;
  padding: 8px;
}

#item-outlet {
  min-height: 10rem;
  background-color: var(--secondary);
  border-radius: var(--border-radius);
  transition: all 0.3s;
  overflow: hidden;
}

#item-add {
  background-color: var(--accent);
  color: var(--on-accent);
  border: none;
  border-radius: var(--border-radius);
  padding: 0.7rem;
  flex-grow: 0;
  align-self: end;
}

.item {
  max-height: 0;
  background-color: var(--accent);
  color: var(--on-accent);
  overflow: hidden;
  transition: all 0.3s;
  overflow: hidden;
}

.item-content {
  padding: 50px;
}

.slide-in {
  max-height: 10rem;
}

.slide-out {
  max-height: 0rem;
}

```

```js
window.addEventListener("DOMContentLoaded", () => {
  const itemOutlet = document.getElementById("item-outlet");
  const addButton = document.getElementById("item-add");

  addButton.addEventListener("click", () => {
    const frag = cloneTemplate("item-template");
    const root = frag.children[0];

    itemOutlet.appendChild(frag);
    root.offsetHeight; // Force reflow!!!
    root.classList.add("slide-in");

    setTimeout(() => {
      root.addEventListener("transitionend", () => {
        console.log("killing");
        root.remove();
      });

      root.classList.add("slide-out");
    }, 3000);
  });
});

/**
 * @returns {DocumentFragment}
 */
function cloneTemplate(id) {
  const itemTemplate = document.getElementById(id);
  return itemTemplate.content.cloneNode(true);
}

```
