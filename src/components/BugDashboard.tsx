import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Card from "./Card";
import ModalContentPopUp from "./ModalContentPopUp";

const BugDashboard = () => {
  const { bugData } = useSelector((state: any) => state.BugInfo);

  const statusGroup = {
    open: bugData?.filter((item: any) => item.status === "open") || [],
    inProgress:
      bugData?.filter((item: any) => item.status === "inProgress") || [],
    resolved: bugData?.filter((item: any) => item.status === "resolved") || [],
    closed: bugData?.filter((item: any) => item.status === "closed") || [],
  };

  const [selectedCard, setSelectedCard] = useState<any>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleCardClick = (item: any) => {
    setSelectedCard(item);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedCard(null);
    setModalOpen(false);
  };
  console.log(statusGroup, "statusGroupstatusGroup");

  return (
    <StyledDashboard>
      <div className="column">
        <StatusHeader color="#FF6347">
          {" "}
          {/* Tomato color for Open */}
          <span className="status-circle"></span>
          {statusGroup?.open?.length
            ? `Open ${statusGroup?.open?.length}`
            : "Open"}
        </StatusHeader>

        {statusGroup?.open.map((item: any) => (
          <CardContainer key={item.id} onClick={() => handleCardClick(item)}>
            <Card
              key={item.id}
              issueType={item.issueType.value}
              summary={item.summary}
              bugItem={item}
            />
          </CardContainer>
        ))}
        {!statusGroup?.open?.length && (
          <div className="no-state">
            <span className="no-state-icon">🐞</span>
            <p className="no-state-text">No open bugs yet.</p>
          </div>
        )}
      </div>
      <div className="column">
        <StatusHeader color="#FFA500">
          {" "}
          {/* Orange color for In Progress */}
          <span className="status-circle"></span>
          {statusGroup?.inProgress?.length
            ? `In Progress ${statusGroup?.inProgress?.length}`
            : "In Progress"}
        </StatusHeader>
        {statusGroup?.inProgress.map((item: any) => (
          <CardContainer key={item.id} onClick={() => handleCardClick(item)}>
            <Card
              key={item.id}
              issueType={item.issueType.value}
              summary={item.summary}
              bugItem={item}
            />
          </CardContainer>
        ))}
        {!statusGroup?.inProgress?.length && (
          <div className="no-state">
            <span className="no-state-icon">🚧</span>
            <p className="no-state-text">All caught up! No bugs in progress.</p>
          </div>
        )}
      </div>
      <div className="column">
        <StatusHeader color="#32CD32">
          {" "}
          {/* LimeGreen color for Resolved */}
          <span className="status-circle"></span>
          {statusGroup?.resolved?.length
            ? `Resolved ${statusGroup?.resolved?.length}`
            : "Resolved"}
        </StatusHeader>
        {statusGroup?.resolved.map((item: any) => (
          <CardContainer key={item.id} onClick={() => handleCardClick(item)}>
            <Card
              key={item.id}
              issueType={item.issueType.value}
              summary={item.summary}
              bugItem={item}
            />
          </CardContainer>
        ))}
        {!statusGroup?.resolved?.length && (
          <div className="no-state">
            <span className="no-state-icon">✅</span>
            <p className="no-state-text">No resolved bugs.</p>
          </div>
        )}
      </div>
      <div className="column">
        <StatusHeader color="#4682B4">
          {" "}
          {/* SteelBlue color for Closed */}
          <span className="status-circle"></span>
          {statusGroup?.closed?.length
            ? `Closed ${statusGroup?.closed?.length}`
            : "Closed"}
        </StatusHeader>
        {statusGroup?.closed.map((item: any) => (
          <CardContainer key={item.id} onClick={() => handleCardClick(item)}>
            <Card
              key={item.id}
              issueType={item.issueType.value}
              summary={item.summary}
              bugItem={item}
            />
          </CardContainer>
        ))}
        {!statusGroup?.closed?.length && (
          <div className="no-state">
            <span className="no-state-icon">🔒</span>
            <p className="no-state-text">No closed bugs.</p>
          </div>
        )}
      </div>

      {isModalOpen && selectedCard && (
        <ModalOverlay onClick={handleCloseModal}>
          <ModalContentPopUp
            selectedCardDetail={selectedCard}
            closeModelPopUp={handleCloseModal}
          />
        </ModalOverlay>
      )}
    </StyledDashboard>
  );
};

const StyledDashboard = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 20px;
  min-height: 88vh;

  .column {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 10px;
    min-width: 350px;
    background-color: #f0f0f0;
    padding: 10px;
    border-radius: 8px;
    flex-grow: 1;
  }

  .no-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    height: 100%;
    color: #a0a0a0;
    font-size: 16px;
    font-weight: 500;
    gap: 8px;
  }

  .no-state-icon {
    font-size: 32px;
    opacity: 0.7;
  }

  .no-state-text {
    font-size: 18px;
    font-weight: 600;
    opacity: 0.8;
  }
`;

const StatusHeader = styled.h2<{ color: string }>`
  display: flex;
  align-items: center;
  text-align: center;
  margin-bottom: 10px;

  .status-circle {
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-right: 8px;
    background-color: ${({ color }) => color};
    border-radius: 50%;
  }
`;

const CardContainer = styled.div`
  cursor: pointer;
`;


const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default BugDashboard;
