// Override @types/chrome

////////////////////
// Commands
////////////////////
/**
 * Use the commands API to add keyboard shortcuts that trigger actions in your extension, for example, an action to open the browser action or send a command to the extension.
 * Availability: Since Chrome 25.
 * Manifest:  "commands": {...}
 */
declare namespace chrome.commands {
  export type CommandEvent = chrome.events.Event<
    (command: string, tab: chrome.tabs.Tab) => void
  >
}
