
'use strict';

const obsidian = require('obsidian');

class PrivacyTogglePlugin extends obsidian.Plugin {
    async onload() {
        console.log('Loading Privacy Toggle View plugin');
        this.revealed = false;
        this.sidebarsBlurred = true; // Sidebars blurred by default

        // Activate privacy mode
        document.body.classList.add('privacy-mode');
        document.body.classList.add('sidebars-blurred');
        document.body.classList.remove('privacy-revealed');

        // Keep classes in sync when active leaf changes
        this.registerEvent(this.app.workspace.on('active-leaf-change', () => {
            this.updateBodyClasses();
        }));

        // Track navigator focus state
        this.setupNavigatorFocusTracking();

        // Ribbon button
        this.addRibbonIcon('eye-off', 'Aktive Notiz ein-/ausblenden', () => {
            this.toggleReveal();
        });

        // Command palette with keyboard shortcut
        this.addCommand({
            id: 'toggle-privacy-visibility',
            name: 'Aktive Notiz ein-/ausblenden',
            hotkeys: [
                {
                    modifiers: ['Mod', 'Shift'],
                    key: 'b'
                }
            ],
            callback: () => {
                this.toggleReveal();
            }
        });

        // Command to toggle sidebar blur
        this.addCommand({
            id: 'toggle-sidebar-blur',
            name: 'Sidebar ein-/ausblenden',
            hotkeys: [
                {
                    modifiers: ['Mod', 'Shift'],
                    key: 's'
                }
            ],
            callback: () => {
                this.toggleSidebarBlur();
            }
        });
    }

    onunload() {
        document.body.classList.remove('privacy-mode');
        document.body.classList.remove('privacy-revealed');
        document.body.classList.remove('sidebars-blurred');
        document.body.classList.remove('navigator-focused');
    }

    toggleReveal() {
        this.revealed = !this.revealed;
        this.updateBodyClasses();
        new obsidian.Notice(this.revealed
            ? 'Inhalt sichtbar (nur aktive Datei)'
            : 'Inhalt wieder verborgen');
    }

    updateBodyClasses() {
        if (this.revealed) {
            document.body.classList.add('privacy-revealed');
        } else {
            document.body.classList.remove('privacy-revealed');
        }
    }

    toggleSidebarBlur() {
        this.sidebarsBlurred = !this.sidebarsBlurred;
        if (this.sidebarsBlurred) {
            document.body.classList.add('sidebars-blurred');
        } else {
            document.body.classList.remove('sidebars-blurred');
        }
        new obsidian.Notice(this.sidebarsBlurred
            ? 'Sidebar ausgeblendet'
            : 'Sidebar eingeblendet');
    }

    setupNavigatorFocusTracking() {
        const checkNavigatorFocus = () => {
            const sideDocks = document.querySelectorAll('.side-dock');
            let hasFocusedNavigator = false;

            sideDocks.forEach(sideDock => {
                const navFiles = sideDock.querySelector('.nav-files-container');
                if (navFiles) {
                    // Check if any element within the navigator has focus
                    const activeElement = document.activeElement;
                    if (navFiles.contains(activeElement) || 
                        sideDock.querySelector(':focus-within')) {
                        hasFocusedNavigator = true;
                    }
                }
            });

            if (hasFocusedNavigator) {
                document.body.classList.add('navigator-focused');
            } else {
                document.body.classList.remove('navigator-focused');
            }
        };

        // Check on focus/blur events
        document.addEventListener('focusin', (e) => {
            const navFiles = e.target.closest('.nav-files-container');
            if (navFiles) {
                document.body.classList.add('navigator-focused');
            }
        });

        document.addEventListener('focusout', () => {
            // Use setTimeout to check if focus moved to another navigator element
            setTimeout(checkNavigatorFocus, 0);
        });

        // Also check on click in case focus events don't fire
        document.addEventListener('click', (e) => {
            const navFiles = e.target.closest('.nav-files-container');
            if (navFiles) {
                document.body.classList.add('navigator-focused');
            } else {
                // Check if click was outside navigator
                const clickedInSideDock = e.target.closest('.side-dock');
                if (!clickedInSideDock) {
                    document.body.classList.remove('navigator-focused');
                }
            }
        });
    }
}

module.exports = PrivacyTogglePlugin;
