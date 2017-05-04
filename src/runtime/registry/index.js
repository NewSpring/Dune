// @flow

import { mapProps } from "recompose";
import Junction from "../../junction";
import type { IRegistryRequest } from "./util/types";

// $FlowIgnore
import * as availableBlocks from "glob:../../blocks/*";

export const mapper = ({
  ...rest,
  registry,
}: {
  registry: IRegistryRequest,
}) => ({
  ...rest,
  components: registry.blocks.map(({ ...details, path }) => ({
    ...details,
    path,
    Component: availableBlocks[path],
  })),
});

export const load = mapProps(mapper);

export default Junction().with(load);
