import { typeDefs, resolvers, graphql } from "../";

describe("typeDefs", () => {
  it("should match a snapshot", () => {
    expect(typeDefs).toMatchSnapshot();
  });
});

describe("resolvers", () => {
  const { Query, Response, Page, Block } = resolvers;

  describe("Query", () => {
    const { sample } = Query;
    it("has an expected shape", () => {
      expect(sample()).toEqual({ code: 200, message: "hello world" });
    });
  });

  describe("getRouteInfo", () => {
    const { getRouteInfo } = Query;

    it("has resolve", () => {
      expect(getRouteInfo).toBeDefined();
    });

    it("returns a sample registry if path is root", () => {
      expect(getRouteInfo(null, { path: "/" })).toEqual({
        id: 1,
        layout: "Horizontal",
        blocks: [{ id: 2, path: "HelloWorld" }, { id: 1, path: "Counter" }],
      });
    });

    it("returns reversed blocks if other path", () => {
      expect(getRouteInfo(null, { path: "/hey" })).toEqual({
        id: 1,

        layout: "Horizontal",
        blocks: [{ id: 1, path: "Counter" }, { id: 2, path: "HelloWorld" }],
      });
    });
  });

  describe("Response", () => {
    const data = Query.sample();
    const { code, message } = Response;
    it("has a code method", () => {
      expect(code(data)).toEqual(200);
    });
    it("has a message method", () => {
      expect(message(data)).toEqual("hello world");
    });
  });

  describe("Page", () => {
    const { id, blocks } = Page;
    it("has an id method", () => {
      expect(id({ id: 5 })).toEqual(5);
    });
    it("has a blocks method", () => {
      expect(blocks({ blocks: [{ id: 1 }, { id: 2 }] })).toEqual([
        { id: 1 },
        { id: 2 },
      ]);
    });
  });

  describe("Block", () => {
    const { id, path } = Block;
    it("has an id method", () => {
      expect(id({ id: 1 })).toEqual(1);
    });
    it("has a path method", () => {
      expect(path({ path: "Hello" })).toEqual("Hello");
    });
  });
});

describe("graphql", () => {
  it("has a sample root level query field", async () => {
    const { data } = await graphql("{ sample { code message } }");
    expect(data).toEqual({ sample: { code: 200, message: "hello world" } });
  });
});

describe("getRouteInfo", () => {
  it("exists", () => {});
});
