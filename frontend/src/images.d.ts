declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
}

declare module '*.gif' {
  const value: string;
  export default value;
}

// Pour les fichiers SVG
declare module '*.svg' {
  // Permet d'importer le SVG comme un composant React
  // ex: import { ReactComponent as MyIcon } from './my-icon.svg';
  //     <MyIcon />
  import * as React from 'react';
  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement> & { title?: string }>;

  // Permet aussi d'importer le SVG comme une URL (comportement par défaut sans ?react)
  // ex: import myIconUrl from './my-icon.svg';
  //     <img src={myIconUrl} />
  const src: string;
  export default src;
}

// Si vous utilisez d'autres types d'assets (webp, etc.), ajoutez des déclarations similaires
// declare module '*.webp' {
//   const value: string;
//   export default value;
// }