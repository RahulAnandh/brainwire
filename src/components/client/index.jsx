import ClientTable from "./client_table";
import { useCallback, useEffect, useState } from "react";
const ClientIndex = (props) => {
  return (
    <div>
      <ClientTable
        user_list={props?.user_list && props?.user_list}
        loading={props?.loading}
      />
    </div>
  );
};
export default ClientIndex;
