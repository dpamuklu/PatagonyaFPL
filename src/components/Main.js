import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Standings from "./Standings";
import Fixtures from "./Fixtures";
import Results from "./Results";
import APIContext from "../context/APIContext";

function Main() {
  return (
    <APIContext>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab eventKey="home" title="Standings">
          <Standings></Standings>
        </Tab>
        <Tab eventKey="profile" title="Results">
          <Results></Results>
        </Tab>
        <Tab eventKey="contact" title="Fixtures">
          <Fixtures></Fixtures>
        </Tab>
      </Tabs>
    </APIContext>
  );
}

export default Main;
