import type { Exercise } from "../data/exercises";

export interface ExerciseCardOptions {
  buttonLabel?: string;
  onVideoOpen?: (exercise: Exercise) => void;
}

function openExerciseVideo(exercise: Exercise, onVideoOpen?: (exercise: Exercise) => void) {
  if (onVideoOpen) {
    onVideoOpen(exercise);
    return;
  }

  if (typeof window !== "undefined") {
    window.open(exercise.videoUrl, "_blank", "noopener,noreferrer");
  }
}

function createTextElement<K extends keyof HTMLElementTagNameMap>(
  tagName: K,
  className: string,
  text: string,
) {
  const element = document.createElement(tagName);
  element.className = className;
  element.textContent = text;
  return element;
}

export function createExerciseCard(
  exercise: Exercise,
  options: ExerciseCardOptions = {},
): HTMLElement {
  const article = document.createElement("article");
  article.className = "exercise-card-ui";
  article.dataset.exerciseId = exercise.id;

  const preview = document.createElement("img");
  preview.className = "exercise-card-ui__image";
  preview.src = exercise.previewImage;
  preview.alt = `${exercise.name} pratimo peržiūra`;
  preview.loading = "lazy";

  const content = document.createElement("div");
  content.className = "exercise-card-ui__content";

  const title = createTextElement("h3", "exercise-card-ui__title", exercise.name);
  const description = createTextElement(
    "p",
    "exercise-card-ui__description",
    exercise.shortDescription,
  );
  const setsReps = createTextElement(
    "p",
    "exercise-card-ui__sets-reps",
    `Serijos / pakartojimai: ${exercise.setsReps}`,
  );

  const button = document.createElement("button");
  button.type = "button";
  button.className = "exercise-card-ui__button";
  button.textContent = options.buttonLabel || "Žiūrėti video";
  button.addEventListener("click", () => openExerciseVideo(exercise, options.onVideoOpen));

  content.append(title, description, setsReps, button);
  article.append(preview, content);

  return article;
}

export default createExerciseCard;
