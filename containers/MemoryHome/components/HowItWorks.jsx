import MemoryPortal from "./MemoryPortal";
import { MdArrowOutward } from "react-icons/md";
export default function HowItWorks({ motionDisabled }) {
  return (
    <section className="continuity section" id="how">
      <div className="continuity-copy reveal">
        <span className="eyebrow">02 / KEEP THE THREAD</span>
        <h2>
          Pick up
          <br />
          where you
          <br />
          <span>left off.</span>
        </h2>
        <p>
          A new model shouldn’t mean another introduction. Give your agents
          access to the context you choose to carry forward.
        </p>
        <a href="#memory" className="text-link">
          Try the memory network <MdArrowOutward />
        </a>
      </div>
      <MemoryPortal motionDisabled={motionDisabled} />
    </section>
  );
}
