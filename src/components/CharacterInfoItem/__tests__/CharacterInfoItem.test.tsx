import { render, screen } from "@testing-library/react";
import CharacterInfoItem from "../CharacterInfoItem";

describe("CharacterInfoItem", () => {
  it("Renders the correct items", () => {
    const label = "Test Label";
    const value = "Test Value";

    render(<CharacterInfoItem label={label} value={value} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    expect(screen.getByText(value)).toBeInTheDocument();
  });
});
