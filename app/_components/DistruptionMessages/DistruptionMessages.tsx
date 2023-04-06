import ErrorBoundary from "./DistruptionMessages.ErrorBoundary";
import { Content } from "./DistruptionMessages.Content";
import { Loading } from "./DistruptionMessages.Loading";

export interface IDistruptionMessages {
  from: string
  day: string
}

export const DistruptionMessages = ({ from, day }: IDistruptionMessages) => (
  <ErrorBoundary>
    <Loading>
      <Content from={from} day={day} />
    </Loading>
  </ErrorBoundary>
);
