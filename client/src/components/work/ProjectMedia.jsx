import { useState } from "react";

function ProjectMedia({ project, size = "row" }) {
  const [imageFailed, setImageFailed] = useState(false);
  const hasImage = Boolean(project.image) && !imageFailed;

  return (
    <div
      className={`project-media project-media--${size}${
        hasImage ? "" : " project-media--placeholder"
      }`}
    >
      {hasImage ? (
        <img
          className="project-media-image"
          src={project.image}
          alt={`${project.title} interface preview`}
          loading="lazy"
          onError={() => setImageFailed(true)}
        />
      ) : (
        <div className="project-media-abstract" aria-hidden="true">
          <span className="project-media-grid" />
          <span className="project-media-index">{project.index}</span>
          <span className="project-media-title">{project.title}</span>
        </div>
      )}

      <span
        className="project-media-corner project-media-corner--top-left"
        aria-hidden="true"
      />
      <span
        className="project-media-corner project-media-corner--bottom-right"
        aria-hidden="true"
      />
    </div>
  );
}

export default ProjectMedia;
