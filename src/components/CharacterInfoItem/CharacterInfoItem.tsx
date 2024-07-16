import React from "react";

interface CharacterInfoItemProps {
  label: string;
  value: string;
}

const CharacterInfoItem: React.FC<CharacterInfoItemProps> = ({
  label,
  value,
}) => {
  return (
    <div className="list-item" data-test-id="character-info-item">
      <h5 className="heading__small" data-test-id="character-info-label">
        {label}
      </h5>
      <h3 className="heading__medium" data-test-id="character-info-value">
        {value}
      </h3>
    </div>
  );
};

export default CharacterInfoItem;
