import React from "react";
//ant design
import { Flex, Spin, Skeleton, Card } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const LoadingCard = ({ count }) => {
  const LoopCard = () => {
    let cards = [];
    for (let i = 0; i < count; i++) {
      cards.push(
        <Card key={i}>
          <Skeleton active />
        </Card>,
      );
    }
    return cards;
  };

  return (
    <div className="grid grid-cols-5 gap-4 pb-10">
      {LoopCard()}

      {/* <div>
        <Flex className="w-full items-center justify-around">
          <Spin
            indicator={<LoadingOutlined style={{ fontSize: 120 }} spin />}
          />
        </Flex>
      </div> */}
    </div>
  );
};

export default LoadingCard;
