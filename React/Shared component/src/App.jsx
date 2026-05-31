import Button from "./component/shared/Button";
// import Card from "./component/shared/Card";
import Drawer from "./component/shared/Drawer";

const App = ( ) => {
  return (
    <div className="p-8 space-y-4">
      <Button
        type="danger"
        onClick={() => alert("hello danger")}
        // icon={"arrow-up-fill"}
      >
        Login
      </Button>
      {/* <Card title="card demo">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam illo nostrum ipsam, similique officia quae non doloremque illum perferendis numquam ipsum, exercitationem dolorum aspernatur sapiente corrupti explicabo alias eius perspiciatis?
      </Card> */}
       
      <Drawer title="Regfister" open={open}>
      
      </Drawer>
    </div>
  );
};

export default App;
