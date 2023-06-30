export type ColumnType = {
  name: string;
  sortable?: boolean;
  searchable?: boolean;
  customStyle?: Record<any, string>;
  action?: string;
};
