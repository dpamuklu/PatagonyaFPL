import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Standings from "./Standings";

function Main() {
  return (
    <>
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
          <div>test</div>
        </Tab>
        <Tab eventKey="contact" title="Fixtures">
          <div>test</div>
        </Tab>
      </Tabs>
    </>
  );
}

export default Main;
