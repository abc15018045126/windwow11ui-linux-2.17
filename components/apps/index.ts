

import type { AppDefinition } from '../../window/types';

let appDefinitions: AppDefinition[] | null = null;

// A type guard to check if a module has an appDefinition
function hasAppDefinition(module: any): module is { appDefinition: AppDefinition } {
    return module && typeof module.appDefinition === 'object' && module.appDefinition !== null;
}

export const getAppDefinitions = async (): Promise<AppDefinition[]> => {
    // In a real scenario with a dev server, we wouldn't cache this,
    // so new .tsx files are picked up on refresh.
    if (appDefinitions) {
        // return appDefinitions;
    }

    // Use import.meta.glob to dynamically find all App.tsx files
    const appModules = import.meta.glob([
        './*App.tsx',
        '../../window/components/**/*App.tsx',
        '../../window/components/*App.tsx'
    ], { eager: true });

    const definitions: AppDefinition[] = [];
    for (const path in appModules) {
        const module = appModules[path] as any;
        if (hasAppDefinition(module)) {
            definitions.push(module.appDefinition);
        }
    }

    // Manually add the original external Chrome5 app definition, as it doesn't have a .tsx file.
    // This ensures the original, working app is preserved.
    const chrome5AppDefinition: AppDefinition = {
      id: 'chrome5',
      name: 'Chrome 5',
      icon: 'chrome', // Use string name
      component: () => null,
      isExternal: true,
      externalPath: 'components/apps/Chrome5/main.js'
    };

    // Prevent duplicates if a Chrome5App.tsx was generated
    if (!definitions.some(d => d.id === 'chrome5')) {
        definitions.push(chrome5AppDefinition);
    }


    appDefinitions = definitions.sort((a, b) => a.name.localeCompare(b.name));

    return appDefinitions;
};