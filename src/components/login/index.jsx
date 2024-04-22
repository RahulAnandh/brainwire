import { Modal } from "antd";
import LoginForm from "./login_form";
const LoginModal = (props) => {
  return (
    <Modal
      open={!props.login}
      footer={false}
      width={400}
      height={300}
      closable={false}
    >
      <LoginForm onFinish={props?.onFinish} />
    </Modal>
  );
};
export default LoginModal;
