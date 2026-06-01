import { useState } from "react";
import Button from "./component/shared/Button.tsx";
import Input from "./component/shared/Input.tsx";
import Modal from "./component/shared/Modal.tsx";

const App = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <Input name="first" />
      <Button type="info" onClick={() => setOpen(true)}>
        Open
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} />
    </div>
  );
};

export default App;
