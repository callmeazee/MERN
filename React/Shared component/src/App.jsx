import Form from "./component/shared/Form";
import Input from "./component/shared/Input";
import Button from "./component/shared/Button";
import Card from "./component/shared/Card";

const App = () => {
  const signup = (val) => {
    console.log(val);
  };
  return (
    <div className="bg-gray-300 flex items-center justify-center h-screen">
      <div className="w-4/12">
        <Card title="Register Now">
          <Form onValue={signup}>
            <div className="space-y-3">
              <Input name="username" placeholder="enter username" />
              <Input name="password" placeholder="******" type="password" />
              <Button />
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default App;
