export interface Issue {
  title: string;
  description: string;
  type: "bug" | "feature_request";
  reporter_id: number;
}

export interface IIssueQuery {
  sort?: string;
  type?: string;
  status?: string;
}
