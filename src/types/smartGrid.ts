
export interface GridColumn<T = any> {
  key: keyof T;
  title: string;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  editable?: boolean;
  mandatory?: boolean;
  render?: (value: any, record: T, rowIndex: number) => React.ReactNode;
  type?: 'text' | 'number' | 'date' | 'select' | 'boolean';
  options?: Array<{ label: string; value: any }>;
}

export interface GridPreferences {
  columnOrder: string[];
  hiddenColumns: string[];
  columnWidths: Record<string, string>;
  columnTitles: Record<string, string>;
  sortBy?: string;
  sortDirection?: 'asc' | 'desc';
  filters: Record<string, any>;
  pageSize: number;
}

export interface SmartGridProps<T = any> {
  data: T[];
  columns: GridColumn<T>[];
  loading?: boolean;
  error?: string | null;
  
  // Selection
  selectedRows?: string[];
  onRowSelectionChange?: (selectedIds: string[]) => void;
  rowKey?: keyof T | ((record: T) => string);
  
  // Pagination
  pagination?: boolean;
  infiniteScroll?: boolean;
  pageSize?: number;
  totalCount?: number;
  onPageChange?: (page: number, pageSize: number) => void;
  
  // Sorting & Filtering
  defaultSort?: { column: string; direction: 'asc' | 'desc' };
  defaultFilters?: Record<string, any>;
  onSort?: (column: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: Record<string, any>) => void;
  
  // Editing
  onCellEdit?: (rowKey: string, column: string, value: any) => void;
  onRowUpdate?: (rowKey: string, updatedData: Partial<T>) => void;
  
  // Data operations
  onDataFetch?: (params: any) => Promise<T[]>;
  onUpdate?: (rowKey: string, data: Partial<T>) => Promise<void>;
  onBulkUpdate?: (updates: Array<{ key: string; data: Partial<T> }>) => Promise<void>;
  
  // Export/Import
  enableExport?: boolean;
  enableBulkUpload?: boolean;
  onExport?: (format: 'csv' | 'excel') => void;
  onBulkUpload?: (file: File) => Promise<void>;
  
  // Preferences
  storageKey?: string;
  savePreferences?: (preferences: GridPreferences) => Promise<void>;
  loadPreferences?: () => Promise<GridPreferences | null>;
  
  // Layout
  nestedRows?: boolean;
  mobileBreakpoint?: string;
  className?: string;
}

export interface GridState<T = any> {
  data: T[];
  filteredData: T[];
  sortedData: T[];
  paginatedData: T[];
  preferences: GridPreferences;
  editingCell: { row: string; column: string } | null;
  draggedColumn: string | null;
}
