import LinkCustom from "../../components/LinkCustom/LinkCustom";
import { pathDefault } from "../../common/path";
import "./page404.scss";

const Page404 = () => {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>Oops!</h1>
          <h2>404 - The Page can't be found</h2>
        </div>
        <LinkCustom
          content={"GO TO HOMEPAGE"}
          to={pathDefault.homePage}
          className={"btn-back"}
        />
      </div>
    </div>
  );
};

export default Page404;
