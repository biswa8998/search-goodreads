import chai from "chai";
import chaiEnzyme from "chai-enzyme";
chai.use(chaiEnzyme());
export const expect = chai.expect;

export let searchResultsSetup = [
  {
    best_book: {
      id: { type: "integer", content: "960" },
      title: "Angels & Demons  (Robert Langdon, #1)"
    }
  },
  {
    best_book: {
      id: { type: "integer", content: "968" },
      title: "The Da Vinci Code (Robert Langdon, #2)"
    }
  },
  {
    best_book: {
      id: { type: "integer", content: "976" },
      title: "Deception Point"
    }
  },
  {
    best_book: {
      id: { type: "integer", content: "6411961" },
      title: "The Lost Symbol (Robert Langdon, #3)"
    }
  },
  {
    best_book: {
      id: { type: "integer", content: "11125" },
      title: "Digital Fortress"
    }
  }
];
