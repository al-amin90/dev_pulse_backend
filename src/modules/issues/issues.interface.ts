export interface Issue {
  title: string;
  description: string;
  type: "bug" | "feature" | "enhancement" | "task"; // Added other common types
}
