import React from "react";
import useSWR from "swr";
import { PrayType, swrFetcher } from "../../interface";
import { useAuthContext } from "../../InfiniteContext";
import Column from "../Column";
import styled from "styled-components";

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #292929;
`;

const MyPrayModal = () => {
  const { myEmail } = useAuthContext();
  const { data, error } = useSWR<Array<PrayType>>(
    myEmail ? `/api/v1/${myEmail}/pray` : null,
    swrFetcher
  );

  if (!data) {
    return <div></div>;
  }

  if (error) {
  }

  return (
    <Column gap={32}>
      <Title>My Prayer List</Title>
    </Column>
  );
};

export default MyPrayModal;
