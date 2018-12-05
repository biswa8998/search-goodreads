/*
    3rd party packages
*/
import React from "react";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import sinon from "sinon";
configure({ adapter: new Adapter() });
/*
    internal files
*/
import { expect } from "../../chai";

/*
    feature file
*/
import SearchBox from "./searchBox";
console.log("\n==============ooooooo   START   ooooooo==============\n");
describe("SearchBox", () => {
  let wrapper;
  const isSearching = jest.fn();
  /*
    This is ensure that the mock functions get attached to the SearchBox component as it happens
    in the application at any phase.
  */

  beforeEach(() => {
    wrapper = mount(<SearchBox isSearching={isSearching} />);
  });

  it("it should initiate with state as searchKey and searchKey value as ''", () => {
    expect(wrapper)
      .to.have.state("searchKey")
      .to.equal("");
  });

  it("their should be only one input box and it should be empty at first", () => {
    const input = wrapper.find("input");
    expect(input)
      .to.have.length(1)
      .to.have.value("");
  });

  describe("when user enters some text in search box", () => {
    const wrapper = mount(<SearchBox />);
    const input = wrapper.find("#search-key");
    input.instance().value = "dan brown";
    input.simulate("change");
    it("the state searchKey updates with same value", () => {
      expect(wrapper.state().searchKey).to.equal("dan brown");
    });
  });

  describe("when user enters nothing or blank spaces in search box", () => {
    const wrapper = mount(<SearchBox />);
    const input = wrapper.find("#search-key");
    input.instance().value = "      ";
    input.simulate("change");
    input.simulate("keypress", { key: "Enter" });
    it("and presses Enter key, the state value goes back to ''", () => {
      expect(wrapper.state().searchKey).to.equal("");
    });
  });

  describe("when user enters nothing or blank spaces in search box", () => {
    const wrapper = mount(<SearchBox />);
    const input = wrapper.find("#search-key");
    const searchIcon = wrapper.find("#click-to-search");
    input.instance().value = "      ";
    input.simulate("change");
    searchIcon.simulate("click");
    it("and clicks on Search Icon, the state value goes back to ''", () => {
      expect(wrapper.state().searchKey).to.equal("");
    });
  });

  describe("when user enters search key", () => {
    const wrapper = mount(<SearchBox />);
    const input = wrapper.find("#search-key");
    const searchIcon = wrapper.find("#click-to-search");
    const runAxios = sinon.spy();
    input.instance().value = "dan brown";
    input.simulate("change");
    searchIcon.simulate("click");
    it("and presses Enter key or Search Icon, the search api gets called", () => {
      expect(runAxios).to.have.property(1);
    });
  });
});
