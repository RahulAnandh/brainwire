import MapView from "./map_view";
import { Row, Col } from "antd";
const DashBoardIndex = (props) => {
  return (
    <>
      <MapView loading={props?.loading} user_list={props?.user_list} />
    </>
  );
};
export default DashBoardIndex;
