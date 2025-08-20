

import type { AppDefinition } from '../../window/types';

import { appDefinition as aboutAppDefinition } from './AboutApp';
import { appDefinition as fileExplorerAppDefinition } from '../../window/components/FileExplorerApp';
import { appDefinition as geminiChatAppDefinition } from './GeminiChatApp';
import { appDefinition as hyperAppDefinition } from './HyperApp';
import { appDefinition as notebookAppDefinition } from '../../window/components/apps/NotebookApp';
import { appDefinition as settingsAppDefinition } from '../../window/components/SettingsApp';
import { appDefinition as chromeAppDefinition } from './ChromeApp';
import { appDefinition as chrome2AppDefinition } from './Chrome2App';
import { appDefinition as chrome3AppDefinition } from './Chrome3App'; // Restored Chrome 3
import { appDefinition as chrome4AppDefinition } from './Chrome4App';
import { appDefinition as terminusAppDefinition } from '../../window/components/apps/TerminusApp';
import { appDefinition as terminusSshAppDefinition } from './TerminusSshApp';
import { appDefinition as sftpAppDefinition } from '../../window/components/apps/SFTPApp';
import { appDefinition as appStoreAppDefinition } from '../../window/components/AppStoreApp';
import { appDefinition as themeAppDefinition } from './ThemeApp';
import { appDefinition as propertiesAppDefinition } from './PropertiesApp';

/**
 * The master list of all applications available in the OS.
 * To add a new app:
 * 1. Create your app component in a new file under this `apps` directory.
 * 2. In that file, export an `appDefinition` object of type `AppDefinition`.
 * 3. Import that definition here and add it to this array.
 */
export const APP_DEFINITIONS: AppDefinition[] = [
  appStoreAppDefinition,
  themeAppDefinition,
  sftpAppDefinition,
  terminusAppDefinition, // New simplified local terminal
  terminusSshAppDefinition, // The original multi-host terminal
  chromeAppDefinition,
  chrome2AppDefinition,
  chrome3AppDefinition, // Restored Chrome 3
  chrome4AppDefinition,
  fileExplorerAppDefinition,
  geminiChatAppDefinition,
  hyperAppDefinition,
  settingsAppDefinition,
  notebookAppDefinition,
  aboutAppDefinition,
  propertiesAppDefinition,
];