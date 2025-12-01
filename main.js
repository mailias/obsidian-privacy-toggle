'use strict';

const obsidian = require('obsidian');

class PrivacyTogglePlugin extends obsidian.Plugin {
    async onload() {
        console.log('Loading Privacy Toggle View plugin');
        this.blurred = false; // Global blur state

        // Command to toggle blur
        this.addCommand({
            id: 'toggle-blur',
            name: 'Blur ein-/ausblenden',
            hotkeys: [
                {
                    modifiers: ['Mod', 'Shift'],
                    key: 'b'
                }
            ],
            callback: () => {
                this.toggleBlur();
            }
        });
    }

    onunload() {
        // Remove blur class
        document.body.classList.remove('privacy-mode');
    }

    toggleBlur() {
        this.blurred = !this.blurred;
        
        if (this.blurred) {
            document.body.classList.add('privacy-mode');
            new obsidian.Notice('Blur aktiviert');
            console.log('Privacy mode: ON');
        } else {
            document.body.classList.remove('privacy-mode');
            new obsidian.Notice('Blur deaktiviert');
            console.log('Privacy mode: OFF');
        }
    }
}

module.exports = PrivacyTogglePlugin;

