import React from 'react';
import styled from 'styled-components';

interface CardProps {
  issueType: string;
  summary: string;
  bugItem: any;
}

const Card: React.FC<CardProps> = ({ issueType, summary, bugItem }) => {
  return (
    <StyledCard>
      <div className="hover_color_bubble" />
      <div className="card_content">
        {/* Image and Summary Section */}
        <div className="top_section">
          {bugItem.priority.value === 'low' && <img width="48" height="48" src="https://img.icons8.com/color/48/low-priority.png" alt="low-priority" />
          }
          {bugItem.priority.value === 'medium' && <img width="48" height="48" src="https://img.icons8.com/color/48/medium-priority.png" alt="medium-priority" />}
          {bugItem.priority.value === 'high' && <img width="48" height="48" src="https://img.icons8.com/color/48/high-priority.png" alt="high-priority" />}
          <p className="summary">{bugItem.summary}</p>
        </div>

        {/* Issue Type */}
        <h3 className="issue_type">{bugItem.issueType.value}</h3>

        {/* Reporter and Assignee */}
        <div className="bottom_section">
          <div className="info_section">
            <label>Reporter:</label>
            <span>{bugItem.reporters.value}</span>
          </div>
          <div className="info_section">
            <label>Assignee:</label>
            <span>{bugItem.assignees.value}</span>
          </div>
        </div>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  position: relative;
  
  width: 320px;
  min-height: 250px; /* Minimum height to maintain card size */
  margin: 20px 0px;
  padding: 15px;
  background: #ffffff;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
  }

  .hover_color_bubble {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 12px;
    background-color: rgba(255, 106, 0, 0.1);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .hover_color_bubble {
    opacity: 1;
  }

  .card_content {
    text-align: left;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
  }

  .top_section {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    gap: 10px;
  }

  .priority_icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }

  .summary {
    font-size: 1em;
    color: #444;
    font-weight: 400;
    line-height: 1.4;
    text-align: left;
    flex-grow: 1; /* Allow summary to take available space */
    overflow: hidden;
    word-wrap: break-word;
    white-space: normal; /* Ensure long text wraps */
  }

  /* Centering the Issue Type (h3) */
  .issue_type {
    font-size: 1.1em;
    font-weight: 600;
    color: #ff6a00;
    margin: 10px 0;
    text-align: center; /* Ensure the text is centered */
  }

  /* Bottom section for Reporter and Assignee */
  .bottom_section {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    gap: 20px;
  }

  .info_section {
    display: flex;
    flex-direction: column;
    text-align: left;
  }

  label {
    font-size: 0.85em;
    font-weight: 600;
    color: #888;
  }

  span {
    font-size: 0.9em;
    font-weight: 400;
    color: #333;
    margin-top: 5px;
  }
`;

export default Card;
