# Privacy Toggle View

An Obsidian plugin that helps protect your privacy by blurring note content and file names. Perfect for when you're working in public spaces or sharing your screen.

## Features

- **Blur note content**: Automatically blurs all note content and tab titles by default
- **Reveal active note**: Toggle to reveal only the currently active note
- **Sidebar blur control**: Toggle sidebar/file navigator blur on/off
- **Smart focus detection**: Automatically unblurs the file navigator when you focus on it
- **Keyboard shortcuts**: Quick access via customizable hotkeys
- **Ribbon button**: Easy access via the ribbon icon

## Installation

### Manual Installation

1. Download the latest release or clone this repository
2. Copy the plugin folder to your Obsidian vault's `.obsidian/plugins/` directory
3. Enable the plugin in Obsidian Settings → Community Plugins

### From Source

1. Clone this repository
2. Run `npm install` to install dependencies
3. Run `npm run build` to build the plugin
4. Copy the generated files to your Obsidian plugins directory

## Usage

### Reveal/Hide Note Content

- **Ribbon button**: Click the eye-off icon in the ribbon
- **Command palette**: Press `Ctrl/Cmd+P` and search for "Aktive Notiz ein-/ausblenden"
- **Keyboard shortcut**: `Ctrl+Shift+B` (Windows/Linux) or `Cmd+Shift+B` (Mac)

When revealed, only the currently active note will be unblurred. All other notes remain blurred.

### Toggle Sidebar Blur

- **Command palette**: Press `Ctrl/Cmd+P` and search for "Sidebar ein-/ausblenden"
- **Keyboard shortcut**: `Ctrl+Shift+S` (Windows/Linux) or `Cmd+Shift+S` (Mac)

When sidebar blur is enabled, the file navigator will be blurred by default but automatically unblurs when you click into it or focus on it.

### Customizing Shortcuts

You can customize the keyboard shortcuts in Obsidian Settings → Hotkeys:
- Search for "Aktive Notiz ein-/ausblenden" to change the note reveal shortcut
- Search for "Sidebar ein-/ausblenden" to change the sidebar blur shortcut

## How It Works

- **Privacy mode**: When enabled, all note content and tab titles are blurred
- **Reveal mode**: When toggled, only the active note becomes visible
- **Sidebar blur**: The file navigator can be blurred independently
- **Focus detection**: The plugin tracks when you focus on the navigator and automatically unblurs it

## Requirements

- Obsidian v1.1.0 or higher
- Works on Desktop, Mobile, and Tablet

## Development

```bash
# Install dependencies
npm install

# Build the plugin
npm run build

# Watch for changes during development
npm run dev
```

## License

This plugin is open source. Feel free to modify and distribute as needed.

## Support

If you encounter any issues or have feature requests, please open an issue on the repository.

