import React, { LazyExoticComponent } from 'react';

type LoadProps = Record<string, any>;

const AsyncComponent = (
  Component: LazyExoticComponent<React.ComponentType<LoadProps>>
  // load_: LoadProps = {}
) => {
  return function (props: LoadProps = {}) {
    return (
      <React.Suspense fallback={'loading....'}>
        <Component {...props}></Component>
      </React.Suspense>
    );
  };
};

export default AsyncComponent;
