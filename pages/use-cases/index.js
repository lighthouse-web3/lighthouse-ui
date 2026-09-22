import { Metadata } from "../../components";
import UseCases from "../../containers/MemoryHome/components/UseCases";
import { useSmoothScroll } from "../../containers/MemoryHome/hooks/useSmoothScroll";

export default function UseCasesIndex() {
  useSmoothScroll();

  return (
    <>
      <Metadata
        title="Use cases | Lighthouse"
        description="Memory for trading agents, prediction markets, tokenised assets and physical AI."
      />
      <div className="memory-page">
        <UseCases />
      </div>
    </>
  );
}
