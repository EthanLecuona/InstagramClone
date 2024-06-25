import React from "react";

import NoopFilter from "../filters/Noop";

const ConditionalWrapper = ({ condition, wrapper, children }: any) =>
  condition ? wrapper(children) : <NoopFilter>{children}</NoopFilter>;

export const createConditionalWrapper = ({
  FilterComponent,
  condition,
  ...props
}: any) => {
  return ({ children }: any) => (
    <ConditionalWrapper
      condition={condition}
      wrapper={(children: any) => (
        <FilterComponent {...props}>{children}</FilterComponent>
      )}
    >
      {children}
    </ConditionalWrapper>
  );
};
