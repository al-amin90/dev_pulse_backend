export interface Issue {
  title: string;
  description: string;
  type: "bug" | "feature" | "enhancement" | "task";
  reporter_id: number;
}
