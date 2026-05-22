export interface Issue {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  reporter_id: number;
  status?: "open" | "in_progress" | "resolved";
}

export interface IIssueQuery {
  sort?: string;
  type?: string;
  status?: string;
}
