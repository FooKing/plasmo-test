//Verify Link and open url - setting currentTab will open in the current tab, otherwise it will open in a new tab.
export async function openURL(url, tabId, newTab) {
  try {
    let response = await fetch(url)
    if (response.status === 200) {
      if (newTab){
        await chrome.tabs.create({ url: url })
      } else {
        await chrome.tabs.update(tabId, { url: url });
      }
    } else {
      throw new Error(`Failed to fetch URL: ${url}`)
    }
  } catch (error) {
    throw error;
  }
}

//Copy from clipboard and return text, has to happen in a content script.
export async function copyFromClipboard() {
    return await navigator.clipboard.readText();
}

//Write into clipboard, has to happen in a content script.
export async function writeToClipboard(stringToWrite) {
    if (!stringToWrite) {
      console.log("Missing string to write to clipboard");
      return;
    }
    await navigator.clipboard.writeText(stringToWrite);
  }

  //Convert json to html and formats them in a pretty printable way.
export const prettyPrintJson = {
  toHtml: (thing) => {
    const htmlEntities = (string) => {
      return string
        .replace(/&/g,   '&amp;')
        .replace(/\\"/g, '&bsol;&quot;')
        .replace(/</g,   '&lt;')
        .replace(/>/g,   '&gt;');
    };

    const replacer = (match, p1, p2, p3, p4) => {
      const part = { indent: p1, key: p2, value: p3, end: p4 };
      const key = '<span class="json-key">';
      const val = '<span class="json-value">';
      const bool = '<span class="json-boolean">';
      const str = '<span class="json-string">';
      const isBool = ['true', 'false'].includes(part.value);
      const valSpan = /^"/.test(part.value) ? str : isBool ? bool : val;
      const findName = /"([\w]+)": |(.*): /;
      const indentHtml = part.indent || '';
      const keyName = part.key && part.key.replace(findName, '$1$2');
      const keyHtml = part.key ? key + '"' + keyName + '"' + '</span>: ' : '';
      const valueHtml = part.value ? valSpan + part.value + '</span>' : '';
      const endHtml = part.end || '';
      return indentHtml + keyHtml + valueHtml + endHtml;
    };
    const jsonLine = /^( *)("[^"]+": )?("[^"]*"|[\w.+-]*)?([{}[\],]*)?$/mg;
    return htmlEntities(JSON.stringify(thing, null, 3))
      .replace(jsonLine, replacer);
  }
};
