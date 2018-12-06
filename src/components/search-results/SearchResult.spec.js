/*
    3rd party packages
*/
import React from "react";
import { configure, shallow, mount, render } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
configure({ adapter: new Adapter() });
/*
    internal files
*/
import { expect, searchResultsSetup } from "../../test-setup";

/*
    feature file
*/
import SearchResults from "./SearchResults";
describe("Search Result", () => {
  let searchResults = searchResultsSetup;
  let searchingList = false;
  let isSearchingDetail = jest.fn();

  describe("when wating to receive response from API on search", () => {
    let searchResults = [];
    let searchingList = true;
    let wrapper = mount(
      <SearchResults
        searchResults={searchResults}
        searchingList={searchingList}
      />
    );
    it("Search results panel should show 'Searching...'", () => {
      let searchingMsg = wrapper.find("#msg-searching");
      expect(searchingMsg).to.have.length(1);
    });
  });

  describe("when received response from API on search", () => {
    let searchResults = searchResultsSetup;
    let wrapper = mount(
      <SearchResults
        searchResults={searchResults}
        searchingList={searchingList}
      />
    );
    it("number of Book Titles should be equal to number of titles received from API", () => {
      let listOfTitles = wrapper.find("li");
      expect(listOfTitles).to.have.length(searchResults.length);
    });

    describe("on clicking any of the title", () => {
      let searchResults = searchResultsSetup;
      let wrapper = mount(
        <SearchResults
          searchResults={searchResults}
          searchingList={searchingList}
          isSearchingDetail={isSearchingDetail}
        />
      );
      let someTitle = wrapper.find("li").first();
      someTitle.simulate("click");
      it("handleClick function should get fired", () => {
        expect(isSearchingDetail.mock.calls.length).to.equal(1);
      });
    });
  });
});
