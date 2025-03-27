// global.d.ts
declare interface Window {
    MathJax: {
      Hub: {
        Config: (config: { tex2jax: { inlineMath: string[][] } }) => void;
        Queue: (actions: Array<[string, any]>) => void;
      };
    };
  }