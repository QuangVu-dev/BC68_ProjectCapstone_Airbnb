import WebFont from "webfontloader";

const loadFonts = () => {
  WebFont.load({
    google: {
      families: ["Roboto", "Helvetica Neue", "Montserrat:200,400,700"],
    },
  });
};

export default loadFonts;
