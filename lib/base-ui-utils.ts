import * as React from 'react';

/**
 * Merges multiple props objects, with later props taking precedence
 */
export function mergeProps<T extends Record<string, unknown>>(
  ...props: (T | undefined)[]
): T {
  const merged = {} as T;
  
  for (const prop of props) {
    if (!prop) continue;
    
    for (const key in prop) {
      if (key === 'className') {
        // Special handling for className - merge them
        merged[key] = (
          merged[key] 
            ? `${merged[key]} ${prop[key]}` 
            : prop[key]
        ) as T[Extract<keyof T, string>];
      } else if (key === 'style' && typeof prop[key] === 'object' && prop[key] !== null) {
        // Special handling for style - merge objects
        merged[key] = {
          ...(merged[key] as object || {}),
          ...(prop[key] as object),
        } as T[Extract<keyof T, string>];
      } else {
        // For other props, later values override earlier ones
        merged[key] = prop[key];
      }
    }
  }
  
  return merged;
}

/**
 * Hook to render a component with props
 */
export namespace useRender {
  export interface ComponentProps<T extends keyof JSX.IntrinsicElements> 
    extends React.HTMLAttributes<HTMLElement> {
    render?: React.ReactElement | React.ComponentType<any>;
  }

  export function render({
    render: renderProp,
    props,
  }: {
    render: React.ReactElement | React.ComponentType<any> | undefined;
    props: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode };
  }): React.ReactElement {
    if (!renderProp) {
      return React.createElement('button', props);
    }

    if (React.isValidElement(renderProp)) {
      return React.cloneElement(renderProp, mergeProps(renderProp.props, props));
    }

    if (typeof renderProp === 'function') {
      return React.createElement(renderProp, props);
    }

    return React.createElement('button', props);
  }
}

