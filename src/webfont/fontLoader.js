import WebFont from "webfontloader";

const loadFonts = () => {
  WebFont.load({
    google: {
      families: ["Roboto", "Helvetica Neue"],
    },
  });
};

export default loadFonts;
