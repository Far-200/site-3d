import { cobalt, about as frozenAbout } from "../../data/profile";
import {
  archiveProjects,
  homepageFlagshipProjects,
  homepageLabProjects,
} from "../../data/projects";
import "./GatewaysSection.css";

// GATEWAYS — compact doors into the three other workshop spaces. Deliberately
// asymmetric (Work reads as the primary door, Lab and About as smaller
// side notes) rather than three identical cards. Every count shown is
// computed from the real project data, never hard-coded.

const { gateways } = cobalt;

function GatewaysSection() {
  return (
    <section className="cfw-gateways cfw-section" aria-label="More of the workshop">
      <div className="cfw-frame cfw-gateways__grid">
        <a className="cfw-gateway cfw-gateway--work" href="/work">
          <span className="cfw-meta cfw-gateway__eyebrow">Door 01</span>
          <span className="cfw-gateway__title">{gateways.work.label}</span>
          <span className="cfw-gateway__note">{gateways.work.note}</span>
          <span className="cfw-gateway__stat">
            {archiveProjects.length} builds ·{" "}
            {homepageFlagshipProjects.length} flagship
          </span>
          <span className="cfw-gateway__cta">
            {gateways.work.cta} <span aria-hidden="true">→</span>
          </span>
        </a>

        <a className="cfw-gateway cfw-gateway--lab cfw-paper" href="/lab">
          <span className="cfw-tape cfw-gateway__tape" aria-hidden="true" />
          <span className="cfw-meta cfw-gateway__eyebrow">Door 02</span>
          <span className="cfw-gateway__title">{gateways.lab.label}</span>
          <span className="cfw-gateway__note">{gateways.lab.note}</span>
          <span className="cfw-gateway__stat">
            {homepageLabProjects.length} sitting on the bench
          </span>
          <span className="cfw-gateway__cta">
            {gateways.lab.cta} <span aria-hidden="true">→</span>
          </span>
        </a>

        <a className="cfw-gateway cfw-gateway--about" href="/about">
          <span className="cfw-meta cfw-gateway__eyebrow">Door 03</span>
          <span className="cfw-gateway__title">{gateways.about.label}</span>
          <span className="cfw-gateway__note">{frozenAbout.statement}</span>
          <span className="cfw-gateway__cta">
            {gateways.about.cta} <span aria-hidden="true">→</span>
          </span>
        </a>
      </div>
    </section>
  );
}

export default GatewaysSection;
