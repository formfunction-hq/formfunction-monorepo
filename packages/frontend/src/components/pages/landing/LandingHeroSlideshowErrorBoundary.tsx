import { Component } from "react";
import {
  Slideshow,
  SLIDESHOW_DEFAULT_CONTENT,
} from "components/pages/landing/LandingHero";

type Props = {
  children: any;
};
type State = {
  hasError: boolean;
};

export default class LandingHeroSlideshowErrorBoundary extends Component<
  Props,
  State
> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <Slideshow content={SLIDESHOW_DEFAULT_CONTENT} />;
    }

    return this.props.children;
  }
}
