import { render, screen, act } from "@testing-library/react";
import renderer from 'react-test-renderer';
import userEvent from "@testing-library/user-event";
import AirbnbCard from "./MoviesCard";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

it('List component snapshot testing ',()=>{

  const cardCmp:React.ReactNode = renderer.create(<AirbnbCard></AirbnbCard>).toJSON();
  expect(cardCmp).toMatchSnapshot();
})

test("Card component rendering properly =>", () => {
 const {debug} = render(<AirbnbCard></AirbnbCard>);
 expect(screen.getByText("Modern home in city center in the heart of historic Los Angeles")).toBeInTheDocument();

});
