// Allow importing JS/JSX files without type declarations
declare module "*.jsx" {
  const component: any;
  export default component;
}

// Missing type packages fallbacks
declare module "prop-types" {
  const content: any;
  export default content;
}

// Generic fallbacks for modules that may not have types
declare module "*";


