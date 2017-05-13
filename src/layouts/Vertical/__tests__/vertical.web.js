import { shallow } from "enzyme";
import { shallowToJson } from "enzyme-to-json";
import Vertical from "../vertical.web.js";
import Counter from "../../../blocks/Counter";
import HelloWorld from "../../../blocks/HelloWorld";

const layoutProps = {
  zones: {
    main: [
      { id: 1, path: "Counter", Component: Counter },
      { id: 2, path: "HelloWorld", Component: HelloWorld },
    ],
    secondary: [{ id: 2, path: "HelloWorld", Component: HelloWorld }],
  },
};

const generateComponent = additionalProps => (
  <Vertical {...layoutProps} {...additionalProps} />
);

describe("Vertical Web Layout", () => {
  it("should render Vertical layout component", () => {
    const tree = shallow(generateComponent());
    expect(tree).toBeDefined();
    expect(shallowToJson(tree)).toMatchSnapshot();
  });
});
